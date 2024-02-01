import { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useSetTitle from "../utils/useSetTitle";
import { useQuery, useMutation } from "@tanstack/react-query";
import ReactLoading from "react-loading";
import axiosFetch from "../utils/axiosInterceptor";
import { Button, ExerciseForm } from "../components";
import { MdEdit } from "react-icons/md";
import { toast } from "react-toastify";
import { delay } from "../utils/delayFetch";
import { handleWorkoutChange } from "../utils/formHandlers";

const EditWorkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  useSetTitle("Edit Workout");
  const scrollRef = useRef(null);

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
    editWorkout(formData);
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div ref={scrollRef} className="my-10 text-gray-900 dark:text-gray-100">
      <div className="mb-4 flex justify-center items-center gap-2">
        <p className="text-center font-heading font-bold text-2xl text-green-500">
          {isLoading ? "Editing" : "Edit"} Workout
        </p>
        {isLoading && (
          <ReactLoading
            height="32px"
            width="32px"
            type="balls"
            color="#22c55e"
          />
        )}
      </div>

      <div className="flex gap-4 flex-wrap dark:text-gray-100 justify-center">
        {formData.workouts.map((workoutItem, workoutIndex) => (
          <div
            key={workoutItem._id}
            className="flex flex-col gap-2 items-center shadow-md mb-4 p-6 rounded-md dark:bg-gray-900"
          >
            <div className="flex flex-col gap-1">
              <div className="flex items-center justify-center gap-2">
                <p className="font-subHead font-semibold text-center">
                  Name of the Workout
                </p>
                <p className="font-subHead font-medium text-sm text-center">
                  -Day {workoutIndex + 1}
                </p>
              </div>
              <input
                className="border border-gray-500 p-2 rounded-md font-mono text-xs text-center dark:bg-gray-900"
                type="text"
                name="title"
                placeholder="Workout Name"
                value={workoutItem.title}
                onChange={(event) =>
                  handleWorkoutChange(
                    formData,
                    setFormData,
                    workoutIndex,
                    event
                  )
                }
              />
            </div>
            <div className="flex flex-col items-center gap-2 p-2 rounded-md">
              <div>
                <p className="font-subHead font-semibold text-center">
                  Exercise Details
                </p>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {workoutItem.exercises.map((exerciseItem, exerciseIndex) => (
                  <ExerciseForm
                    key={exerciseItem._id}
                    exerciseItem={exerciseItem}
                    exerciseIndex={exerciseIndex}
                    workoutIndex={workoutIndex}
                    setFormData={setFormData}
                  />
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-4">
        <Button
          name="Edit"
          handleClick={handleSubmit}
          className="bg-blue-500 hover:bg-blue-700 text-gray-100 dark:hover:shadow-gray-800"
          icon={<MdEdit />}
          position={2}
        />
      </div>
    </div>
  );
};

export default EditWorkout;
