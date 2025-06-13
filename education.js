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
document.getElementById('main')?.addEventListener('click', () => scrollToSection('sliderTrack'));
document.getElementById('analysis')?.addEventListener('click', () => scrollToSection('title1'));
document.getElementById('analysisSide')?.addEventListener('click', () => scrollToSection('title1'));
document.getElementById('chat')?.addEventListener('click', () => scrollToSection('title1'));
document.getElementById('chatSide')?.addEventListener('click', () => scrollToSection('title1'));

 document.getElementById('hover4')?.addEventListener('click', () => {
    scrollToSection('picTitle');
  });

  document.getElementById('hover5')?.addEventListener('click', () => {
    scrollToSection('botTitle');
  });

  document.getElementById('hover6')?.addEventListener('click', () => {
    scrollToSection('QTitle');
  });

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
          "Authorization": "Bearer"
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
  if (localStorage.getItem('askLimitUnlocked') === '1') return 99999;
  return isUserLoggedIn() ? 10 : 5;
}
function getUploadMaxCount() {
  if (localStorage.getItem('uploadLimitUnlocked') === '1') return 99999;
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
    parent.innerHTML = `<div id="question"> &nbsp;&nbsp;&nbsp; 일일 질문 가능 횟수:<span id="send-count-remaining">${remaining}</span>/${max >= 99999 ? '∞' : max}
       <button id="unlock-limit-btn" style="margin-left:8px;"> Premium </button></div>`  ;
  }
  if (max >= 99999 || remaining > 0) {
    enableSendBtn();
  } else {
    disableSendBtn();
  }
  // unlock-limit-btn 이벤트 재연결

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
// function disableUploadInput() {
//   photoUpload.disabled = true;
//   photoUpload.style.opacity = "0.5";
//   showToast("업로드 제한 횟수(3회)를 초과했습니다.");
// }

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
    parent.innerHTML = `일일 업로드 가능 횟수: <span id="upload-count-remaining">${remaining}</span>/${max >= 99999 ? '∞' : max}`;
  }
  // ... (버튼 enable/disable 등)
}

function enableSendBtn() {
  sendBtn.disabled = false;
  sendBtn.textContent = "SEND";
}

document.addEventListener("DOMContentLoaded", () => {
  const explain = document.getElementById("explain_image");
  const scrollContent = document.getElementById("slide3");
  console.log(scrollContent); // null이면 선택 실패

  scrollContent.addEventListener("scroll", () => {
    const scrollTop = scrollContent.scrollTop;

    if (scrollTop > 300) {
      explain.classList.add("show");
      explain.classList.remove("hide");
    } else {
      explain.classList.remove("show");
      explain.classList.add("hide");
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const scrollToElement = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 메뉴 클릭 이벤트 등록
  document.getElementById('summary')?.addEventListener('click', () => {
    scrollToElement('picTitle'); // picture summary 영역
  });

  document.getElementById('analysis')?.addEventListener('click', () => {
    scrollToElement('QTitle'); // pattern analysis 영역
  });

  document.getElementById('chat')?.addEventListener('click', () => {
    scrollToElement('botTitle'); // chat bot 영역
  });

  document.getElementById('main')?.addEventListener('click', () => {
    scrollToElement('slide3Content'); // main screen 이미지 영역
  });

  // 사이드바에도 같은 이벤트 등록 (옵션)
  document.getElementById('summarySide')?.addEventListener('click', () => {
    scrollToElement('picTitle');
  });

  document.getElementById('analysisSide')?.addEventListener('click', () => {
    scrollToElement('QTitle');
  });

  document.getElementById('chatSide')?.addEventListener('click', () => {
    scrollToElement('botTitle');
  });
});

document.addEventListener('DOMContentLoaded', () => {
  const scrollToElement = (elementId) => {
    const element = document.getElementById(elementId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 사이드바 클릭 이벤트 등록
  document.getElementById('main')?.addEventListener('click', () => {
    scrollToElement('Group3'); // 메인 이미지 위치
  });

  document.getElementById('summarySide')?.addEventListener('click', () => {
    scrollToElement('picTitle'); // picture summary 이미지 위로 이동
  });

  document.getElementById('chatSide')?.addEventListener('click', () => {
    scrollToElement('botTitle'); // chat bot 이미지 위로 이동
  });

  document.getElementById('analysisSide')?.addEventListener('click', () => {
    scrollToElement('QTitle'); // PatternAnalysis 이미지 위로 이동
  });
});

document.addEventListener('DOMContentLoaded', () => {
  // 스크롤 이동 함수 (메뉴/사이드바 클릭용은 유지)
  const scrollToElement = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // 메뉴 클릭 이벤트
  document.getElementById('summary')?.addEventListener('click', () => scrollToElement('picTitle'));
  document.getElementById('chat')?.addEventListener('click', () => scrollToElement('botTitle'));
  document.getElementById('analysis')?.addEventListener('click', () => scrollToElement('QTitle'));

  // 사이드바 클릭 이벤트
  document.getElementById('main')?.addEventListener('click', () => scrollToElement('Group3'));
  document.getElementById('summarySide')?.addEventListener('click', () => scrollToElement('picTitle'));
  document.getElementById('chatSide')?.addEventListener('click', () => scrollToElement('botTitle'));
  document.getElementById('analysisSide')?.addEventListener('click', () => scrollToElement('QTitle'));

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // 한 번만 나타나게
      }
    });
  }, {
    threshold: 0.5 // 30% 보이면 감지
  });

  document.querySelectorAll('.observe-target').forEach(el => observer.observe(el));
});

// 제한 해제 버튼 클릭시 모달 열기
document.addEventListener('click', (e) => {
  if (e.target.id === 'unlock-limit-btn') {
    document.getElementById('pay-modal').classList.add('show');
    document.getElementById('pay-modal').classList.remove('hide');
  }
});

// 모달 결제/취소 버튼
document.getElementById('pay-cancel').addEventListener('click', () => {
  document.getElementById('pay-modal').classList.remove('show');
  document.getElementById('pay-modal').classList.add('hide');
});

document.getElementById('pay-confirm').addEventListener('click', () => {
  const option = document.querySelector('input[name="payOption"]:checked').value;
  document.getElementById('pay-modal').classList.remove('show');
  document.getElementById('pay-modal').classList.add('hide');

  if (option === 'upload') {
    localStorage.setItem('uploadLimitUnlocked', '1');
    showToast('사진 업로드 제한이 해제되었습니다!');
  } else if (option === 'ask') {
    localStorage.setItem('askLimitUnlocked', '1');
    showToast('질문 횟수 제한이 해제되었습니다!');
  } else if (option === 'all') {
    localStorage.setItem('uploadLimitUnlocked', '1');
    localStorage.setItem('askLimitUnlocked', '1');
    showToast('전체 제한이 해제되었습니다!');
  } else if (option === 'reset') {
    resetLimits();
  }
  updateSendCountMsg();
  updateUploadCountMsg();
});

function resetLimits() {
  localStorage.removeItem('uploadLimitUnlocked');
  localStorage.removeItem('askLimitUnlocked');
  updateSendCountMsg();
  updateUploadCountMsg();
  showToast('무제한 모드 해제');
}

document.addEventListener("DOMContentLoaded", () => {
  const group3 = document.querySelector(".group3");
  const bulb = document.getElementById("bulb");

  group3.addEventListener("mouseenter", () => {
    bulb.classList.add("shake");

    // 애니메이션이 끝나면 클래스 제거 (재사용 가능하도록)
    bulb.addEventListener("animationend", () => {
      bulb.classList.remove("shake");
    }, { once: true });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const trigger = document.getElementById("Group3");
  const bulb = document.getElementById("bulb");

  // 마우스를 올렸을 때 반복 애니메이션 시작
  trigger.addEventListener("mouseenter", () => {
    bulb.classList.add("shake");
  });

  // 마우스가 벗어났을 때 애니메이션 제거
  trigger.addEventListener("mouseleave", () => {
    bulb.classList.remove("shake");
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const track = document.getElementById("sliderTrack");
  const slides = document.querySelectorAll(".slide-img");
  const dotsContainer = document.getElementById("dots");
  const wrapper = document.querySelector(".slider-wrapper");

  let currentIndex = 0;
  const totalSlides = slides.length;

  // 도트 생성
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("span");
    if (i === 0) dot.classList.add("active");
    dotsContainer.appendChild(dot);
  }

  const dots = dotsContainer.querySelectorAll("span");

  function goToSlide(index) {
    const slideWidth = slides[0].offsetWidth + 30; // 30px gap
    const wrapperWidth = wrapper.offsetWidth;
    const centerOffset = (wrapperWidth - slideWidth) / 2;

    currentIndex = index;
    track.style.transform = `translateX(${-index * slideWidth + centerOffset}px)`;

    dots.forEach(dot => dot.classList.remove("active"));
    dots[index].classList.add("active");

    slides.forEach(slide => slide.classList.remove("active"));
    slides[index].classList.add("active");
  }

  goToSlide(0);

  setInterval(() => {
    currentIndex = (currentIndex + 1) % totalSlides;
    goToSlide(currentIndex);
  }, 5000);

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goToSlide(index);
    });
  });

  // 브라우저 크기 바뀌면 다시 위치 재계산
  window.addEventListener("resize", () => goToSlide(currentIndex));
});
