
import { useLocation, useNavigate } from "react-router-dom";
import { MdOutlineArrowOutward } from "react-icons/md";
import { FaTerminal } from "react-icons/fa";
import { IoLogoGithub } from "react-icons/io";

const AboutProject = () => {
  const location = useLocation();
  const project = location.state?.projectData;
  const navigate = useNavigate();


  return (
    // <div className="scroll-container text-white min-h-screen w-screen  fixed top-0 overflow-auto">

    <div className="scroll-container mb-20 text-white bg-black fixed top-0 overflow-x-hidden h-screen w-screen overflow-auto">
      <header className="absolute px-6 py-4 top-0 left-0 w-full h-16  z-20">
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
      <section className="mt-20 mx-auto relative z-10 w-[80vw] py-16 items-start rounded-xl flex flex-col p-6 bg-[#1d082a]">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-[#d2a4ee]">
          {project?.title || "Project Title"}
        </h1>
        <p className="text-[#fdc700] font-mono font-semibold ">
          {project?.technologies}
        </p>

        <div className="flex items-center gap-4 mt-4">
          {/* View Live Project Button */}
          {
            project?.link && <button
            className="relative overflow-hidden group py-2 px-4 rounded-lg font-semibold text-black bg-white flex gap-2 items-center transition-all my-7"
            onClick={() => {
              window.open(project?.link, "_blank");
            }}
          >
            <span className="absolute -inset-3 rounded-full bg-[#fccb1b] scale-0 group-hover:scale-150 origin-top-left transition-transform duration-700 ease-out z-0" />
            <span className="relative z-10 flex gap-2 items-center">
              View Live Project <MdOutlineArrowOutward />
            </span>
          </button>
          }
          

          {/* GitHub Icon with Animation */}
          <button
            onClick={() => window.open(project?.github, "_blank")}
            className="relative group rounded-full p-2 transition-all overflow-hidden"
          >
            <span className="absolute -inset-3 rounded-full bg-[#fccb1b] scale-0 group-hover:scale-100 origin-top-left transition-transform duration-700 ease-out z-0" />
            <IoLogoGithub className="relative z-10 text-5xl text-white group-hover:text-black transition-colors duration-300" />
          </button>
        </div>

        <div className="w-[95%] h-[1px] bg-[#5d5d5d]"></div>
        <p className="text-lg mb-4 text-gray-300 mt-10">
          {project?.desc ||
            "This is a placeholder description for the project. It will be replaced with actual content."}
        </p>

        {project?.imageArray.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Project Image ${index + 1}`}
            className="object-contain w-[90%] mx-auto rounded-lg mb-4"
          />
        ))}
      </section>
      <div className="p-6 mt-10"></div>
      {/* SVG Noise Pattern */}
      <svg
        className=" fixed top-0 left-0 w-full h-[300vh] z-0 pointer-events-none"
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
          [#531a76] via-[#1d082a] to-[#000000]
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#000000" />
            <stop offset="40%" stopColor="#531a76" />
            <stop offset="50%" stopColor="#531a76" />
            <stop offset="100%" stopColor="#000000" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#bgGradient)" />

        {/* Apply noise on top */}
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

export default AboutProject;
