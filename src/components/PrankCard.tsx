import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

interface PrankCardProps {
  prankData: {
    statement: string;
    resultText: string;
  };
  onYesClick: () => void;
  onNoClick: () => void;
}

const PrankCard: React.FC<PrankCardProps> = ({
  prankData,
  onYesClick,
  onNoClick,
}) => {
  const [noButtonPosition, setNoButtonPosition] = useState({ x: 0, y: 0 });
  const [noClickCount, setNoClickCount] = useState(0);

  const handleNoClick = useCallback(() => {
    setNoClickCount((prev) => prev + 1);
    onNoClick();

    // Calculate safe boundaries for button movement
    const cardElement = document.querySelector(".prank-card");
    if (!cardElement) return;

    const cardRect = cardElement.getBoundingClientRect();
    const buttonWidth = 150; // Approximate button width
    const buttonHeight = 60; // Approximate button height

    // Calculate safe movement area (slightly larger than card)
    const safeArea = {
      minX: -cardRect.width * 0.5,
      maxX: cardRect.width * 0.5,
      minY: -cardRect.height * 0.5,
      maxY: cardRect.height * 0.5,
    };

    // Generate random position within safe area
    const newX =
      Math.random() * (safeArea.maxX - safeArea.minX) + safeArea.minX;
    const newY =
      Math.random() * (safeArea.maxY - safeArea.minY) + safeArea.minY;

    setNoButtonPosition({ x: newX, y: newY });
  }, [onNoClick]);

  const handleYesClick = useCallback(() => {
    onYesClick();
  }, [onYesClick]);

  const noButtonTexts = [
    "Enggak, ah!",
    "Yakin nih?",
    "Seriusan, bro?",
    "Coba pikir lagi deh!",
    "Duh, masa sih?",
    "Ayo dong, jangan gitu!",
    "Plis banget, masa tega?",
    "Masa sih lo tega?",
    "Yaudah deh, terserah~",
    "Gak bakal kena, wkwk!",
    "Masih nggak mau!",
    "Never ever, bestie!",
    "Klik YES dong, biar seru!",
  ];

  return (
    <>
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
        className="prank-card bg-white rounded-3xl p-2 sm:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black relative overflow-visible w-full max-w-xs sm:max-w-md mx-auto"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-pink-100 via-purple-50 to-blue-100 opacity-50" />

        <div className="relative z-10">
          <motion.div
            className="text-center mb-2 sm:mb-6"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="flex justify-center mb-1 sm:mb-4">
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="w-6 h-6 sm:w-10 sm:h-10 text-yellow-500" />
              </motion.div>
            </div>
            <motion.h1
              className="text-base sm:text-2xl font-black text-gray-800 mb-1 sm:mb-4"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              {prankData.statement}? 😏
            </motion.h1>
          </motion.div>

          <div className="flex justify-center items-center gap-1 sm:gap-4 relative min-h-[40px] sm:min-h-[60px]">
            {/* Yes Button */}
            <motion.button
              onClick={handleYesClick}
              className="bg-green-400 hover:bg-green-300 text-black font-black text-xs sm:text-lg px-3 sm:px-8 py-2 sm:py-4 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black transition-colors"
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: [
                  "4px 4px 0px 0px rgba(0,0,0,1)",
                  "6px 6px 0px 0px rgba(0,0,0,1)",
                  "4px 4px 0px 0px rgba(0,0,0,1)",
                ],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              YES! 😍
            </motion.button>

            {/* No Button - only move after click, otherwise aligned */}
            <motion.button
              onClick={handleNoClick}
              className="bg-red-400 hover:bg-red-300 text-black font-black text-xs sm:text-lg px-3 sm:px-8 py-2 sm:py-4 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] border-2 border-black transition-colors"
              style={
                noClickCount === 0
                  ? {}
                  : {
                      position: "absolute",
                      left: "50%",
                      top: "50%",
                      transform: "translate(-50%, -50%)",
                    }
              }
              animate={
                noClickCount === 0
                  ? {}
                  : {
                      x: noButtonPosition.x,
                      y: noButtonPosition.y,
                      rotate: noClickCount * 10,
                    }
              }
              whileHover={{ scale: 1.1, rotate: noClickCount * 10 + 15 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            >
              {noButtonTexts[Math.min(noClickCount, noButtonTexts.length - 1)]}{" "}
              😤
            </motion.button>
          </div>

          {noClickCount > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-2 sm:mt-4"
            >
              <p className="text-xs sm:text-sm text-gray-600 font-medium">
                {noClickCount === 1 && "Waduh, tombolnya kabur! 🏃‍♂️"}
                {noClickCount === 2 && "Buset makin cepet! 💨"}
                {noClickCount === 3 && "Gak bakal dapet, bro! 😂"}
                {noClickCount >= 4 && "Udah lah, klik YES aja! 🤣"}
              </p>
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  );
};

export default PrankCard;
