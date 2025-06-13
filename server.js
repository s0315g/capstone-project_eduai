const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const { execSync } = require('child_process');
const fs = require('fs');
const { OpenAI } = require('openai');

const app = express();
const port = 3000;
const JWT_SECRET = 'your-secret-key';

// 사용자 임시 데이터베이스
const users = [];

// OpenAI 클라이언트 설정
const openai = new OpenAI({
    apiKey: 'sk'  // ← 보안상 실제 키는 노출하지 마세요
});

// 파일 업로드 설정
const upload = multer({ dest: 'uploads/' });

// 미들웨어
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname))); // 정적 파일 전달 (education.html 등)

// 메인 페이지
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'education.html'));
});

// 로그인 API
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email && u.password === password);

    if (user) {
        const token = jwt.sign({ userId: user.email }, JWT_SECRET, { expiresIn: '1h' });
        res.json({
            success: true,
            token,
            user: { name: user.name, email: user.email }
        });
    } else {
        res.status(401).json({
            success: false,
            error: '이메일 또는 비밀번호가 올바르지 않습니다.'
        });
    }
});

// 회원가입 API
app.post('/signup', (req, res) => {
    const { name, email, password } = req.body;

    if (users.some(u => u.email === email)) {
        return res.status(400).json({
            success: false,
            error: '이미 존재하는 이메일입니다.'
        });
    }

    users.push({ name, email, password });

    res.json({
        success: true,
        message: '회원가입이 완료되었습니다.'
    });
});

// OCR + GPT 요약 API
app.post('/ocr-summary', upload.single('image'), async (req, res) => {
    const imagePath = req.file.path;

    try {
        // Tesseract OCR 실행
        const ocrText = execSync(`"C:\\Program Files\\Tesseract-OCR\\tesseract.exe" "${imagePath}" stdout -l kor+eng`, {
            encoding: 'utf8'
        }).toString();

        if (!ocrText.trim()) {
            fs.unlinkSync(imagePath);
            return res.json({ summary: null });
        }

        // GPT 요약 요청
        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: '긴 텍스트를 핵심 내용 중심으로 사람이 읽기 좋게 요약하세요.' },
                { role: 'user', content: ocrText }
            ],
            temperature: 0.5,
            max_tokens: 2048
        });

        const summary = completion.choices[0].message.content.trim();

        fs.unlinkSync(imagePath); // 업로드 파일 삭제
        res.json({ summary });
    } catch (err) {
        console.error('❌ OCR 또는 GPT 요약 오류:', err.message);
        res.status(500).json({ error: '요약 중 오류가 발생했습니다.' });
    }
});

// 학습 전략 GPT 분석 API
app.post('/study-analyze', async (req, res) => {
    const data = req.body;
    console.log("📨 수신된 학습 분석 요청:", data);

    const prompt = `
다음은 학습자의 자기 보고 정보입니다:

- 나이: ${data.age}
- 하루 공부 시간: ${data.study_time}
- 선호 학습 방법: ${data.preferred_method}
- 겪는 어려움: ${data.difficulties}
- 목표: ${data.goals}
- 집중이 잘 되는 시간대: ${data.concentration}
- 휴식 방법: ${data.break_method}
- 메모/정리 습관: ${data.memo_habit}

이 정보를 바탕으로:
1. 개인 맞춤형 학습 전략을 구체적으로 제안해주세요.
2. 하루 또는 주간 루틴 예시를 포함해주세요.
3. 집중력 향상, 습관 형성, 슬럼프 극복 팁도 함께 주세요.
4. 추천 온라인 자료(앱, 유튜브, 웹사이트 등)도 포함해 주세요.
`;

    try {
        const completion = await openai.chat.completions.create({
            model: 'gpt-4',
            messages: [
                { role: 'system', content: '당신은 학습 전략 및 교육 전문가입니다.' },
                { role: 'user', content: prompt }
            ],
            temperature: 0.7,
            max_tokens: 2048
        });

        const reply = completion.choices[0].message.content.trim();
        res.json({ result: reply });
    } catch (err) {
        console.error('❌ GPT 분석 오류:', err.message);
        res.status(500).json({ error: 'GPT 분석 실패' });
    }
});

// 서버 실행
app.listen(port, () => {
    console.log(`서버 실행 중 http://localhost:${port}`);
});
