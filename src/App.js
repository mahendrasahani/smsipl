import React, { Suspense, lazy } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import Messages from "./Components/Messages";
import Dashboard from "./Components/Dashboard";
import Users from "./Components/Users";
import HelpSection from "./Components/HelpSection";
import { ApiUrlProvider } from "./Components/Context/ApiUrlContext";
import Loading from "./Components/reusable/Loading";

const MessageDetail = lazy(() => import("./Components/MessageDetail"));
const Modify = lazy(() => import("./Components/Modify"));

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/messageDetails" element={<Suspense fallback={<Loading/>}>
            <MessageDetail />
          </Suspense>} />
        <Route path="/users" element={<Users />} />
        <Route path="/modify" element={<Suspense fallback={<Loading/>}>
            <Modify />
          </Suspense>} />
        <Route path="/help" element={<HelpSection />} />
      </Routes>
    </div>
  );
};

const AppRouter = () => {
  return (
    <BrowserRouter>
      <ApiUrlProvider>
        <App />
      </ApiUrlProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
