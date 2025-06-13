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
      className="brutalism-card relative overflow-hidden w-full max-w-xs sm:max-w-md mx-auto"
    >
      <motion.div
        className="absolute inset-0 bg-white"
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
        <div className="text-center mb-7 sm:mb-10">
          <div className="flex justify-center mb-3 sm:mb-5">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              <Crown className="w-8 h-8 sm:w-14 sm:h-14 text-violet-500" />
            </motion.div>
          </div>
          {memeUrl && (
            <div className="w-32 h-32 sm:w-52 sm:h-52 mx-auto mb-3 sm:mb-6 rounded-lg overflow-hidden shadow-md bg-gray-100">
              <img
                src={memeUrl}
                alt="Meme"
                className="w-full h-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = "/fallback-meme.gif";
                }}
              />
            </div>
          )}
        </div>

        <div className="flex justify-center">
          <motion.button
            onClick={onReset}
            className="violet-brutalism w-full flex items-center justify-center gap-3 sm:gap-4 text-lg sm:text-2xl"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
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
