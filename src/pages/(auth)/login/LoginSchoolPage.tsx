import { useDocumentTitle } from "@/hooks/use-document-title";
import LoginFormComponent from "./LoginFormComponent";

const LoginSchool = () => {
  useDocumentTitle("Login");
  return (
    <>
      {/* <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="font-bold text-4xl mb-5">Login</h1>
        <LoginFormComponent />
      </div> */}

      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-md px-8">
          <h1 className="font-bold text-4xl mb-5 text-center">Login</h1>
          <LoginFormComponent />
        </div>
      </div>
    </>
  );
};

export default LoginSchool;
