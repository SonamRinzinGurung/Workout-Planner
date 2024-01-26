import { useState } from "react";
import conditionalComponent from "../utils/conditionalComponent";
import { Button } from "../components";
import { GrNext } from "react-icons/gr";
import { AiOutlineSend } from "react-icons/ai";
import useSetTitle from "../utils/useSetTitle";

const CreatePlan = () => {
  useSetTitle("Create Workout Plan");

  const [page, setPage] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    workouts: [
      {
        title: "",
        exercises: [{ name: "", sets: "", reps: "", weight: "" }],
      },
    ],
  });
  const handleNext = () => {
    setPage((prev) => prev + 1);
  };
  const handleBack = () => {
    setPage((prev) => prev - 1);
  };

  const handleSubmit = () => {
    console.log(formData);
  };

  return (
    <main className="my-10 dark:text-gray-100 text-gray-800">
      <div className="mb-4">
        <p className="text-center font-heading font-bold text-2xl text-green-500">
          Create Workout Plan
        </p>
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
          {page >= 0 && page < 2 ? (
            <Button
              name="Next"
              handleClick={handleNext}
              className="border dark:hover:shadow-gray-700"
              icon={<GrNext className="" />}
              position={2}
            />
          ) : null}
          {page > 1 && (
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
