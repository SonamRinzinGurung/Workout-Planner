import { useState } from "react";
import useSetTitle from "../utils/useSetTitle";
import axiosFetch from "../utils/axiosInterceptor";
import { Plan } from "../components";
import ReactLoading from "react-loading";
import { delay } from "../utils/delayFetch";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const RemovedPlans = () => {
  useSetTitle("Removed Plans");
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  const { isPending, error, data } = useQuery({
    queryKey: ["removed-plan"],
    queryFn: async () => {
      await delay(1000);
      return axiosFetch
        .get(`/workout-plan/getArchivedPlans/`)
        .then((res) => res.data);
    },
  });

  const { mutate: restorePlan } = useMutation({
    mutationFn: async (id) => {
      setIsLoading(true);
      const { data } = await axiosFetch.delete(`/workout-plan/archive-plan/${id}`);
      return data;
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
      const { data } = await axiosFetch.delete(
        `/workout-plan/deletePlan/${id}`
      );
      return data;
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
              key={item._id}
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

export default RemovedPlans;
