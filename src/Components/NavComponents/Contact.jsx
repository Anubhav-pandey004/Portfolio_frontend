import React, { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaTerminal } from "react-icons/fa";
import SummaryApi from "../../common";
import { useState } from "react";
import Loader from "./Loader";
import { useNavigate } from "react-router-dom";
import { IoLogoGithub } from "react-icons/io";
import { FaLinkedin } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false); // State to manage loading status
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    const { email, subject, message } = data; // Destructure the form data
    try {
      setLoading(true); // Set loading to true when request starts
      const response = await fetch(SummaryApi.sendEmail.url, {
        method: SummaryApi.sendEmail.method, // Assuming this is POST or your preferred HTTP method
        credentials: "include", // To include credentials like cookies if necessary
        body: JSON.stringify({ email, subject, message }), // Send data (email, subject, and message)
        headers: {
          "Content-Type": "application/json", // Set the content type to JSON
        },
      });
      const data = await response.json(); // Parse the JSON response from the backend
      console.log(data);

      if (data.success) {
      } else {
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false); // Set loading to false when request is complete
    }
    reset();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationFrameId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resize);
    resize();

    const dotCount = 60;
    const dots = Array.from({ length: dotCount }, () => {
      const radius = Math.random() * 2 + 1;
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height + 200,
        baseRadius: radius,
        radius,
        dx: (Math.random() - 0.5) * 1.5,
        dy: (Math.random() - 0.5) * 1.5,
        phase: Math.random() * Math.PI * 2,
      };
    });

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      dots.forEach((dot) => {
        dot.phase += 0.05;
        dot.radius = dot.baseRadius + Math.sin(dot.phase) * 1;
        dot.x += dot.dx;
        dot.y += dot.dy;
        if (dot.x < 0 || dot.x > canvas.width) dot.dx *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.dy *= -1;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#e600ff";
        ctx.shadowColor = "#ff00c8";
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="scroll-container z-20 flex-col justify-center items-center mb-20 fixed top-0 overflow-x-hidden h-screen w-screen overflow-auto">
      <header className="absolute px-6 py-4 top-0 left-0 w-full h-16 z-40">
        <h1
          className="font-bold cursor-pointer text-white flex items-center gap-1"
          onClick={() => {
            navigate("/");
          }}
        >
          <FaTerminal />
          Anubhav Pandey
        </h1>
      </header>

      {/* Main Form Section */}
      <main className="z-30 md:max-h-[95vh]  scroll-container backdrop-blur-sm text-white fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 overflow-hidden border border-[#5d5d5d] rounded-xl md:w-[40vw] w-[80vw] p-6 flex flex-col items-center justify-center">
        <h2 className="text-2xl md:text-4xl font-logopixies py-3 md:py-7 relative z-10 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
          Let's Connect
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-lg flex flex-col gap-6 text-black"
        >
          <input
            type="text"
            placeholder="Your Name"
            {...register("name", { required: true })}
            className="p-3 rounded-lg w-full bg-white bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#e600ff]"
          />
          <input
            type="email"
            placeholder="Your Email"
            {...register("email", { required: true })}
            className="p-3 rounded-lg w-full bg-white bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#e600ff]"
          />
          <input
            type="text"
            placeholder="Subject"
            {...register("subject", { required: true })}
            className="p-3 rounded-lg w-full bg-white bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-[#e600ff]"
          />
          <textarea
            placeholder="Your Message"
            rows="5"
            {...register("message", { required: true })}
            className="p-3 rounded-lg w-full bg-white bg-opacity-90 resize-none focus:outline-none focus:ring-2 focus:ring-[#e600ff]"
          />
          <button
            type="submit"
            disabled={loading}
            className={`bg-[#e600ff] hover:bg-[#ff00c8] text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? <Loader /> : "CAST YOUR MESSAGE"}
          </button>
        </form>
        <div className="flex items-center w-full my-6">
          <hr className="flex-grow border-t border-gray-500" />
          <span className="mx-4 text-gray-400">or</span>
          <hr className="flex-grow border-t border-gray-500" />
        </div>
        <div className="flex gap-4 text-3xl text-gray-500">
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
      </main>

      {/* Canvas and SVG */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-20"
      />
      <svg
        className="fixed top-0 left-0 w-full h-[300vh] z-0 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
      >
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.8"
            numOctaves="4"
            stitchTiles="stitch"
          />
        </filter>
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#000000" />
            <stop offset="40%" stopColor="#531a76" />
            <stop offset="50%" stopColor="#531a76" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#bgGradient)" />
        <rect
          width="100%"
          height="100%"
          filter="url(#noiseFilter)"
          opacity="0.3"
        />
      </svg>
    </div>
  );
};

export default AnimatedBackground;
