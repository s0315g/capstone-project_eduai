const input = document.getElementById('photo-upload');
const preview = document.getElementById('preview');
const imageDisplay = document.querySelector('.image-display');
const slide3 = document.querySelector(".slide3");
const arrow = document.getElementById("scrollArrow");

// 슬라이드 전환
setTimeout(() => {
  document.querySelector('.slide1').classList.remove('remove');
  document.querySelector('.slide2').classList.add('active');
}, 700);

setTimeout(() => {
  document.querySelector('.slide2').classList.remove('remove');
  slide3.classList.add('active');
}, 1600);

// 이미지 업로드 미리보기
input.addEventListener('change', function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
      imageDisplay.style.display = 'flex';
    };
    reader.readAsDataURL(file);
  }
});

// 스크롤 화살표 제어
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

const firebaseConfig = {
  apiKey: "AIzaSyBd5kF2YRgtM3XUTXIr1DikdtBQbPyNSUw",
  authDomain: "ai-education-119c3.firebaseapp.com",
  projectId: "ai-education-119c3",
  storageBucket: "ai-education-119c3.firebasestorage.app",
  messagingSenderId: "650396084562",
  appId: "1:650396084562:web:f01e3fddabed0e7101b28b",
  measurementId: "G-YJFWW5QG0W"
  };

  firebase.initializeApp(firebaseConfig);

// 로그인 함수
function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // 로그인 성공
      const user = userCredential.user;
      alert('로그인 성공! 사용자: ' + user.email);
    })
    .catch((error) => {
      // 로그인 실패
      const errorCode = error.code;
      const errorMessage = error.message;
      alert('로그인 실패: ' + errorMessage);
    });
}

// 로그아웃 함수
function logout() {
  firebase.auth().signOut()
    .then(() => {
      alert('로그아웃 성공!');
    })
    .catch((error) => {
      alert('로그아웃 실패: ' + error.message);
    });
}



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

const popup = document.getElementById('slide4');
const loginBtn = document.getElementById('loginBtn');
const closeBtn = document.getElementById('closePopup');

loginBtn.addEventListener('click', () => {
  popup.style.display = 'flex'; // 팝업 열기
});

closeBtn.addEventListener('click', () => {
  popup.style.display = 'none'; // 팝업 닫기
});

// 바깥쪽 클릭하면 닫히게
window.addEventListener('click', (e) => {
  if (e.target === popup) {
    popup.style.display = 'none';
  }
});

  document.getElementById('summary').addEventListener('click', function () {
    const target = document.getElementById('upload-container');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
