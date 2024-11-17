import { useState } from "react";
import PropTypes from "prop-types";
import useSetTitle from "../utils/useSetTitle";
import { Plan } from "../components";
import ReactLoading from "react-loading";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  doc,
  updateDoc,
  serverTimestamp,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase-config";

const ArchivedPlans = ({ user }) => {
  useSetTitle("Archived Plans");
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const { isPending, error, data } = useQuery({
    queryKey: ["removed-plan"],
    queryFn: async () => {
      const q = query(
        collection(db, "workoutPlans"),
        where("uid", "==", user?.uid),
        where("isArchived", "==", true),
        orderBy("updatedAt", "desc")
      );
      const plansSnapshot = await getDocs(q);
      const plans = [];

      // get all plans of current user
      for (const planDoc of plansSnapshot.docs) {
        const planData = { id: planDoc.id, ...planDoc.data(), workouts: [] };

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
        plans.push(planData);
      }
      return plans;
    },
  });

  const { mutate: restorePlan } = useMutation({
    mutationFn: async (id) => {
      setIsLoading(true);
      const docRef = doc(db, "workoutPlans", id);
      return await updateDoc(docRef, {
        isArchived: false,
        updatedAt: serverTimestamp(),
      });
    },
    onSuccess: () => {
      setIsLoading(false);
      toast.success("Workout plan restored successfully");
      queryClient.invalidateQueries("removed-plan");
    },
    onError: (data) => {
      setIsLoading(false);
      toast.error(data.response.data.msg);
    },
  });

  const { mutate: deletePlan } = useMutation({
    mutationFn: async (id) => {
      setIsLoading(true);
      const planRef = doc(db, "workoutPlans", id);
      const workoutsSnapshot = await getDocs(collection(planRef, "workouts"));

      for (const workoutDoc of workoutsSnapshot.docs) {
        const exerciseRef = await getDocs(
          collection(workoutDoc.ref, "exercises")
        );
        await deleteDoc(workoutDoc.ref);

        for (const exerciseDoc of exerciseRef.docs) {
          await deleteDoc(exerciseDoc.ref);
        }
      }
      await deleteDoc(planRef);
      return id;
    },
    onSuccess: () => {
      setIsLoading(false);
      toast.success("Workout plan deleted permanently.");
      queryClient.invalidateQueries("removed-plan");
    },
    onError: (data) => {
      setIsLoading(false);
      toast.error(data.response.data.msg);
    },
  });

  if (isPending) {
    return (
      <ReactLoading
        type="spinningBubbles"
        color="#D5B263"
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
  if (data.length == 0) {
    return (
      <div className="text-gray-800 flexitems-center gap-2 mt-10 dark:text-gray-100">
        <div className="p-2">
          <p className="font-heading font-bold text-2xl text-center">
            You haven&apos;t archived any Plans yet
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="p-2 my-10 text-gray-900 dark:text-gray-100 flex flex-col">
      <div className="self-center">
        <h1 className="font-bold font-heading text-2xl text-green-500">
          Archived Workout Plan
        </h1>
      </div>
      <div className="flex flex-col gap-8 mt-4 lg:w-2/3 lg:mx-auto">
        {data?.map((item) => {
          return (
            <Plan
              key={item.id}
              {...item}
              source={"archived"}
              handleRestore={restorePlan}
              handleDelete={deletePlan}
              removeLoading={isLoading}
            />
          );
        })}
      </div>
    </div>
  );
};

ArchivedPlans.propTypes = {
  user: PropTypes.object,
};
export default ArchivedPlans;
