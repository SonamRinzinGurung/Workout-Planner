import { useState } from "react";
import PropTypes from "prop-types";
import { db } from "../firebase-config";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import useScrollToTop from "../utils/useScrollToTop";
import useSetTitle from "../utils/useSetTitle";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import ReactLoading from "react-loading";
import { Plan } from "../components";

const WorkoutPlanDetail = ({ user }) => {
    const { id } = useParams();

    const [data, setData] = useState(null);

    useSetTitle(data?.name || "Workout Plan Details");
    useScrollToTop();
    const { isPending } = useQuery({
        queryKey: ["plan-detail", id],
        queryFn: async () => {
            const q = query(
                collection(db, "workoutPlans"),
                where("uid", "==", user?.uid)
            );
            const planSnapshot = await getDocs(q);
            const planDoc = planSnapshot.docs.find((doc) => doc.id === id);
            const planData = { ...planDoc.data(), workouts: [] };
            planData.id = planDoc.id;

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
            setData(planData);
            return planData;
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

    return (

        <div className="md:mt-20 mt-10 mb-10 text-gray-900 dark:text-gray-100 flex flex-col mx-auto px-10 max-w-4xl w-full gap-8">
            <div className="self-center">
                <h1 className="font-bold font-heading text-3xl md:text-4xl ">
                    Workout Plan Details
                </h1>
            </div>
            <div className="flex flex-col gap-8 mt-4">
                <Plan {...data} source="detail" />

            </div>
        </div>
    )
}

WorkoutPlanDetail.propTypes = {
    user: PropTypes.object,
}
export default WorkoutPlanDetail