import PropTypes from "prop-types";
import { InputTextExercise } from "../components";
import { FaTrashAlt } from "react-icons/fa";

const ExerciseForm = ({
  exerciseItem,
  exerciseIndex,
  workoutIndex,
  handleRemoveExercise,
  setFormData,
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
          workoutIndex={workoutIndex}
          exerciseIndex={exerciseIndex}
          placeholder={"Exercise Name"}
          setFormData={setFormData}
        />
      </div>
      <div className="flex flex-col gap-2">
        <InputTextExercise
          name="sets"
          value={exerciseItem.sets}
          workoutIndex={workoutIndex}
          exerciseIndex={exerciseIndex}
          setFormData={setFormData}
        />
      </div>
      <div className="flex flex-col gap-2">
        <InputTextExercise
          name="reps"
          value={exerciseItem.reps}
          workoutIndex={workoutIndex}
          exerciseIndex={exerciseIndex}
          setFormData={setFormData}
        />
      </div>
      <div className="flex flex-col gap-2">
        <InputTextExercise
          name="weight"
          value={exerciseItem.weight}
          workoutIndex={workoutIndex}
          exerciseIndex={exerciseIndex}
          placeholder={"Weight (kg)"}
          setFormData={setFormData}
        />
      </div>
      {handleRemoveExercise && (
        <div>
          <button
            onClick={() =>
              handleRemoveExercise(setFormData, workoutIndex, exerciseIndex)
            }
          >
            <FaTrashAlt className="text-red-400 hover:text-red-500 transition ease-in-out duration-300" />
          </button>
        </div>
      )}
    </div>
  );
};

ExerciseForm.propTypes = {
  exerciseItem: PropTypes.object.isRequired,
  exerciseIndex: PropTypes.number.isRequired,
  workoutIndex: PropTypes.number.isRequired,
  handleRemoveExercise: PropTypes.func,
  setFormData: PropTypes.func.isRequired,
};
export default ExerciseForm;
