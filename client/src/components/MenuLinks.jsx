import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import '../index.css'

const MenuLinks = ({ handleClick }) => {
  return (
    <>
      <Link
        className="modalMenuLinks"
        to="/"
        onClick={handleClick}
      >
        <p className="font-subHead font-medium py-1 text-lg">Home</p>
      </Link>
      <Link
        className="modalMenuLinks"
        to="/create"
        onClick={handleClick}
      >
        <p className="font-subHead font-medium py-1 text-lg">
          Create Workout Plan
        </p>
      </Link>
      <Link
        className="modalMenuLinks"
        to="/removed-plans"
        onClick={handleClick}
      >
        <p className="font-subHead font-medium py-1 text-lg">Removed Plans</p>
      </Link>
    </>
  );
};

MenuLinks.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default MenuLinks;
