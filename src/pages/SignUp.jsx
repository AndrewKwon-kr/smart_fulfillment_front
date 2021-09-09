import React, { useState } from 'react';
import { AuthContent, InputWithLabel, AuthButton } from 'components/Auth';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  console.log(email);

  const postSignUpForm = () => {
    const data = {};
    data.email = email;
    data.password = password;
    data.confirmPassword = confirmPassword;
    data.userName = userName;
    data.phoneNumber = phoneNumber;

    console.log(data);
  };
  return (
    <AuthContent title="회원가입">
      <InputWithLabel
        label="이메일"
        name="email"
        placeholder="이메일"
        onChange={(e) => setEmail(e.target.value)}
      />

      <InputWithLabel
        label="비밀번호"
        name="password"
        placeholder="비밀번호"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <InputWithLabel
        label="비밀번호 확인"
        name="passwordConfirm"
        placeholder="비밀번호 확인"
        type="password"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <InputWithLabel
        label="이름"
        name="userName"
        placeholder="이름"
        onChange={(e) => setUserName(e.target.value)}
      />
      <InputWithLabel
        label="폰번호"
        name="phoneNumber"
        placeholder="폰번호"
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <AuthButton onClick={() => postSignUpForm()}>회원가입</AuthButton>
    </AuthContent>
  );
}

export default SignUp;
