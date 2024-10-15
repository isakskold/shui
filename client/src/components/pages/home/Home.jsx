import React from "react";
import Nav from "../../headerNav/layouts/DesktopNav";
import Sidebar from "./sidebar/Sidebar";
import Feed from "./feed/Feed";

const Home = () => {
  return (
    <div>
      <Sidebar></Sidebar>
      <Feed></Feed>
    </div>
  );
};

export default Home;
