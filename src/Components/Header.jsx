import { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import gsap from "gsap";
import { FaTerminal } from "react-icons/fa";
import { MdOutlineArrowOutward } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const underlineRef = useRef(null);
  const menuItemsRef = useRef([]);
  const navigate = useNavigate();

  const menuItems = [
    { name: "Home", className: ".Home-page" },
    { name: "About", className: ".About-page" },
    { name: "Skills", className: ".Skills-page" },
    { name: "Projects", className: ".Projects-page" },
  ];
  useEffect(() => {
    const container = document.querySelector(".scroll-container"); // or use a prop to pass ref
    if (!container) return;

    const handleScroll = () => {
      const offsets = menuItems.map((item) => {
        const section = document.querySelector(item.className);
        if (!section) return Infinity;
        return Math.abs(section.getBoundingClientRect().top);
      });

      const closestIndex = offsets.indexOf(Math.min(...offsets));
      setActiveIndex(closestIndex);
    };

    container.addEventListener("scroll", handleScroll);

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []); // run once

  useEffect(() => {
    if (menuItemsRef.current[activeIndex] && underlineRef.current) {
      const { offsetLeft, offsetWidth } = menuItemsRef.current[activeIndex];
      gsap.to(underlineRef.current, {
        duration: 0.3,
        left: offsetLeft,
        width: offsetWidth,
        ease: "power3.out",
      });
    }
  }, [activeIndex]); // ✅ just for animation

  return (
    <header className="fixed top-0 w-full backdrop-blur-lg flex justify-between items-center px-6 py-4 bg-transparent z-50">
      {/* Logo */}
      <h1
        className="font-bold cursor-pointer text-white flex items-center gap-1"
        onClick={() => {
          document.querySelector(".scroll-container")?.scrollTo({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        <FaTerminal />
        Anubhav Pandey
      </h1>

      {/* Desktop Menu */}
      <nav className="hidden  md:flex gap-10 relative text-white font-semibold">
        {menuItems.map((item, index) => (
          <a
            key={index}
            ref={(el) => (menuItemsRef.current[index] = el)}
            className={`hover:text-purple-400 text-sm text-slate-300 relative cursor-pointer`}
            onClick={() => {
              setActiveIndex(index);
              setIsOpen(false);
              const section = document.querySelector(item.className);
              section.scrollIntoView({ block: "start", behavior: "smooth" });
            }}
          >
            {item.name}
          </a>
        ))}
        <button
          className="relative -top-2 overflow-hidden group py-2 px-4 rounded-lg font-semibold text-black bg-white flex gap-2 items-center transition-all"
          onClick={() => {
            navigate("/contact");
          }}
        >
          <span className="absolute -inset-3 rounded-full bg-[#fccb1b] scale-0 group-hover:scale-150 origin-top-left transition-transform duration-700 ease-out z-0" />
          <span className="relative z-10 flex gap-2 items-center">
            Contact <MdOutlineArrowOutward />
          </span>
        </button>
        {/* Underline Animation */}
        <div
          ref={underlineRef}
          className="absolute bottom-0 h-[1px] rounded-lg bg-purple-400 transition-all duration-300"
          style={{ width: "0px", left: "0px" }}
        />
      </nav>

      {/* Burger Menu - Mobile */}
      <button
        className="md:hidden text-white focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="fixed inset-0 bg-black h-screen bg-opacity-90 flex flex-col items-center justify-center space-y-6 text-2xl text-white">
          <button
            className="absolute top-5 right-5"
            onClick={() => setIsOpen(false)}
          >
            <FaTimes size={35} />
          </button>
          {menuItems.map((item, index) => (
            <a
              key={index}
              onClick={() => {
                setIsOpen(false);
                const section = document.querySelector(item.className);
                section.scrollIntoView({ block: "start", behavior: "smooth" });
              }}
              className="cursor-pointer"
            >
              {item.name}
            </a>
          ))}
          <button
          className="relative -top-2 overflow-hidden group py-2 px-4 rounded-lg font-semibold text-black bg-white flex gap-2 items-center transition-all"
          onClick={() => {
            navigate("/contact");
          }}
        >
          <span className="absolute -inset-3 rounded-full bg-[#fccb1b] scale-0 group-hover:scale-150 origin-top-left transition-transform duration-700 ease-out z-0" />
          <span className="relative z-10 flex gap-2 items-center">
            Contact <MdOutlineArrowOutward />
          </span>
        </button>
        </div>
      )}
    </header>
  );
};

export default Header;
