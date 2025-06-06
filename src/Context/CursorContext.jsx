import { createContext, useContext, useRef } from "react";

const CursorContext = createContext(null);

export const CursorProvider = ({ children }) => {
  const cursorRef = useRef(null);

  return (
    <CursorContext.Provider value={cursorRef}>
      {children}
    </CursorContext.Provider>
  );
};

export const useCursor = () => useContext(CursorContext);
