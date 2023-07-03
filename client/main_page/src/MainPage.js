import React from "react";
//page elements
import Navbar from "./Home/pages_elements/Navbar";
import Next from "./Pages/Next";

//Routes
import Gallery from "./Pages/Gallery";
import Events from "./Pages/Events.js";
import Reservations from "./Pages/Reservations";
import Contact from "./Pages/contact";
import Home from "./Pages/Home";
import Login from "./Pages/Login";

import { Route, Routes } from "react-router-dom";
import Footer from "./Home/pages_elements/Footer";
import DetailEvents from "./Pages/DetailEvents";
import ServicesFront from "./Pages/ServicesFront";

function MainPage() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route exact path="" element={<Home />} />
        <Route exact path="/gallery" element={<Gallery />} />
        <Route exact path="/events" element={<Events />} />
        <Route exact path="/Reservations" element={<Reservations />} />
        <Route exact path="/contact" element={<Contact />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/next" element={<Next />} />
        <Route path="/empdetails/:id" element={<DetailEvents />}></Route>
        <Route exact path="/servicefront" element={<ServicesFront />} />
      </Routes>
      <Footer />
    </>
  );
}

export default MainPage;
