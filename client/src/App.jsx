import React from "react";
import "./globalStyles.css";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import Homev2 from "./components/pages/home/Home";
import AuthComponent from "./routes/AmplifyUI";
import Profile from "./components/pages/profile/Profile";
import Settings from "./components/pages/settings/Settings";
import Notifications from "./components/pages/notifications/Notifications";
import Nav from "./components/headerNav/Nav";

function App() {
  return (
    <>
      <Nav></Nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Homev2 />} />
        <Route path="/login" element={<AuthComponent />} /> {/* Amplify UI */}
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/notifications" element={<Notifications />} />
      </Routes>
    </>
  );
}

export default App;
