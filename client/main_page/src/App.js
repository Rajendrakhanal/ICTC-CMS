// import logo from './logo.svg';
import "./App.css";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./MainPage";
import PostState from "./context/post/PostState";
import PageContent from "./components/PageContent";
import Login from "./components/Login";

export default function App() {
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <PostState>
          <Router>
            <Routes>
              <Route path="*" element={<MainPage />} />
              <Route path="/admin/login" element={<Login />} />
              <Route path="/admin/*" element={<PageContent />} />
            </Routes>
          </Router>
        </PostState>
      </LocalizationProvider>
    </>
  );
}
