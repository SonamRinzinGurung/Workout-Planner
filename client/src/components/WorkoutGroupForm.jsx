import PropTypes from "prop-types";
import { Button, WorkoutForm } from ".";
import { IoAddCircle } from "react-icons/io5";
import { handleAddWorkout } from "../utils/formHandlers";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { reorderList } from "../utils/reorderList";

const WorkoutGroupForm = ({ workouts, setFormData }) => {

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }

    const reorderedList = reorderList(
      workouts,
      result.source.index,
      result.destination.index
    );

    setFormData((prevState) => ({
      ...prevState,
      workouts: reorderedList.map((workout, index) => ({
        ...workout,
        order: index,
      })),
    }));
  };

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="1">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="dark:text-gray-100 justify-center"
            >
              {workouts.map((workoutItem, workoutIndex) => (
                <WorkoutForm
                  key={workoutIndex}
                  workoutIndex={workoutIndex}
                  workoutItem={workoutItem}
                  workouts={workouts}
                  setFormData={setFormData}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <div id="add-workout">
        <Button
          name="Workout"
          handleClick={() => handleAddWorkout(setFormData)}
          className="bg-primary hover:bg-primaryDark text-gray-100 hover:text-gray-200 dark:text-gray-900 dark:hover:text-gray-800"
          position={1}
          icon={<IoAddCircle className="w-5 h-5" />}
        />
      </div>
    </>
  );
};

WorkoutGroupForm.propTypes = {
  workouts: PropTypes.array.isRequired,
  setFormData: PropTypes.func.isRequired,
};
export default WorkoutGroupForm;
