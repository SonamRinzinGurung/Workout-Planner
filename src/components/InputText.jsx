import PropTypes from "prop-types";
import { capitalizeFirstLetter } from "../utils/capitalizeWord";

const InputText = ({ name, value, handleChange, type, className, disabled = false }) => {
  return (
    <input
      className={className || "border border-gray-500 p-2 rounded-md font-mono dark:bg-gray-900 text-center text-sm w-full"}
      type={type || "text"}
      name={name}
      placeholder={capitalizeFirstLetter(name)}
      value={value}
      onChange={handleChange}
      disabled={disabled}
    />
  );
};

InputText.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func,
  type: PropTypes.string,
  className: PropTypes.string,
  disabled: PropTypes.bool,
};

export default InputText;
