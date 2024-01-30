import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

const RouteProtector = ({ children }) => {
  const token = localStorage.getItem("token");

  // if (!token) {
  //   return <Navigate to={"/login"} />;
  // }
  return children;
};

RouteProtector.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RouteProtector;
