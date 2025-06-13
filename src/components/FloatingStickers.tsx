import React from "react";
import { motion } from "framer-motion";
import { Heart, Star, Zap, Sparkles, Crown, Flame } from "lucide-react";

const FloatingStickers: React.FC = () => {
  const stickers = [
    { Icon: Heart, color: "text-red-400", size: "w-6 h-6" },
    { Icon: Star, color: "text-yellow-400", size: "w-5 h-5" },
    { Icon: Zap, color: "text-blue-400", size: "w-6 h-6" },
    { Icon: Sparkles, color: "text-purple-400", size: "w-5 h-5" },
    { Icon: Crown, color: "text-yellow-500", size: "w-6 h-6" },
    { Icon: Flame, color: "text-orange-400", size: "w-5 h-5" },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {Array.from({ length: 15 }, (_, i) => {
        const sticker = stickers[i % stickers.length];
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, Math.random() * 20 - 10, 0],
              rotate: [0, 360],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          >
            <motion.div
              className={`${sticker.color} ${sticker.size} drop-shadow-lg`}
              whileHover={{ scale: 1.5 }}
            >
              <sticker.Icon className="w-full h-full" />
            </motion.div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default React.memo(FloatingStickers);
