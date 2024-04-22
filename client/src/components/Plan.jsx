import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Workout, Button, InputText } from ".";
import { useNavigate } from "react-router-dom";
import vine from "../assets/vine.png";
import sakura from "../assets/sakura.png";
import { BsThreeDots } from "react-icons/bs";
import axiosFetch from "../utils/axiosInterceptor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const Plan = ({ _id, name, workouts, source, handleDelete, handleRestore, setFormData }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

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

  const { mutate: removePlan } = useMutation({
    mutationFn: async (id) => {
      const { data } = await axiosFetch.delete(`/workout-plan/${id}`);
      return data;
    },
    onSuccess: () => {
      toast.success("Workout plan moved to removed .");
      queryClient.invalidateQueries("workout-plan");
    },
    onError: (data) => {
      toast.error(data.response.data.msg);
    },
  });

  const handleNameChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      name: e.target.value
    }))
  }
  return (
    <div className="p-2 flex flex-col gap-2">
      <div
        ref={modalRef}
        className="relative flex justify-center items-center gap-4"
      >
        {source === "create" && (
          <div className="flex flex-col items-center gap-1">
            <div>
              <p className="font-subHead font-semibold text-center">
                Name the Workout Plan
              </p>
            </div>
            <div>
              <InputText
                name="name"
                value={name}
                handleChange={handleNameChange}
              />
            </div>
          </div>)}
        {source !== "create" && (

          <div className="flex ">
          <img src={vine} alt="vine" className="w-8 h-8" />
          <p className="font-subHead font-semibold italic -ml-1 self-center">
            {name}
          </p>
          <img src={sakura} alt="sakura" className="w-10 h-10" />
        </div>
        )}
        {source !== "create" && (
          <button
            className="relative rounded-full p-1 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-800"
            onClick={() => setModalState((prev) => !prev)}
          >
            <BsThreeDots size="25" />
          </button>
        )}
        <div
          className={`absolute top-full min-w-48  h-full flex justify-center items-center z-50 ${
            modalState ? `opacity-100  visible` : `opacity-0 invisible`
          }`}
          style={{ transition: "opacity 0.4s" }}
        >
          <div className="absolute p-4 w-full bg-gray-50 shadow-md border rounded-lg  flex flex-col items-center top-6 dark:bg-gray-900">
            <div className="flex flex-col w-10/12 gap-4">
              {source === "home" && (
                <>
                  <Button
                    name="Edit"
                    className={
                      "border text-blue-600 dark:text-blue-300 dark:hover:text-blue-400"
                    }
                    handleClick={() => navigate(`/edit/${_id}`)}
                  />
                  <Button
                    name="Delete"
                    className={"bg-red-600 text-gray-50 hover:bg-red-700"}
                    handleClick={() => removePlan(_id)}
                  />
                </>
              )}

              {source === "removed" && (
                <>
                  <Button
                    name="Restore"
                    className="border text-blue-600 dark:text-blue-300 dark:hover:text-blue-400"
                    position={2}
                    handleClick={() => handleRestore(_id)}
                  />
                  <Button
                    name="Delete"
                    className="bg-red-600 text-gray-50 hover:bg-red-700"
                    handleClick={() => handleDelete(_id)}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

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
  setFormData: PropTypes.func,
};

export default Plan;
