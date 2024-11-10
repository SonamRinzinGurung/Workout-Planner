import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import GoogleButton from "react-google-button";
import useSetTitle from "../utils/useSetTitle";
import { InputText, Button } from "../components";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup, getAdditionalUserInfo } from "firebase/auth";
import { auth, googleProvider, db } from "../firebase-config";
import useAuth from "../hooks/useAuth";
import { useMutation } from "@tanstack/react-query";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";

function Login() {
  useSetTitle("Login");
  const [values, setFormValues] = useState({ email: "", password: "" });
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const { user, loading } = useAuth();

  const handleChange = (e) => {
    setFormValues({
      ...values,
      [e.target.name]: e.target.value,
    });
  };
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsPending(true);
    try {
      await signInWithEmailAndPassword(auth, values?.email, values?.password);
      navigate("/");

    } catch (error) {
      const errorMessage = error.message;
      toast.error(errorMessage);
    } finally {
      setIsPending(false);
    }

  };

  const { mutate: addUserData } = useMutation({
    mutationFn: async (data) => {
      const usersRef = collection(db, "users");
      await addDoc(usersRef, {
        ...data,
        createdAt: serverTimestamp(),
      });
    },
    onSuccess: () => {
      toast.success("Account created successfully")
      navigate("/")
    },
    onError: (error) => {
      toast.error(error.message
      );
    }
  })

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider)
      const user = result?.user
      const additionalUserInfo = getAdditionalUserInfo(result)
      if (additionalUserInfo?.isNewUser) {
        addUserData({
          email: user.email,
          firstName: user.displayName,
          lastName: "",
          uid: user.uid,
          profileImg: user.photoURL
        })

      } else {
        navigate("/")
      }
    } catch (error) {
      toast.error("Failed to login with Google")
    }
  }
  if (loading) return null;

  if (user) {
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
            isPending={isPending}
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
        <GoogleButton label="Continue with Google" onClick={handleGoogleLogin} />
      </div>
    </main>
  );
}

export default Login;
