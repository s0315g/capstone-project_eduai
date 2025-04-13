const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3000;

// 임시 사용자 데이터베이스
const users = [];

const JWT_SECRET = 'your-secret-key';

app.use(cors());
app.use(bodyParser.json());

// 정적 파일 제공
app.use(express.static(path.join(__dirname)));

// 메인 HTML 제공
app.get('/', (req, res) => {
    // 현재 디렉터리에서 education.html 파일의 절대 경로 생성
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
            user: {
                name: user.name,
                email: user.email
            }
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

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
