import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderItem = styled(Link)`
  display: block;
  height: 100%;
  width: 100%;
`;

const HeaderLink = ({ className, to, children }) => {
  return (
    <HeaderItem className={className} to={to}>
      {children}
    </HeaderItem>
  );
};

export default HeaderLink;
