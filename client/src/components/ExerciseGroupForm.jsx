import { ExerciseForm } from "./index";
import PropTypes from "prop-types";
import { handleRemoveExercise } from "../utils/formHandlers";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";

const ExerciseGroupForm = ({ workoutItem, workoutIndex, setFormData }) => {
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
};