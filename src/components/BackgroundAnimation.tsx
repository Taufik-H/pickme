import React from "react";
import { motion } from "framer-motion";

const BackgroundAnimation: React.FC = () => {
  const pixels = Array.from({ length: 50 }, (_, i) => i);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated pixel grid */}
      <div className="absolute inset-0 opacity-20">
        {pixels.map((pixel) => (
          <motion.div
            key={pixel}
            className="absolute w-2 h-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-sm"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.5, 1, 0.5],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }, (_, i) => (
          <motion.div
            key={i}
            className={`absolute w-8 h-8 border-4 border-white opacity-10 ${
              i % 3 === 0
                ? "rounded-full"
                : i % 3 === 1
                ? "rounded-none"
                : "rounded-lg"
            }`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              rotate: [0, 360],
            }}
            transition={{
              duration: 8 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Pulsing gradient overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-blue-600/20"
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
      />
    </div>
  );
};

export default React.memo(BackgroundAnimation);
