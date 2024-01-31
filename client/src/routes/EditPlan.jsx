import { useParams } from "react-router-dom";
import useSetTitle from "../utils/useSetTitle";
import { useQuery } from "@tanstack/react-query";
import ReactLoading from "react-loading";
import axiosFetch from "../utils/axiosInterceptor";
import { Plan, Empty } from "../components";

const EditPlan = () => {
  const { id } = useParams();

  useSetTitle("Edit Plan");

  const { isPending, error, data } = useQuery({
    queryKey: ["workout-plan-detail"],
    queryFn: async () => {
      return axiosFetch.get(`/workout-plan/${id}`).then((res) => res.data);
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
  if (!data) {
    return <Empty />;
  }
  return (
    <div className="my-10 text-gray-900 dark:text-gray-100">
      <div className="mb-4">
        <p className="font-heading text-2xl font-bold text-center text-green-500">
          Edit Workout Plan
        </p>
      </div>
      <Plan {...data} />;
    </div>
  );
};

export default EditPlan;
