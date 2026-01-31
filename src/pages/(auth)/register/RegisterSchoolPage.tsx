import { useDocumentTitle } from "@/hooks/use-document-title";
import RegisterFormComponent from "./RegisterFormComponent";
import LoginFormComponent from "../login/LoginFormComponent";

const RegisterSchool = () => {
  useDocumentTitle("Register School");
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-md px-8">
          <h1 className="font-bold text-4xl mb-5 text-center">Daftar Sekolah</h1>
          <RegisterFormComponent />
        </div>
      </div>
    </>
  );
};

export default RegisterSchool;
