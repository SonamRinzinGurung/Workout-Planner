import { useState } from "react";
import { Button, WorkoutForm } from ".";
import { handleAddWorkout } from "../utils/formHandlers";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { reorderList } from "../utils/reorderList";
import { useAppContext } from "../context/appContext";
import { FaPlus } from "react-icons/fa";

const WorkoutGroupForm = () => {
  const { formData, setFormData } = useAppContext();
  const [collapsed, setCollapsed] = useState(false);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }

    const reorderedList = reorderList(
      formData?.workouts,
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
              className=" flex flex-col dark:text-gray-100 items-center gap-4 w-11/12 md:w-4/5"
            >
              {
                formData?.workouts.length !== 0 && (

                  <button
                    onClick={() => setCollapsed((prev) => !prev)}
                    className="self-end bg-color1 text-gray-100  p-2 rounded-md text-xs md:text-sm font-medium"
                  >
                    {collapsed ? "Expand Workouts" : "Reorder Workouts"}
                  </button>
                )}

              {formData?.workouts.map((workoutItem, workoutIndex) => (
                <WorkoutForm
                  key={workoutIndex}
                  workoutIndex={workoutIndex}
                  workoutItem={workoutItem}
                  collapsed={collapsed}
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
          className="bg-color1 text-gray-100"
          position={1}
          icon={<FaPlus />}
        />
      </div>
    </>
  );
};

export default WorkoutGroupForm;
