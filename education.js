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
    } catch (error) {
      alert('로그인 실패: ' + error.message);
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
    } catch (error) {
      alert('회원가입 실패: ' + error.message);
    }
  });

  // 로그아웃
  logoutBtn?.addEventListener('click', async () => {
    try {
      await signOut(auth);
      updateUI(null);
    } catch (error) {
      alert('로그아웃 실패: ' + error.message);
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