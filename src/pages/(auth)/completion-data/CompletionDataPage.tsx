import { useDocumentTitle } from "@/hooks/use-document-title";
import CompletionDataFormComponent from "./CompletionDataFormComponent";

const CompletionDataPage = () => {
    useDocumentTitle("Melengkapi Data Sekolah")
  return (
    <>
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="w-full max-w-md px-8">
          <h1 className="font-bold text-4xl mb-5 text-center">
            Lengkapi Data Sekolah Anda
          </h1>
          <CompletionDataFormComponent />
        </div>
      </div>
    </>
  );
};

export default CompletionDataPage;
