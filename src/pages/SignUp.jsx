import React from 'react';
import styled from 'styled-components';
import Swal from 'sweetalert2';

// import SellhaLogo from '../assets/logo.png';
import { Link } from 'react-router-dom';
import { Button, Checkbox, Form, Input } from 'antd';

import axios from 'axios';

const popUpOptions =
  'top=10, left=10, width=500, height=600, status=no, menubar=no, toolbar=no, resizable=no';
const passRegExp =
  /(?=.*\d{1,24})(?=.*[~`!@#$%^&*()-_+=]{1,24})(?=.*[a-zA-Z]{1,24}).{8,24}$/;

const size = {
  small: '770px',
  medium: '1220px',
  large: '1700px',
};
const colors = {
  primary: '#FFDA4F',
  success: '#20C239',
  warning: '#FACA22',
  danger: '#FF1717',
  white: '#FFFFFF',
  black: '#000000',
  lightGray: '#EBEBEB',
  lineGray: '#F2F2F2',
  gray: '#D9D9D9',
  darkGray: '#7F7F7F',
  lightYellow: '#ffda4f80',
  orange: '#FFC83A',
  blue: '#5278da99',
  green: '#00ae0099',
};
const theme = {
  ...colors,
  colors,
  mobile: `(max-width: ${size.small})`,
  tablet: `(max-width: ${size.medium})`,
  laptop: `(max-width: 1440px)`,
  desktop: `(max-width: ${size.large})`,
};

export default function SignupPage({ history }) {
  const [form] = Form.useForm();
  function checkDuplicateEmail(email) {
    console.log(email);
    return axios
      .post(`${process.env.REACT_APP_URL}/auth/duplicate-email/`, {
        params: { email },
      })
      .then(({ data }) => !!data.isDuplicated);
  }

  function checkDuplicatePhone(phone) {
    return axios
      .post(`${process.env.REACT_APP_URL}/auth/duplicate-phone/`, {
        params: { phone },
      })
      .then(({ data }) => !!data.isDuplicated);
  }

  // member
  function localSignup(signupForm) {
    return axios
      .post(`${process.env.REACT_APP_URL}/auth/users/`, signupForm)
      .then((res) => res.status);
  }

  const handleSignupButton = (values) => {
    const asyncSignup = async () => {
      try {
        const isSignedUp = await localSignup({
          email: values.email,
          password: values.pass1,
          re_password: values.pass2,
          name: values.name,
          phone: values.phone,
        });
        isSignedUp === 201
          ? await Swal.fire(
              {
                icon: 'success',
                title: '회원가입이 완료되었습니다',
                text: '이메일 인증을 진행해주세요',
                confirmButtonColor: theme.colors.primary,
              },
              history.push('/')
            )
          : Swal.fire({
              icon: 'error',
              title: '회원가입을 할 수 없습니다.',
              text: '정보를 다시 한번 확인해 주세요.',
              confirmButtonColor: theme.colors.primary,
            });
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: '회원가입을 할 수 없습니다.',
          text: '정보를 다시 한번 확인해 주세요.',
          confirmButtonColor: theme.colors.primary,
        });
      }
    };
    asyncSignup();
  };

  return (
    <Container>
      {/* <IntroDiv>똑똑한 셀러들이 찾는 아이템 분석 플랫폼</IntroDiv> */}
      {/* <Link to="/">
        <img src={SellhaLogo} alt="셀러하이" width="230px" />
      </Link> */}
      <TitleDiv>회원 가입</TitleDiv>
      <StyledForm onFinish={handleSignupButton} form={form} scrollToFirstError>
        <StyledForm.Item
          name="email"
          rules={[
            {
              type: 'email',
              message: '이메일 형식이 맞지 않습니다',
            },
            {
              required: true,
              message: '이메일을 입력해주세요',
            },
            {
              async validator(_, value) {
                if (form.getFieldError('email').length === 0 && value) {
                  const result = await checkDuplicateEmail(value);

                  if (result) {
                    throw new Error('이미 사용중인 이메일 입니다');
                  }
                }
              },
              validateTrigger: 'onBlur',
            },
          ]}
          validateTrigger={['onBlur']}
        >
          <StyledInput placeholder="이메일" />
        </StyledForm.Item>
        <StyledForm.Item
          name="pass1"
          rules={[
            () => ({
              validator(_, value) {
                if (!value) {
                  return Promise.reject(new Error('비밀번호를 입력해주세요'));
                }

                if (!passRegExp.test(value)) {
                  return Promise.reject(
                    new Error('8~24자 영어, 숫자, 특수문자 포함')
                  );
                }

                return Promise.resolve();
              },
            }),
          ]}
          hasFeedback
        >
          <StyledInput type="password" placeholder="비밀번호" />
        </StyledForm.Item>
        <StyledForm.Item
          name="pass2"
          dependencies={['pass1']}
          hasFeedback
          rules={[
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value) {
                  return Promise.reject(
                    new Error('확인 비밀번호를 입력해주세요')
                  );
                }
                if (getFieldValue('pass1') !== value) {
                  return Promise.reject(
                    new Error('비밀번호가 일치하지 않습니다')
                  );
                }

                return Promise.resolve();
              },
            }),
          ]}
        >
          <StyledInput type="password" placeholder="비밀번호 확인" />
        </StyledForm.Item>
        <StyledForm.Item
          name="name"
          rules={[
            {
              required: true,
              message: '이름을 입력해주세요',
              whitespace: true,
            },
          ]}
        >
          <StyledInput type="text" placeholder="이름" />
        </StyledForm.Item>
        <StyledForm.Item
          name="phone"
          rules={[
            { required: true, message: '휴대폰 번호를 입력해주세요' },
            {
              async validator(_, value) {
                if (form.getFieldError('phone').length === 0 && value) {
                  const result = await checkDuplicatePhone(value);

                  if (result) {
                    throw new Error('이미 사용중인 휴대폰 번호 입니다');
                  }
                }
              },
              validateTrigger: 'onBlur',
            },
          ]}
          validateTrigger={['onBlur']}
        >
          <StyledInput type="tel" placeholder="휴대폰번호" />
        </StyledForm.Item>

        <CheckBoxDiv>
          {/* <StyledForm.Item
            name="serviceAgree"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error('동의 필요')),
              },
            ]}
          >
            <ServiceAgreeCheckbox>
              <StyledAgree
                onClick={() =>
                  window.open('https://sellha.kr/agree', 'window', popUpOptions)
                }
              >
                서비스 제공 동의
              </StyledAgree>
            </ServiceAgreeCheckbox>
          </StyledForm.Item> */}

          <StyledForm.Item
            name="privacyAgree"
            valuePropName="checked"
            rules={[
              {
                validator: (_, value) =>
                  value
                    ? Promise.resolve()
                    : Promise.reject(new Error('동의 필요')),
              },
            ]}
          >
            <PrivacyAgreeCheckbox>
              <StyledAgree
                onClick={() =>
                  window.open(
                    'https://sellha.kr/privacy',
                    'window',
                    popUpOptions
                  )
                }
              >
                개인정보 이용 동의
              </StyledAgree>
            </PrivacyAgreeCheckbox>
          </StyledForm.Item>
        </CheckBoxDiv>

        <StyledForm.Item>
          <SignupButton type="default" htmlType="submit">
            회원 가입
          </SignupButton>
        </StyledForm.Item>
      </StyledForm>

      <Link to="/">
        <ToLoginDiv>로그인 하러 돌아가기</ToLoginDiv>
      </Link>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  margin: auto;
  margin-top: 3em;
  .ant-form-item-explain {
    min-height: 25px;
  }
`;

// const IntroDiv = styled.div`
//   margin: 0.5em 1em;
//   width: fit-content;
//   font-size: 1.1em;
// `;

const TitleDiv = styled.div`
  margin-top: 1em;

  font-size: 1.3em;
  font-weight: bold;
`;

const StyledForm = styled(Form)`
  width: 300px;
  padding: 0.8em;
  margin-top: 2em;
`;

const StyledInput = styled(Input)`
  height: auto;
  padding: 0.8em;
  border: none;
  margin-top: -0.5em;

  border-bottom: 2px solid #000;

  :focus {
    border-bottom: 2px solid #000;
  }
  :hover {
    border-bottom: 2px solid #000;
  }

  font-size: 1em;
`;

const CheckBoxDiv = styled.div`
  display: flex;
  margin-top: -0.5em;
`;

// const ServiceAgreeCheckbox = styled(Checkbox)`
//   margin-left: 0.5em;
// `;

const StyledAgree = styled.div`
  font-size: 0.8em;
`;

const PrivacyAgreeCheckbox = styled(Checkbox)`
  margin-left: 0.5em;
`;

const SignupButton = styled(Button)`
  background-color: #000000;
  padding: 0.7em;
  width: 100%;
  height: 3em;

  color: #fff;
  font-size: 1.1em;
  letter-spacing: 1px;
  :hover {
    background-color: #7f7f7f;
    border: none;
    color: #fff;
  }
  :focus {
    background-color: #7f7f7f;
    border: none;
    color: #fff;
  }
`;
const ToLoginDiv = styled.div`
  margin-top: 2em;
  margin-bottom: 7em;

  color: #7f7f7f;
`;
