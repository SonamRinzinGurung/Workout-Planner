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
              className=" flex flex-col dark:text-gray-100 items-center gap-4 w-4/5 md:w-3/5"
            >
              {
                formData?.workouts.length !== 0 && (

                  <button
                    onClick={() => setCollapsed((prev) => !prev)}
                    className="self-end bg-emerald-200 dark:bg-gray-800 py-1 px-2 rounded-md font-subHead font-semibold text-sm"
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
          className="bg-primary hover:bg-primaryDark text-gray-100 hover:text-gray-200 dark:text-gray-900 dark:hover:text-gray-800"
          position={1}
          icon={<FaPlus />}
        />
      </div>
    </>
  );
};

export default WorkoutGroupForm;
