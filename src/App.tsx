import { motion } from "motion/react";
import { Link } from "react-router";
import { Button } from "./components/ui/button";

function App() {
  return (
    <>
      <div className="p-10">
        <h1>Hello World</h1>
        <motion.div
          animate={{
            rotate: 360,
            transition: {
              duration: 2,
              ease: "easeInOut",
            },
          }}
          className="w-20 h-20 bg-violet-400 rounded-xl mt-9"
        ></motion.div>
      </div>
      <div className="flex gap-x-2">
        <Link to={"/register"}>
          <Button>Daftarkan Sekolah</Button>
        </Link>
        <Link to={"/login"}>
          <Button>Login</Button>
        </Link>
      </div>
    </>
  );
}

export default App;
