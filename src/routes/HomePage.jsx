import PropTypes from "prop-types";
import useSetTitle from "../utils/useSetTitle";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Empty,
  Button,
  PopOverOptionsMenu,
  MobileBottomSheet,
} from "../components";
import ReactLoading from "react-loading";
import useScrollToTop from "../utils/useScrollToTop";
import { db } from "../firebase-config";
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { BiEditAlt, BiArchive } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import useIsMobile from "../hooks/useIsMobile";
import { CgGym } from "react-icons/cg";

const HomePage = ({ user }) => {
  useSetTitle("Workout Planner");
  useScrollToTop();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const isMobile = useIsMobile();

  const { isPending, error, data } = useQuery({
    queryKey: ["workout-plan"],
    queryFn: async () => {
      const q = query(
        collection(db, "workoutPlans"),
        where("uid", "==", user?.uid),
        where("isArchived", "==", false),
        orderBy("createdAt", "desc")
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

  const { mutate: archivePlan, isPending: loading } = useMutation({
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
    },
    onError: (data) => {
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
    return <Empty />;
  }
  return (
    <div className="md:mt-20 mt-10 mb-10 text-gray-900 dark:text-gray-100 flex flex-col mx-auto px-10 max-w-4xl w-full gap-8">
      <div className="self-center">
        <h1 className="font-bold font-heading text-3xl md:text-4xl">
          All Workout Plans
        </h1>
      </div>
      <div className="flex flex-col gap-8">
        {data?.map((item) => {
          return (
            <div
              key={item.id}
              className="relative flex flex-col gap-4 rounded-md cursor-pointer transition-all h-40 overflow-hidden shadow-sm bg-emerald-50 dark:bg-emerald-700"
              onClick={() => navigate(`/${item.id}`)}
              role="button"
              tabIndex="0"
            >
              <div className="flex items-center justify-between bg-emerald-400 dark:bg-emerald-800 px-6 py-2">
                <div className="text-xl md:text-2xl font-semibold font-subHead">
                  {item.name}
                </div>
                {isMobile ? (
                  <MobileBottomSheet
                    content={
                      <div className="flex flex-col px-4 pb-6 pt-4 w-full gap-8">
                        <div className="flex w-full items-center justify-between">
                          <div className="text-xl font-medium">Options</div>
                        </div>
                        <div className="flex flex-col gap-4">
                          <Button
                            name="Edit"
                            className={
                              "border text-blue-600 dark:text-blue-300 dark:hover:text-blue-400"
                            }
                            icon={<BiEditAlt />}
                            position={1}
                            handleClick={(e) => {
                              e.stopPropagation();
                              navigate(`/edit/${item.id}`);
                            }}
                          />
                          <Button
                            name="Archive"
                            className={
                              "bg-red-600 text-gray-50 hover:bg-red-700"
                            }
                            icon={<BiArchive />}
                            position={1}
                            handleClick={(e) => {
                              e.stopPropagation();
                              archivePlan(item.id);
                            }}
                            isPending={loading}
                          />
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
                        <Button
                          name="Edit"
                          className={
                            "border text-blue-600 dark:text-blue-300 dark:hover:text-blue-400"
                          }
                          icon={<BiEditAlt />}
                          position={1}
                          handleClick={(e) => {
                            e.stopPropagation();
                            navigate(`/edit/${item.id}`);
                          }}
                        />
                        <Button
                          name="Archive"
                          className={"bg-red-600 text-gray-50 hover:bg-red-700"}
                          icon={<BiArchive />}
                          position={1}
                          handleClick={(e) => {
                            e.stopPropagation();
                            archivePlan(item.id);
                          }}
                          isPending={loading}
                        />
                      </div>
                    }
                  />
                )}
              </div>
              <div className="flex flex-col md:flex-row px-6 py-2 gap-2 justify-between">
                <div className="md:w-1/2">
                  <p className="overflow-hidden text-ellipsis whitespace-nowrap font-medium">
                    {item.description}
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-primary py-1 px-2 rounded-md dark:bg-primaryDark w-max">
                  {" "}
                  <CgGym size={20} />
                  <p className="font-subHead font-medium">
                    Workouts - {item.workouts.length}
                  </p>{" "}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

HomePage.propTypes = {
  user: PropTypes.object,
};
export default HomePage;
