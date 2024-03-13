import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import Messages from "./Components/Messages";
import MessageDetail from "./Components/MessageDetail";
import Dashboard from "./Components/Dashboard";
import Modify from "./Components/Modify";
import Users from "./Components/Users";
import HelpSection from "./Components/HelpSection";


const App = () => {
 
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/messageDetails" element={<MessageDetail />} />
        <Route path="/users" element={<Users/>} />
        <Route path="/modify" element={<Modify/>} />
        <Route path="/help" element={<HelpSection/>} />
      </Routes>
    </div>
  );
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
};

export default AppRouter;
