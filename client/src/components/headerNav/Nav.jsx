import React from "react";
import styled from "styled-components";
import SignInSignOutButton from "./utils/SignInOutBtn";

const HeaderNav = styled.nav`
  max-height: fit-content;
  width: 100%;
`;

const Nav = () => {
  return (
    <HeaderNav>
      <SignInSignOutButton />
    </HeaderNav>
  );
};

export default Nav;
