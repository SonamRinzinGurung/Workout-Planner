import { useRef } from "react";
import PropTypes from "prop-types";
import {
  Workout,
  Button,
  InputText,
  PopOverOptionsMenu,
  MobileBottomSheet,
} from ".";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { doc, updateDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase-config";
import { BiEditAlt, BiArchive } from "react-icons/bi";
import useIsMobile from "../hooks/useIsMobile";

const Plan = ({
  id,
  name,
  workouts,
  source = "home",
  handleDelete,
  handleRestore,
  setFormData,
  removeLoading,
}) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const modalRef = useRef(null);
  const isMobile = useIsMobile();

  const { mutate: archivePlan, isPending } = useMutation({
    mutationFn: async (id) => {
      const docRef = doc(db, "workoutPlans", id);
      return await updateDoc(docRef, {
        isArchived: true,
        updatedAt: serverTimestamp(),
      });
    },
    onSuccess: () => {
      toast.success("Workout plan moved to archives");
      queryClient.invalidateQueries("workout-plan");
      if (source === "detail") {
        navigate("/archived-plans");
      }
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
    <div className="flex flex-col rounded-md">
      <div ref={modalRef} className="relative flex flex-col items-center">
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
          <div className="flex justify-between items-center gap-4 bg-emerald-400 dark:bg-emerald-800 rounded-md rounded-b-none w-full py-2 px-6">
            <div>
              <p className="font-subHead font-semibold text-xl md:text-2xl">
                {name}
              </p>
            </div>

            {isMobile ? (
              <MobileBottomSheet
                content={
                  <div className="flex flex-col px-4 pb-6 pt-4 w-full gap-8">
                    <div className="flex w-full items-center justify-between">
                      <div className="text-xl font-medium">Options</div>
                    </div>
                    <div className="flex flex-col gap-4">
                      {source === "archived" ? (
                        <>
                          <Button
                            name="Restore"
                            className="border text-blue-600 dark:text-blue-300 dark:hover:text-blue-400"
                            position={2}
                            handleClick={() => {
                              handleRestore(id);
                            }}
                            isPending={removeLoading}
                          />
                          <Button
                            name="Delete"
                            className="bg-red-600 text-gray-50 hover:bg-red-700"
                            handleClick={() => {
                              handleDelete(id);
                            }}
                            isPending={removeLoading}
                          />
                        </>
                      ) : (
                          <>
                            <Button
                              name="Edit"
                              className={
                                "border text-blue-600 dark:text-blue-300 dark:hover:text-blue-400"
                              }
                              icon={<BiEditAlt />}
                              position={1}
                              handleClick={() => navigate(`/edit/${id}`)}
                            />
                            <Button
                              name="Archive"
                            className={
                              "bg-red-600 text-gray-50 hover:bg-red-700"
                            }
                            icon={<BiArchive />}
                            position={1}
                            handleClick={() => archivePlan(id)}
                            isPending={isPending}
                          />
                        </>
                      )}
                    </div>
                  </div>
                }
              />
            ) : (
              <PopOverOptionsMenu
                align="end"
                positions={["bottom", "left", "right", "top"]}
                content={
                  <div className="flex flex-col p-6 w-56 shadow-sm rounded-lg bg-gray-100 dark:bg-gray-800 gap-4">
                    {source === "archived" ? (
                      <>
                        <Button
                          name="Restore"
                          className="border text-blue-600 dark:text-blue-300 dark:hover:text-blue-400"
                          position={2}
                          handleClick={() => {
                            handleRestore(id);
                          }}
                          isPending={removeLoading}
                        />
                        <Button
                          name="Delete"
                          className="bg-red-600 text-gray-50 hover:bg-red-700"
                          handleClick={() => {
                            handleDelete(id);
                          }}
                          isPending={removeLoading}
                        />
                      </>
                    ) : (
                      <>
                        <Button
                          name="Edit"
                          className={
                            "border text-blue-600 dark:text-blue-300 dark:hover:text-blue-400"
                          }
                          icon={<BiEditAlt />}
                          position={1}
                          handleClick={() => navigate(`/edit/${id}`)}
                        />
                        <Button
                          name="Archive"
                          className={"bg-red-600 text-gray-50 hover:bg-red-700"}
                          icon={<BiArchive />}
                          position={1}
                          handleClick={() => archivePlan(id)}
                          isPending={isPending}
                        />
                      </>
                    )}
                  </div>
                }
              />
            )}
          </div>
        )}
      </div>

      <div
        className={`flex flex-wrap gap-3 justify-center mb-2 px-2 py-6 ${source !== "create" &&
          "border border-t-0 border-emerald-400 dark:border-emerald-800 border-x-2 rounded-md rounded-t-none bg-emerald-50 dark:bg-emerald-900"
          }`}
      >
        {workouts?.map((workout, index) => {
          return (
            <Workout key={index} {...workout} planId={id} source={source} />
          );
        })}
      </div>
    </div>
  );
};

Plan.propTypes = {
  name: PropTypes.string.isRequired,
  workouts: PropTypes.array.isRequired,
  id: PropTypes.string,
  source: PropTypes.string,
  handleDelete: PropTypes.func,
  handleRestore: PropTypes.func,
  setFormData: PropTypes.func,
  removeLoading: PropTypes.bool,
};

export default Plan;
