import React, { useEffect } from "react";
import DesktopNav from "./layouts/DesktopNav";
import MobileNav from "./layouts/MobileNav";
import useLayoutStore from "../../hooks/useLayoutStore";
import { useMediaQuery } from "react-responsive";

const Nav = () => {
  const isMobile = useLayoutStore((state) => state.isMobile);
  const setMobile = useLayoutStore((state) => state.setMobile);

  // Use media query to determine if the device is mobile
  const isMobileQuery = useMediaQuery({ query: "(max-width: 700px)" });

  useEffect(() => {
    // Update the global state based on the media query

    setMobile(isMobileQuery);
  }, [isMobileQuery, setMobile]); // Dependency on isMobileQuery and setMobile

  // Log the rendering choice
  console.log("Rendering:", isMobile ? "MobileNav" : "DesktopNav");

  return isMobile ? <MobileNav /> : <DesktopNav />;
};

export default Nav;
