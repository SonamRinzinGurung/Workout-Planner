import { useState } from "react";
import conditionalComponent from "../utils/conditionalComponent";

const CreatePlan = () => {
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
    <main className="flex flex-col gap-2 items-center mt-10  dark:text-gray-100">
      <div>
        <p>Create Workout Plan</p>
      </div>
      <div>
        <div className="flex flex-col gap-4">
          {conditionalComponent({ page, formData, setFormData })}
          <div>
            {page > 0 && <button onClick={handleBack}>Back</button>}
            {page >= 0 && page < 2 ? (
              <button className="border border-red-500" onClick={handleNext}>
                {page >= 0 && "Next"}
              </button>
            ) : null}
            {page > 1 && <button onClick={handleSubmit}>Submit</button>}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreatePlan;
