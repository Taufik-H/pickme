import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Zap } from "lucide-react";

interface LandingPageProps {
  onCreatePrank: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onCreatePrank }) => {
  return (
    <motion.div
      initial={{ scale: 0, rotate: 10 }}
      animate={{ scale: 1, rotate: 0 }}
      exit={{ scale: 0, rotate: -10 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="brutalism-card relative overflow-hidden w-full max-w-xs sm:max-w-md mx-auto"
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-50 to-purple-100 opacity-60 rounded-[2rem]"
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <div className="relative z-10">
        <div className="text-center mb-7 sm:mb-10 flex flex-col items-center">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="inline-block mb-3 sm:mb-5"
          >
            <Sparkles className="w-9 h-9 sm:w-14 sm:h-14 text-violet-500 mx-auto" />
          </motion.div>
          <h1 className="text-2xl sm:text-4xl font-black text-gray-800 mb-2 sm:mb-5">
            Prank Kocak Generator! 🤡
          </h1>
          <p className="text-base sm:text-xl text-gray-600 mb-3 sm:mb-6">
            Bikin prank kocak buat temen lo, biar seru! 😆
          </p>
        </div>

        <motion.button
          onClick={onCreatePrank}
          className="violet-brutalism w-full flex items-center justify-center gap-3 sm:gap-4 text-base sm:text-2xl"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
        >
          <Zap className="w-6 h-6 sm:w-8 sm:h-8" />
          <span className="inline-block align-middle">Bikin Prank Kocak!</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default LandingPage;
