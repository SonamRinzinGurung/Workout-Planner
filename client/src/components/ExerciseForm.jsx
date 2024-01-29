import PropTypes from "prop-types";
import { InputTextExercise } from "../components";
import { FaTrashAlt } from "react-icons/fa";

const ExerciseForm = ({
  exerciseItem,
  exerciseIndex,
  workoutIndex,
  handleRemoveExercise,
  handleExerciseChange,
}) => {
  return (
    <div
      className="flex flex-col gap-2 p-4 pt-6 rounded-md items-center shadow-md bg-stone-50 dark:bg-gray-800"
      key={exerciseIndex}
    >
      <div className="flex flex-col gap-2">
        <InputTextExercise
          name="name"
          value={exerciseItem.name}
          handleChange={handleExerciseChange}
          workoutIndex={workoutIndex}
          exerciseIndex={exerciseIndex}
          placeholder={"Exercise Name"}
        />
      </div>
      <div className="flex flex-col gap-2">
        <InputTextExercise
          name="sets"
          value={exerciseItem.sets}
          handleChange={handleExerciseChange}
          workoutIndex={workoutIndex}
          exerciseIndex={exerciseIndex}
          type="number"
        />
      </div>
      <div className="flex flex-col gap-2">
        <InputTextExercise
          name="reps"
          value={exerciseItem.reps}
          handleChange={handleExerciseChange}
          workoutIndex={workoutIndex}
          exerciseIndex={exerciseIndex}
          type="number"
        />
      </div>
      <div className="flex flex-col gap-2">
        <InputTextExercise
          name="weight"
          value={exerciseItem.weight}
          handleChange={handleExerciseChange}
          workoutIndex={workoutIndex}
          exerciseIndex={exerciseIndex}
          type="number"
          placeholder={"Weight (kg)"}
        />
      </div>
      <div>
        <button
          onClick={() => handleRemoveExercise(workoutIndex, exerciseIndex)}
        >
          <FaTrashAlt className="text-red-400 hover:text-red-500 transition ease-in-out duration-300" />
        </button>
      </div>
    </div>
  );
};

ExerciseForm.propTypes = {
  exerciseItem: PropTypes.object.isRequired,
  exerciseIndex: PropTypes.number.isRequired,
  workoutIndex: PropTypes.number.isRequired,
  handleRemoveExercise: PropTypes.func.isRequired,
  handleExerciseChange: PropTypes.func.isRequired,
};
export default ExerciseForm;
