import PropTypes from "prop-types";
import { Exercise, Button } from ".";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Workout = ({ planId, title, exercises, source }) => {
  const navigate = useNavigate();
  const [modalState, setModalState] = useState(false);
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setModalState(false); // close the modal when clicked outside
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setModalState]);

  return (
    <div
      ref={modalRef}
      className="p-4 relative border hover:shadow-xl transition ease-in-out duration-300 hover:-translate-y-1 rounded-sm w-60 lg:w-72 cursor-pointer"
      onClick={() => {
        source === "home" && setModalState((prev) => !prev);
      }}
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
          modalState ? `opacity-100  visible` : `opacity-0 invisible`
        }`}
        style={{ transition: "opacity 0.4s" }}
      >
        <div className="absolute p-4 bg-white shadow-md rounded-lg w-3/4 flex flex-col items-center top-6 dark:bg-gray-900">
          <div className="flex flex-col w-10/12 gap-4">
            <Button
              name="Edit"
              className={"text-blue-500 dark:text-blue-300 border"}
              handleClick={() => navigate(`/edit/${planId}`)}
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
  planId: PropTypes.string,
  source: PropTypes.string,
};

export default Workout;
