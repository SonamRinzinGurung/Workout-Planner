import PropTypes from "prop-types";
import { capitalizeFirstLetter } from "../utils/capitalizeWord";
import { handleExerciseChange } from "../utils/formHandlers";

const InputTextExercise = ({
  name,
  value,
  workoutIndex,
  exerciseIndex,
  placeholder,
  setFormData,
}) => {
  return (
    <div>
      <input
        className="border border-gray-500 p-2 rounded-md font-mono dark:bg-gray-900 text-sm"
        name={name}
        placeholder={placeholder || capitalizeFirstLetter(name)}
        value={value}
        onChange={(event) =>
          handleExerciseChange(setFormData, workoutIndex, exerciseIndex, event)
        }
      />
    </div>
  );
};

InputTextExercise.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  workoutIndex: PropTypes.number.isRequired,
  exerciseIndex: PropTypes.number.isRequired,
  placeholder: PropTypes.string,
  setFormData: PropTypes.func.isRequired,
};
export default InputTextExercise;
