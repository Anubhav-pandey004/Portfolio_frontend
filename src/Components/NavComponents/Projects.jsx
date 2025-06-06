import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocation, useNavigate } from "react-router-dom";

const Projects = () => {
  const projectsRef = useRef([]);
  const navigate = useNavigate();

  const projects = [
    {
      title: "AI Agent for web-Development",
      desc: "Built an AI-powered web development assistant that generates full-stack MERN projects from natural language prompts. Integrated features like enhanced prompt handling, local project saving, and real-time AI interaction using Web-Sockets.",
      link: "https://ai-webdeveloper-frontend.onrender.com/",
      image: "/Projects/pro1_img.png",
      video: "/Projects/pro1_vdo.mp4",
      page: "/Projects/AI Agent for web-Development",
      slug: "ai-agent-for-web-development",
      technologies: "MERN  Web-Sockets AI Integration Web-Container",
      github: "https://github.com/Anubhav-pandey004/AI-webDeveloper_Frontend",
      imageArray :[ "/Projects/p1 (2).png", "/Projects/p1 (3).png", "/Projects/p1 (4).png"],
    },
    {
      title: "Anubhav: Student Community",
      desc: "Developed a community platform for students to share knowledge and collaborate. Implemented user authentication, discussion forums, and a clean responsive UI for better engagement. Promoted knowledge sharing through topic-based forums and peer-to-peer learning spaces.",
      link: "https://student-frontend-bko2.onrender.com/",
      image: "/Projects/pro2_img.png",
      video: "/Projects/pro2_vdo.mp4",
      page: "/Projects/Anubhav: Student Community",
      slug: "anubhav-student-community",
      technologies: "MERN Tailwind CSS JWT Authentication",
      github: "https://github.com/Anubhav-pandey004/Student_frontend",
      imageArray :["/Projects/p2 (1).png", "/Projects/p2 (2).png", "/Projects/p2 (3).png", "/Projects/p2 (4).png"],
    },
    {
      title: "EduNotify: Automated Student Result Notification System",
      desc: "EduNotify is an automated system designed to streamline the communication of academic results between educational institutions and parents. Built using Node.js and integrated with Nodemailer, the system processes individual student test scores and automatically sends personalized result notifications to parents via email.",
      link: "https://edunotify-automated-student-result.onrender.com/",
      image: "/Projects/pro3_img.png",
      video: "/Projects/pro3_vdo.mp4",
      page: "/Projects/EduNotify: Automated Student Result Notification System",
      slug: "edunotify-automated-student-result-notification-system",
      technologies: "Node.js Nodemailer MongoDB Express.js",
      github: "https://github.com/Anubhav-pandey004/EduNotify",
      imageArray :["/Projects/p3 (1).png", "/Projects/p3 (2).png", "/Projects/p3 (3).png"],
    },
    {
      title: "E-Commerce Web Application",
      desc: "An e-commerce web application designed to provide users with a seamless online shopping experience- MERN stack , Tailwind CSS . Applied Tailwind CSS for responsive and modern UI design. Optimized API performance, handled error scenarios gracefully, and added admin features for product management.",
      // link: "",
      image: "/Projects/pro4_img.png",
      video: "/Projects/pro4_vdo.mp4",
      page: "/Projects/E-Commerce Web Application",
      slug: "e-commerce-web-application",
      technologies: "MERN Tailwind CSS JWT Authentication stipe Payments",
      github: "https://github.com/Anubhav-pandey004/AI-webDeveloper_Frontend",
      imageArray :["/Projects/p4 (1).png", "/Projects/p4 (2).png", "/Projects/p4 (3).png", "/Projects/p4 (4).png"]
    },
  ];

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.getAll().forEach((t) => t.kill());

    projectsRef.current.forEach((el, i) => {
      const fromX = i % 2 === 0 ? "-50vw" : "50vw";
      gsap.fromTo(
        el,
        { x: fromX, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            scroller: ".scroll-container",
            start: "top 80%",
            end: "bottom 60%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section className="Projects-page relative px-3 mt-5 min-h-[150vh]">
      {/* Center Vertical Line */}
      <div className="absolute top-20 bottom-0 left-1/2 w-1 bg-white z-0"></div>

      <h1 className="text-5xl md:text-4xl font-logopixies py-7 relative z-10 bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
        Projects
      </h1>

      <div className="flex flex-col gap-12 relative z-10">
        {projects.map((project, i) => (
          <div
            key={i}
            ref={(el) => (projectsRef.current[i] = el)}
            className={`project-card p-6 rounded-lg shadow-lg bg-[#0f172a] dark:bg-gray-800 text-white w-[80%] md:w-[32vw] flex flex-col justify-center items-center ${
              i % 2 === 0 ? "self-start ml-[7%]" : "self-end mr-[7%]"
            }`}
            style={{ opacity: 0 }}
          >
            <div
              id="video-project1"
              className="relative w-full sm:w-[90vw] lg:w-[400px] h-[250px] overflow-hidden group flex justify-center items-center rounded-lg object-cover cursor-pointer"
              onClick={() => {
                navigate(`/project/${project.slug}`,{ state: { projectData: project}});
              }}
            >
              <img
                src={project.image}
                className="absolute top-0 left-0 w-full h-full object-contain rounded-lg z-10 group-hover:opacity-0 transition-opacity duration-500"
                alt="Thumbnail"
              />
              <video
                autoPlay
                playsInline
                loop
                muted
                className="absolute top-0 left-0 w-full h-full object-contain rounded-lg z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                src={project.video}
              />
            </div>

            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <p className="text-gray-300">{project.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;
