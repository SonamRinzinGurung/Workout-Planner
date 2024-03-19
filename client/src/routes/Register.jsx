import GoogleButton from "react-google-button";
import { useMutation } from "@tanstack/react-query";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import useSetTitle from "../utils/useSetTitle";

const Register = () => {
  useSetTitle("Register");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: ({ code }) => {
      return axios.post(`${import.meta.env.VITE_API}/auth/signup`, {
        code,
      });
    },
    onSuccess: ({ data }) => {
      localStorage.setItem("token", data.token);
      navigate("/");
    },
  });
  const handleRegister = useGoogleLogin({
    flow: "auth-code",
    onSuccess: (res) => {
      registerMutation.mutate(res);
    },
  });
  if (token) {
    return <Navigate to={"/"} />;
  }
  return (
    <main className="flex flex-col items-center mt-24 dark:text-white gap-2">
      <h1 className="text-center font-sans font-bold">Register</h1>
      <div></div>
      <div className="w-2/3 mt-6">
        <hr className="h-6 p-2" />
      </div>
      <div className="">
        <div className="mt-2">
          <GoogleButton label="Register with google" onClick={handleRegister} />
        </div>
      </div>
    </main>
  );
};

export default Register;
