import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { Workout, Button, InputText } from ".";
import { useNavigate } from "react-router-dom";
import { BsThreeDots } from "react-icons/bs";
import axiosFetch from "../utils/axiosInterceptor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import ReactLoading from "react-loading";

const Plan = ({
  _id,
  name,
  workouts,
  source,
  handleDelete,
  handleRestore,
  setFormData,
  removeLoading,
}) => {
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

  const { mutate: removePlan, isPending } = useMutation({
    mutationFn: async (id) => {
      setModalState(false);
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
      name: e.target.value,
    }));
  };
  return (
    <div className="flex flex-col rounded-sm"> 
      <div
        ref={modalRef}
        className="relative flex flex-col items-center"
      >
        {source === "create" && (
          <div className="flex flex-col items-center gap-1 my-4">
            <div>
              <p className="font-subHead text-center">Name the Workout Plan</p>
            </div>
            <div>
              <InputText
                name="plan name"
                value={name}
                handleChange={handleNameChange}
              />
            </div>
          </div>
        )}
        {source !== "create" && (
          <div className="flex justify-center items-center gap-4 bg-emerald-400 dark:bg-emerald-800 rounded-sm rounded-b-none w-full py-2">

            <div>
              <p className="font-subHead font-semibold text-lg italic self-center">
              {name}
              </p>
          </div>

          <button
            className="relative rounded-full p-1 cursor-pointer hover:bg-gray-300 dark:hover:bg-gray-800"
            onClick={() => setModalState((prev) => !prev)}
          >
            {isPending || removeLoading ? (
              <ReactLoading
                height="28px"
                width="28px"
                type="balls"
                color="#ffffff"
              />
            ) : (
                <BsThreeDots size="25" />
            )}
          </button>
          </div>

        )}
        <div
          className={`absolute top-full min-w-48  h-full flex justify-center items-center z-50 ${
            modalState ? `opacity-100  visible` : `opacity-0 invisible`
          }`}
          style={{ transition: "opacity 0.4s" }}
        >
          <div className="absolute p-4 w-full bg-gray-200 shadow-md border border-gray-400 rounded-lg  flex flex-col items-center top-1 dark:bg-gray-900">
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
                    isPending={isPending}
                  />
                </>
              )}

              {source === "removed" && (
                <>
                  <Button
                    name="Restore"
                    className="border text-blue-600 dark:text-blue-300 dark:hover:text-blue-400"
                    position={2}
                    handleClick={() => {
                      handleRestore(_id);
                      setModalState(false);
                    }}
                    isPending={removeLoading}
                  />
                  <Button
                    name="Delete"
                    className="bg-red-600 text-gray-50 hover:bg-red-700"
                    handleClick={() => {
                      handleDelete(_id);
                      setModalState(false);
                    }}
                    isPending={removeLoading}
                  />
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className={`flex flex-wrap gap-3 justify-center mb-2 px-2 py-6 ${source !== 'create' && 'border border-t-0 border-emerald-400 dark:border-emerald-800 border-x-2 rounded-sm rounded-t-none bg-emerald-50 dark:bg-black'}`}>
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
  removeLoading: PropTypes.bool,
};

export default Plan;
