import { Outlet } from "react-router-dom";
import { Header } from "../components";

const Root = () => {
  return (
    <div className="font-body">
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
