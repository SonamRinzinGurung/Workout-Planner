import { ExerciseForm } from "./index";
import PropTypes from "prop-types";
import { handleRemoveExercise } from "../utils/formHandlers";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { reorderList } from "../utils/reorderList";

const ExerciseGroupForm = ({ workoutItem, workoutIndex, setFormData, setDeletedExercises }) => {

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
                    <div ref={provided.innerRef} {...provided.droppableProps}>
                        {workoutItem.exercises.map((exerciseItem, exerciseIndex) => (
                            <ExerciseForm
                                key={exerciseIndex}
                                exerciseItem={exerciseItem}
                                exerciseIndex={exerciseIndex}
                                workoutIndex={workoutIndex}
                                handleRemoveExercise={handleRemoveExercise}
                                setFormData={setFormData}
                                setDeletedExercises={setDeletedExercises}
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
    setFormData: PropTypes.func.isRequired,
    setDeletedExercises: PropTypes.func,
};
