import { useState, useEffect } from "react";
import { useSearchParams, Navigate } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { applyActionCode, signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import useAuth from "../hooks/useAuth";

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const [isPending, setIsPending] = useState(false);
  const actionCode = searchParams.get("oobCode");
  const navigate = useNavigate();

  const { user, loading } = useAuth();

  useEffect(() => {
    let isMounted = true;

    const verifyEmail = async () => {
      try {
        setIsPending(true);
        await applyActionCode(auth, actionCode);
        toast.success("Email verified successfully");
        await signOut(auth);
        navigate("/login");
      } catch (error) {
        toast.error("Email verification failed");
      } finally {
        setIsPending(false);
      }
    };

    if (isMounted) {
      verifyEmail();
    }

    return () => {
      isMounted = false;
    };
  }, [actionCode, navigate]);

  if (user?.emailVerified) {
    return <Navigate to="/" />
  }

  if (loading) return null;

  return (
    <div>
      <main className="p-6 mt-16 mb-10 mx-auto w-3/4 md:w-3/6 border dark:text-white">
        <div className="flex flex-col items-center mb-6 text-center">
          <h1 className="font-heading text-2xl font-bold">
            Email Verification
          </h1>
          <p className="font-subHead text-lg">
            Your email is being verified. You will be redirected to login page
            once the verification is successful.
          </p>
        </div>

        <div className="text-center">
          <div className="mt-6 mb-4">
            <hr />
          </div>
          <div className="mt-8">
            <p className="">
              Go back to{" "}
              <Link
                className="font-medium text-blue-500"
                onClick={() => navigate("/login")}
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EmailVerification;
