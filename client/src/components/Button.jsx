import PropTypes from "prop-types";

const Button = ({ name, handleClick, className, icon, position }) => {
  return (
    <button onClick={handleClick}>
      <div
        className={
          `flex p-2 gap-2 rounded-md items-center justify-center hover:shadow-md dark:hover:shadow-gray-800 transition ease-in-out duration-300` +
          ` ` +
          className
        }
      >
        {position === 1 && icon}
        <p className="font-medium">{name}</p>
        {position === 2 && icon}
      </div>
    </button>
  );
};

Button.propTypes = {
  name: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  icon: PropTypes.element,
  position: PropTypes.number,
};

export default Button;
