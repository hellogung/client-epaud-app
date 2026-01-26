import { useDocumentTitle } from "@/hooks/use-document-title";
import LoginFormComponent from "./LoginFormComponent";

const LoginSchool = () => {
  useDocumentTitle("Login")
  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="font-bold text-4xl mb-5">Login</h1>
        <LoginFormComponent />
      </div>
    </>
  );
};

export default LoginSchool;
