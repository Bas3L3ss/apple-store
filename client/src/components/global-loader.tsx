import { motion } from "framer-motion";

const GlobalLoader = () => {
  return (
    <motion.div
      className="fixed top-0 left-0 w-full h-full bg-white bg-opacity-60 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex space-x-2">
        <div className="w-4 h-4 bg-black rounded-full animate-bounce"></div>
        <div className="w-4 h-4 bg-black rounded-full animate-bounce delay-200"></div>
        <div className="w-4 h-4 bg-black rounded-full animate-bounce delay-400"></div>
      </div>
    </motion.div>
  );
};

export default GlobalLoader;
