document.addEventListener('DOMContentLoaded', function () {
  // 사용자 정보 불러오기
  const userInfoStr = localStorage.getItem('userInfo');

  if (userInfoStr) {
    try {
      const userInfo = JSON.parse(userInfoStr);
      document.getElementById('nickname').value = userInfo.usernickname || '';
      document.getElementById('studentNumber').value =
        userInfo.usernumber || '';
      document.getElementById('email').value = userInfo.useremail || '';
    } catch (e) {
      console.error('사용자 정보 불러오기 실패:', e);
    }
  }

  // 닉네임 저장 버튼 클릭 이벤트
  const saveBtn = document.querySelector('.save-button');
  if (saveBtn) {
    saveBtn.addEventListener('click', function () {
      const updatedNickname = document.getElementById('nickname').value;

      try {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        userInfo.usernickname = updatedNickname;
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        alert('닉네임이 성공적으로 수정되었습니다!');
      } catch (e) {
        alert('저장 중 오류가 발생했습니다.');
      }
    });
  }

  // 사진 버튼 팝업 토글
  const cameraBtn = document.querySelector('.camera-btn');
  const uploadOptions = document.getElementById('uploadOptions');

  if (cameraBtn && uploadOptions) {
    cameraBtn.addEventListener('click', function (e) {
      e.stopPropagation(); // 이벤트 버블링 막기
      uploadOptions.classList.toggle('hidden');
    });

    // 외부 클릭 시 팝업 닫기
    document.addEventListener('click', function (e) {
      if (!uploadOptions.contains(e.target) && !cameraBtn.contains(e.target)) {
        uploadOptions.classList.add('hidden');
      }
    });
  }
});
