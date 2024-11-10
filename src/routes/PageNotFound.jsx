import notfoundImg from "../assets/page_not_found.svg";

const PageNotFound = () => {
  return (
    <div className="flex justify-center items-center mt-10">
      <img src={notfoundImg} alt="" />
    </div>
  );
};

export default PageNotFound;
