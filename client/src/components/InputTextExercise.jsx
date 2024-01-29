import PropTypes from "prop-types";
import { capitalizeFirstLetter } from "../utils/capitalizeWord";

const InputTextExercise = ({
  name,
  value,
  handleChange,
  workoutIndex,
  exerciseIndex,
  placeholder,
}) => {
  return (
    <div>
      <input
        className="border border-gray-500 p-2 rounded-md font-mono dark:bg-gray-900 text-sm"
        name={name}
        placeholder={placeholder || capitalizeFirstLetter(name)}
        value={value}
        onChange={(event) => handleChange(workoutIndex, exerciseIndex, event)}
      />
    </div>
  );
};

InputTextExercise.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  workoutIndex: PropTypes.number.isRequired,
  exerciseIndex: PropTypes.number.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
};
export default InputTextExercise;
