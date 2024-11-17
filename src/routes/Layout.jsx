import { useState, useEffect } from "react";
import { Outlet, Link } from "react-router-dom";
import { NavBar } from "../components";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import useAuth from "../hooks/useAuth";
import logo from "../assets/logo.png";

const Layout = () => {
  const { user, loading } = useAuth();

  let darkModeLocal = localStorage.getItem("darkMode");
  darkModeLocal = darkModeLocal?.toLowerCase() === "true";
  const [darkMode, setDarkMode] = useState(darkModeLocal || false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  const toggleDark = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", !darkMode);
  };

  if (loading) return null;

  return (
    <div className="font-body flex flex-col md:flex-row h-screen relative w-full">
      <div>
        <NavBar darkMode={darkMode} toggleDark={toggleDark} user={user} />
      </div>
      <div className="overflow-y-auto w-full custom-scrollbar">
        {!user && (
          <div className="flex justify-between w-full py-2">

            <div className="">
              <Link to={"/"}>
                <img src={logo} alt="logo" className="w-20" />
              </Link>
            </div>

            <div
              className="flex gap-4 py-2 px-4 cursor-pointer"
              onClick={toggleDark}
            >
              <DarkModeSwitch checked={darkMode} onChange={toggleDark} />
              {darkMode ? (
                <p className="text-gray-100">Dark Mode</p>
              ) : (
                <p>Light Mode</p>
              )}
            </div>
          </div>
        )}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
