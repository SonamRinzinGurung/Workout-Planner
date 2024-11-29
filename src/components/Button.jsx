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
      `rounded-md px-4 py-2` +
      ` ` +
      className + ` ` +
      `${isPending && "opacity-30"}`
    }>
      <div
        className={`flex gap-2 items-center ${icon ? "justify-start" : "justify-center"}`}
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
