import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const MenuLinks = ({ handleClick }) => {
  return (
    <>
      <Link
        className="w-full text-center bg-gray-100 rounded-md hover:bg-gray-200 hover:shadow-md transition ease-in-out duration-300 dark:bg-gray-800 dark:hover:bg-gray-900"
        to="/"
        onClick={handleClick}
      >
        <p className="font-body font-medium py-1 text-lg">Home</p>
      </Link>
      <Link
        className="w-full text-center bg-gray-100 rounded-md hover:bg-gray-200 hover:shadow-md transition ease-in-out duration-300 dark:bg-gray-800 dark:hover:bg-gray-900"
        to="/create"
        onClick={handleClick}
      >
        <p className="font-body font-medium py-1 text-lg">
          Create Workout Plan
        </p>
      </Link>
    </>
  );
};

MenuLinks.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default MenuLinks;
