import React from "react";
import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";

const RouteProtector = ({ children }) => {

  const { user, loading } = useAuth()

  if (loading) {
    return null;
  }

  if (!user) {
    return <Navigate to={"/login"} />
  }

  if (!user?.emailVerified) {
    return <Navigate to={"/verify-notice"} />
  }

  let childrenWithProps;
  // Checking isValidElement is the safe way and avoids a typescript error too.
  if (React.isValidElement(children)) {
    childrenWithProps = React.cloneElement(children, { user });
  }

  return <>{childrenWithProps}</>;
};

RouteProtector.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RouteProtector;
