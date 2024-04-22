import PropTypes from "prop-types";
import { Button, WorkoutForm } from ".";
import { IoAddCircle } from "react-icons/io5";
import { useRef, useEffect } from "react";
import { handleAddWorkout } from "../utils/formHandlers";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

const WorkoutGroupForm = ({ workouts, setFormData }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    //scrolls to the bottom of the page when changes in the length of workout array occurs
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [workouts.length]);

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }

    const reorderedList = reorder(
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

      <div id="add-workout" ref={scrollRef}>
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
