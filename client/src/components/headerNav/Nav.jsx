import React from "react";
import styled from "styled-components";
import SignInSignOutButton from "./utils/SignInOutBtn";
import HeaderLink from "./utils/HeaderLink";

const HeaderNav = styled.nav`
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
  border: var(--border-primary);
  border-radius: var(--border-radius-primary);
  max-height: fit-content;
  width: 100%;
  padding: 0.5rem;
`;

const Nav = () => {
  return (
    <HeaderNav>
      <HeaderLink to="/home">Home</HeaderLink>
      <HeaderLink to="/notifications">Notifications</HeaderLink>
      <HeaderLink to="/settings">Settings</HeaderLink>
      <HeaderLink to="/profile">Profile</HeaderLink>
      <SignInSignOutButton />
    </HeaderNav>
  );
};

export default Nav;
