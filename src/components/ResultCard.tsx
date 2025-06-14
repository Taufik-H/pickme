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

// List of single-image animated meme templates (popular and fun)
const memeTemplates = [
  "drake",
  "gru",
  "joker",
  "leo",
  "doge",
  "buzz",
  "spongebob",
  "yodawg",
  "yuno",
  "rollsafe",
  "surprised-pikachu",
  "mocking-spongebob",
  "damn",
  "black-guy",
  "change-my-mind",
  "pikachu",
];

function getRandomTemplate() {
  return memeTemplates[Math.floor(Math.random() * memeTemplates.length)];
}

function wrapText(text: string, maxLen: number) {
  const words = text.split(" ");
  let lines: string[] = [];
  let current = "";
  for (const word of words) {
    if ((current + " " + word).trim().length > maxLen) {
      lines.push(current.trim());
      current = word;
    } else {
      current += " " + word;
    }
  }
  if (current) lines.push(current.trim());
  return lines.join("\n");
}

function getMemeUrl(resultText: string) {
  const template = getRandomTemplate();
  // Use _ for top text (invisible), encodeURIComponent for bottom text
  const top = "_";
  const wrapped = wrapText(resultText, 20);
  const bottom = encodeURIComponent(wrapped.replace(/ /g, "_"));
  // Using .webp for better compression and support for both static and animated memes
  return `https://api.memegen.link/images/${template}/${top}/${bottom}.webp`;
}

const ResultCardComponent: React.FC<ResultCardProps> = ({
  prankData,
  onReset,
}) => {
  const [memeUrl, setMemeUrl] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setMemeUrl(getMemeUrl(prankData.resultText || "Mantap Banget!"));
    setIsLoading(true);
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
            <div
              className="mx-auto mb-3 sm:mb-6"
              style={{ padding: 10, position: "relative" }}
            >
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10 rounded-lg">
                  <div className="w-12 h-12 border-4 border-violet-300 border-t-violet-600 rounded-full animate-spin"></div>
                </div>
              )}
              <img
                src={memeUrl}
                alt="Meme"
                className="w-full h-auto max-h-[340px] sm:max-h-[420px] rounded-lg overflow-hidden shadow-md bg-gray-100"
                style={{
                  display: "block",
                  width: "100%",
                  maxWidth: "100%",
                  objectFit: "contain",
                  padding: 0,
                }}
                loading="lazy"
                onLoad={() => setIsLoading(false)}
                onError={(e) => {
                  e.currentTarget.src = "/fallback-meme.gif";
                  setIsLoading(false);
                }}
              />
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const ResultCard = React.memo(ResultCardComponent);
export default ResultCard;
