import { useParams } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Button } from "../components";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const EmailVerification = () => {
  const param = useParams();
  const navigate = useNavigate();
  const { mutate: verifyEmail, isPending } = useMutation({
    mutationFn: (token) => {
      return axios.patch(`${import.meta.env.VITE_API}/auth/verify-email/`, {
        token,
      });
    },
    onSuccess: ({ data }) => {
      toast.success(data.message);
      localStorage.removeItem("email");
      navigate("/login");
    },
    onError: (data) => {
      toast.error(data.response.data.msg);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    verifyEmail(param.token);
  };

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
                <Link className="font-medium text-blue-500" to={"/login"}>
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
