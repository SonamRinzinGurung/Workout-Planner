import PropTypes from "prop-types";
import { Link, NavLink } from 'react-router-dom'
import logo from "../assets/logo.png"
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { CiLogout } from "react-icons/ci";
import "../index.css"

const Nav = ({ user, darkMode, handleLogout, toggleDark, toggleDrawer }) => {
    return (
        <nav className="w-64 flex flex-col gap-8 items-center dark:text-gray-100 h-screen bg-gray-50 dark:bg-gray-900">
            <div className="mt-8">
                <Link to={"/"}>
                    <img src={logo} alt="logo" className="w-20" />
                </Link>
            </div>
            <hr className="w-11/12" />
            {user?.emailVerified && (
                <div className="flex flex-col font-subHead text-lg tracking-wide w-full overflow-y-auto custom-scrollbar pb-24">
                    <NavLink
                        onClick={toggleDrawer}
                        to="/"
                        className={({ isActive }) => `py-4 px-10 flex gap-2 ${isActive ? 'bg-primary text-gray-100' : 'hover:text-primary'}`}
                    >
                        <p>
                            Workout Plans
                        </p>
                    </NavLink>


                    <NavLink
                        onClick={toggleDrawer}
                        to="/create"
                        className={({ isActive }) => `py-4 px-10 ${isActive ? 'bg-primary text-gray-100' : 'hover:text-primary'}`}
                    >
                        Create Plan
                    </NavLink>
                    <NavLink
                        onClick={toggleDrawer}
                        to="/archived-plans"
                        className={({ isActive }) => `py-4 px-10 ${isActive ? 'bg-primary text-gray-100' : 'hover:text-primary'}`}
                    >
                        Archives
                    </NavLink>
                    {/* <button onClick={toggleMenu}>
                      <div className="p-4 hover:bg-primary hover:text-gray-100 lg:hidden">
                          Menu
                      </div>
                  </button> */}
                </div>
            )}

            <div className="absolute bottom-4 left-4 flex flex-col gap-4 px-2 py-1 bg-[#fbf9f7] dark:bg-[#161616] rounded-md shrink-0 w-56 shadow-sm">

                {user?.emailVerified && (
                    <button onClick={handleLogout} className="flex gap-4 py-2 px-4">
                        <CiLogout size={25} /> Logout
                    </button>
                )}
                <div className="flex gap-4 py-2 px-4 cursor-pointer" onClick={toggleDark}>
                    <DarkModeSwitch checked={darkMode} onChange={toggleDark} />
                    {
                        darkMode ? (
                            <p className="text-gray-100">Dark Mode</p>
                        ) : (
                            <p>Light Mode</p>
                        )
                    }
                </div>

            </div>
            <div className="w-full h-4">
            </div>
        </nav>
    )
}

Nav.propTypes = {
    user: PropTypes.object,
    darkMode: PropTypes.bool,
    handleLogout: PropTypes.func,
    toggleDark: PropTypes.func,
    toggleDrawer: PropTypes.func,
}
export default Nav