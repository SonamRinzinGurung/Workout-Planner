import { useState, useEffect, useRef, useCallback } from "react";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import logo from "../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { IoIosMenu, IoIosCloseCircleOutline } from "react-icons/io";
import { MenuLinks, Button } from ".";
import { ToastContainer, Slide } from "react-toastify";
import { CiLogout } from "react-icons/ci";

const Header = () => {
  const navigate = useNavigate();
  let darkModeLocal = localStorage.getItem("darkMode");
  darkModeLocal = darkModeLocal?.toLowerCase() === "true";
  const token = localStorage.getItem("token");
  const modalRef = useRef();
  const [darkMode, setDarkMode] = useState(darkModeLocal || false);
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setMenuOpen((prev) => !prev);
  }, [setMenuOpen]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        toggleMenu();
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [toggleMenu]);

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
    localStorage.removeItem("token");
    navigate("/login");
    toggleMenu();
  };

  return (
    <>
      <nav className="p-2 shadow-sm flex justify-center items-center">
        {menuOpen && token ? (
          <section className="modal-container bg-[rgb(0,0,0,0.7)] fixed inset-0 outline-none overflow-x-hidden overflow-y-auto z-10">
            <div className="modal-dialog relative w-11/12 h-5/6 mx-auto mt-10 pointer-events-none">
              <div
                ref={modalRef}
                className="modal-content border-none shadow-lg relative w-full h-full pointer-events-auto bg-white bg-clip-padding rounded-md outline-none text-current dark:bg-gray-700 dark:text-gray-100 "
              >
                <div className="modal-header flex justify-between p-4 border-b border-gray-200 rounded-t-md">
                  <button
                    fontSize="large"
                    color="error"
                    onClick={toggleMenu}
                    className="cursor-pointer"
                  >
                    <IoIosCloseCircleOutline className="text-red-700 w-8 h-8  hover:text-red-900 transition ease-in-out duration-300" />
                  </button>
                  <div>
                    <Button
                      name="Log out"
                      className="border hover:bg-slate-500 hover:shadow-md hover:text-gray-100 transition duration-300"
                      handleClick={handleLogout}
                      icon={<CiLogout className="w-6 h-6" />}
                      position={2}
                    />
                  </div>
                </div>
                <div className="modal-body relative p-8 px-10 flex flex-col h-3/4 gap-5 items-center">
                  <MenuLinks handleClick={toggleMenu} />
                </div>
              </div>
            </div>
          </section>
        ) : (
          ""
        )}
        {token && (
          <div className="cursor-pointer">
            <IoIosMenu
              onClick={toggleMenu}
              className="dark:text-white w-8 h-8"
              size=""
            />
          </div>
        )}
        <div className="mx-auto">
          <Link to={"/"}>
            <img src={logo} alt="logo" className="w-20" />
          </Link>
        </div>
        <div>
          <DarkModeSwitch checked={darkMode} onChange={toggleDark} />
        </div>
      </nav>

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
    </>
  );
};

export default Header;
