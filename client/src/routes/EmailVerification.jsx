import { useState } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import { Button } from "../components";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { applyActionCode, signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import useAuth from "../hooks/useAuth";

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const [isPending, setIsPending] = useState(false);
  const actionCode = searchParams.get("oobCode")
  const navigate = useNavigate();

  const { user, loading } = useAuth()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsPending(true)
      await applyActionCode(auth, actionCode)
      toast.success("Email verified successfully");
      navigate("/");

    } catch (error) {
      toast.error("Email verification failed");
    } finally {
      setIsPending(false)
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

  if (user?.emailVerified) {
    return <Navigate to="/" />
  }


  return (
    <div>
      <main className="p-6 mt-16 mb-10 mx-auto w-3/4 md:w-3/6 border dark:text-white">
        <form>
          <div className="flex flex-col items-center mb-6 text-center">
            <h1 className="font-heading text-2xl font-bold">
              Email Verification
            </h1>
            <p className="font-subHead text-lg">
              Click the button below to verify your email address and activate
              your account.
            </p>
          </div>

          <div className="text-center">
            <div className="">
              <Button
                name="Verify Email"
                className={
                  "mx-auto border text-blue-600 dark:text-blue-300 dark:hover:text-blue-400"
                }
                handleClick={handleSubmit}
                isPending={isPending}
              />
            </div>

            <div className="mt-6 mb-4">
              <hr />
            </div>
            <div className="mt-8">
              <p className="">
                Go back to{" "}
                <Link className="font-medium text-blue-500" onClick={handleLogout}>
                  Login
                </Link>
              </p>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default EmailVerification;
