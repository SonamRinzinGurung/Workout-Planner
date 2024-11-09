import PropTypes from "prop-types";
import useSetTitle from "../utils/useSetTitle";
import { useQuery } from "@tanstack/react-query";
import { Plan, Empty } from "../components";
import ReactLoading from "react-loading";
import useScrollToTop from "../utils/useScrollToTop";
import { db } from "../firebase-config";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";

const HomePage = ({ user }) => {
  useSetTitle("Fit Plan");
  useScrollToTop();

  const { isPending, error, data } = useQuery({
    queryKey: ["workout-plan"],
    queryFn: async () => {
      const q = query(
        collection(db, "workoutPlans"),
        where("uid", "==", user?.uid),
        orderBy("createdAt", "desc")
      )
      const plansSnapshot = await getDocs(q)
      const plans = []

      // get all plans of current user
      for (const planDoc of plansSnapshot.docs) {
        const planData = { id: planDoc.id, ...planDoc.data(), workouts: [] }

        // get workouts from workouts subcollection
        const workoutsSnapshot = await getDocs(collection(planDoc.ref, "workouts"))

        for (const workoutDoc of workoutsSnapshot.docs) {
          const workoutData = { id: workoutDoc.id, ...workoutDoc.data(), exercises: [] }

          const exercisesSnapshot = await getDocs(collection(workoutDoc.ref, "exercises"))
          workoutData.exercises = exercisesSnapshot.docs.map(exerciseDoc => ({
            id: exerciseDoc.id,
            ...exerciseDoc.data()
          }))
          planData.workouts.push(workoutData)
        }
        plans.push(planData)
      }
      return plans
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
    return <Empty />;
  }
  return (
    <div className="p-2 my-10 text-gray-900 dark:text-gray-100 flex flex-col ">
      <div className="self-center">
        <h1 className="font-bold font-heading text-2xl text-green-500">
          Workout Plan
        </h1>
      </div>
      <div className="flex flex-col gap-8 mt-4 lg:w-2/3 lg:mx-auto">
        {data?.map((item) => {
          return <Plan key={item._id} {...item} source={"home"} />;
        })}
      </div>
    </div>
  );
};

HomePage.propTypes = {
  user: PropTypes.object.isRequired
}
export default HomePage;
