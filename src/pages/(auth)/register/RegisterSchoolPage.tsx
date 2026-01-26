import { useDocumentTitle } from "@/hooks/use-document-title"
import RegisterFormComponent from "./RegisterFormComponent"

const RegisterSchool = () => {
  useDocumentTitle("Register School")
  return (
    <>
      <div className="h-screen flex flex-col items-center justify-center">
        <h1 className="font-bold text-4xl mb-5">Register</h1>
        <RegisterFormComponent />
      </div>
    </>
  )
}

export default RegisterSchool