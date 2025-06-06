import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import React, { useEffect, useRef, useState } from "react";
import WarpRealityButton from "./WarpRealityButton";
import CurcerFollow from "./CurcerFollow";
import Particles from "./CurlNoiseEffect";
import { gsap } from "gsap";
import Dashboard from "./Dashboard";

const Home = () => {
  const mainpage = useRef();
  const slider = useRef();
  const [showParticles, setShowParticles] = useState(true);
  const hasLoaded = useRef(false);
  const [loader, setloader] = useState(() => {
    return localStorage.getItem("hasLoaded") === "true";
  });
  useEffect(() => {
    const handleUnload = () => {

      localStorage.removeItem("hasLoaded");
    };
    //unload is less reliable and may not work in modern browsers. beforeunload is widely supported.
    window.addEventListener("beforeunload", handleUnload);
    //beforeunload fires on refresh and close, not on route change.

    // It won’t trigger on navigate("/") or React routing — only on tab/window close or page reload.
    return () => {
      window.removeEventListener("beforeunload", handleUnload);
    };
  }, []);

  const handleWarp = () => {
    localStorage.setItem("hasLoaded", "true");
    setloader(true);
  };

  return (
    <main className="h-[100vh] w-[100vw] bg-black overflow-hidden">
      {!loader && (
        <>
          <Canvas
            camera={{ position: [0, 0, 5] }}
            className="fixed top-0 z-10 h-screen w-screen"
            ref={mainpage}
          >
            <color attach="background" args={["#00060c"]} />
            <ambientLight />
            {showParticles && <Particles />}
            <OrbitControls
              makeDefault
              enableZoom={false} // Disable zoom
              minDistance={5} // Lock distance
              maxDistance={5} // Lock distance
              enablePan={false} // Prevent movement
              enableRotate={true} // Allow rotation
            />
          </Canvas>
          <WarpRealityButton
            mainpage={mainpage}
            slider={slider}
            setShowParticles={setShowParticles}
            setloader={handleWarp}
          />
          <CurcerFollow />
          <div
            ref={slider}
            className="loading-window fixed top-0 left-[-100vw] w-[100vw] h-[99vh] md:h-[100vh] overflow-auto bg-[#dddf00] z-0 flex flex-col justify-center items-center"
          ></div>
        </>
      )}
      {console.log("Loader state:", loader)}
      {loader && <Dashboard />}
      {/* <Dashboard/> */}
    </main>
  );
};

export default Home;
