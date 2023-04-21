import React, { useEffect, useState } from "react";
import "./themeBtn.scss";

const ThemeBtn = () => {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    let theme = localStorage.getItem("theme");
    if (theme === "dark") {
      document.body.classList.add("dark");
      setTheme("dark");
    } else {
      localStorage.setItem("theme", "light");
      setTheme("light");
    }
  }, []);

  const changeTheme = () => {
    let theme = localStorage.getItem("theme");
    if (theme === "light") {
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark");
      setTheme("dark");
    } else {
      localStorage.setItem("theme", "light");
      document.body.classList.remove("dark");
      setTheme("light");
    }
  };

  return (
    <button
      onClick={changeTheme}
      className="theme_btn"
      data-theme={theme == "light" ? "dark" : "light"}
    >
      {theme == "light" ? "🌚" : "☀️"}
    </button>
  );
};

export default ThemeBtn;
