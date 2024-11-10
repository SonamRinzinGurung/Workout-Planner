import { useState } from "react";
import GoogleButton from "react-google-button";
import { useMutation } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router-dom";
import useSetTitle from "../utils/useSetTitle";
import { InputText, Button } from "../components";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithPopup, getAdditionalUserInfo } from "firebase/auth";
import { auth, db, googleProvider } from "../firebase-config";
import {
  addDoc,
  collection,
  serverTimestamp,
} from "firebase/firestore";
import useAuth from "../hooks/useAuth";

const Register = () => {
  useSetTitle("Register");
  const navigate = useNavigate();
  const { user, loading } = useAuth()

  const [values, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [isPending, setIsPending] = useState(false);

  const handleChange = (e) => {
    setFormValues({
      ...values,
      [e.target.name]: e.target.value,
    });
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
      toast.success("User added successfully");
      navigate("/verify-notice");
    },
    onError: (error) => {
      toast.error(error.message
      );
    }
  })

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, values.email, values.password);
      await sendEmailVerification(userCredential.user);
      delete values.password
      addUserData({ ...values, uid: userCredential.user.uid });
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsPending(false);
    }
  };

  const handleGoogle = async () => {
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
              isPending={isPending}
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
            label="Continue with Google"
            onClick={handleGoogle}
          />
        </div>
      </div>
    </main>
  );
};

export default Register;
