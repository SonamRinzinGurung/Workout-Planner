import PropTypes from "prop-types";
import { capitalizeFirstLetter } from "../utils/capitalizeWord";

const InputText = ({ name, value, handleChange, type, className }) => {
  return (
    <input
      className={className || "border border-gray-500 p-2 rounded-md font-mono dark:bg-gray-900 text-center text-sm w-full"}
      type={type || "text"}
      name={name}
      placeholder={capitalizeFirstLetter(name)}
      value={value}
      onChange={handleChange}
    />
  );
};

InputText.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  type: PropTypes.string,
  className: PropTypes.string,
};

export default InputText;
