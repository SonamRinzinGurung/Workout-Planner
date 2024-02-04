import PropTypes from "prop-types";
import { Exercise } from ".";

const Workout = ({ title, exercises }) => {
  return (
    <div className="p-4 relative border hover:shadow-xl transition ease-in-out duration-300 hover:-translate-y-1 rounded-sm w-60 lg:w-72 cursor-pointer">
      <div>
        <p className="font-subHead font-bold text-primary">{title}</p>
      </div>
      <hr />
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
