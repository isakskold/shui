import React from "react";
import "./globalStyles.css";
import { Route, Routes } from "react-router-dom";
import Home from "./routes/Home";
import AuthComponent from "./routes/AmplifyUI";
import Nav from "./components/headerNav/Nav";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthComponent />} /> {/* Amplify UI */}
      </Routes>
    </div>
  );
}

export default App;
