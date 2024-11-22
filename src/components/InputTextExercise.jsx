import PropTypes from "prop-types";
import { capitalizeFirstLetter } from "../utils/capitalizeWord";
import { handleExerciseChange } from "../utils/formHandlers";
import { useAppContext } from "../context/appContext";

const InputTextExercise = ({
  name,
  value,
  workoutIndex,
  exerciseIndex,
  placeholder,
  className,
  type = "text",
}) => {

  const { setFormData } = useAppContext();

  return (
      <input
      className={`rounded-md p-2 dark:bg-gray-900 ${className}`} 
        name={name}
        placeholder={placeholder || capitalizeFirstLetter(name)}
        value={value}
        onChange={(event) =>
          handleExerciseChange(setFormData, workoutIndex, exerciseIndex, event)
        }
      type={type}
    />
  );
};

InputTextExercise.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  workoutIndex: PropTypes.number.isRequired,
  exerciseIndex: PropTypes.number.isRequired,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  type: PropTypes.string,
};
export default InputTextExercise;
