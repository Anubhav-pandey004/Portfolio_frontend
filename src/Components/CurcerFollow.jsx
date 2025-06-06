
import React, { useEffect, useState } from 'react'
import {gsap} from "gsap"
import { useGSAP } from '@gsap/react'
import { useCursor } from "../Context/CursorContext"; // Import the context
const CurcerFollow = () => {
  const cursorRef = useCursor();

  useEffect(() => {
    const moveCursor = (e) => {
      if (cursorRef.current) {
        gsap.to(cursorRef.current, {
          x: e.clientX - 32,
          y: e.clientY - 32,
          duration: 0,
          ease: "expo.out",
        });
      }
    };

    window.addEventListener("mousemove", moveCursor);
    return () => window.removeEventListener("mousemove", moveCursor);
  }, [cursorRef]);

  return (
    <div
      ref={cursorRef}
      className="md:inline-block hidden cursor fixed rounded-full bg-[radial-gradient(circle,_transparent,_#d3d70095,_#dddf00,_#eeef20)] h-20 w-20 z-30 top-0 pointer-events-none"
    ></div>
  );
};

export default CurcerFollow;