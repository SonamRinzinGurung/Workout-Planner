import PropTypes from "prop-types";
import { Workout } from ".";
import vine from "../assets/vine.png";
import sakura from "../assets/sakura.png";

const Plan = ({ name, workouts }) => {
  return (
    <div className="p-2 flex flex-col gap-2">
      <div className="flex self-center justify-center">
        <img src={vine} alt="vine" className="w-8 h-8" />
        <p className="font-subHead font-semibold italic -ml-1 self-center">
          {name}
        </p>
        <img src={sakura} alt="sakura" className="w-10 h-10" />
      </div>
      <div className="flex flex-wrap gap-3 justify-center">
        {workouts?.map((workout, index) => {
          return <Workout key={index} {...workout} />;
        })}
      </div>
    </div>
  );
};

Plan.propTypes = {
  name: PropTypes.string.isRequired,
  workouts: PropTypes.array.isRequired,
};

export default Plan;
