import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center gap-y-3">
      <img src="/404NotFound.jpg" className="w-1/3" alt="404 Not Found" />
      <h2 className="font-bold text-3xl">404 Not Found</h2>
      <Link to="/">kembali ke halaman utama</Link>
    </div>
  );
};

export default NotFound;
