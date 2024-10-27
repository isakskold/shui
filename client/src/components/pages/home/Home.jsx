import React from "react";
import styled from "styled-components";
import Sidebar from "./sidebar/Sidebar";
import Feed from "./feed/Feed";
import PageWrapper from "../../utils/PageWrapper";

const Home = () => {
  return (
    <PageWrapper>
      <Feed></Feed>
    </PageWrapper>
  );
};

export default Home;
