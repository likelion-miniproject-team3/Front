document.addEventListener('DOMContentLoaded', function () {
  const requiredContainer = document.getElementById('required-subjects');
  const electiveContainer = document.getElementById('elective-subjects');
  const courseHistoryRequiredContainer = document.getElementById(
    'course-history-required-subjects'
  );
  const courseHistoryElectiveContainer = document.getElementById(
    'course-history-elective-subjects'
  );
  const userNameDisplay = document.getElementById('userNameDisplay');
  const homeBtn = document.getElementById('homeBtn'); // 홈 버튼 추가

  // 사용자 이름 표시
  const userInfoStr = localStorage.getItem('userInfo');

  function toggleCompletion(name) {
    const cleanName = name
      .replace(/<br>/g, ' ')
      .replace(/\n/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    let completed = JSON.parse(
      localStorage.getItem('completedSubjects') || '[]'
    );
    const idx = completed.indexOf(cleanName);
    if (idx > -1) {
      completed.splice(idx, 1); // 해제
    } else {
      completed.push(cleanName); // 등록
    }
    localStorage.setItem('completedSubjects', JSON.stringify(completed));
  }

  function toggleElectiveCourse(name) {
    let selectedElectives = JSON.parse(
      localStorage.getItem('selectedElectives') || '[]'
    );
    const idx = selectedElectives.indexOf(name);
    if (idx > -1) {
      selectedElectives.splice(idx, 1); // 이미 담겼으면 해제
    } else {
      selectedElectives.push(name); // 없으면 담기
    }
    localStorage.setItem(
      'selectedElectives',
      JSON.stringify(selectedElectives)
    );
    renderElectiveSubjects(); // 마이페이지에서 전공 선택 과목을 업데이트
  }

  if (userInfoStr) {
    try {
      const userInfo = JSON.parse(userInfoStr);
      userNameDisplay.textContent = userInfo.username || '이름 없음';
    } catch (e) {
      userNameDisplay.textContent = '이름 없음';
    }
  } else {
    userNameDisplay.textContent = '이름 없음';
  }

  // 수강 완료 과목
  const completedSubjects = JSON.parse(
    localStorage.getItem('completedSubjects') || '[]'
  );
  const userInfo = JSON.parse(userInfoStr || '{}');
  const field = userInfo.field;

  let subjects = [];

  if (field === 'AI/클라우드 분야') {
    subjects = [
      {
        name: '데이터 분석 기초',
        year: 1,
        semester: '1학기·3학점',
        type: 'required',
      },
      {
        name: '인공지능 개론',
        year: 1,
        semester: '1학기·3학점',
        type: 'required',
      },
      {
        name: 'SW/HW \n 플랫폼 설계',
        year: 2,
        semester: '2학기·3학점',
        type: 'required',
      },
      {
        name: '데이터마이닝 \n 및 응용실습',
        year: 3,
        semester: '1학기·3학점',
        type: 'required',
      },
      {
        name: '소프트웨어 공학',
        year: 3,
        semester: '2학기·3학점',
        type: 'required',
      },
      {
        name: 'AI 정보보안',
        year: 3,
        semester: '1학기·3학점',
        type: 'elective',
      },
      {
        name: '데이터 모델 \n 및 시각화',
        year: 3,
        semester: '2학기·3학점',
        type: 'elective',
      },
      {
        name: '의사결정 \n 지원 시스템',
        year: 4,
        semester: '1학기·2학점',
        type: 'elective',
      },
      {
        name: 'BM 프로젝트',
        year: 4,
        semester: '2학기·3학점',
        type: 'elective',
      },
    ];
  } else if (field === '빅데이터 분야') {
    subjects = [
      {
        name: '데이터 분석 기초',
        year: 1,
        semester: '1학기·3학점',
        type: 'required',
      },
      {
        name: '인공지능 개론',
        year: 1,
        semester: '1학기·3학점',
        type: 'required',
      },
      {
        name: '프로그래밍 기초',
        year: 2,
        semester: '1학기·2학점',
        type: 'required',
      },
      {
        name: '인공지능 수학',
        year: 2,
        semester: '1학기·3학점',
        type: 'required',
      },
      {
        name: 'SW/HW \n 플랫폼 설계',
        year: 2,
        semester: '2학기·3학점',
        type: 'required',
      },
      {
        name: '통계실무',
        year: 2,
        semester: '2학기·3학점',
        type: 'required',
      },
      {
        name: '운영체제',
        year: 2,
        semester: '2학기·3학점',
        type: 'elective',
      },
      {
        name: '데이터 사이언스',
        year: 2,
        semester: '1학기·3학점',
        type: 'elective',
      },
      {
        name: '빅데이터 처리',
        year: 2,
        semester: '2학기·3학점',
        type: 'elective',
      },
      {
        name: '데이터마이닝 \n 및 응용실습',
        year: 3,
        semester: '1학기·3학점',
        type: 'required',
      },
      {
        name: '소프트웨어 공학',
        year: 3,
        semester: '2학기·3학점',
        type: 'required',
      },
      {
        name: 'AI 정보보안',
        year: 3,
        semester: '1학기·3학점',
        type: 'elective',
      },
      {
        name: '데이터 모델 \n 및 시각화',
        year: 3,
        semester: '2학기·3학점',
        type: 'elective',
      },
      {
        name: '의사결정 \n 지원 시스템',
        year: 4,
        semester: '1학기·2학점',
        type: 'elective',
      },
      {
        name: 'BM 프로젝트',
        year: 4,
        semester: '2학기·3학점',
        type: 'elective',
      },
    ];
  } else if (field === '대학원 진학형') {
    subjects = [
      {
        name: '데이터 분석 기초',
        year: 1,
        semester: '1학기·3학점',
        type: 'required',
      },
      {
        name: '인공지능 개론',
        year: 1,
        semester: '1학기·3학점',
        type: 'required',
      },
      {
        name: '객체지향 프로그램',
        year: 1,
        semester: '1학기·3학점',
        type: 'elective',
      },
      {
        name: '미적분학',
        year: 1,
        semester: '1학기·3학점',
        type: 'elective',
      },
      {
        name: '프로그래밍 기초',
        year: 2,
        semester: '1학기·2학점',
        type: 'required',
      },
      {
        name: '통계기초',
        year: 2,
        semester: '1학기·3학점',
        type: 'required',
      },
      {
        name: '인공지능 수학',
        year: 2,
        semester: '1학기·3학점',
        type: 'required',
      },
      {
        name: 'SW/HW \n 플랫폼 설계',
        year: 2,
        semester: '2학기·3학점',
        type: 'required',
      },
      {
        name: '통계실무',
        year: 2,
        semester: '2학기·3학점',
        type: 'required',
      },
      {
        name: '인공지능 \n 프로그램',
        year: 2,
        semester: '2학기·2학점',
        type: 'required',
      },
      {
        name: '운영체제',
        year: 2,
        semester: '1학기·3학점',
        type: 'elective',
      },
      {
        name: '데이터 사이언스',
        year: 2,
        semester: '1학기·3학점',
        type: 'elective',
      },
      {
        name: '빅데이터 처리',
        year: 2,
        semester: '2학기·3학점',
        type: 'elective',
      },
      {
        name: '인공지능 플랫폼 \n 설계',
        year: 3,
        semester: '1학기·3학점',
        type: 'required',
      },
      {
        name: '데이터마이닝 \n 및 응용실습',
        year: 3,
        semester: '1학기·3학점',
        type: 'required',
      },
      {
        name: '소프트웨어 공학',
        year: 3,
        semester: '2학기·3학점',
        type: 'required',
      },
      {
        name: '클라우드 컴퓨팅',
        year: 3,
        semester: '1학기·3학점',
        type: 'elective',
      },
      {
        name: 'AI 정보보안',
        year: 3,
        semester: '1학기·3학점',
        type: 'elective',
      },
      {
        name: '딥러닝',
        year: 3,
        semester: '1학기·3학점',
        type: 'elective',
      },
      {
        name: '정밀의료',
        year: 3,
        semester: '1학기·3학점',
        type: 'elective',
      },
      {
        name: '멀티모달 학습',
        year: 3,
        semester: '1학기·3학점',
        type: 'elective',
      },
      {
        name: '의료 DB 설계',
        year: 3,
        semester: '1학기·3학점',
        type: 'elective',
      },
      {
        name: '자료구조',
        year: 3,
        semester: '2학기·3학점',
        type: 'elective',
      },
      {
        name: '데이터 모델  \n 및 시각화',
        year: 3,
        semester: '2학기·3학점',
        type: 'elective',
      },
      {
        name: '자동화 이론',
        year: 3,
        semester: '2학기·3학점',
        type: 'elective',
      },
      {
        name: '알고리즘 분석',
        year: 3,
        semester: '2학기·3학점',
        type: 'elective',
      },
      {
        name: '의료 전문가 \n 시스템',
        year: 3,
        semester: '2학기·3학점',
        type: 'elective',
      },
      {
        name: '의사결정 \n 지원 시스템',
        year: 4,
        semester: '1학기·2학점',
        type: 'elective',
      },
      {
        name: 'BM 프로젝트',
        year: 4,
        semester: '2학기·3학점',
        type: 'elective',
      },
      {
        name: '졸업논문',
        year: 4,
        semester: '1학기·P/NP',
        type: 'required',
      },
    ];
  } else if (field === '마이크로 전공형') {
    subjects = [
      {
        name: '인공지능 개론',
        year: 1,
        semester: '1학기·3학점',
        type: 'required',
      },
      {
        name: '프로그래밍 기초',
        year: 2,
        semester: '1학기·2학점',
        type: 'required',
      },
      {
        name: '통계 기초',
        year: 2,
        semester: '1학기·3학점',
        type: 'required',
      },
      {
        name: '인공지능 수학',
        year: 2,
        semester: '1학기·3학점',
        type: 'required',
      },
      {
        name: 'SW/HW \n 플랫폼 설계',
        year: 2,
        semester: '2학기·3학점',
        type: 'required',
      },
      {
        name: '데이터마이닝 \n 및 응용실습',
        year: 3,
        semester: '1학기·3학점',
        type: 'required',
      },
      {
        name: '인공지능 플랫폼 \n 설계',
        year: 3,
        semester: '1학기·3학점',
        type: 'required',
      },
      {
        name: '딥러닝',
        year: 3,
        semester: '1학기·3학점',
        type: 'elective',
      },
      {
        name: '멀티모달 학습',
        year: 3,
        semester: '1학기·3학점',
        type: 'elective',
      },
    ];
  }

  function renderSubjects(year) {
    requiredContainer.innerHTML = '';
    electiveContainer.innerHTML = '';

    const filtered = subjects.filter((sub) => sub.year === year);

    filtered.forEach((sub) => {
      const cleanSubName = sub.name
        .replace(/<br>/g, ' ')
        .replace(/\n/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      const currentCompleted = JSON.parse(
        localStorage.getItem('completedSubjects') || '[]'
      );
      const isCompleted = currentCompleted.includes(cleanSubName);

      const isElectiveSelected = JSON.parse(
        localStorage.getItem('selectedElectives') || '[]'
      ).includes(sub.name);
      const card = document.createElement('div');
      card.className = 'subject-card';
      card.classList.add(
        sub.type === 'required' ? 'required-card' : 'elective-card'
      );

      card.innerHTML = `
        <div class="subject-header">
          <button class="goto-home-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#fff" viewBox="0 0 24 24" class="goto-arrow">
              <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z" />
            </svg>
          </button>
        </div>
        <div class="subject-info">
          <div class="subject-name">${sub.name.replace(/\n/g, '<br>')}</div>
          <div class="subject-semester">${sub.semester}</div>
          <div class="subject-buttons">
            <button class="complete-btn ${isCompleted ? 'selected' : ''}">
              ✔ 수강완료
            </button>
            ${sub.type === 'elective' ? '' : ''} <!-- 담기 버튼을 제거 -->
          </div>
        </div>
      `;

      const completeBtn = card.querySelector('.complete-btn');
      completeBtn.addEventListener('click', () => {
        toggleCompletion(sub.name);
        completeBtn.classList.toggle('selected');
        updateProgressCircle();
        renderSubjects(sub.year); // 즉시 갱신
        renderCourseHistory(sub.year); // 즉시 갱신
      });

      const gotoBtn = card.querySelector('.goto-home-button');
      gotoBtn.addEventListener('click', () => {
        const cleanName = sub.name
          .replace(/<br>/g, ' ')
          .replace(/\n/g, ' ')
          .replace(/\s+/g, '')
          .trim();
        localStorage.setItem('highlightSubject', cleanName);
        localStorage.setItem('highlightYear', sub.year);

        let targetPage = '/home/home.html'; // 기본

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
          default:
            targetPage = '/home/home.html';
        }

        window.location.href = targetPage;
      });

      if (sub.type === 'required') {
        requiredContainer.appendChild(card);
      } else {
        const savedElectives = JSON.parse(
          localStorage.getItem('savedElectives') || '[]'
        );
        const cleanSubName = sub.name
          .replace(/<br>/g, ' ')
          .replace(/\n/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
        if (savedElectives.includes(cleanSubName)) {
          electiveContainer.appendChild(card);
        }
      }
    });
  }

  function renderElectiveSubjectsOnMypage() {
    const electiveContainer = document.getElementById('elective-subjects');
    electiveContainer.innerHTML = '';

    const savedElectives = JSON.parse(
      localStorage.getItem('savedElectives') || '[]'
    );

    savedElectives.forEach((subjectName) => {
      const subject = subjects.find((sub) => {
        const cleanSubName = sub.name
          .replace(/<br>/g, ' ')
          .replace(/\n/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
        return cleanSubName === subjectName;
      });

      if (subject) {
        const card = document.createElement('div');
        card.className = 'subject-card elective-card';
        card.innerHTML = `
          <div class="subject-info">
            <div class="subject-name">
              ${subject.name.replace(/\n/g, '<br>')}
            </div>
            <div class="subject-semester">${subject.semester}</div>
            <div class="subject-buttons">
              <button class="complete-btn">✔ 수강완료</button>
            </div>
          </div>
        `;
        electiveContainer.appendChild(card);
      }
    });
  }

  // 페이지 로드 시 전공 선택 과목을 불러오기
  document.addEventListener('DOMContentLoaded', function () {
    renderElectiveSubjectsOnMypage();
  });

  function renderCourseHistory(year) {
    courseHistoryRequiredContainer.innerHTML = '';
    courseHistoryElectiveContainer.innerHTML = '';

    const filtered = subjects.filter((sub) => sub.year === year);

    filtered.forEach((sub) => {
      const cleanSubName = sub.name
        .replace(/<br>/g, ' ')
        .replace(/\n/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();

      const currentCompleted = JSON.parse(
        localStorage.getItem('completedSubjects') || '[]'
      );
      const isCompleted = currentCompleted.includes(cleanSubName);

      if (!isCompleted) return; // 수강완료되지 않은 과목은 스킵

      const card = document.createElement('div');
      card.className = 'subject-card';
      card.classList.add(
        sub.type === 'required' ? 'required-card' : 'elective-card'
      );

      card.innerHTML = `
      <div class="subject-header">
        <button class="goto-home-button">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="#fff" viewBox="0 0 24 24" class="goto-arrow">
            <path d="M8.59 16.59 13.17 12 8.59 7.41 10 6l6 6-6 6z" />
          </svg>
        </button>
      </div>
      <div class="subject-info">
        <div class="subject-name">${sub.name.replace(/\n/g, '<br>')}</div>
        <div class="subject-semester">${sub.semester}</div>
        <div class="subject-buttons">
          <button class="review-btn">수강평 작성</button>
        </div>
      </div>
    `;

      // 변경된 클래스명 review-btn에 대한 이벤트 리스너 연결
      const reviewBtn = card.querySelector('.review-btn');
      reviewBtn.addEventListener('click', () => {
        localStorage.setItem(
          'selectedSubjectForReview',
          JSON.stringify({
            subject: cleanSubName,
            mode: 'lectureWrite',
          })
        );
        window.location.href = '/review/review.html';
      });

      const gotoBtn = card.querySelector('.goto-home-button');
      gotoBtn.addEventListener('click', () => {
        const cleanName = sub.name
          .replace(/<br>/g, ' ')
          .replace(/\n/g, ' ')
          .replace(/\s+/g, '')
          .trim();
        localStorage.setItem('highlightSubject', cleanName);
        localStorage.setItem('highlightYear', sub.year);

        let targetPage = '/home/home.html'; // 기본
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
          default:
            targetPage = '/home/home.html';
        }

        window.location.href = targetPage;
      });

      if (sub.type === 'required') {
        courseHistoryRequiredContainer.appendChild(card);
      } else {
        courseHistoryElectiveContainer.appendChild(card);
      }
    });
  }

  function updateProgressCircle() {
    const completedSubjects = JSON.parse(
      localStorage.getItem('completedSubjects') || '[]'
    );
    const totalScore = completedSubjects.reduce((acc, name) => {
      const s = subjects.find((x) => x.name === name);
      return s ? acc + extractCredit(s.semester) : acc;
    }, 0);
    const percent = Math.min(Math.round((totalScore / 70) * 100), 100);
    const lack = Math.max(70 - totalScore, 0);

    document.querySelector('.percent').textContent = `${percent}%`;
    document.getElementById(
      'progressMessage'
    ).innerHTML = `전공학점, ${percent}% 달성🎉<br>조금만 더 힘내요!`;
    document.getElementById('getScore').textContent = totalScore;
    document.getElementById('lackScore').textContent = lack;
    document.querySelector(
      '.progress-circle'
    ).style.background = `conic-gradient(#d6e1f9 0% ${
      100 - percent
    }%, #3a66e6 ${100 - percent}% 100%)`;
  }

  function extractCredit(semesterStr) {
    const match = semesterStr.match(/(\d+)학점/);
    return match ? parseInt(match[1], 10) : 0;
  }

  // 학년별 버튼 클릭 시 과목 렌더링
  document
    .querySelectorAll('.curriculum-year-buttons button')
    .forEach((btn) => {
      btn.addEventListener('click', () => {
        const year = parseInt(btn.value, 10);
        renderSubjects(year);
        document
          .querySelectorAll('.curriculum-year-buttons button')
          .forEach((b) => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });

  // 수강내역 표시 버튼 클릭 시 과목 렌더링
  document
    .querySelectorAll('.course-history-year-buttons button')
    .forEach((btn) => {
      btn.addEventListener('click', () => {
        const year = parseInt(btn.value, 10);
        renderCourseHistory(year);
        document
          .querySelectorAll('.course-history-year-buttons button')
          .forEach((b) => b.classList.remove('selected'));
        btn.classList.add('selected');
      });
    });

  // 페이지 로드 시 기본 1학년 표시
  renderSubjects(1);
  renderCourseHistory(1);
  document
    .querySelector('.curriculum-year-buttons button[value="1"]')
    .classList.add('selected');
  document
    .querySelector('.course-history-year-buttons button[value="1"]')
    .classList.add('selected');
  updateProgressCircle();

  // 홈 버튼 클릭 시 진로에 맞는 페이지로 이동
  if (homeBtn) {
    homeBtn.addEventListener('click', function (e) {
      e.preventDefault(); // 기본 동작 방지

      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
        const field = userInfo.field;

        let targetPage = '/home/home.html'; // 기본 페이지
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
          default:
            targetPage = '/home/home.html'; // 기본 페이지 설정
            break;
        }
        window.location.href = targetPage; // 진로에 맞는 페이지로 이동
      } catch (e) {
        console.error('userInfo 파싱 오류:', e);
        window.location.href = '/home/home.html'; // 오류가 발생한 경우 기본 페이지로 이동
      }
    });
  }
});
