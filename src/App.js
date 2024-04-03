import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Components/Login";
import Messages from "./Components/Messages";
import Dashboard from "./Components/Dashboard";
import Users from "./Components/Users";
import HelpSection from "./Components/HelpSection";
import { ApiUrlProvider } from "./Components/Context/ApiUrlContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import MessageDetail from "./Components/MessageDetail";
import Modify from "./Components/Modify";

const App = () => {
  return (
    <div className="App">
         <ToastContainer />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/messageDetails" element={<MessageDetail />} />
        <Route path="/users" element={<Users />} />
        <Route path="/modify" element={<Modify />} />
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
