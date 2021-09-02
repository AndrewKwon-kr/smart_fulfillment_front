import React from 'react';
import styled from 'styled-components';
import oc from 'open-color';

const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 500;
  color: ${oc.gray[8]};
  margin-bottom: 1rem;
`;
const AuthWrapper = styled.div`
  margin: 40px auto 0;
  width: 40vw;
`;
const AuthContent = ({ title, children }) => (
  <AuthWrapper>
    <Title>{title}</Title>
    {children}
  </AuthWrapper>
);

export default AuthContent;
