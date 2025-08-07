"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setTheme } from "@/app/redux/slices/themeSlice";

export function ThemeProvider({ children }) {
  const dispatch = useDispatch();
  const currentTheme = useSelector((state) => state.theme.value);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Initialize theme only after component mounts
  useEffect(() => {
    if (!mounted) return;

    // Add a small delay to ensure DOM is ready
    const initTheme = () => {
      try {
        // Check saved theme or system preference
        const savedTheme = localStorage.getItem("theme");
        let themeToSet = "light";

        if (savedTheme === "dark" || savedTheme === "light") {
          themeToSet = savedTheme;
        } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
          themeToSet = "dark";
        }

        console.log("Initializing theme:", themeToSet);
        
        // Apply theme class immediately to prevent flash
        const root = document.documentElement;
        if (themeToSet === "dark") {
          root.classList.add("dark");
        } else {
          root.classList.remove("dark");
        }

        // Then dispatch to Redux
        dispatch(setTheme(themeToSet));
      } catch (error) {
        console.error("Error initializing theme:", error);
        // Fallback to light theme
        dispatch(setTheme("light"));
      }
    };

    // Use requestAnimationFrame to ensure DOM is ready
    const rafId = requestAnimationFrame(initTheme);
    
    return () => cancelAnimationFrame(rafId);
  }, [mounted, dispatch]);

  // Apply theme changes after Redux state updates
  useEffect(() => {
    if (!mounted) return;

    try {
      console.log("Applying theme:", currentTheme);
      
      // Apply theme class to document
      const root = document.documentElement;
      if (currentTheme === "dark") {
        root.classList.add("dark");
        console.log("Added dark class to html element");
      } else {
        root.classList.remove("dark");
        console.log("Removed dark class from html element");
      }

      // Save to localStorage
      localStorage.setItem("theme", currentTheme);
    } catch (error) {
      console.error("Error applying theme:", error);
    }
  }, [currentTheme, mounted]);

  // Don't render children until mounted to prevent hydration mismatch
  if (!mounted) {
    return <div style={{ visibility: "hidden" }}>{children}</div>;
  }

  return <>{children}</>;
}

export default ThemeProvider;