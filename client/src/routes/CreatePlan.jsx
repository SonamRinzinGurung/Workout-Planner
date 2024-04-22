import { useState, useRef } from "react";
import conditionalComponent from "../utils/conditionalComponent";
import { Button } from "../components";
import { GrNext } from "react-icons/gr";
import { AiOutlineSend } from "react-icons/ai";
import useSetTitle from "../utils/useSetTitle";
import axiosFetch from "../utils/axiosInterceptor";
import { formValidation } from "../utils/formValidator";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";
import { delay } from "../utils/delayFetch";

const CreatePlan = () => {
  useSetTitle("Create Workout Plan");
  const scrollRef = useRef(null);
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
      return axiosFetch.post("/workout-plan/", {
        ...formData,
      });
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
    scrollRef?.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="my-10 dark:text-gray-100 text-gray-800">
      <div
        ref={scrollRef}
        className="mb-4 flex justify-center items-center gap-2"
      >
        <h1 className="text-center font-heading font-bold text-2xl text-green-500">
          {isLoading ? "Creating" : "Create"} Workout Plan
        </h1>
        {isLoading && (
          <ReactLoading
            height="32px"
            width="32px"
            type="balls"
            color="#22c55e"
          />
        )}
      </div>
      <div className="flex flex-col items-center gap-4">
        {conditionalComponent({ page, formData, setFormData })}
        <div className="flex gap-10 mt-2">
          {page > 0 && (
            <Button
              handleClick={handleBack}
              name="Back"
              className="border dark:hover:shadow-gray-700"
              icon={<GrNext className="rotate-180" />}
              position={1}
            />
          )}
          {page === 0 && (
            <Button
              name="Next"
              handleClick={handleNext}
              className="border dark:hover:shadow-gray-700"
              icon={<GrNext className="" />}
              position={2}
            />
          )}
          {page === 1 && (
            <Button
              name="Submit"
              handleClick={handleSubmit}
              className="bg-primary hover:bg-primaryDark text-gray-100 dark:hover:shadow-gray-800"
              icon={<AiOutlineSend className="" />}
              position={2}
            />
          )}
        </div>
      </div>
    </main>
  );
};

export default CreatePlan;
