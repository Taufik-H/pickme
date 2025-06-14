import React, { useCallback, useState } from "react";
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
  const [noButtonPosition, setNoButtonPosition] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const [noClickCount, setNoClickCount] = useState(0);

  const handleNoClick = useCallback(() => {
    setNoClickCount((prev) => prev + 1);
    onNoClick();

    // Move NO button to a random position in the viewport
    const buttonWidth = 120;
    const buttonHeight = 40;
    const padding = 16; // avoid edges
    const maxX = window.innerWidth - buttonWidth - padding;
    const maxY = window.innerHeight - buttonHeight - padding;
    const newX = Math.random() * maxX + padding / 2;
    const newY = Math.random() * maxY + padding / 2;
    setNoButtonPosition({ x: newX, y: newY });
  }, [onNoClick]);

  const handleYesClick = useCallback(() => {
    onYesClick();
  }, [onYesClick]);

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
      className="brutalism-card relative w-full max-w-xs sm:max-w-md mx-auto"
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
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-block"
            >
              <Sparkles className="w-8 h-8 sm:w-12 sm:h-12 text-violet-500" />
            </motion.div>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-gray-800 mb-2 sm:mb-5">
            {prankData.statement}? 😏
          </h1>
        </div>

        <div
          className="relative flex flex-row justify-start items-center gap-3 mb-4 min-h-[60px]"
          style={{ minHeight: 60, height: 60 }}
        >
          <motion.button
            onClick={handleYesClick}
            className="violet-brutalism w-fit sm:w-auto flex items-center justify-center gap-3 sm:gap-4 text-lg sm:text-2xl ml-5"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97, y: 2 }}
          >
            YES! 😍
          </motion.button>
          {noClickCount === 0 && (
            <motion.button
              onClick={handleNoClick}
              className="brutalism-btn w-fit sm:w-auto flex items-center justify-center gap-3 sm:gap-4 text-lg sm:text-2xl"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97, y: 2 }}
            >
              Enggak!
            </motion.button>
          )}
          {noClickCount > 0 && <div className="w-fit" />}
        </div>
        {noClickCount > 0 && noButtonPosition && (
          <motion.button
            onClick={handleNoClick}
            className="brutalism-btn w-fit sm:w-auto flex items-center justify-center gap-3 sm:gap-4 text-lg sm:text-2xl"
            style={{
              position: "fixed",
              left: noButtonPosition.x,
              top: noButtonPosition.y,
              zIndex: 9999,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97, y: 2 }}
          >
            Enggak!
          </motion.button>
        )}
      </div>
    </motion.div>
  );
};

export default PrankCard;
