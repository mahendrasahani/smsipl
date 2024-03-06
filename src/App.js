import React from "react";
import { BrowserRouter, Route, Routes} from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import Messages from "./Components/Messages";
import MessageDetail from "./Components/MessageDetail";
import Dashboard from "./Components/Dashboard";
import Modify from "./Components/Modify";


const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/messageDetails" element={<MessageDetail />} />
        <Route path="/modify" element={<Modify/>} />
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
