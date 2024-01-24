const Empty = () => {
  return (
    <div className="text-gray-800 flex flex-col items-center gap-2 mt-10 dark:text-gray-100">
      <div className="p-2">
        <p className="font-heading font-bold text-2xl text-center">
          You have no workout plans yet!
        </p>
      </div>
      <div className="border rounded-md p-2 transition ease-in-out duration-200 hover:bg-primary hover:shadow-md">
        <button className="font-subHead font-medium">Create One Here</button>
      </div>
    </div>
  );
};

export default Empty;
