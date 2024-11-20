import PropTypes from "prop-types";

const Button = ({
  name,
  handleClick,
  className,
  icon,
  position,
  isPending,
}) => {
  return (
    <button onClick={handleClick} disabled={isPending} className={
      `rounded-md hover:shadow-md dark:hover:shadow-gray-800 transition-colors ease-in-out duration-300` +
      ` ` +
      className + ` ` +
      `${isPending && "opacity-30"}`
    }>
      <div
        className={`flex p-2 gap-4 items-center ${icon ? "justify-start" : "justify-center"}`}
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
  isPending: PropTypes.bool,
};

export default Button;
