import React from "react";
import styled from "styled-components";

const BurgerBtn = styled.button`
  background-color: transparent;
  cursor: pointer;
`;

const HamburgerIcon = styled.svg``;

const BurgerButton = ({ onClick }) => {
  return (
    <BurgerBtn onClick={onClick}>
      <HamburgerIcon
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3 18V16H21V18H3ZM3 13V11H21V13H3ZM3 8V6H21V8H3Z"
          fill="#D9D9D9"
        />
      </HamburgerIcon>
    </BurgerBtn>
  );
};

export default BurgerButton;
