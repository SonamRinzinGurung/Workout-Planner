import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { useGoogleLogin } from "@react-oauth/google";
import useSetTitle from "../utils/useSetTitle";
import { InputText, Button } from "../components";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Login() {
  useSetTitle("Login");
  const token = localStorage.getItem("token");
  const [values, setFormValues] = useState({ email: "", password: "" });

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

  const { mutate: traditionalLogin } = useMutation({
    mutationFn: (values) => {
      return axios.post(`${import.meta.env.VITE_API}/auth/loginTraditional`, {
        ...values,
      });
    },
    onSuccess: ({ data }) => {
      if (data?.accountStatus === false) {
        localStorage.setItem("email", data.email);
        toast.success(data.message);
        navigate("/verify-notice");
      }
      if (data?.token) {
        localStorage.setItem("token", data.token);
        localStorage.removeItem("email");
        navigate("/");
      }
    },
    onError: (data) => {
      toast.error(data.response.data.msg);
    },
  });

  const handleSubmit = useGoogleLogin({
    flow: "auth-code",
    onSuccess: (res) => {
      loginMutation.mutate(res);
    },
  });

  const handleChange = (e) => {
    setFormValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    traditionalLogin(values);
  };
  if (token) {
    return <Navigate to={"/"} />;
  }
  return (
    <main className="flex flex-col items-center mt-24 dark:text-white gap-2">
      <div className="my-4">
        <h1 className="font-heading font-semibold text-xl">Login</h1>
      </div>
      <form>
        <div className="flex flex-col gap-4">
          <InputText
            name="email"
            type={"email"}
            value={values?.email}
            handleChange={handleChange}
          />
          <InputText
            name="password"
            value={values?.password}
            type="password"
            handleChange={handleChange}
          />
          <Button
            name="Login"
            className={
              "border text-blue-600 dark:text-blue-300 dark:hover:text-blue-400"
            }
            handleClick={handleLogin}
          />
        </div>
      </form>
      <div className="my-2">
        <p>
          Don&apos;t have an account yet?{" "}
          <span className="cursor-pointer text-blue-500">
            <Link to={"/register"}>Register</Link>
          </span>
        </p>
      </div>
      <div className="w-2/3 mt-2">
        <hr className="h-6 p-2" />
      </div>
      <div className="">
        <GoogleButton onClick={handleSubmit} />
      </div>
    </main>
  );
}

export default Login;
