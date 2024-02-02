import PropTypes from "prop-types";
import { Workout, Button } from ".";
import vine from "../assets/vine.png";
import sakura from "../assets/sakura.png";
import { MdDeleteOutline } from "react-icons/md";

const Plan = ({ _id, name, workouts, source, handleDelete, handleRestore }) => {
  return (
    <div className="p-2 flex flex-col gap-2">
      <div className="flex self-center justify-center">
        <img src={vine} alt="vine" className="w-8 h-8" />
        <p className="font-subHead font-semibold italic -ml-1 self-center">
          {name}
        </p>
        <img src={sakura} alt="sakura" className="w-10 h-10" />
      </div>
      {source === "removed" && (
        <div className="flex self-center gap-8 my-4">
          <Button
            name="Restore"
            className="border text-blue-600 hover:bg-blue-600 hover:text-gray-50 dark:bg-blue-500 dark:text-gray-50 dark:hover:bg-blue-700"
            position={2}
            handleClick={() => handleRestore(_id)}
          />
          <Button
            name="Delete"
            className="bg-red-600 text-gray-50 hover:bg-red-700"
            icon={<MdDeleteOutline />}
            position={2}
            handleClick={() => handleDelete(_id)}
          />
        </div>
      )}

      <div className="flex flex-wrap gap-3 justify-center">
        {workouts?.map((workout, index) => {
          return (
            <Workout key={index} {...workout} planId={_id} source={source} />
          );
        })}
      </div>
    </div>
  );
};

Plan.propTypes = {
  name: PropTypes.string.isRequired,
  workouts: PropTypes.array.isRequired,
  _id: PropTypes.string,
  source: PropTypes.string,
  handleDelete: PropTypes.func,
  handleRestore: PropTypes.func,
};

export default Plan;
