import React, { useEffect, useRef } from 'react';
import { CursorProvider } from "./Context/CursorContext";
import LocomotiveScroll from 'locomotive-scroll';
import 'locomotive-scroll/dist/locomotive-scroll.css';
import './App.css';
import { Outlet, useLocation } from "react-router-dom";
import Home from './Components/Home'; // lazy load optional


const App = () => {
  const scrollRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    if (!scrollRef.current) return;

    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      multiplier: 0.5,
      lerp: 0.075,
      smartphone: { smooth: true },
      tablet: { smooth: true }
    });

    return () => {
      if (scroll) scroll.destroy();
    };
  }, []);

  return (
    <div className="h-screen w-screen">
      <div ref={scrollRef} data-scroll-container className='overflow-hidden h-screen w-screen bg-blue-300'>
        <CursorProvider>
          {location.pathname === "/" ? <Home /> : <Outlet />}
        </CursorProvider>
      </div>
    </div>
  );
};

export default App;
