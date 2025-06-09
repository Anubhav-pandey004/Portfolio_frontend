import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FancySphere from "../3DModels/FancySphere";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const About = () => {
  return (
    <section className="page pt-16 md:pt-14 About-page px-3 mt-5 flex flex-col lg:flex-row">
      {/* Left Text Content */}
      <div className="bg-transparent flex-1">
        <h1
          id="about-heading"
          opacity={1}
          className="text-5xl md:text-4xl font-logopixies py-7 relative z-10 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
        >
          About me!
        </h1>
        <p
          id="about-text"
          className="font-serif text-sm font-extralight w-full lg:w-[60vw] text-slate-300"
        >
          Hi, I’m Anubhav Pandey, a Full Stack Developer
          based in Mumbai. I specialize in building dynamic,
          user-friendly web applications using the MERN stack and enjoy creating
          smooth, animated user experiences.
          <br />
          <br />
          I’m passionate about exploring new technologies, contributing to
          open-source, and collaborating on innovative projects. Whether it’s
          full-stack development or blockchain integration, I love turning ideas
          into impactful solutions.
        </p>

        {/* Skill Boxes */}
        <section className="flex flex-col md:flex-row md:flex-wrap w-full lg:w-[60vw] gap-4 mt-6">
          <div
            id="test"
            className="hover:scale-105 transition-all font-serif box-item md:h-[11vw] h-[50vw]   flex items-center justify-center md:w-[40%] lg:w-[38%] rounded-lg p-2 text-[#dbacff] border border-[#a738fd] bg-gradient-to-t from-[#0b0311] via-[#260d3a] to-[#3c1958] "
          >
            Skilled in developing full-stack web applications using MongoDB,
            Express.js, React.js, and Node.js with RESTful APIs.
          </div>
          <div  className="hover:scale-105 transition-all font-serif box-item md:h-[11vw] h-[50vw]   flex items-center justify-center md:w-[40%] lg:w-[38%] rounded-lg p-2 text-[#dbacff] border border-[#a738fd] bg-gradient-to-t from-[#0b0311] via-[#260d3a] to-[#3c1958] ">
            Strong command of modern frontend tools including React, Tailwind
            CSS, and responsive UI/UX design principles.
          </div>
          <div  className="hover:scale-105 transition-all font-serif box-item md:h-[11vw] h-[50vw]   flex items-center justify-center md:w-[40%] lg:w-[38%] rounded-lg p-2 text-[#dbacff] border border-[#a738fd] bg-gradient-to-t from-[#0b0311] via-[#260d3a] to-[#3c1958] ">
            Experienced in designing scalable backend architectures, integrating
            databases (MongoDB, MySQL), and handling CRUD operations
            efficiently.
          </div>
          <div  className="hover:scale-105 transition-all font-serif box-item md:h-[11vw] h-[50vw]   flex items-center justify-center md:w-[40%] lg:w-[38%] rounded-lg p-2 text-[#dbacff] border border-[#a738fd] bg-gradient-to-t from-[#0b0311] via-[#260d3a] to-[#3c1958] ">
            Regularly practice data structures and algorithms on platforms like
            LeetCode and Codeforces to sharpen problem-solving and coding logic.
          </div>
        </section>
      </div>

      {/* 3D Model */}
      <div className="w-full lg:w-[40%] mt-10 lg:mt-0 lg:ml-6 bg-transparent hidden lg:block">
        <Canvas camera={{ position: [0, 0, 4] }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <FancySphere />
          <OrbitControls enableZoom={false} />
        </Canvas>
      </div>
    </section>
  );
};

export default About;
