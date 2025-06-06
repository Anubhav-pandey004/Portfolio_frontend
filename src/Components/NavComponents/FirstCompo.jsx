import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";

const FirstCompo = () => {
  const jobRoles = [
    "A Full Stack Developer",
    "A Frontend Developer",
    "A Backend Developer",
  ];
  const navigate = useNavigate();
  const textRef = useRef(null);

  useEffect(() => {
    let currentIndex = 0;
    const textElement = textRef.current;

    const typeAnimation = () => {
      const text = jobRoles[currentIndex];
      let i = 0;

      gsap.to(textElement, { opacity: 1, duration: 0.3 });

      const typeInterval = setInterval(() => {
        textElement.innerHTML = text.slice(0, i);
        i++;

        if (i > text.length) {
          clearInterval(typeInterval);
          setTimeout(() => deleteAnimation(text), 1000); // Pause before deleting
        }
      }, 100);
    };
    const deleteAnimation = (text) => {
      let i = text.length;

      const deleteInterval = setInterval(() => {
        if (textRef.current) {
          textRef.current.innerHTML = text.slice(0, i);
        }
        i--;

        if (i < 0) {
          clearInterval(deleteInterval);
          currentIndex = (currentIndex + 1) % jobRoles.length; // Switch to next job role
          setTimeout(typeAnimation, 300); // Pause before typing next
        }
      }, 50);
    };
    typeAnimation();
  }, []);

  useEffect(() => {
    const arrow = document.querySelector(".arrow");
    const tl = gsap.timeline();
    tl.to(arrow, {
      y: 10,
      duration: 1,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });
  }, []);
  return (
    <section className="Home-page absolute top-[55%] lg:top-[30%]  lg:h-[70vh] w-fit left-1 pointer-events-none">
      <span className="px-3 text-3xl md:text-4xl font-logopixies flex flex-col">
        <span className="text-[#bc60f6]">Hi, I'm </span>
        <h1 className="text-5xl md:text-7xl font-extrabold drop-shadow-[4px_4px_10px_#441164] text-[#7624a9]">
          Anubhav Pandey
        </h1>
      </span>
      <span className=" px-3w-screen h-10 mt-7 flex ">
        <p
          ref={textRef}
          className="px-3 text-xl md:text-3xl font-logopixies text-[#bc60f6]"
        ></p>
      </span>
      <section className="w-screen flex justify-center mt-5 md:mt-10 gap-7 pointer-events-auto">
        <button
          className="bg-[#9f43d8] text-[#e6c9f8] hover:scale-105 hover:drop-shadow-[4px_4px_10px_#441164] transition-all font-semibold px-7 py-4 rounded-md"
          onClick={() => {
            navigate("/contact");
          }}
        >
          Contact me
        </button>
        <button
        onClick={() => {
          window.open(
            "https://drive.google.com/file/d/1NaxO9wJGWp1IEHVkr9_peu46pUUee4ru/view?usp=sharing",
            "_blank"
          );
        }}
         className="border border-[#9f43d8] text-[#e6c9f8] hover:scale-105 hover:drop-shadow-[4px_4px_10px_#441164] transition-all font-semibold px-7 py-4 rounded-md">
          Resume
        </button>
      </section>
      <button
        onClick={() => {
          const section = document.querySelector(".About-page");
          section.scrollIntoView({ block: "end", behavior: "smooth" });
          // section1.scrollIntoView({block: 'end', behavior: 'smooth' });
        }}
        className="arrow  backdrop-blur-sm text-[#e6c9f8] lg:mt-40  font-semibold text-xl pointer-events-auto px-3 py-3 rounded-full absolute left-1/2  transform -translate-x-1/2 md:mt-4 "
      >
        <IoIosArrowDown />
      </button>
    </section>
  );
};

export default FirstCompo;
