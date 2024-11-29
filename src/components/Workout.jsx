import PropTypes from "prop-types";
import { Exercise } from ".";

const Workout = ({ title, exercises }) => {
  return (
    <div className="p-4 rounded-md bg-lightColor dark:bg-darkColor w-full">
      <div>
        <p className="font-subHead font-bold">{title}</p>
      </div>
      <hr className="border-gray-500 dark:border-gray-100" />
      {exercises?.map((exercise, index) => {
        return <Exercise key={index} {...exercise} />;
      })}
    </div>
  );
};

Workout.propTypes = {
  title: PropTypes.string.isRequired,
  exercises: PropTypes.array.isRequired,
};

export default Workout;
