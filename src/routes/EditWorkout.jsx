import { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { useParams, useNavigate } from "react-router-dom";
import useSetTitle from "../utils/useSetTitle";
import { useQuery, useMutation } from "@tanstack/react-query";
import ReactLoading from "react-loading";
import { Button, WorkoutForm, InputText } from "../components";
import { toast } from "react-toastify";
import { delay } from "../utils/delayFetch";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { handleAddWorkout } from "../utils/formHandlers";
import { reorderList } from "../utils/reorderList";
import { formValidation } from "../utils/formValidator";
import { AppContext } from "../context/appContext";
import useScrollToTop from "../utils/useScrollToTop";
import { FaPlus } from "react-icons/fa";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  query,
  where,
  doc,
  updateDoc,
  addDoc,
  serverTimestamp,
  orderBy,
  deleteDoc,
  setDoc,
} from "firebase/firestore";

const EditWorkout = ({ user }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  useSetTitle("Edit Workout");
  useScrollToTop();

  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    workouts: [
      {
        title: "",
        exercises: [{ name: "", sets: "", reps: "", weight: "" }],
      },
    ],
  });
  const [deletedWorkouts, setDeletedWorkouts] = useState([]);
  const [deletedExercises, setDeletedExercises] = useState([]);
  const [collapsed, setCollapsed] = useState(false);

  const memoizedValue = useMemo(
    () => ({ formData, setFormData, setDeletedExercises, setDeletedWorkouts }),
    [formData, setFormData, setDeletedExercises, setDeletedWorkouts]
  );

  const { isPending, error } = useQuery({
    queryKey: ["workout-plan-detail"],
    queryFn: async () => {
      const q = query(
        collection(db, "workoutPlans"),
        where("uid", "==", user?.uid)
      );
      const planSnapshot = await getDocs(q);
      const planDoc = planSnapshot.docs.find((doc) => doc.id === id);
      const planData = { ...planDoc.data(), workouts: [] };

      // get workouts from workouts subcollection
      const workoutsSnapshot = await getDocs(
        query(collection(planDoc.ref, "workouts"), orderBy("order", "asc"))
      );

      for (const workoutDoc of workoutsSnapshot.docs) {
        const workoutData = {
          id: workoutDoc.id,
          ...workoutDoc.data(),
          exercises: [],
        };

        const exercisesSnapshot = await getDocs(
          query(
            collection(workoutDoc.ref, "exercises"),
            orderBy("order", "asc")
          )
        );
        workoutData.exercises = exercisesSnapshot.docs.map((exerciseDoc) => ({
          id: exerciseDoc.id,
          ...exerciseDoc.data(),
        }));
        planData.workouts.push(workoutData);
      }
      setFormData(planData);
      return planData;
    },
    refetchOnWindowFocus: false,
  });

  const { mutate: editWorkout } = useMutation({
    mutationFn: async (formData) => {
      setIsLoading(true);
      await delay(500);

      const planRef = doc(db, "workoutPlans", id);

      await updateDoc(planRef, {
        name: formData.name,
        updatedAt: serverTimestamp(),
      });

      for (const workout of formData.workouts) {
        let workoutRef;

        if (workout.id) {
          // Existing workout: Reference the document directly
          workoutRef = doc(collection(planRef, "workouts"), workout.id);

          await setDoc(
            workoutRef,
            {
              title: workout.title,
              order: workout.order,
            },
            { merge: true }
          );
        } else {
          // New workout: Use addDoc() to create a new document and get its reference
          workoutRef = await addDoc(collection(planRef, "workouts"), {
            title: workout.title,
            order: workout.order,
            createdAt: serverTimestamp(),
          });

          workout.id = workoutRef.id;
        }

        // Step 3: Loop through each exercise in the current workout
        for (const exercise of workout.exercises) {
          let exerciseRef;

          if (exercise.id) {
            // Existing exercise: Reference the document directly
            exerciseRef = doc(collection(workoutRef, "exercises"), exercise.id);

            await setDoc(
              exerciseRef,
              {
                ...exercise,
              },
              { merge: true }
            );
          } else {
            // New exercise: Use addDoc() to create a new document
            const exerciseRef = await addDoc(
              collection(workoutRef, "exercises"),
              {
                ...exercise,
              }
            );
            exercise.id = exerciseRef.id;
          }
        }
      }

      for (const { workoutId, exerciseId } of deletedExercises) {
        await deleteDoc(
          doc(planRef, "workouts", workoutId, "exercises", exerciseId)
        );
      }

      for (const workoutId of deletedWorkouts) {
        await deleteDoc(doc(planRef, "workouts", workoutId));
      }

      setDeletedExercises([]);
      setDeletedWorkouts([]);

      return formData;
    },
    onSuccess: () => {
      setIsLoading(false);
      toast.success("Workout Edited Successfully!");
      navigate("/");
    },
    onError: (data) => {
      setIsLoading(false);
      toast.error(data.response.data.msg);
    },
  });

  const handleNameChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      name: e.target.value,
    }));
  };

  const handleSubmit = () => {
    const { isValid, messages } = formValidation(formData);
    if (!isValid) {
      messages.forEach((message) => toast.error(message));
    }
    if (isValid) {
      editWorkout(formData);
    }
  };

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    if (result.destination.index === result.source.index) {
      return;
    }

    const reorderedList = reorderList(
      formData.workouts,
      result.source.index,
      result.destination.index
    );

    setFormData((prevState) => ({
      ...prevState,
      workouts: reorderedList.map((workout, index) => ({
        ...workout,
        order: index,
      })),
    }));
  };

  if (isPending) {
    return (
      <ReactLoading
        type="spinningBubbles"
        color="#8967b3"
        className="mx-auto mt-16"
      />
    );
  }

  if (error) {
    return (
      <div className="dark:text-gray-100 mt-10">
        <p className="font-subHead font-semibold text-2xl text-center">
          ERROR!! {error.message}
        </p>
      </div>
    );
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="1">
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex flex-col text-gray-900 dark:text-gray-100 items-center gap-4 w-11/12 md:w-4/5 mx-auto md:mt-20 mt-10 mb-10"
            >
              <div className="">
                <p className="text-center font-heading font-bold text-3xl md:text-4xl">
                  Edit Workout
                </p>
              </div>

              <div className="flex flex-col items-center gap-1 mb-4 w-full">
                <div>
                  <p className="font-subHead text-center text-xl md:text-2xl">
                    Workout Plan Name
                  </p>
                </div>
                  <InputText
                    name="plan name"
                    value={formData?.name}
                    handleChange={handleNameChange}
                  className="border border-gray-500 p-2 rounded-md font-mono dark:bg-gray-900 text-center md:text-lg md:w-1/2 w-3/4 mx-auto h-14 focus:outline-none focus:ring-1 focus:ring-gray-500"
                />
              </div>
              <AppContext.Provider value={memoizedValue}>
                <div className="dark:text-gray-100 flex flex-col gap-4 w-full">
                  {
                    formData?.workouts.length !== 0 && (

                      <button
                        onClick={() => setCollapsed((prev) => !prev)}
                        className="self-end bg-color1 text-white  p-2 rounded-md font-medium text-xs md:text-sm"
                      >
                        {collapsed ? "Expand Workouts" : "Reorder Workouts"}
                      </button>
                    )}
                  {formData.workouts.map((workoutItem, workoutIndex) => (
                    <WorkoutForm
                      key={workoutIndex}
                      workoutIndex={workoutIndex}
                      workoutItem={workoutItem}
                      collapsed={collapsed}
                    />
                  ))}
                  {provided.placeholder}
                </div>
              </AppContext.Provider>
              <div id="add-workout" className="">
                <Button
                  name="Workout"
                  handleClick={() => handleAddWorkout(setFormData)}
                  className="bg-color1 text-gray-100"
                  position={1}
                  icon={<FaPlus />}
                />
              </div>
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="text-center mt-4 mb-10">
        <Button
          name="Save Edit"
          handleClick={handleSubmit}
          className="bg-color2 text-gray-100 w-28"
          icon={
            isLoading && (
              <ReactLoading
                height="28px"
                width="28px"
                type="balls"
                color="#ffffff"
              />
            )
          }
          position={2}
          isPending={isLoading}
        />
      </div>
    </>
  );
};

EditWorkout.propTypes = {
  user: PropTypes.object,
};
export default EditWorkout;
