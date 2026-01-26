import { motion } from "motion/react";

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
              ease: "easeInOut"
            },
          }}
          className="w-20 h-20 bg-violet-400 rounded-xl mt-9"
        ></motion.div>
      </div>
    </>
  );
}

export default App;
