document.addEventListener('DOMContentLoaded', () => {
  const step1 = document.getElementById('step1');
  const step2 = document.getElementById('step2');
  const step3 = document.getElementById('step3');
  const step4 = document.getElementById('step4');

  const next1 = document.getElementById('next1');
  const next2 = document.getElementById('next2');
  const next3 = document.getElementById('next3');
  const submitBtn = document.getElementById('submit');

  const usernameError = document.getElementById('username-error');
  const usernicknameError = document.getElementById('usernickname-error');
  const useremailError = document.getElementById('useremail-error');
  const usernumberError = document.getElementById('usernumber-error');
  const useridError = document.getElementById('userid-error');
  const passwordError = document.getElementById('password-error');
  const fieldError = document.getElementById('field-error');
  const passwordCheckError = document.getElementById('password-check-error');

  const selectedField = document.getElementById('selected-field');
  const selectedFieldText = document.getElementById('selected-field-text');
  const fieldOptions = document.getElementById('field-options');
  const fieldArrow = document.getElementById('field-dropdown-arrow');

  const fillBar = document.querySelector('.fill');
  const baseUrl = 'https://majorapp.live';

  function setError(input, errorDiv, message) {
    errorDiv.textContent = message;
    errorDiv.classList.add('active');

    input.previousElementSibling.style.color = '#e74c3c'; // 라벨 빨강

    if (input.tagName === 'SELECT') {
      input.classList.add('error'); // select 박스 빨간 테두리
    } else {
      input.style.borderBottomColor = '#e74c3c'; // 인풋 밑줄 빨강
    }
  }

  function showStep(stepIndex) {
    const steps = document.querySelectorAll('.step');
    steps.forEach((step, index) => {
      if (index === stepIndex) {
        step.classList.add('active');
      } else {
        step.classList.remove('active');
      }
    });

    const progressWidths = ['25%', '50%', '75%', '100%'];
    const fillBar = document.querySelector('.fill');
    fillBar.style.width = progressWidths[stepIndex];
  }

  function clearError(input, errorDiv) {
    errorDiv.textContent = '';
    errorDiv.classList.remove('active');
    input.previousElementSibling.style.color = '#3b6ef7'; // 라벨 파랑
    input.style.borderBottomColor = '#3b6ef7'; // 밑줄 파랑
  }

  function clearAllError(input, errorDiv) {
    errorDiv.textContent = '';
    errorDiv.classList.remove('active');
    input.previousElementSibling.style.color = '#aaa';

    if (input.tagName === 'SELECT') {
      input.classList.remove('error'); // 테두리 원래대로
    } else {
      input.style.borderBottomColor = '#ccc';
    }
  }

  function validateStep1() {
    let valid = true;

    const usernameInput = document.getElementById('username');
    const usernicknameInput = document.getElementById('usernickname');
    const useremailInput = document.getElementById('useremail');
    const usernumberInput = document.getElementById('usernumber');

    const username = usernameInput.value.trim();
    const usernickname = usernicknameInput.value.trim();
    const useremail = useremailInput.value.trim();
    const usernumber = usernumberInput.value.trim();

    // 초기화
    [usernameInput, usernicknameInput, useremailInput, usernumberInput].forEach(
      (input) => {
        const errorDiv = input.nextElementSibling;
        clearAllError(input, errorDiv);
      }
    );

    if (username === '') {
      setError(usernameInput, usernameError, '이름을 다시 확인해주세요');
      valid = false;
    }
    if (usernickname === '') {
      setError(
        usernicknameInput,
        usernicknameError,
        '닉네임을 다시 확인해주세요'
      );
      valid = false;
    } else if (usernickname.length > 10) {
      setError(
        usernicknameInput,
        usernicknameError,
        '닉네임은 10글자 이내로 입력해주세요'
      );
      valid = false;
    }
    if (useremail === '') {
      setError(useremailInput, useremailError, '이메일을 다시 확인해주세요');
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(useremail)) {
      setError(useremailInput, useremailError, '유효한 이메일 형식이 아닙니다');
      valid = false;
    }
    if (usernumber === '') {
      setError(usernumberInput, usernumberError, '학번을 다시 확인해주세요');
      valid = false;
    }

    return valid;
  }

  function validateStep2() {
    const useridInput = document.getElementById('userid');
    const userid = useridInput.value.trim();

    clearAllError(useridInput, useridError);

    if (userid === '') {
      setError(useridInput, useridError, '아이디를 다시 확인해주세요');
      return false;
    }
    return true;
  }

  function validateStep3() {
    const passwordInput = document.getElementById('password');
    const passwordCheckInput = document.getElementById('password-check');

    const password = passwordInput.value.trim();
    const passwordCheck = passwordCheckInput.value.trim();

    clearAllError(passwordInput, passwordError);
    clearAllError(passwordCheckInput, passwordCheckError);

    let valid = true;

    if (password === '') {
      setError(passwordInput, passwordError, '비밀번호를 다시 확인해주세요');
      valid = false;
    } else if (password.length < 8) {
      setError(
        passwordInput,
        passwordError,
        '비밀번호는 8자 이상이어야 합니다'
      );
      valid = false;
    }

    if (passwordCheck === '') {
      setError(
        passwordCheckInput,
        passwordCheckError,
        '비밀번호를 다시 확인해주세요'
      );
      valid = false;
    } else if (password !== passwordCheck) {
      setError(
        passwordCheckInput,
        passwordCheckError,
        '비밀번호가 일치하지 않습니다'
      );
      valid = false;
    }

    return valid;
  }

  function validateStep4() {
    const field = selectedFieldText.textContent.trim();
    const errorDiv = document.getElementById('field-error');
    const selectBox = document.querySelector('.custom-select');

    // 에러 초기화
    // clearAllError(fieldInput, fieldError);

    errorDiv.textContent = '';
    errorDiv.classList.remove('active');
    selectBox.classList.remove('error');

    if (field === '선택') {
      errorDiv.textContent = '희망 분야를 다시 확인해주세요.';
      errorDiv.classList.add('active');
      selectBox.classList.add('error');
      return false;
    }

    // 이전 단계에서 입력한 모든 정보 수집
    const username = document.getElementById('username').value.trim();
    const usernickname = document.getElementById('usernickname').value.trim();
    const useremail = document.getElementById('useremail').value.trim();
    const usernumber = document.getElementById('usernumber').value.trim();
    const userid = document.getElementById('userid').value.trim();
    const password = document.getElementById('password').value.trim();

    const userData = {
      username,
      usernickname,
      useremail,
      usernumber,
      userid,
      password,
      field,
      tempId: data.tempId,
    };

    // 로컬스토리지에 저장
    localStorage.setItem('userInfo', JSON.stringify(userData));

    return true;
  }

  // 입력 상태에 따라 라벨, 밑줄, 입력 글자 색 조정 + 에러 메시지 자동 제거
  document.querySelectorAll('input, select').forEach((el) => {
    const label = el.previousElementSibling;
    const errorDiv =
      el.nextElementSibling &&
      el.nextElementSibling.classList.contains('error-message')
        ? el.nextElementSibling
        : null;

    function updateStyle() {
      if (el.value.trim() !== '') {
        label.style.color = '#3b6ef7'; // 파란색 라벨
        el.style.color = 'black'; // 입력 텍스트 검정
        el.style.borderBottomColor = '#3b6ef7'; // 파란 밑줄
        if (errorDiv) {
          errorDiv.textContent = '';
          errorDiv.classList.remove('active');
        }
      } else {
        label.style.color = '#aaa'; // 기본 라벨색
        el.style.color = '#aaa'; // placeholder 색
        el.style.borderBottomColor = '#ccc'; // 기본 밑줄색
        if (errorDiv) {
          errorDiv.textContent = '';
          errorDiv.classList.remove('active');
        }
      }
    }

    el.addEventListener('input', updateStyle);

    el.addEventListener('focus', () => {
      if (el.classList.contains('error')) {
        // 오류 상태면 라벨 빨간색 유지
        el.previousElementSibling.style.color = '#e74c3c';
        if (el.tagName !== 'SELECT') {
          el.style.borderBottomColor = '#e74c3c'; // input 밑줄 빨강
        }
      } else {
        // 오류 아니면 평소대로 파란색
        el.previousElementSibling.style.color = '#3b6ef7';
        if (el.tagName !== 'SELECT') {
          el.style.borderBottomColor = '#3b6ef7';
        }
      }
    });

    el.addEventListener('blur', () => {
      if (el.value.trim() === '') {
        label.style.color = '#aaa';
        el.style.color = '#aaa';
        el.style.borderBottomColor = '#ccc';
      }
    });

    updateStyle(); // 초기 스타일 적용
  });

  // 단계별 버튼 이벤트 및 진행바 width 조정
  next1.addEventListener('click', () => {
    if (validateStep1()) {
      // step1.classList.remove('active');
      // step2.classList.add('active');
      // fillBar.style.width = '50%'; // 1단계 → 2단계
      showStep(1);
    }
  });

  // next2.addEventListener('click', () => {
  //   if (validateStep2()) {
  //     // step2.classList.remove('active');
  //     // step3.classList.add('active');
  //     // fillBar.style.width = '75%'; // 2단계 → 3단계
  //     showStep(2);
  //   }
  // });
  next2.addEventListener('click', async () => {
    if (validateStep2()) {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const tempId = userInfo?.tempId;
      const username = document.getElementById('userid').value.trim();

      // 🔍 콘솔로 확인
      console.log('2단계 요청값:', tempId, username);

      try {
        const res = await fetch(`${baseUrl}/api/auth/register/step2`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            tempId,
            username,
          }),
        });

        const data = await res.json();

        if (!res.ok || data.success === false) {
          alert('2단계 등록 실패:\n' + JSON.stringify(data));
          return;
        }

        // 성공했으면 다음 단계로 넘어가
        showStep(2); // 2 → 3단계로 전환
      } catch (err) {
        alert('2단계 등록 실패: ' + err.message);
      }
    }
  });

  next3.addEventListener('click', () => {
    if (validateStep3()) {
      // step3.classList.remove('active');
      // step4.classList.add('active');
      // fillBar.style.width = '100%'; // 3단계 → 4단계
      showStep(3);
    }
  });

  submitBtn.addEventListener('click', async () => {
    if (!validateStep4()) return;

    //  HEAD:FRONT-END/signup.js
    const field = selectedFieldText.textContent.trim();
    console.log('선택된 분야:', field); // ✅ 추가

    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const tempId = userInfo?.tempId;

      const majorMap = {
        '대학원 진학형': 1,
        '빅데이터 분야': 2,
        'AI/클라우드 분야': 3,
        '마이크로 전공형': 4,
      };

      const majorId = majorMap[field];

      const res = await fetch(`${baseUrl}/api/auth/register/step4`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tempId,
          majorId,
        }),
      });

      if (!res.ok) {
        const errorText = await res.text(); // ❗️서버 에러 메시지 확인
        throw new Error('4단계 등록 실패: ' + errorText);
      }
      let redirectPage = '/home/home.html'; // 기본값

      switch (field) {
        case '대학원 진학형':
          redirectPage = location.origin + '/home/daehakwon/daehakwon.html';
          break;
        case '빅데이터 분야':
          redirectPage = location.origin + '/home/bigdata/bigdata.html';
          break;
        case 'AI/클라우드 분야':
          redirectPage = location.origin + '/home/ai/ai.html';
          break;
        case '마이크로 전공형':
          redirectPage = location.origin + '/home/micro/micro.html';
          break;
        // >>>>>>> 7abb00215ca7ed08cc53b2e9dec4d96a2ff71a5a:signup/signup.js
      }

      console.log('서버 응답 성공! confetti 실행');

      // 여기부터가 화면 전환 부분
      document.querySelector('.top-bar').style.display = 'none';
      document.querySelectorAll('.step').forEach((el) => {
        el.style.display = 'none';
      });

      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#3b6ef7', '#f7c948', '#e74c3c'],
      });

      const container = document.createElement('div');
      container.classList.add('welcome-container');

      const h2 = document.createElement('h2');
      h2.textContent = '반가워요 !';
      h2.classList.add('welcome-title');
      container.appendChild(h2);

      const p = document.createElement('p');
      p.innerHTML = '마이페이지에서<br>프로필 등록을 해주세요';
      p.classList.add('welcome-message');
      container.appendChild(p);

      const confirmBtn = document.createElement('button');
      confirmBtn.textContent = '확인';
      confirmBtn.classList.add('confirm-button');
      confirmBtn.addEventListener('click', () => {
        window.location.href = redirectPage;
      });

      document.body.appendChild(container);
      document.body.appendChild(confirmBtn);
    } catch (err) {
      alert(err.message); // ❗️실패 사유 표시
    }
  });

  // 드롭다운 열기/닫기
  selectedField.addEventListener('click', () => {
    const isOpen = fieldOptions.style.display === 'block';
    fieldOptions.style.display = isOpen ? 'none' : 'block';
    fieldArrow.classList.toggle('rotate', !isOpen);
  });

  fieldOptions.querySelectorAll('li').forEach((li) => {
    li.addEventListener('click', () => {
      // 기존 선택 해제
      fieldOptions
        .querySelectorAll('li')
        .forEach((item) => item.classList.remove('selected'));
      li.classList.add('selected');

      // 선택된 텍스트 변경
      const text = li.querySelector('.option-text').textContent;
      selectedFieldText.textContent = text;
      selectedFieldText.style.color = '#3b6ef7';

      // 드롭다운 닫기
      fieldOptions.style.display = 'none';
      fieldArrow.classList.remove('rotate');

      // ✅ 오류 상태 초기화
      document.getElementById('field-error').textContent = '';
      document.getElementById('field-error').classList.remove('active');
      document.getElementById('custom-field-select').classList.remove('error');
    });
  });

  document.addEventListener('click', (e) => {
    if (!document.getElementById('custom-field-select').contains(e.target)) {
      fieldOptions.style.display = 'none';
      fieldArrow.classList.remove('rotate');
    }
  });
  document.querySelectorAll('.field-info-header').forEach((header) => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      item.classList.toggle('active');
    });
  });
  const step1Inputs = [
    document.getElementById('username'),
    document.getElementById('usernickname'),
    document.getElementById('useremail'),
    document.getElementById('usernumber'),
  ];
  const nextBtn1 = document.getElementById('next1');

  step1Inputs.forEach((input) => {
    input.addEventListener('input', () => {
      const allFilled = step1Inputs.every((inp) => inp.value.trim() !== '');
      if (allFilled) {
        nextBtn1.classList.add('active');
      } else {
        nextBtn1.classList.remove('active');
      }
    });
  });

  nextBtn1.addEventListener('click', async () => {
    const username = step1Inputs[0].value.trim();
    const usernickname = step1Inputs[1].value.trim();
    const useremail = step1Inputs[2].value.trim();
    const usernumber = step1Inputs[3].value.trim();

    try {
      const res = await fetch(`${baseUrl}/api/auth/register/step1`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          nickname: usernickname,
          email: useremail,
          studentNumber: usernumber,
        }),
      });

      const text = await res.text(); // 먼저 읽음
      console.log('서버 응답:', text);

      // 여기서 에러 처리 먼저
      if (!res.ok) {
        alert('1단계 등록 실패: ' + text);
        return;
      }

      // JSON 파싱
      // let data;
      // try {
      //   data = JSON.parse(text);
      // } catch (e) {
      //   console.error('JSON 파싱 실패:', e);
      //   alert('서버 응답이 JSON이 아닙니다.');
      //   return;
      // }

      // const tempId = data.tempId;

      const tempId = text.replace(/"/g, '');

      const userData = {
        username,
        nickname: usernickname,
        email: useremail,
        studentNumber: usernumber,
        tempId,
      };
      localStorage.setItem('userInfo', JSON.stringify(userData));

      // 다음 단계로 이동
      showStep(1);
    } catch (err) {
      alert('요청 중 에러 발생: ' + err.message);
    }
  });

  const useridInput = document.getElementById('userid');
  const nextBtn2 = document.getElementById('next2');

  useridInput.addEventListener('input', () => {
    if (useridInput.value.trim() !== '') {
      nextBtn2.classList.add('active');
    } else {
      nextBtn2.classList.remove('active');
    }
  });

  nextBtn2.addEventListener('click', async () => {
    const username = useridInput.value.trim(); // userId → username

    if (!validateStep2()) return;

    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const tempId = userInfo?.tempId;

    try {
      const res = await fetch(`${baseUrl}/api/auth/register/step2`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ tempId, username }), // ✅ 서버 요구 형식
      });

      const text = await res.text();
      console.log('서버 응답 원문:', text);

      if (!res.ok) throw new Error('2단계 등록 실패: ' + text);

      // 응답 본문이 있는 경우에만 JSON 파싱 시도
      if (text?.trim()) {
        try {
          const data = JSON.parse(text);
          console.log('파싱된 응답:', data);
        } catch (e) {
          console.error('JSON 파싱 실패:', e);
          alert('2단계 응답이 JSON 형식이 아닙니다.');
          return;
        }
      } else {
        console.log('빈 응답: JSON 파싱 생략');
      }

      showStep(2); // 성공 시 3단계로 이동
    } catch (err) {
      alert(err.message);
    }
  });

  const passwordInput = document.getElementById('password');
  const passwordCheckInput = document.getElementById('password-check');
  const nextBtn3 = document.getElementById('next3');

  function validatePasswords() {
    const password = passwordInput.value.trim();
    const passwordCheck = passwordCheckInput.value.trim();

    if (password.length >= 8 && password === passwordCheck) {
      nextBtn3.classList.add('active');
    } else {
      nextBtn3.classList.remove('active');
    }
  }

  nextBtn3.addEventListener('click', async () => {
    const password = passwordInput.value.trim();
    const passwordCheck = passwordCheckInput.value.trim();

    if (!validateStep3()) return;

    try {
      const userInfo = JSON.parse(localStorage.getItem('userInfo'));
      const tempId = userInfo?.tempId;

      const res = await fetch(`${baseUrl}/api/auth/register/step3`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tempId,
          password,
          confirmPassword: passwordCheck,
        }),
      });

      if (!res.ok) throw new Error('3단계 등록 실패');

      showStep(3);
    } catch (err) {
      alert(err.message);
    }
  });

  passwordInput.addEventListener('input', validatePasswords);
  passwordCheckInput.addEventListener('input', validatePasswords);
  const fieldSelect = document.getElementById('selected-field-text');

  function checkFieldSelected() {
    const selectedText = fieldSelect.textContent.trim();
    if (selectedText !== '선택') {
      submitBtn.classList.add('active');
    } else {
      submitBtn.classList.remove('active');
    }
  }

  // 옵션 선택될 때마다 실행되도록 각 li에 이벤트 추가
  document.querySelectorAll('#field-options li').forEach((li) => {
    li.addEventListener('click', () => {
      checkFieldSelected();
    });
  });
  console.log('최신 수정 반영 테스트');
});
