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

    // Check saved theme or system preference
    const savedTheme = localStorage.getItem("theme");
    let themeToSet = "light";

    if (savedTheme === "dark" || savedTheme === "light") {
      themeToSet = savedTheme;
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      themeToSet = "dark";
    }

    console.log("Initializing theme:", themeToSet);
    // Dispatch the theme to Redux
    dispatch(setTheme(themeToSet));
  }, [dispatch]);

  useEffect(() => {
    if (!mounted) return;

    console.log("Applying theme:", currentTheme);
    // Apply theme class to document immediately
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
  }, [currentTheme, mounted]);

  // Render children directly - theme styling is handled by the layout
  return <>{children}</>;
}

export default ThemeProvider;
