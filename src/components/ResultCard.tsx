import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Crown } from "lucide-react";

interface ResultCardProps {
  prankData: {
    statement: string;
    resultText: string;
  };
  onReset: () => void;
}

const memes = [
  "https://media.giphy.com/media/ICOgUNjpvO0PC/giphy.gif",
  "https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif",
  "https://media.giphy.com/media/3oEjI6SIIHBdRxXI40/giphy.gif",
  "https://media.giphy.com/media/26ufdipQqU2lhNA4g/giphy.gif",
  "https://media.giphy.com/media/5GoVLqeAOo6PK/giphy.gif",
];

const ResultCardComponent: React.FC<ResultCardProps> = ({
  prankData,
  onReset,
}) => {
  const [currentMeme, setCurrentMeme] = useState<string>("");

  useEffect(() => {
    // Set random meme on component mount
    const randomMeme = memes[Math.floor(Math.random() * memes.length)];
    setCurrentMeme(randomMeme);
  }, []);

  return (
    <motion.div
      initial={{ scale: 0, rotateY: 90 }}
      animate={{ scale: 1, rotateY: 0 }}
      exit={{ scale: 0, rotateY: -90 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="bg-white rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black relative overflow-hidden"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 opacity-50" />

      <div className="relative z-10">
        <motion.div
          className="text-center mb-6"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex justify-center mb-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Crown className="w-12 h-12 text-yellow-500" />
            </motion.div>
          </div>

          <motion.h1
            className="text-3xl font-black text-gray-800 mb-4"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            {prankData.resultText} 🎉
          </motion.h1>

          {/* Random Meme with fallback */}
          {currentMeme && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-48 h-48 mx-auto mb-4 rounded-2xl overflow-hidden border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <img
                src={currentMeme}
                alt="Meme"
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = "/fallback-meme.gif";
                }}
              />
            </motion.div>
          )}
        </motion.div>

        <div className="flex justify-center">
          <motion.button
            onClick={onReset}
            className="bg-blue-400 hover:bg-blue-300 text-black font-black text-lg px-8 py-4 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black transition-colors"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              boxShadow: [
                "4px 4px 0px 0px rgba(0,0,0,1)",
                "6px 6px 0px 0px rgba(0,0,0,1)",
                "4px 4px 0px 0px rgba(0,0,0,1)",
              ],
            }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          >
            Your Turn! 👑
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const ResultCard = React.memo(ResultCardComponent);
export default ResultCard;
