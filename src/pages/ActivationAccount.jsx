import React, { useEffect } from 'react';

function ActivationAccount() {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = '/';
    }, 2000);
  });
  return (
    <div style={{ margin: 40, fontSize: 20 }}>
      이메일 인증이 완료되었습니다. 새로 로그인 해주세요.
    </div>
  );
}

export default ActivationAccount;
