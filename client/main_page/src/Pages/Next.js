import React from "react";
import "./style.css";
import qr from "./qr.png";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Next() {
  const redirect = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      redirect("/login");
    }
  }, []);
  return (
    <center>
      <img class="qrimage" src={qr} alt="qr" />
    </center>
  );
}
