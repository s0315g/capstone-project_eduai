const input = document.getElementById('photo-upload');
const imageDisplay = document.querySelector('.image-display');
const slide3 = document.querySelector(".slide3");
const arrow = document.getElementById("scrollArrow");
const popup = document.getElementById('slide4');
const popup2 = document.getElementById('slide5');
const closeBtn = document.getElementById('closePopup');
const closeBtn2 = document.getElementById('closePopup2');
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

setTimeout(() => {
  document.querySelector('.slide1').classList.remove('remove');
  document.querySelector('.slide2').classList.add('active');
}, 700);

setTimeout(() => {
  document.querySelector('.slide2').classList.remove('remove');
  slide3.classList.add('active');
}, 1600);


document.addEventListener("DOMContentLoaded", () => {
  const titleimg = document.getElementById("title1");
  const scrollContent = document.getElementById("slide3");

  scrollContent.addEventListener("scroll", () => {
    const scrollTop = scrollContent.scrollTop;

    if (scrollTop > 250) {
      titleimg.classList.add("show");
      titleimg.classList.remove("hide");
    } else {
      titleimg.classList.remove("show");
      titleimg.classList.add("hide");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const imgUpload = document.getElementById("upload-container");
  const scrollContent = document.getElementById("slide3");

  scrollContent.addEventListener("scroll", () => {
    const scrollTop = scrollContent.scrollTop;

    if (scrollTop > 250) {
      imgUpload.classList.add("show");
      imgUpload.classList.remove("hide");
    } else {
      imgUpload.classList.remove("show");
      imgUpload.classList.add("hide");
    }
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const sidebar = document.getElementById("sidebar");
  const scrollContent = document.getElementById("slide3");
  console.log(scrollContent); // null이면 선택 실패

  if (!sidebar || !scrollContent) {
    console.warn("sidebar 또는 slide3가 존재하지 않음");
    return;
  }

  scrollContent.addEventListener("scroll", () => {
    const scrollTop = scrollContent.scrollTop;

    if (scrollTop > 700) {
      sidebar.classList.add("show");
      sidebar.classList.remove("hide");
    } else {
      sidebar.classList.remove("show");
      sidebar.classList.add("hide");
    }
  });
});


// 슬라이드 화살표 클릭 시 스크롤 이동
document.addEventListener('DOMContentLoaded', () => {
  const scrollArrow = document.getElementById('scrollArrow');
  if (scrollArrow) {
    scrollArrow.addEventListener('click', () => {
      const slide3Content = document.getElementById('slide3Content');
      slide3Content.scrollIntoView({ behavior: 'smooth' });
    });
  }
});

// 사이드바 및 메뉴 클릭 시 스크롤 이동
const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: 'smooth' });
  }
};

document.getElementById('summary')?.addEventListener('click', () => scrollToSection('title1'));
document.getElementById('summarySide')?.addEventListener('click', () => scrollToSection('title1'));
document.getElementById('main')?.addEventListener('click', () => scrollToSection('Group3'));
document.getElementById('analysis')?.addEventListener('click', () => scrollToSection('title1'));
document.getElementById('analysisSide')?.addEventListener('click', () => scrollToSection('title1'));
document.getElementById('chat')?.addEventListener('click', () => scrollToSection('title1'));
document.getElementById('chatSide')?.addEventListener('click', () => scrollToSection('title1'));

// 이미지 업로드 미리보기
const photoUpload = document.getElementById('photo-upload');
const preview = document.getElementById('preview');

photoUpload.addEventListener('change', (event) => {
  const count = getUploadCount();
  const maxUpload = getUploadMaxCount();
  if (count >= maxUpload) {
    disableUploadInput();
    updateUploadCountMsg();
    return;
  }
  const file = event.target.files[0];
  if (file) {
    preview.src = URL.createObjectURL(file);
    preview.style.display = 'block';
    setUploadCount(count + 1);
    updateUploadCountMsg();
    if (count + 1 >= maxUpload) {
      disableUploadInput();
    }
  }
});

function updateUploadCountMsg() {
  const max = getUploadMaxCount();
  const remaining = max - getUploadCount();
  const el = document.getElementById("upload-count-remaining");
  if (el) el.textContent = remaining;
}


// 모달 제어
const loginModal = document.getElementById('loginModal');
const signupModal = document.getElementById('signupModal');
const loginBtn = document.getElementById('loginBtn');
const signUpBtn = document.getElementById('signUpBtn');
const closeButtons = document.querySelectorAll('.close');

loginBtn?.addEventListener('click', () => openModal(loginModal));
signUpBtn?.addEventListener('click', () => openModal(signupModal));
closeButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    closeModal(loginModal);
    closeModal(signupModal);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const arrow = document.getElementById("scrollArrow");
  const scrollContent = document.getElementById("slide3");

  scrollContent.addEventListener("scroll", () => {
    const scrollTop = scrollContent.scrollTop;

    if (scrollTop > 10) {
      arrow.classList.add("show");
      arrow.classList.remove("hide");
    } else {
      arrow.classList.remove("show", "hide");
    }
  });
});

// 토스트 메시지 표시 함수
function showToast(message) {
  const toastContainer = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  toastContainer.appendChild(toast);
  
  // 토스트 메시지 표시
  requestAnimationFrame(() => {
    toast.style.opacity = '1';
  });
  
  // 3초 후에 토스트 메시지 제거
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 2700);
}

  const chatBox = document.getElementById("chat-box");
  const userInput = document.getElementById("user-input");
  const sendBtn = document.getElementById("send-btn");
  const levelSelect = document.getElementById("level");
  
  async function sendMessage() {
    const level = levelSelect.value;
    const message = userInput.value.trim();
    if (!message) return;
  
    appendMessage("나", message);
    userInput.value = "";
  
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": ""
        },
        body: JSON.stringify({
          model: "gpt-4",
          messages: [
            {
              role: "system",
              content: `당신은 ${level} 학습자에게 맞춘 친절한 튜터입니다.`
            },
            {
              role: "user",
              content: message
            }
          ]
        })
      });
  
      const data = await response.json();
  
      if (data.choices && data.choices.length > 0) {
        const reply = data.choices[0].message.content;
        appendMessage("AI", reply);
      } else {
        appendMessage("AI", "응답을 받을 수 없습니다. 다시 시도해주세요.");
      }
  
    } catch (error) {
      console.error("API 호출 오류:", error);
      appendMessage("AI", "오류가 발생했습니다. 다시 시도해주세요.");
    }
  }
  
  function appendMessage(sender, message) {
    const div = document.createElement("div");
    div.innerHTML = `<strong>${sender}:</strong> ${message}`;
    div.classList.add("message");
    chatBox.appendChild(div);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

// 오늘 날짜 yyyy-mm-dd
function getTodayString() {
  const today = new Date();
  return today.toISOString().slice(0,10);
}

// 누른 횟수 가져오기
function getSendCount() {
  const data = JSON.parse(localStorage.getItem("sendCountData") || '{}');
  const today = getTodayString();
  if (data.date !== today) return 0; // 날짜 바뀌면 0회
  return data.count || 0;
}

// 횟수 저장
function setSendCount(count) {
  const today = getTodayString();
  localStorage.setItem("sendCountData", JSON.stringify({ date: today, count }));
}

// SEND 버튼 비활성화
function disableSendBtn() {
  sendBtn.disabled = true;
  sendBtn.textContent = "Limit!";
}

sendBtn.addEventListener("click", () => {
  const count = getSendCount();
  const maxCount = getSendMaxCount();
  if (count >= maxCount) {
    showToast(`하루 ${maxCount}회까지만 질문할 수 있습니다.`);
    disableSendBtn();
    updateSendCountMsg();
    return;
  }
  sendMessage();
  setSendCount(count + 1);
  updateSendCountMsg();
  if (count + 1 >= maxCount) {
    disableSendBtn();
  }
});

function isUserLoggedIn() {
  // Firebase 기준
  return window.firebaseAuth && window.firebaseAuth.currentUser;
  // Express API + 토큰 방식이라면 아래처럼 구현
  // return !!localStorage.getItem("access_token");
}

// 질문/업로드 최대 횟수
function getSendMaxCount() {
  return isUserLoggedIn() ? 10 : 5;
}
function getUploadMaxCount() {
  return isUserLoggedIn() ? 10 : 3;
}

// 잔여횟수 메시지 업데이트
function updateSendCountMsg() {
  const max = getSendMaxCount();
  let remaining = max - getSendCount();
  if (max >= 99999) remaining = '∞';
  else if (remaining < 0) remaining = 0; // 음수 방지
  const el = document.getElementById("send-count-remaining");
  if (el) el.textContent = remaining;
  const parent = el?.parentElement;
  if (parent) {
    parent.innerHTML = `오늘의 질문 가능 횟수: <span id="send-count-remaining">${remaining}</span>/${max >= 99999 ? '∞' : max}
    <button id="unlock-limit-btn" style="margin-left:8px;">제한 해제</button>`;
  }
  if (max >= 99999 || remaining > 0) {
    enableSendBtn();
  } else {
    disableSendBtn();
  }
  // unlock-limit-btn 이벤트 재연결
  document.getElementById('unlock-limit-btn')?.addEventListener('click', () => {
    if (confirm('제한을 해제하려면 결제/구독이 필요합니다. (데모: 확인 누르면 해제됨)')) {
      isLimitUnlocked = true;
      localStorage.setItem('isLimitUnlocked', '1');
      updateSendCountMsg();
      showToast('질문 횟수 제한이 해제되었습니다!');
    }
  });
}



// 페이지 로드시 바로 체크
window.addEventListener("DOMContentLoaded", () => {
  const count = getSendCount();
  const uploadCount = getUploadCount();
  if (count >= 5) {
    disableSendBtn();
  }
  if (uploadCount >= 3) {
    disableUploadInput();
  }
  updateUploadCountMsg();
});

  
  const resetBtn = document.getElementById("reset-btn");

resetBtn.addEventListener("click", () => {
  chatBox.innerHTML = ""; // 전체 대화 초기화
});

// 오늘 날짜
function getTodayString() {
  const today = new Date();
  return today.toISOString().slice(0,10);
}

// 업로드 카운트 가져오기
function getUploadCount() {
  const data = JSON.parse(localStorage.getItem("uploadCountData") || '{}');
  const today = getTodayString();
  if (data.date !== today) return 0;
  return data.count || 0;
}

// 업로드 카운트 저장
function setUploadCount(count) {
  const today = getTodayString();
  localStorage.setItem("uploadCountData", JSON.stringify({ date: today, count }));
}

// 업로드 input 비활성화
function disableUploadInput() {
  photoUpload.disabled = true;
  photoUpload.style.opacity = "0.5";
  showToast("업로드 제한 횟수(3회)를 초과했습니다.");
}

// 업로드 잔여횟수 표시
function updateUploadCountMsg() {
  const max = getUploadMaxCount();
  let remaining = max - getUploadCount();
  if (max >= 99999) remaining = '∞';
  else if (remaining < 0) remaining = 0;
  const el = document.getElementById("upload-count-remaining");
  if (el) el.textContent = remaining;
  const parent = el?.parentElement;
  if (parent) {
    parent.innerHTML = `오늘의 업로드 가능 횟수: <span id="upload-count-remaining">${remaining}</span>/${max >= 99999 ? '∞' : max}`;
  }
  // ... (버튼 enable/disable 등)
}

function enableSendBtn() {
  sendBtn.disabled = false;
  sendBtn.textContent = "SEND";
}