import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { Suspense, useEffect, useRef, useState } from "react";
import Robot from "./Robot";
import Header from "./Header";
import { Canvas } from "@react-three/fiber";
import { useGLTF, Environment } from "@react-three/drei";
import About from "./NavComponents/About";
import FirstCompo from "./NavComponents/FirstCompo";
import Skills from "./NavComponents/Skills";
import Projects from "./NavComponents/Projects";
import Experience from "./NavComponents/Experience";
import Contact from "./NavComponents/Contact";
import Fotter from "./NavComponents/Fotter";

gsap.registerPlugin(ScrollTrigger);

const Dashboard = () => {
  const pageRef = useRef(null);

  return (
    <div
      ref={pageRef}
      //here scroll-container is used to make your container scrollable
      className="scroll-container text-white fixed top-0 overflow-x-hidden h-screen w-screen overflow-auto"
    >
      <Header />
      <div className="flex bg-gradient-to-b from-[#531a76] via-[#1d082a] to-[#000000] flex-col lg:flex-row-reverse justify-center md:items-center">
        <Robot />
        <FirstCompo />
      </div>
      {/* About Page */}

      <section
        id="page"
        className="page2 md:h-screen h-[190vh]  w-screen bg-gradient-to-b from-[] "
      >
        <About pageRef={pageRef} />
      </section>
      <section
        id="page"
        className="page2 md:h-[115vh] h-[156vh] w-screen bg-gradient-to-b from-[]"
      >
        <Skills pageRef={pageRef} />
      </section>
      <section
        id="page"
        className="page2  md:h-[320vh] h-[420vh] w-screen bg-gradient-to-b from-[]"
      >
        <Projects pageRef={pageRef} />
      </section>
       <section>
        <Fotter/>
      </section>
     
    </div>
  );
};

export default Dashboard;
