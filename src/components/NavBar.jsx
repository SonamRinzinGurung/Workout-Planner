import { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import { Nav } from "../components";
import '../index.css'
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import logo from "../assets/logo.png";
import { IoMenu, IoCloseOutline } from "react-icons/io5";

const NavBar = ({ darkMode, toggleDark, user }) => {
  const navigate = useNavigate();


  const [isOpen, setIsOpen] = useState(false)

  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState)
  }

  const handleLogout = () => {
    try {
      signOut(auth);
      navigate("/login");
      setIsOpen(false);
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="overflow-hidden">

      {user &&
        <>
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
        </>
      }
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

NavBar.propTypes = {
  darkMode: PropTypes.bool,
  toggleDark: PropTypes.func,
  user: PropTypes.object,
}
export default NavBar;
