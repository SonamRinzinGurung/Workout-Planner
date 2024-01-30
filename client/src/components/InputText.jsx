import PropTypes from "prop-types";
import { capitalizeFirstLetter } from "../utils/capitalizeWord";

const InputText = ({ name, value, handleChange }) => {
  return (
    <input
      className="border border-gray-500 p-2 rounded-md font-mono dark:bg-gray-900 text-center text-sm"
      type="text"
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
};

export default InputText;
