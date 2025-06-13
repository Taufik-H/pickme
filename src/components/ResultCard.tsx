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

// List of popular meme GIF templates from memegen.link (only GIFs)
const memeTemplates = [
  "buzz",
  "disastergirl",
  "doge",
  "drake",
  "gru",
  "joker",
  "kermit",
  "leo",
  "morpheus",
  "sad-biden",
  "sad-boehner",
  "sad-bush",
  "sad-clinton",
  "sad-obama",
  "sad-tux",
  "spongebob",
  "yodawg",
  "yuno",
];

function getRandomTemplate() {
  return memeTemplates[Math.floor(Math.random() * memeTemplates.length)];
}

function getMemeUrl(resultText: string) {
  const template = getRandomTemplate();
  // Use _ for top text (invisible), encodeURIComponent for bottom text
  const top = "_";
  const bottom = encodeURIComponent(resultText.replace(/ /g, "_"));
  // Always use .gif
  return `https://api.memegen.link/images/${template}/${top}/${bottom}.gif`;
}

const ResultCardComponent: React.FC<ResultCardProps> = ({
  prankData,
  onReset,
}) => {
  const [memeUrl, setMemeUrl] = useState<string>("");

  useEffect(() => {
    setMemeUrl(getMemeUrl(prankData.resultText || "Mantap Banget!"));
    // eslint-disable-next-line
  }, [prankData.resultText]);

  return (
    <motion.div
      initial={{ scale: 0, rotateY: 90 }}
      animate={{ scale: 1, rotateY: 0 }}
      exit={{ scale: 0, rotateY: -90 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 0.2,
      }}
      className="bg-white rounded-3xl p-4 sm:p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black relative overflow-hidden w-full max-w-xs sm:max-w-md mx-auto"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 opacity-50" />

      <div className="relative z-10">
        <motion.div
          className="text-center mb-4 sm:mb-6"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="flex justify-center mb-2 sm:mb-4">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <Crown className="w-8 h-8 sm:w-12 sm:h-12 text-yellow-500" />
            </motion.div>
          </div>

          {/* Meme image only, resultText is inside meme */}
          {memeUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="w-32 h-32 sm:w-48 sm:h-48 mx-auto mb-2 sm:mb-4 rounded-2xl overflow-hidden border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-gray-100"
            >
              <img
                src={memeUrl}
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
            className="bg-blue-400 hover:bg-blue-300 text-black font-black text-base sm:text-lg px-4 sm:px-8 py-2 sm:py-4 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black transition-colors"
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
            Giliran Lo Nih! 👑
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

const ResultCard = React.memo(ResultCardComponent);
export default ResultCard;
