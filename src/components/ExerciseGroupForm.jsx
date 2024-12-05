import { ExerciseForm } from "./index";
import PropTypes from "prop-types";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { reorderList } from "../utils/reorderList";
import { useAppContext } from "../context/appContext";

const ExerciseGroupForm = ({ workoutItem, workoutIndex, collapseExercises }) => {
    const { setFormData } = useAppContext();

    const onDragEnd = (result) => {
        if (!result.destination) {
            return;
        }
        if (result.destination.index === result.source.index) {
            return;
        }

      const reorderedList = reorderList(
          workoutItem.exercises,
          result.source.index,
          result.destination.index
      );

      const updateExerciseOrder = (exercise, index) => ({
          ...exercise,
          order: index,
      });

        setFormData((prevState) => ({
            ...prevState,
            workouts: prevState.workouts.map((workout, i) =>
                i === workoutIndex
                    ? {
                        ...workout,
                        exercises: reorderedList.map(updateExerciseOrder),
                    }
                    : workout
            ),
        }));
    };
    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId={workoutIndex.toString()} key={workoutIndex}>
                {(provided) => (
                    <div ref={provided.innerRef} {...provided.droppableProps}
                        className="flex flex-col gap-4"
                    >
                        {workoutItem.exercises.map((exerciseItem, exerciseIndex) => (
                            <ExerciseForm
                                key={exerciseIndex}
                                exerciseItem={exerciseItem}
                                exerciseIndex={exerciseIndex}
                                workoutIndex={workoutIndex}
                                collapseExercises={collapseExercises}
                />
            ))}
                      {provided.placeholder}
                  </div>
              )}
          </Droppable>
      </DragDropContext>
  );
};

export default ExerciseGroupForm;

ExerciseGroupForm.propTypes = {
    workoutItem: PropTypes.object.isRequired,
    workoutIndex: PropTypes.number.isRequired,
    collapseExercises: PropTypes.bool.isRequired,
};
