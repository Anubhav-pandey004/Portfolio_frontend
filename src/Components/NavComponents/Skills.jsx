import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const Skills = () => {
  const marqueeERef = useRef([]);
  const marqueeORef = useRef([]);

  useEffect(() => {
    const isMobile = window.innerWidth < 768; // adjust as needed

    if (isMobile) {
      // Mobile default auto-scroll animation
      gsap.to(marqueeERef.current, {
        x: "-500%",
        duration: 15,
        repeat: -1,
        ease: "none",
      });

      gsap.to(marqueeORef.current, {
        x: "-500%",
        duration: 10,
        repeat: -1,
        ease: "none",
      });
    } else {
      // Desktop wheel interaction
      const handleWheel = (e) => {
        const direction = e.deltaY < 0 ? "up" : "down";

        gsap.killTweensOf(marqueeERef.current);
        gsap.to(marqueeERef.current, {
          x: direction === "up" ? "-500%" : "0%",
          duration: direction === "up" ? 5 : 15,
          repeat: -1,
          ease: "none",
          clearProps: "x",
        });

        gsap.killTweensOf(marqueeORef.current);
        gsap.to(marqueeORef.current, {
          x: direction === "up" ? "100%" : "-500%",
          duration: direction === "up" ? 15 : 10,
          repeat: -1,
          ease: "none",
          clearProps: "x",
        });
      };

      window.addEventListener("wheel", handleWheel);
      return () => window.removeEventListener("wheel", handleWheel);
    }
  }, []);

  const skillsData = [
    {
      label: "JavaScript",
      image: "/Skills/javascript.webp",
      type: "e",
      bg: "bg-[#d9ff06]",
      rotate: "rotate-0",
    },
    {
      label: "Python",
      image: "/Skills/python.webp",
      type: "o",
      bg: "bg-[#ecf9a5]",
      rotate: "rotate-2",
    },
    {
      label: "Express",
      image: "/Skills/expressjs.webp",
      type: "e",
      bg: "bg-[#d9ff06]",
      rotate: "-rotate-1",
    },
    {
      label: "Django",
      image: "/Skills/Django.webp",
      type: "o",
      bg: "bg-[#ecf9a5]",
      rotate: "rotate-6",
    },
    {
      label: "NodeJs",
      image: "/Skills/nodejs.webp",
      type: "e",
      bg: "bg-[#d9ff06]",
      rotate: "-rotate-2",
    },
    {
      label: "MongoDb",
      image: "/Skills/mongo.webp",
      type: "o",
      bg: "bg-[#ecf9a5]",
      rotate: "rotate-6",
    },
    {
      label: "ReactJs",
      image: "/Skills/React.webp",
      type: "e",
      bg: "bg-[#d9ff06]",
      rotate: "-rotate-2",
    },
    {
      label: "Tailwind CSS",
      image: "/Skills/Tailwind.webp",
      type: "o",
      bg: "bg-[#ecf9a5]",
      rotate: "rotate-2",
    },
    {
      label: "git",
      image: "/Skills/git.webp",
      type: "e",
      bg: "bg-[#d9ff06]",
      rotate: "-rotate-2",
    },
    {
      label: "GSAP",
      image: "/Skills/gsap.webp",
      type: "o",
      bg: "bg-[#ecf9a5]",
      rotate: "rotate-1",
    },
  ];

  const MarqueeRow = ({ label, image, type, bg, rotate, index }) => {
    const ref = type === "e" ? marqueeERef : marqueeORef;
    return (
      <div
        className={`w-[102vw] ml-[-10px] flex overflow-x-hidden ${bg} mt-6 transform ${rotate}`}
      >
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => (ref.current[index * 30 + i] = el)}
            className={`flex flex-shrink-0 gap-2 items-center p-3 ${
              type === "e" ? "translate-x-[-1000%]" : "translate-x-[0%]"
            }`}
          >
            <h2 className="text-black font-logopixies mr-2">{label}</h2>
            <img
              src={image}
              alt={`${label} Logo`}
              className="md:w-[2vw] h-[6vw] w-[6vw] md:h-[2vw]"
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="Skills-page">
      {skillsData.map((skill, i) => (
        <MarqueeRow key={i} index={i} {...skill} />
      ))}
    </section>
  );
};

export default Skills;
