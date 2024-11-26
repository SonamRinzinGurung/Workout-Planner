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
  type = "text",
}) => {

  const { setFormData } = useAppContext();

  return (
    <div className="relative w-full">
      <input
        name={name}
        value={value}
        onChange={(event) =>
          handleExerciseChange(setFormData, workoutIndex, exerciseIndex, event)
        }
        type={type}
        id={name}
        placeholder=""
        className={`peer block w-full rounded-md bg-white dark:bg-gray-900 px-2 pb-2 pt-5 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-1 focus:ring-gray-500 ${type === 'number' ? 'no-spinner' : ''}`}

      />
      <label
        htmlFor={name}
        className="absolute left-2 top-0 text-gray-500 dark:text-gray-400 text-sm transition-all duration-200 peer-placeholder-shown:top-3  peer-placeholder-shown:text-base peer-focus:top-0 peer-focus:text-sm peer-focus:text-gray-700 dark:peer-focus:text-gray-300"
      >
        {placeholder || capitalizeFirstLetter(name)}
      </label>
    </div>
  );
};

InputTextExercise.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  workoutIndex: PropTypes.number.isRequired,
  exerciseIndex: PropTypes.number.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};
export default InputTextExercise;
