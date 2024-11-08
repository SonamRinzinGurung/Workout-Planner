import { useEffect, useState } from "react";
import useSetTitle from "../utils/useSetTitle";
import { Button } from "../components";
import { toast } from "react-toastify";
import useAuth from "../hooks/useAuth"
import { sendEmailVerification, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase-config";

const VerifyEmailNotice = () => {
  useSetTitle("Verify Email");
  const navigate = useNavigate();
  const { user, loading } = useAuth()

  const [isLoading, setIsLoading] = useState(false);

  const handleResend = async () => {
    try {
      setIsLoading(true)
      await sendEmailVerification(user)
      toast.success("Verification link sent successfully")
    } catch (error) {
      toast.error("Failed to send verification link")
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  };

  const handleLogout = () => {
    try {
      signOut(auth)
      navigate("/login");
    } catch (error) {
      console.log(error);

    }
  };


  useEffect(() => {
    if (user?.emailVerified) {
      navigate("/")
    }
  }, [user, navigate])

  if (loading) {
    return null
  }

  return (
    <main className="flex flex-col items-center mt-24 p-4 dark:text-white gap-2 text-center">
      <h1 className="font-heading font-bold text-2xl">Verify Your Email</h1>
      <p className="font-subHead text-lg">
        Please check your email for verification link to activate your account.
      </p>
      <div className="flex flex-col my-4 gap-2">
        <p>Didn&apos;t receive an email?</p>
        <Button
          isPending={isLoading}
          name="Resend Link"
          className={
            "mx-auto border text-lime-600 dark:text-lime-300 dark:hover:text-lime-400"
          }
          handleClick={handleResend}
        />
      </div>
      <div className="mt-6 mb-4 text-center w-1/2">
        <hr />
      </div>
      <div className="mt-8">
        <p className="">
          Go back to{" "}
          <button className="font-medium text-blue-500" onClick={handleLogout}>
            Login
          </button>
        </p>
      </div>
    </main>
  );
};

export default VerifyEmailNotice;
