import { useState } from "react";
import GoogleButton from "react-google-button";
import { useMutation } from "@tanstack/react-query";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import useSetTitle from "../utils/useSetTitle";
import { InputText, Button } from "../components";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Register = () => {
  useSetTitle("Register");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [values, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
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

  const { mutate: traditionalRegister } = useMutation({
    mutationFn: (data) => {
      return axios.post(
        `${import.meta.env.VITE_API}/auth/registerTraditional`,
        {
          ...data,
        }
      );
    },
    onSuccess: ({ data }) => {
      toast.success("User Successfully Registered");

      localStorage.setItem("token", data.token);
      navigate("/");
    },
    onError: (data) => {
      toast.error(data.response.data.msg);
    },
  });

  const handleGoogleRegister = useGoogleLogin({
    flow: "auth-code",
    onSuccess: (res) => {
      registerMutation.mutate(res);
    },
  });

  const handleChange = (e) => {
    setFormValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    traditionalRegister(values);
  };

  if (token) {
    return <Navigate to={"/"} />;
  }
  return (
    <main className="flex flex-col items-center mt-24 dark:text-white gap-2">
      <div className="my-4">
        <h1 className="font-heading font-semibold text-xl">Register</h1>
      </div>
      <div>
        <form>
          <div className="flex flex-col gap-4">
            <InputText
              name="firstName"
              value={values?.firstName}
              handleChange={handleChange}
            />
            <InputText
              name="lastName"
              value={values?.lastName}
              handleChange={handleChange}
            />
            <InputText
              name="email"
              type="email"
              value={values?.email}
              handleChange={handleChange}
            />
            <InputText
              name="password"
              type="password"
              value={values?.password}
              handleChange={handleChange}
            />
            <Button
              name="Register"
              className={
                "border text-blue-600 dark:text-blue-300 dark:hover:text-blue-400"
              }
              handleClick={handleRegister}
            />
          </div>
        </form>
      </div>
      <div className="my-2">
        <p>
          Already have an account?{" "}
          <span className="cursor-pointer text-blue-500">
            <Link to={"/login"}>Login</Link>
          </span>
        </p>
      </div>
      <div className="w-2/3 mt-6">
        <hr className="h-6 p-2" />
      </div>
      <div className="">
        <div className="mt-2">
          <GoogleButton
            label="Register with google"
            onClick={handleGoogleRegister}
          />
        </div>
      </div>
    </main>
  );
};

export default Register;
