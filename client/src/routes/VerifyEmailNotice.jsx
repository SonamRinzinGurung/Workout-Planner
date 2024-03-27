import useSetTitle from "../utils/useSetTitle";
import { Button } from "../components";
import { Link } from "react-router-dom";

const VerifyEmailNotice = () => {
  useSetTitle("Verify Email");
  const handleResend = () => {
    console.log("Click");
  };
  return (
    <main className="flex flex-col items-center mt-24 p-4 dark:text-white gap-2 text-center">
      <h1 className="font-heading font-bold text-2xl">Verify Your Email</h1>
      <p className="font-subHead text-xl">
        Please check your email for verification link to activate your account.
      </p>
      <div className="flex flex-col my-4 gap-2">
        <p>Didn&apos;t receive an email?</p>
        <Button
          name="Resend Link"
          className={
            "mx-auto border text-lime-600 dark:text-lime-300 dark:hover:text-lime-400"
          }
          handleClick={handleResend}
        />
      </div>
      <div className="mt-8">
        <p className="">
          Go back to{" "}
          <Link className="font-medium text-blue-500" to={"/login"}>
            Login
          </Link>
        </p>
      </div>
    </main>
  );
};

export default VerifyEmailNotice;
