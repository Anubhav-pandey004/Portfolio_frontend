import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useCursor } from "../Context/CursorContext";

const WarpRealityButton = ({ mainpage , slider , setShowParticles , setloader }) => {
  const loadingPercentage = useRef()
  const cursorRef = useCursor();

  useEffect(() => {
    const botText = document.querySelector(".button-text");
    const textArr = botText.innerText.split("");

    botText.innerHTML = ""; // Clear original text

    textArr.forEach((char) => {
      let span = document.createElement("span");
      span.classList.add("letter");
      span.innerText = char;
      botText.appendChild(span);
    });
  }, []);

  const handleMouseEnter = () => {
    gsap.from(".button", {
      opacity: 0.5,
      duration: 0.3,
    });
  };
  const handleMouseOver = () =>{
    if (cursorRef.current) {
      gsap.to(cursorRef.current, { scale: 0.6, duration: 0.3 });
      cursorRef.current.classList.add("cursor-dark");
    }
  }
  const handleMouseLeave = ()=>{
    handleMouseEnter()
    gsap.to(cursorRef.current, { scale: 1, duration: 0.3 });
    cursorRef.current.classList.remove("cursor-dark");
  }

  const slidePage = () => {

    let tl = gsap.timeline();

    tl.to(".letter", {
      x: 250,
      opacity: 0, // Fade out
      stagger: 0.02, // Adds delay between each letter
      duration: 0.3,
    }, 0)
      .to(".button", {
        width: "0%", // Shrinks button from left to right
        duration: 1.5,
        ease: "power2.out",
        transformOrigin: "left",
      }, 0)
      .to(mainpage.current, {
        x: -1000,
        opacity: 0,
        duration: 1,
        onComplete:()=>{
          setShowParticles(false);
        }
      }, 0)
      .to(slider.current, {
        // left: "-70.5vw", // Move loading window into view
        left:0,
        duration: 4,
        ease: "power2.out",
        onUpdate: function () {
          let progress = this.progress() * 100; // Convert 0-1 to 0-100%
          loadingPercentage.current.innerHTML = `${progress.toFixed(0)}%`;
          }
      })
      .to([slider.current, loadingPercentage.current,".text1",".text2",".text-box"],{
        y: -1500,
        duration: 1,
        onComplete: function () {
          loadingPercentage.current.innerHTML = `100%`;
          slider.current.style.display = "none"; 
          loadingPercentage.current.display="none"
          setloader(true);
        }
      })
      tl.to(".text1", {
        opacity: 1,
        y: 20,  // Moves text slightly down
          // Slight rotation for a dynamic effect
        duration: 1,
        ease: "elastic.out(1, 0.5)", // Bouncy wave effect
        stagger: 0.08 // Delay for a wave-like effect
    }, "-=4.4")
    .to(".text1",{
      delay:1,
      rotate: 5,
      duration:0.1
    },"-=4.4")
    .to(".text2", {
        opacity: 1,
        x:10,
        y: 20,  // Moves text slightly up
        duration: 1,
        ease: "elastic.out(1, 0.5)",
        stagger: 0.08
    }, "-=4.4");
    
      
  };

  return (
    <div
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 h-full w-full flex flex-col "
    >
      <button
        className="button absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 font-semibold font-mono sm:w-[35vw] sm:h-[6vw] w-[80vw] h-[15vw] md:w-[20vw] md:h-[3vw] text-lg text-[#fde8fa] bg-[#a73fe8] hover:bg-gradient-to-r from-[#6a0dad] via-[#a73fe8] to-[#d883fc]  z-40 animate-shimmer bg-[length:200%_100%] overflow-hidden"
        onClick={slidePage}
        onMouseEnter={handleMouseEnter}
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        <span className="button-text">Warp Reality</span>
      </button>
      <div className="h-full w-full flex flex-col justify-end items-end gap-60">
      <div className="text-box h-fit text-slate-800 w-full flex justify-center items-center flex-col">
      <p className="text1 font-mono text-lg md:text-3xl font-semibold opacity-0 text-nowrap">Welcome to My Digital Space!</p>
      <p className="text2 font-light text-lg opacity-0">where code meets creativity!</p>
      </div>
      
      <section ref={loadingPercentage} className="w-full flex justify-end items-end  text-white mix-blend-difference font-bold md:text-7xl text-5xl md:mb-0 mb-11  z-60 font-mono"
      style={{
        color: "#312244", // Default white text
        mixBlendMode: "difference", // Changes color when overlapping
      }}>
      </section>
      </div>
    </div>
  );
};

export default WarpRealityButton;
