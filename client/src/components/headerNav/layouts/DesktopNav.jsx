import React from "react";
import styled from "styled-components";
import SignInSignOutButton from "../utils/SignInOutBtn";
import HeaderLink from "../utils/HeaderLink";
import Searchbar from "../utils/searchbar/Searchbar";

const HeaderNav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 70px;
  background-color: black;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 3rem;
  border: var(--border-primary);
  border-radius: var(--border-radius-primary);
  padding: 0.5rem;

  a:nth-child(1) {
    margin-right: auto;
  }

  button {
    white-space: nowrap; /* Prevents text wrapping */
    flex-shrink: 0; /* Prevents button from shrinking */
  }

  form {
    margin-right: auto;
    min-width: 10rem;
  }
`;

const DesktopNav = () => {
  return (
    <HeaderNav>
      <HeaderLink to="/home">Logo</HeaderLink>
      <Searchbar></Searchbar>
      <HeaderLink to="/notifications">Noti</HeaderLink>
      <HeaderLink to="/settings">Setti</HeaderLink>
      <HeaderLink to="/profile">Profi</HeaderLink>
      <SignInSignOutButton />
    </HeaderNav>
  );
};

export default DesktopNav;
