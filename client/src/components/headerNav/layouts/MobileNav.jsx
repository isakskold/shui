import React, { useEffect, useState } from "react";
import styled from "styled-components";
import SignInSignOutButton from "../utils/SignInOutBtn";
import HeaderLink from "../utils/HeaderLink";
import useBurgerStore from "../../../hooks/nav/useBurgerStore";
import useMenuStore from "../../../hooks/nav/useMenuStore";
import BurgerButton from "../utils/BurgerBtn";
import MobileMenu from "../utils/MobileMenu";

const HamburgerIcon = styled.svg`
  cursor: pointer; /* Add pointer cursor to indicate it's clickable */
  position: relative;
`;

const MobileHeaderNav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 70px;
  background-color: black;
  display: flex;
  justify-content: space-between;
  padding: 0.5rem;
`;

const MobileNav = () => {
  const isBurger = useBurgerStore((state) => state.isBurger);
  const setBurger = useBurgerStore((state) => state.setBurger);
  const isMenu = useMenuStore((state) => state.isMenu);
  const setMenu = useMenuStore((state) => state.setMenu);

  const toggleBurger = () => {
    setBurger(!isBurger); // Toggle burger visibility
    setMenu(!isMenu); // Toggle menu visibility
  };

  return (
    <MobileHeaderNav>
      <BurgerButton onClick={toggleBurger}>
        <HamburgerIcon width="24" height="24" viewBox="0 0 24 24">
          {/* Add SVG paths here to make the icon visible */}
          <path
            d="M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 8H21V6H3V8Z"
            fill="#D9D9D9"
          />
        </HamburgerIcon>
      </BurgerButton>

      <MobileMenu></MobileMenu>
      <SignInSignOutButton />
    </MobileHeaderNav>
  );
};

export default MobileNav;
