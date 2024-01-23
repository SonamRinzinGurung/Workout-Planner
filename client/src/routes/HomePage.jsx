import useSetTitle from "../utils/useSetTitle";
import { useQuery } from "@tanstack/react-query";
import axiosFetch from "../utils/axiosInterceptor";
import { Plan } from "../components";

const HomePage = () => {
  useSetTitle("Fit Plan");

  const { isPending, error, data } = useQuery({
    queryKey: ["workout-plan"],
    queryFn: () => {
      return axiosFetch.get(`/workout-plan/`).then((res) => res.data);
    },
  });

  if (isPending) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>error!!</div>;
  }
  return (
    <div className="p-2 mt-4 text-gray-900 dark:text-gray-100 flex flex-col">
      <div className="self-center">
        <p className="font-bold font-heading text-2xl text-gray-800 dark:text-gray-300">
          Workout Plan
        </p>
      </div>
      {data?.map((item) => {
        return <Plan key={item._id} {...item} />;
      })}
    </div>
  );
};

export default HomePage;
