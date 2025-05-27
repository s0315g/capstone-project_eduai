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
    updateSendCountMsg();
  updateUploadCountMsg();
  };

  
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

// 로그인 함수 수정
function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  
  if (username && password) {
    localStorage.setItem('username', username);
    document.getElementById('loginBtn').style.display = 'none';
    document.getElementById('signUpBtn').style.display = 'none';
    document.getElementById('logoutBtn').style.display = 'block';
    document.getElementById('popup').style.display = 'none';
    showToast('로그인 되었습니다!');
  } else {
    showToast('아이디와 비밀번호를 입력해주세요.');
  }
}

// 로그아웃 함수 수정
function logout() {
  localStorage.removeItem('username');
  document.getElementById('loginBtn').style.display = 'block';
  document.getElementById('signUpBtn').style.display = 'block';
  document.getElementById('logoutBtn').style.display = 'none';
  showToast('로그아웃 되었습니다.');
}

// 회원가입 함수 수정
function signup() {
  const newUsername = document.getElementById('newUsername').value;
  const newPassword = document.getElementById('newPassword').value;
  
  if (newUsername && newPassword) {
    localStorage.setItem('username', newUsername);
    document.getElementById('loginBtn').style.display = 'none';
    document.getElementById('signUpBtn').style.display = 'none';
    document.getElementById('logoutBtn').style.display = 'block';
    document.getElementById('popup2').style.display = 'none';
    showToast('회원가입이 완료되었습니다!');
  } else {
    showToast('아이디와 비밀번호를 입력해주세요.');
  }
}
