import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Zap } from "lucide-react";

interface LandingPageProps {
  onCreatePrank: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onCreatePrank }) => {
  const handleCreateClick = () => {
    onCreatePrank();
  };

  return (
    <motion.div
      initial={{ scale: 0, rotate: -10 }}
      animate={{ scale: 1, rotate: 0 }}
      exit={{ scale: 0, rotate: 10 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="bg-white rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black relative overflow-hidden text-center"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 opacity-50" />

      <div className="relative z-10">
        <motion.div
          className="mb-6"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex justify-center mb-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Sparkles className="w-16 h-16 text-yellow-500" />
            </motion.div>
          </div>

          <h1 className="text-4xl font-black text-gray-800 mb-4">
            Ultimate Prank Generator! 🤣
          </h1>

          <motion.p
            className="text-lg font-bold text-gray-700 mb-6"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            Create the funniest prank to trick your friends! 😈
          </motion.p>
        </motion.div>

        <motion.button
          onClick={handleCreateClick}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-400 hover:to-pink-400 text-white font-black text-xl px-8 py-4 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border-4 border-black transition-all duration-200 flex items-center justify-center gap-3 mx-auto"
          whileHover={{ scale: 1.1, rotate: 2 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: [
              "6px 6px 0px 0px rgba(0,0,0,1)",
              "8px 8px 0px 0px rgba(0,0,0,1)",
              "6px 6px 0px 0px rgba(0,0,0,1)",
            ],
          }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Zap className="w-6 h-6" />
          Create Prank
        </motion.button>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-6 text-sm text-gray-600"
        >
          <p>✨ Customize your message</p>
          <p>🖼️ Add your photo</p>
          <p>🔗 Share with friends</p>
          <p>😂 Watch them fall for it!</p>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default LandingPage;
