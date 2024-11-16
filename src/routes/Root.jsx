import { Outlet } from "react-router-dom";
import { NavBar } from "../components";

const Root = () => {
  return (
    <div className="font-body flex flex-col md:flex-row h-screen relative w-full">
      <div>
        <NavBar />
      </div>
      <div className="overflow-y-auto w-full custom-scrollbar">
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
