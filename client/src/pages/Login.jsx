import { useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";

function Login() {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () => {
      return axios.get("");
    },
  });
  const handleSubmit = () => {
    e.preventDefault();
  };
  return (
    <main className="flex justify-center mt-24">
      <div className="">
        <form onSubmit={handleSubmit}>
          <GoogleButton onClick={handleSubmit} />
        </form>
      </div>
    </main>
  );
}

export default Login;
