import React from "react";
import { IoLogoGithub } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const Fotter = () => {
  return (
    <div className=" z-30 md:mb-10 scroll-container text-white   p-6 flex md:flex-row gap-3 flex-col items-center justify-around">
      <div className="flex flex-col items-start text-gray-500 ">
        <p className="text-[#6b3a61db] mb-3 md:text-lg text-sm italic ">Crafting cool code and slick UIs — one pixel at a time.</p>©{" "}
        {new Date().getFullYear()} Anubhav Pandey. All rights reserved.
      </div>
      <div className="flex gap-4 text-2xl text-gray-500">
        <IoLogoGithub 
        onClick={() => window.open("https://github.com/Anubhav-pandey004")}
        className="hover:text-white transition-all cursor-pointer"/>
        <FaLinkedin 
        onClick={() => window.open("https://www.linkedin.com/in/anubhav-pandey-21b5442a3")}
        className="hover:text-[#0a66c2] transition-all cursor-pointer"/>
        <FaTwitter 
        onClick={() => window.open("https://x.com/Eng_Anubhav")}
        className="hover:text-[#36D8FF] cursor-pointer transition-all "/>
      </div>
    </div>
  );
};

export default Fotter;
