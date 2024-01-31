import PropTypes from "prop-types";
import { Exercise, Button } from ".";
import { useState } from "react";
const Workout = ({ title, exercises }) => {
  const [modalState, setModalState] = useState(false);
  return (
    <div
      className="p-4 relative border hover:shadow-xl transition ease-in-out duration-300 hover:-translate-y-1 rounded-sm w-60 lg:w-72 cursor-pointer"
      onClick={() => setModalState((prev) => !prev)}
    >
      <div>
        <p className="font-subHead font-bold text-primary">{title}</p>
      </div>
      <hr />
      {exercises?.map((exercise, index) => {
        return <Exercise key={index} {...exercise} />;
      })}
      <div
        className={`absolute top-0 left-0 w-full h-full flex justify-center items-center z-50 backdrop-filter backdrop-blur-sm ${
          modalState ? `opacity-100` : `opacity-0`
        }`}
        style={{ transition: "opacity 0.4s" }}
      >
        <div className="absolute p-4 bg-white shadow-md rounded-sm w-3/4 flex flex-col items-center top-6 dark:bg-gray-900">
          <div className="flex flex-col w-10/12 gap-4">
            <Button
              name="Edit"
              className={"text-blue-500 dark:text-blue-300 border"}
              handleClick={() => console.log("edit page")}
            />
            <Button
              name="Delete"
              className={"text-red-500 dark:text-red-300 border"}
              handleClick={() => console.log("delete")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

Workout.propTypes = {
  title: PropTypes.string.isRequired,
  exercises: PropTypes.array.isRequired,
};

export default Workout;
