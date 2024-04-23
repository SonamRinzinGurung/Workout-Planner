import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useSetTitle from "../utils/useSetTitle";
import { useQuery, useMutation } from "@tanstack/react-query";
import ReactLoading from "react-loading";
import axiosFetch from "../utils/axiosInterceptor";
import { Button, WorkoutForm } from "../components";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { delay } from "../utils/delayFetch";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { handleAddWorkout } from "../utils/formHandlers";
import { IoAddCircle } from "react-icons/io5";
import { reorderList } from "../utils/reorderList";
import { formValidation } from "../utils/formValidator";

const EditWorkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  useSetTitle("Edit Workout");

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    workouts: [
      {
        title: "",
        exercises: [{ name: "", sets: "", reps: "", weight: "" }],
      },
    ],
  });

  const { isPending, error } = useQuery({
    queryKey: ["workout-plan-detail"],
    queryFn: async () => {
      const { data } = await axiosFetch.get(`/workout-plan/${id}`);
      setFormData(data);
      return data;
    },
    refetchOnWindowFocus: false,
  });

  const { mutate: editWorkout } = useMutation({
    mutationFn: async (formData) => {
      setIsLoading(true);
      await delay(500);
      const { data } = await axiosFetch.patch("/workout-plan/edit-workout/", {
        ...formData,
      });
      return data;
    },
    onSuccess: () => {
      setIsLoading(false);

      toast.success("Workout Edited Successfully!");
      navigate("/");
    },
    onError: (data) => {
      setIsLoading(false);
      toast.error(data.response.data.msg);
    },
  });

  if (isPending) {
    return (
      <ReactLoading
        type="spinningBubbles"
        color="#D5B263"
        className="mx-auto mt-16"
      />
    );
  }
  if (error) {
    return (
      <div className="dark:text-gray-100 mt-10">
        <p className="font-subHead font-semibold text-2xl text-center">
          ERROR!! {error.message}
        </p>
      </div>
    );
  }

  const handleSubmit = () => {
    const { isValid, messages } = formValidation(formData);
    if (!isValid) {
      messages.forEach((message) => toast.error(message));
    }
    if (isValid) {
      editWorkout(formData);
    }
  };
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }

    const reorderedList = reorderList(
      formData.workouts,
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
              className="mt-10 text-gray-900 dark:text-gray-100 flex flex-col items-center"
            >
              <div className="mb-4 flex justify-center items-center gap-2">
                <p className="text-center font-heading font-bold text-2xl text-green-500">
                  Edit Workout
                </p>
              </div>

              <div className="dark:text-gray-100 justify-center">
                {formData.workouts.map((workoutItem, workoutIndex) => (
                  <WorkoutForm
                    key={workoutIndex}
                    workoutIndex={workoutIndex}
                    workoutItem={workoutItem}
                    setFormData={setFormData}
                    workouts={formData.workouts}
                  />
                ))}
                {provided.placeholder}
              </div>
              <div id="add-workout">
                <Button
                  name="Workout"
                  handleClick={() => handleAddWorkout(setFormData)}
                  className="bg-primary hover:bg-primaryDark text-gray-100 hover:text-gray-200 dark:text-gray-900 dark:hover:text-gray-800"
                  position={1}
                  icon={<IoAddCircle className="w-5 h-5" />}
                />
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="text-center mt-4 mb-10">
        <Button
          name="Save"
          handleClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-gray-100 dark:hover:shadow-gray-800 w-28"
          icon={
            isLoading ? (
              <ReactLoading
                height="28px"
                width="28px"
                type="balls"
                color="#ffffff"
              />
            ) : (
              <MdEdit />
            )
          }
          position={2}
          isPending={isLoading}
        />
      </div>
    </>
  );
};

export default EditWorkout;
