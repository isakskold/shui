import React from "react";
import styled from "styled-components";

const PageWrapperStyled = styled.div`
  padding-top: 100px;
  padding-bottom: 100px;
  min-height: 100vh;
`;

const PageWrapper = ({ children }) => {
  return <PageWrapperStyled>{children}</PageWrapperStyled>;
};

export default PageWrapper;
