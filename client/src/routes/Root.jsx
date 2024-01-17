import { Outlet } from "react-router-dom";
import { Header } from "../components";

const Root = () => {
  return (
    <div>
      <Header />
      <div>
        <Outlet />
      </div>
    </div>
  );
};

export default Root;
