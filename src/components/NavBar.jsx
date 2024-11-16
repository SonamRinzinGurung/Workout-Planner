import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import { Nav } from "../components";
import '../index.css'
import useAuth from "../hooks/useAuth";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import logo from "../assets/logo.png";
import { IoMenu, IoCloseOutline } from "react-icons/io5";

const Header = () => {
  const navigate = useNavigate();
  let darkModeLocal = localStorage.getItem("darkMode");
  darkModeLocal = darkModeLocal?.toLowerCase() === "true";

  const { user, loading } = useAuth()
  const [darkMode, setDarkMode] = useState(darkModeLocal || false);
  const [isOpen, setIsOpen] = useState(false)

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }

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

  const handleLogout = () => {
    try {
      signOut(auth);
      navigate("/login");
      setIsOpen(false);
    } catch (error) {
      console.log(error)
    }
  };

  if (loading) return null;
  return (
    <div className="overflow-hidden">
      <div className="md:hidden">
        <div className="flex justify-between w-full py-2">

          <div className="">
            <Link to={"/"}>
              <img src={logo} alt="logo" className="w-20" />
            </Link>
          </div>
          <div className="p-2 cursor-pointer rounded-xl hover:bg-gray-100 dark:text-gray-100 dark:hover:bg-gray-900">
            {
              isOpen ? <IoCloseOutline onClick={toggleDrawer} size={40} /> : <IoMenu onClick={toggleDrawer} size={40} />
            }

          </div>
        </div>
      </div>

      <div className="hidden md:block">

        <Nav
          user={user}
          darkMode={darkMode}
          handleLogout={handleLogout}
          toggleDark={toggleDark}
        />
      </div>
      <Drawer
        open={isOpen}
        onClose={toggleDrawer}
        direction="left"
        className="h-screen"
        size={256}

      >

        <Nav
          user={user}
          darkMode={darkMode}
          handleLogout={handleLogout}
          toggleDark={toggleDark}
          toggleDrawer={toggleDrawer}
        />
      </Drawer>

      <ToastContainer
        theme={darkMode ? "dark" : "light"}
        position="bottom-right"
        autoClose={3500}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
      />
    </div>
  );
};

export default Header;
