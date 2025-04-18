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

const activateSlide = (fromClass, toClass, delay) => {
  setTimeout(() => {
    document.querySelector(fromClass)?.classList.remove('remove');
    document.querySelector(toClass)?.classList.add('active');
  }, delay);
};

activateSlide('.slide1', '.slide2', 700);
activateSlide('.slide2', '.slide3', 1600);


document.addEventListener("DOMContentLoaded", () => {
  // scroll 관련 로직
  const scrollContent = document.getElementById("slide3");
  if (!scrollContent) return;

  const titleimg = document.getElementById("title1");
  const imgUpload = document.getElementById("upload-container");
  const sidebar = document.getElementById("sidebar");
  const arrow = document.getElementById("scrollArrow");

  scrollContent.addEventListener("scroll", () => {
    const scrollTop = scrollContent.scrollTop;

    if (titleimg) titleimg.classList.toggle("show", scrollTop > 250);
    if (imgUpload) imgUpload.classList.toggle("show", scrollTop > 250);
    if (sidebar) sidebar.classList.toggle("show", scrollTop > 700);
    if (arrow) {
      if (scrollTop > 10) {
        arrow.classList.add("show");
        arrow.classList.remove("hide");
      } else {
        arrow.classList.remove("show", "hide");
      }
    }
  });

  // 화살표 클릭 스크롤 이동
  const scrollArrow = document.getElementById('scrollArrow');
  scrollArrow?.addEventListener('click', () => {
    const slide3Content = document.getElementById('slide3Content');
    slide3Content?.scrollIntoView({ behavior: 'smooth' });
  });
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

if (photoUpload && preview) {
  photoUpload.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
      preview.src = URL.createObjectURL(file);
      preview.style.display = 'block';
    }
  });
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

// Firebase 기능
window.addEventListener('firebaseInitialized', () => {
  const auth = window.firebaseAuth;
  const {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    signOut
  } = window.firebaseAuthFunctions;

  const loginForm = document.getElementById('loginForm');
  const signupForm = document.getElementById('signupForm');
  const welcomeMessage = document.getElementById('welcome-message');
  const userNameSpan = document.getElementById('user-name');
  const logoutBtn = document.getElementById('logoutBtn');

  const updateUI = (user) => {
    if (user) {
      userNameSpan.textContent = user.displayName || user.email;
      welcomeMessage.style.display = 'block';
      logoutBtn.style.display = 'inline-block';
      loginBtn.style.display = 'none';
      signUpBtn.style.display = 'none';
      
      // 5초 후에 환영 메시지를 부드럽게 숨기기
      setTimeout(() => {
        welcomeMessage.classList.add('hide');
        setTimeout(() => {
          welcomeMessage.style.display = 'none';
          welcomeMessage.classList.remove('hide');
        }, 500);
      }, 5000);
    } else {
      welcomeMessage.style.display = 'none';
      logoutBtn.style.display = 'none';
      loginBtn.style.display = 'inline-block';
      signUpBtn.style.display = 'inline-block';
    }
  };

  // 로그인
  loginForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      updateUI(userCredential.user);
      closeModal(loginModal);
      showToast('로그인 되었습니다!');
    } catch (error) {
      showToast('로그인 실패: ' + error.message);
    }
  });

  // 회원가입
  signupForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const nickname = document.getElementById('signup-name').value;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, {
        displayName: nickname,
      });
      updateUI(userCredential.user);
      closeModal(signupModal);
      showToast('회원가입이 완료되었습니다!');
    } catch (error) {
      showToast('회원가입 실패: ' + error.message);
    }
  });

  // 로그아웃
  logoutBtn?.addEventListener('click', async () => {
    try {
      await signOut(auth);
      showToast('로그아웃 되었습니다.');
      updateUI(null);
    } catch (error) {
      showToast('로그아웃 실패: ' + error.message);
    }
  });

  // 인증 상태 감지
  auth.onAuthStateChanged((user) => {
    updateUI(user);
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

