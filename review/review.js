document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const subjectButtons = document.getElementById('subject-buttons');
  const gradeButtons = document.querySelectorAll('.grade-btn');
  const searchBar = document.querySelector('.search-bar');
  const gradeButtonGroup = document.querySelector('.grade-button-group');
  const textHeading = document.querySelector('.text');
  const reviewDetail = document.getElementById('review-detail');
  const backButton = document.getElementById('back-button');
  const writeForm = document.getElementById('write-form');
  const textarea = document.querySelector('#write-form textarea');
  const submitBtn = document.getElementById('submit-review');
  const reviewContainer = document.querySelector('.lecture-reviews');
  const examTypeSelect = document.getElementById('exam-type-selected');
  const examTypeText = document.getElementById('exam-type-selected-text');
  const examTypeOptions = document.getElementById('exam-type-options');
  const examTypeArrow = document.getElementById('exam-type-arrow');
  const uploadButton = document.getElementById('upload-button');
  const uploadOptions = document.getElementById('upload-options');
  const uploadArea = document.getElementById('upload-area');
  const fileInput = document.getElementById('fileInput');
  let filePath = '';
  const baseUrl = 'https://majorapp.live';

  const savedUserInfo = JSON.parse(localStorage.getItem('userInfo'));
  const nickname = savedUserInfo?.usernickname || '익명';

  const courseIdMap = {
    '데이터 분석 기초': 1,
    '인공지능 개론': 2,
    '객체지향 프로그램': 3,
    미적분학: 4,
    '프로그래밍 기초': 5,
    '통계 기초': 6,
    '인공지능 수학': 7,
    'SW/HW 플랫폼 설계': 8,
    통계실무: 9,
    '인공지능 프로그램': 10,
    운영체제: 11,
    '데이터 사이언스': 12,
    '빅데이터 처리': 13,
    '인공지능 플랫폼 설계': 14,
    '데이터 마이닝 및 응용 실습': 15,
    '소프트웨어 공학': 16,
    '클라우드 컴퓨팅': 17,
    'AI 정보보안': 18,
    딥러닝: 19,
    정밀의료: 20,
    '멀티모달 학습': 21,
    '의료 DB 설계': 22,
    자료구조: 23,
    '데이터 모델 및 시각화': 24,
    '자동화 이론': 25,
    '알고리즘 분석': 26,
    '의료 전문가 시스템': 27,
    '의사결정 지원 시스템': 28,
    'BM 프로젝트': 29,
    졸업논문: 30,
  };

  const subjects = {
    '1학년': [
      '데이터 분석 기초',
      '인공지능 개론',
      '객체지향 프로그램',
      '미적분학',
    ],
    '2학년': [
      '프로그래밍 기초',
      '통계 기초',
      '인공지능 수학',
      'SW/HW 플랫폼 설계',
      '통계실무',
      '인공지능 프로그램',
      '운영체제',
      '데이터 사이언스',
      '빅데이터 처리',
    ],
    '3학년': [
      '인공지능 플랫폼 설계',
      '데이터 마이닝 및 응용 실습',
      '소프트웨어 공학',
      '클라우드 컴퓨팅',
      'AI 정보보안',
      '딥러닝',
      '정밀의료',
      '멀티모달 학습',
      '의료 DB 설계',
      '자료구조',
      '데이터 모델 및 시각화',
      '자동화 이론',
      '알고리즘 분석',
      '의료 전문가 시스템',
    ],
    '4학년': ['의사결정 지원 시스템', 'BM 프로젝트', '졸업논문'],
  };

  const subjectDetails = {
    '데이터 분석 기초': '1학기 · 필수',
    '인공지능 개론': '1학기 · 필수',
    '객체지향 프로그램': '1학기 · 필수',
    미적분학: '1학기 · 선택',
    '프로그래밍 기초': '1학기 · 필수',
    '통계 기초': '1학기 · 필수',
    '인공지능 수학': '1학기 · 필수',
    'SW/HW 플랫폼 설계': '2학기 · 필수',
    통계실무: '2학기 · 필수',
    '인공지능 프로그램': '2학기 · 필수',
    운영체제: '1학기 · 선택',
    '데이터 사이언스': '1학기 · 선택',
    '빅데이터 처리': '2학기 · 선택',
    '인공지능 플랫폼 설계': '1학기 · 필수',
    '데이터 마이닝 및 응용 실습': '1학기 · 필수',
    '소프트웨어 공학': '2학기 · 필수',
    '클라우드 컴퓨팅': '1학기 · 선택',
    'AI 정보보안': '1학기 · 선택',
    딥러닝: '1학기 · 선택',
    정밀의료: '1학기 · 선택',
    '멀티모달 학습': '1학기 · 선택',
    '의료 DB 설계': '1학기 · 선택',
    자료구조: '2학기 · 선택',
    '데이터 모델 및 시각화': '2학기 · 선택',
    '자동화 이론': '2학기 · 선택',
    '알고리즘 분석': '2학기 · 선택',
    '의료 전문가 시스템': '2학기 · 선택',
    '의사결정 지원 시스템': '1학기 · 선택',
    'BM 프로젝트': '2학기 · 선택',
    졸업논문: '1학기 · 필수',
  };

  let currentGrade = '1학년';

  function renderSubjects(list) {
    subjectButtons.innerHTML = list
      .map(
        (name) => `
      <button class="subject-btn">
        <div class="left">
          <div class="profile">
            <svg class="profile-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4" fill="#fff" />
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6" fill="#fff" />
            </svg>
          </div>
          <div class="info">
            <div class="name">${name}</div>
            <div class="detail">${subjectDetails[name] || ''}</div>
          </div>
        </div>
        <div class="arrow">›</div>
      </button>
    `
      )
      .join('');
  }

  gradeButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      gradeButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      currentGrade = btn.querySelector('span').textContent;
      searchInput.value = '';
      renderSubjects(subjects[currentGrade]);
    });
  });

  searchInput.addEventListener('input', () => {
    const keyword = searchInput.value.trim().toLowerCase();
    if (keyword === '') {
      renderSubjects(subjects[currentGrade]);
    } else {
      const allSubjectNames = Object.keys(subjectDetails);
      const matched = allSubjectNames.filter((name) =>
        name.toLowerCase().includes(keyword)
      );
      renderSubjects(matched);
    }
  });

  document.addEventListener('click', function (e) {
    const subjectBtn = e.target.closest('.subject-btn');
    if (subjectBtn) {
      const subjectName = subjectBtn.querySelector('.name').textContent;
      document.getElementById('subject-title').textContent = subjectName;

      renderRating(subjectName);
      loadLectureReviews(subjectName);
      loadExamReviews(subjectName);

      subjectButtons.style.display = 'none';
      searchBar.style.display = 'none';
      gradeButtonGroup.style.display = 'none';
      textHeading.style.display = 'none';
      reviewDetail.style.display = 'block';
    }
  });

  backButton.addEventListener('click', () => {
    reviewDetail.style.display = 'none';
    subjectButtons.style.display = 'flex';
    searchBar.style.display = 'flex';
    gradeButtonGroup.style.display = 'flex';
    textHeading.style.display = 'block';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  async function loadLectureReviews(subjectName) {
    const courseId = courseIdMap[subjectName];
    const res = await fetch(`${baseUrl}/api/courses/${courseId}/evaluations`);
    const reviews = await res.json();

    const container = document.querySelector('.lecture-reviews');
    container.innerHTML = '';

    reviews.forEach((review) => {
      const card = document.createElement('div');
      card.className = 'review-card';
      const stars = getStarHTML(review.stars);

      card.innerHTML = `
      <div class="review-header">
        <div class="profile-img">
          ${
            review.profileImage
              ? `<img src="${review.profileImage}" alt="profile" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">`
              : `<svg xmlns="http://www.w3.org/2000/svg" class="default-profile-icon" viewBox="0 0 24 24" fill="white"><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 4-6 8-6s8 2 8 6" /></svg>`
          }
        </div>
        <div class="review-info">
          <div class="nickname">${review.nickname || '익명'}</div>
          <div class="semester small-gray">${review.semester}</div>
        </div>
        <div class="review-stars">${stars}</div>
      </div>
      <div class="review-content">${review.content}</div>
    `;

      container.appendChild(card);
    });
  }

  async function renderRating(subjectName) {
    const courseId = courseIdMap[subjectName];
    const res = await fetch(`${baseUrl}/api/courses/${courseId}/evaluations`);
    const reviews = await res.json();

    let total = 0;
    let count = reviews.length;

    reviews.forEach((r) => (total += Number(r.stars)));

    const avg = count ? total / count : 0;

    const starsElem = document.querySelector('.stars');
    const scoreElem = document.querySelector('.rating-score');

    let starHTML = '';
    for (let i = 1; i <= 5; i++) {
      starHTML += i <= Math.round(avg) ? '★' : '☆';
    }

    starsElem.innerHTML = starHTML;
    scoreElem.innerHTML = `<strong>${avg.toFixed(
      1
    )}</strong><span>(${count})</span>`;
  }

  const stars = document.querySelectorAll('.write-stars span');
  const scoreDisplay = document.querySelector('.write-score');

  let currentRating = 0;

  function updateStars(rating) {
    stars.forEach((별) => {
      const value = parseInt(star.getAttribute('data-value'));
      if (value <= rating) {
        star.classList.add('active');
        star.textContent = '★';
      } else {
        star.classList.remove('active');
        star.textContent = '☆';
      }
    });

    scoreDisplay.textContent = `${rating}`;
    currentRating = rating;
  }

  stars.forEach((별) => {
    star.addEventListener('click', () => {
      const rating = parseInt(star.getAttribute('data-value'));
      updateStars(rating);
    });
  });

  const selected = document.getElementById('selected');
  const selectedText = document.getElementById('selected-text');
  const options = document.getElementById('options');
  const dropdownArrow = document.getElementById('dropdown-arrow');

  selected.addEventListener('click', () => {
    const isOpen = options.style.display === 'block';
    options.style.display = isOpen ? 'none' : 'block';
    dropdownArrow.classList.toggle('rotate', !isOpen);
  });

  options.querySelectorAll('li').forEach((li) => {
    li.addEventListener('click', () => {
      selectedText.textContent = li.textContent;
      selectedText.style.color = '#3b6ef7';
      options.style.display = 'none';
      dropdownArrow.classList.remove('rotate');
    });
  });

  document.addEventListener('click', (e) => {
    if (!document.getElementById('custom-select').contains(e.target)) {
      options.style.display = 'none';
      dropdownArrow.classList.remove('rotate');
    }
  });

  submitBtn.addEventListener('click', async () => {
    const isExamMode =
      document.getElementById('write-form-title').textContent ===
      '시험 정보 등록하기';
    const subjectName = document.getElementById('subject-title').textContent;
    const courseId = courseIdMap[subjectName];
    const content = textarea.value.trim();
    const semester = selectedText.textContent.trim();
    const examType = examTypeText.textContent.trim();
    const stars = parseInt(scoreDisplay.textContent);

    if (isExamMode) {
      if (semester === '응시 학기')
        return showCustomAlert('응시 학기를 선택해주세요.');
      if (examType === '응시 회차')
        return showCustomAlert('응시 회차를 선택해주세요.');
      if (content.length < 20)
        return showCustomAlert('시험 정보를 20자 이상 입력해주세요.');

      const payload = {
        semester,
        type: examType,
        content,
        nickname,
        filePath,
        profileImage: savedUserInfo?.profileImage || '',
      };

      const res = await fetch(`${baseUrl}/api/courses/${courseId}/exams`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        showCustomAlert('시험 정보가 등록되었습니다.');
        textarea.value = '';
        selectedText.textContent = '응시 학기';
        examTypeText.textContent = '응시 회차';
        filePath = '';
        document.getElementById('uploaded-images').innerHTML = '';
        writeForm.style.display = 'none';
        reviewDetail.style.display = 'block';
        loadExamReviews(subjectName);
      }
      return;
    }

    // 강의평
    if (!stars || isNaN(stars)) return showCustomAlert('별점을 입력해주세요.');
    if (semester === '수강 학기')
      return showCustomAlert('수강 학기를 선택해주세요.');
    if (content.length < 20)
      return showCustomAlert('강의평을 20자 이상 작성해주세요.');

    const payload = {
      stars,
      semester,
      content,
      nickname,
      profileImage: savedUserInfo?.profileImage || '',
    };

    const res = await fetch(`${baseUrl}/api/courses/${courseId}/evaluations`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      showCustomAlert('강의평이 등록되었습니다.');
      textarea.value = '';
      selectedText.textContent = '수강 학기';
      renderRating(subjectName);
      loadLectureReviews(subjectName);
      updateStars(0);
      writeForm.style.display = 'none';
      reviewDetail.style.display = 'block';
    }
  });

  async function loadExamReviews(subjectName) {
    const courseId = courseIdMap[subjectName];
    const res = await fetch(`${baseUrl}/api/courses/${courseId}/exams`);
    const list = await res.json();
    const container = document.querySelector('.exam-reviews');
    container.innerHTML = '';

    list.forEach((item) => {
      const box = document.createElement('div');
      box.className = 'review-card';
      box.innerHTML = `
      <div class="review-header">
        <div class="profile-img">
          ${
            item.profileImage
              ? `<img src="${item.profileImage}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`
              : `<svg xmlns="http://www.w3.org/2000/svg" class="default-profile-icon" viewBox="0 0 24 24" fill="white"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 4-6 8-6s8 2 8 6"/></svg>`
          }
        </div>
        <div class="review-meta">
          <strong class="nickname">${item.nickname}</strong>
          <div class="exam-subinfo">${item.semester} · ${item.type}</div>
        </div>
        ${
          item.filePath
            ? `<a href="${item.filePath}" download class="download-link show-alert">
              자료
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#3b6ef7" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </a>`
            : ''
        }
      </div>
      <div class="review-content">${item.content}</div>`;
      container.appendChild(box);
    });
  }

  fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    const container = document.getElementById('uploaded-images');
    container.innerHTML = '';
    if (file) {
      filePath = URL.createObjectURL(file);
      const fileBox = document.createElement('div');
      fileBox.className = 'uploaded-image';
      const fileIcon = document.createElement('div');
      fileIcon.textContent = '📄';
      const fileName = document.createElement('div');
      fileName.textContent = file.name;
      const removeBtn = document.createElement('button');
      removeBtn.className = 'remove-image';
      removeBtn.textContent = '✕';
      removeBtn.onclick = () => {
        fileBox.remove();
        filePath = '';
      };
      fileBox.append(fileIcon, fileName, removeBtn);
      container.appendChild(fileBox);
    }
  });

  function getStarHTML(score) {
    const full = Math.round(score);
    return '★'.repeat(full) + '☆'.repeat(5 - full);
  }

  function showCustomAlert(message) {
    const alertBox = document.getElementById('custom-alert');
    const alertMessage = document.getElementById('custom-alert-message');
    const alertOkBtn = document.getElementById('custom-alert-ok');
    alertMessage.textContent = message;
    alertBox.style.display = 'flex';
    alertOkBtn.onclick = () => {
      alertBox.style.display = 'none';
    };
  }

  document.addEventListener('click', function (e) {
    if (e.target.closest('.show-alert')) {
      setTimeout(() => {
        showCustomAlert('자료가 저장되었습니다.');
      }, 500);
    }
  });

  // bottom nav 홈 버튼 클릭 시 분야에 맞게 이동
  const currentPage = window.location.pathname.split('/').pop();
  document.querySelectorAll('.bottom-nav .nav-item').forEach((item) => {
    const href = item.getAttribute('href');
    if (href === currentPage) item.classList.add('active');

    if (href === 'home.html') {
      item.addEventListener('click', (e) => {
        e.preventDefault();
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        const field = userInfo?.field;
        let targetPage = '/home/home.html';
        switch (field) {
          case '대학원 진학형':
            targetPage = '/home/daehakwon/daehakwon.html';
            break;
          case '빅데이터 분야':
            targetPage = '/home/bigdata/bigdata.html';
            break;
          case 'AI/클라우드 분야':
            targetPage = '/home/ai/ai.html';
            break;
          case '마이크로 전공형':
            targetPage = '/home/micro/micro.html';
            break;
        }
        window.location.href = targetPage;
      });
    }
  });
  console.log('최신 수정 반영 테스트');
});
