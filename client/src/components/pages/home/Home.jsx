import React from "react";
import Nav from "../../headerNav/Nav";
import Sidebar from "./sidebar/Sidebar";
import Feed from "./feed/Feed";

const Home = () => {
  return (
    <div>
      <Nav></Nav>
      <Sidebar></Sidebar>
      <Feed></Feed>
    </div>
  );
};

export default Home;
