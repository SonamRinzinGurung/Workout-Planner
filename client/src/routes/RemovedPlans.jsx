import useSetTitle from "../utils/useSetTitle";
import { useQuery } from "@tanstack/react-query";
import axiosFetch from "../utils/axiosInterceptor";
import { Plan } from "../components";
import ReactLoading from "react-loading";
import { delay } from "../utils/delayFetch";

const RemovedPlans = () => {
  useSetTitle("Removed Plans");

  const { isPending, error, data } = useQuery({
    queryKey: ["removed-plan"],
    queryFn: async () => {
      await delay(1000);
      return axiosFetch
        .get(`/workout-plan/getRemovedPlans/`)
        .then((res) => res.data);
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
            You haven&apos;t removed any Plans yet
          </p>
        </div>
      </div>
    );
  }
  return (
    <div className="p-2 my-10 text-gray-900 dark:text-gray-100 flex flex-col">
      <div className="self-center">
        <p className="font-bold font-heading text-2xl text-green-500">
          Removed Workout Plan
        </p>
      </div>
      <div className="flex flex-col gap-6 mt-4">
        {data?.map((item) => {
          return <Plan key={item._id} {...item} source={"removed"} />;
        })}
      </div>
    </div>
  );
};

export default RemovedPlans;
