import PropTypes from "prop-types";
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { DarkModeSwitch } from "react-toggle-dark-mode";
import { CiLogout, CiUser } from "react-icons/ci";
import "../index.css";
import { useQuery } from "@tanstack/react-query";
import { db } from "../firebase-config";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { MdExpandMore, MdExpandLess } from "react-icons/md";

const Nav = ({ user, darkMode, handleLogout, toggleDark, toggleDrawer }) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const { data } = useQuery({
        queryKey: ["workout-plan"],
        queryFn: async () => {
            const q = query(
                collection(db, "workoutPlans"),
                where("uid", "==", user?.uid),
                where("isArchived", "==", false),
                orderBy("createdAt", "desc")
            );
            const plansSnapshot = await getDocs(q);
            const plans = [];

            // get all plans of current user
            for (const planDoc of plansSnapshot.docs) {
                const planData = { id: planDoc.id, ...planDoc.data(), workouts: [] };

                // get workouts from workouts subcollection
                const workoutsSnapshot = await getDocs(
                    query(collection(planDoc.ref, "workouts"), orderBy("order", "asc"))
                );

                for (const workoutDoc of workoutsSnapshot.docs) {
                    const workoutData = {
                        id: workoutDoc.id,
                        ...workoutDoc.data(),
                        exercises: [],
                    };

                    const exercisesSnapshot = await getDocs(
                        query(
                            collection(workoutDoc.ref, "exercises"),
                            orderBy("order", "asc")
                        )
                    );
                    workoutData.exercises = exercisesSnapshot.docs.map((exerciseDoc) => ({
                        id: exerciseDoc.id,
                        ...exerciseDoc.data(),
                    }));
                    planData.workouts.push(workoutData);
                }
                plans.push(planData);
            }
            return plans;
        },
    });

    return (
        <nav className="w-64 flex flex-col gap-8 items-center dark:text-gray-100 h-full bg-white dark:bg-darkColor">
            <div className="mt-8">
                <Link to={"/"}>
                    <img src={logo} alt="logo" className="w-28" />
                </Link>
            </div>
            <hr className="w-11/12" />
            <div className="flex flex-col font-subHead text-lg tracking-wide w-full overflow-y-auto custom-scrollbar pb-24">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `relative py-4 px-10 flex gap-8 ${isActive ? "bg-color1 text-gray-100" : "hover:text-color1"
                        }`
                    }
                >
                    <button onClick={toggleDrawer}>Workout Plans</button>
                    <button
                        className="hover:text-gray-900 dark:hover:text-gray-100"
                        onClick={() => setShowDropdown((prev) => !prev)}
                    >
                        {showDropdown ? (
                            <MdExpandLess size={25} />
                        ) : (
                            <MdExpandMore size={25} />
                        )}
                    </button>
                </NavLink>
                {showDropdown && (
                    <div className="text-base flex flex-col ml-6">
                        {data.map((plan) => {
                            return (
                                <NavLink
                                    key={plan.id}
                                    onClick={toggleDrawer}
                                    to={`/${plan.id}`}
                                    className={({ isActive }) =>
                                        `py-4 px-10 ${isActive ? "bg-color1 text-gray-100" : "hover:text-color1"
                                        }`
                                    }
                                >
                                    {plan.name}
                    </NavLink>
                            );
                        })}
                    </div>
                )}

                <NavLink
                    onClick={toggleDrawer}
                    to="/create"
                    className={({ isActive }) =>
                        `py-4 px-10 ${isActive ? "bg-color1 text-gray-100" : "hover:text-color1"
                        }`
                    }
                >
                    Create Plan
                </NavLink>
                <NavLink
                    onClick={toggleDrawer}
                    to="/archived-plans"
                    className={({ isActive }) =>
                        `py-4 px-10 ${isActive ? "bg-color1 text-gray-100" : "hover:text-color1"
                        }`
                    }
                >
                    Archives
                </NavLink>
            </div>

            <div className="mt-auto mb-4 flex flex-col gap-4 px-1 py-2 bg-[#fbf9f7] dark:bg-[#161616] rounded-md shrink-0 w-10/12 shadow-sm">
                <Link to="/profile"
                    className="flex gap-4 py-2 px-4 cursor-pointer"
                >
                    <CiUser size={25} />
                    <p>Profile</p>
                </Link>
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
                <button onClick={handleLogout} className="flex gap-4 py-2 px-4">
                    <CiLogout size={25} />
                    <p>

                        Logout
                    </p>
                </button>
            </div>
        </nav>
    );
};

Nav.propTypes = {
    user: PropTypes.object,
    darkMode: PropTypes.bool,
    handleLogout: PropTypes.func,
    toggleDark: PropTypes.func,
    toggleDrawer: PropTypes.func,
};
export default Nav;
