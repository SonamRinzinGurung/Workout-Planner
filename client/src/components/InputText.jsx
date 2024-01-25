import PropTypes from "prop-types";
import { capitalizeFirstLetter } from "../utils/capitalizeWord";

const InputText = ({ name, value, handleChange }) => {
  return (
    <input
      className="border"
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
