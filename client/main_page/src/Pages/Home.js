import React from "react";
import Intro from "../Home/pages_elements/Intro";
import Services from "../Home/pages_elements/Services";
import Team from "../Home/pages_elements/Team";

export default function Home() {
  return (
    <>
    {(document.title = "ICTC")}
      <div className="banner"></div>
      <Intro />
      <Services />
      <Team />
    </>
  );
}
