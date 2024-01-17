import { Navigate, useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useGoogleLogin } from "@react-oauth/google";
import useSetTitle from "../utils/useSetTitle";

function Login() {
  useSetTitle("Login");
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  const loginMutation = useMutation({
    mutationFn: ({ code }) => {
      return axios.post(`${import.meta.env.VITE_API}/auth/login`, {
        code,
      });
    },
    onSuccess: ({ data }) => {
      localStorage.setItem("token", data.token);
      navigate("/");
    },
  });

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

  const handleSubmit = useGoogleLogin({
    flow: "auth-code",
    onSuccess: (res) => {
      loginMutation.mutate(res);
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
      <div className="">
        <GoogleButton onClick={handleSubmit} />
      </div>
      <div className="w-2/3 mt-6">
        <hr className="h-6 p-2" />
      </div>
      <div className="">
        <p className="text-center font-sans font-bold">New User?</p>
        <div className="mt-2">
          <GoogleButton label="Register with google" onClick={handleRegister} />
        </div>
      </div>
    </main>
  );
}

export default Login;
