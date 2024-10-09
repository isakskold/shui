import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const HeaderItem = styled(Link)``;

const HeaderLink = ({ to, children }) => {
  return <HeaderItem to={to}>{children}</HeaderItem>;
};

export default HeaderLink;
