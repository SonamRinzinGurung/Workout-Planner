import { useState, useEffect } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDark = () => {
    setDarkMode(!darkMode);
  };
  return (
    <nav className="p-2 shadow-sm">
      <div className="flex justify-between">
        <Link to={"/"} className="flex justify-center flex-grow">
          <img src={logo} alt="logo" className="w-20" />
        </Link>
        <div>
          <div className="ml-auto">
            <DarkModeSwitch checked={darkMode} onChange={toggleDark} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
