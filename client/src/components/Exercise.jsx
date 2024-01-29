import PropTypes from "prop-types";

const Exercise = ({ name, reps, sets, weight }) => {
  return (
    <div className="p-2 font-mono">
      <div>
        <p className="font-medium">{name}</p>
      </div>
      <div className="">
        <div>
          <span className="">Sets: </span>
          <span className="font-subHead">{sets}</span>
        </div>
        <div>
          <span>Reps: </span>
          <span className="font-subHead">{reps}</span>
        </div>
        {weight ? (
          <div>
            <span>Weight: </span>
            <span className="font-subHead">{weight} kg</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};

Exercise.propTypes = {
  name: PropTypes.string.isRequired,
  reps: PropTypes.number.isRequired,
  sets: PropTypes.number.isRequired,
  weight: PropTypes.number,
};

export default Exercise;
