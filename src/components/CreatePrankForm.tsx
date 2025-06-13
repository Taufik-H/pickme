import { motion } from "framer-motion";
import { Sparkles, Zap } from "lucide-react";
import React, { useState } from "react";

interface CreatePrankFormProps {
  onSubmit: (data: { statement: string; resultText: string }) => void;
}

const CreatePrankForm: React.FC<CreatePrankFormProps> = ({ onSubmit }) => {
  const [statement, setStatement] = useState("");
  const [resultText, setResultText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!statement.trim() || !resultText.trim()) {
      alert("Isi dulu dong semua kolomnya, bestie!");
      return;
    }

    setIsSubmitting(true);
    try {
      onSubmit({ statement, resultText });
    } catch (error) {
      console.error("Error generating link:", error);
      alert("Gagal bikin link, coba lagi ya!");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ scale: 0, rotate: 10 }}
      animate={{ scale: 1, rotate: 0 }}
      exit={{ scale: 0, rotate: -10 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="brutalism-card relative overflow-hidden w-full max-w-xs sm:max-w-md mx-auto bg-white"
    >
      <div className="relative z-10">
        <div className="flex items-center mb-7 sm:mb-10">
          <div className="flex-1 text-center">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block mb-2"
            >
              <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-violet-500 mx-auto" />
            </motion.div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-800">
              Bikin Prank Kocakmu! 🤡
            </h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-8">
          {/* Statement Input */}
          <div>
            <label className="block text-sm sm:text-lg font-black text-gray-800 mb-2">
              Mau nanya apa nih ke temen lo? 😏
            </label>
            <input
              type="text"
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
              className="brutalism-input w-full"
              placeholder="Contoh: Lo suka gue nggak?"
              maxLength={50}
              required
            />
          </div>

          {/* Result Text */}
          <div>
            <label className="block text-sm sm:text-lg font-black text-gray-800 mb-2">
              Kalo dia klik YES! 🥳
            </label>
            <input
              type="text"
              value={resultText}
              onChange={(e) => setResultText(e.target.value)}
              className="brutalism-input w-full"
              placeholder="Contoh: Udah kuduga lo suka sama gue!"
              maxLength={80}
              required
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className={`violet-brutalism w-full flex items-center justify-center gap-3 sm:gap-4 text-lg sm:text-2xl ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            whileHover={!isSubmitting ? { scale: 1.05 } : {}}
            whileTap={!isSubmitting ? { scale: 0.97 } : {}}
          >
            <Zap className="w-6 h-6 sm:w-8 sm:h-8" />
            <span className="inline-block align-middle">
              {isSubmitting ? "Bentar ya..." : "Bikin Link Prank!"}
            </span>
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default CreatePrankForm;
