import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import conditionalComponent from "../utils/conditionalComponent";
import { Button } from "../components";
import { GrNext } from "react-icons/gr";
import { AiOutlineSend } from "react-icons/ai";
import useSetTitle from "../utils/useSetTitle";
import { formValidation } from "../utils/formValidator";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { delay } from "../utils/delayFetch";
import { AppContext } from "../context/appContext"
import { db } from "../firebase-config";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

const CreatePlan = ({ user }) => {
  useSetTitle("Create Workout Plan");
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    workouts: [
      {
        title: "",
        exercises: [{ name: "", sets: "", reps: "", weight: "", order: 0 }],
        order: 0,
      },
    ],
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleNext = () => {
    setPage((prev) => prev + 1);
  };
  const handleBack = () => {
    setPage((prev) => prev - 1);
  };

  const { mutate: createPlanMutation } = useMutation({
    mutationFn: async (formData) => {
      setIsLoading(true);
      await delay(500);
      const plansRef = await addDoc(collection(db, "workoutPlans"), {
        name: formData?.name,
        uid: user?.uid,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        isArchived: false,
      });

      for (const workout of formData.workouts) {
        const workoutRef = await addDoc(collection(plansRef, "workouts"), {
          title: workout?.title,
          order: workout?.order,
          createdAt: serverTimestamp(),
        })

        for (const exercise of workout.exercises) {
          await addDoc(collection(workoutRef, "exercises"), {
            ...exercise,
          })
        }
      }

    },
    onSuccess: () => {
      setIsLoading(false);
      toast.success("Workout Plan saved successfully!");
      navigate("/");
    },
    onError: (data) => {
      setIsLoading(false);
      toast.error(data.response.data.msg);
    },
  });

  const handleSubmit = () => {
    const { isValid, messages } = formValidation(formData);

    if (!isValid) {
      messages.forEach((message) => toast.error(message));
      setPage(0);
    }
    if (isValid) {
      createPlanMutation(formData);
    }
  };

  const memoizedValue = useMemo(() => ({ formData, setFormData }), [formData, setFormData])

  return (
    <main className="md:mt-20 mt-10 mb-10 flex flex-col dark:text-gray-100 text-gray-800 gap-8">
      <div className="flex justify-center items-center gap-2">
        <h1 className="font-heading font-bold text-3xl md:text-4xl text-center">
          Create Workout Plan
        </h1>
      </div>
      <div className="flex flex-col items-center gap-10">
        <AppContext.Provider value={memoizedValue}>
          {conditionalComponent({ page })}
        </AppContext.Provider>
        <div className="flex gap-10">
          {page > 0 && (
            <Button
              handleClick={handleBack}
              name="Back"
              className="border dark:hover:shadow-gray-700 "
              icon={<GrNext className="rotate-180" />}
              position={1}
            />
          )}
          {page >= 0 && page < 2 && (
            <Button
              name="Next"
              handleClick={handleNext}
              className="border dark:hover:shadow-gray-700"
              icon={<GrNext className="" />}
              position={2}
            />
          )}
          {page === 2 && (
            <Button
              name="Submit"
              handleClick={handleSubmit}
              className="bg-primary hover:bg-primaryDark text-gray-100 dark:hover:shadow-gray-800"
              icon={<AiOutlineSend />}
              isPending={isLoading}
              position={2}
            />
          )}
        </div>
      </div>
    </main>
  );
};

CreatePlan.propTypes = {
  user: PropTypes.object,
}

export default CreatePlan;