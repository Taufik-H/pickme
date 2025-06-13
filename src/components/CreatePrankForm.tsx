import React, { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Sparkles, Zap } from "lucide-react";

interface CreatePrankFormProps {
  onSubmit: (data: { statement: string; resultText: string }) => void;
  onBack: () => void;
}

const CreatePrankForm: React.FC<CreatePrankFormProps> = ({
  onSubmit,
  onBack,
}) => {
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

  const handleBack = () => {
    onBack();
  };

  return (
    <motion.div
      initial={{ scale: 0, rotate: 10 }}
      animate={{ scale: 1, rotate: 0 }}
      exit={{ scale: 0, rotate: -10 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="bg-white rounded-3xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] border-4 border-black relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-100 via-blue-50 to-purple-100 opacity-50" />

      <div className="relative z-10">
        <div className="flex items-center mb-6">
          <motion.button
            onClick={handleBack}
            className="bg-gray-400 hover:bg-gray-300 text-black p-2 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] border-2 border-black transition-colors mr-4"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowLeft className="w-5 h-5" />
          </motion.button>

          <div className="flex-1 text-center">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="inline-block"
            >
              <Sparkles className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            </motion.div>
            <h2 className="text-2xl font-black text-gray-800">
              Bikin Prank Kocakmu! 🤡
            </h2>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Statement Input */}
          <div>
            <label className="block text-lg font-black text-gray-800 mb-2">
              Mau nanya apa nih ke temen lo? 😏
            </label>
            <input
              type="text"
              value={statement}
              onChange={(e) => setStatement(e.target.value)}
              className="w-full px-4 py-3 text-lg font-bold bg-yellow-100 border-4 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
              placeholder="Contoh: Lo suka gue nggak?"
              maxLength={50}
              required
            />
          </div>

          {/* Result Text */}
          <div>
            <label className="block text-lg font-black text-gray-800 mb-2">
              Pesan kemenangan lo kalo dia klik YES! 🥳
            </label>
            <input
              type="text"
              value={resultText}
              onChange={(e) => setResultText(e.target.value)}
              className="w-full px-4 py-3 text-lg font-bold bg-green-100 border-4 border-black rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] focus:outline-none focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-shadow"
              placeholder="Contoh: Udah kuduga lo suka sama gue!"
              maxLength={80}
              required
            />
          </div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={isSubmitting}
            className={`w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-400 hover:to-blue-400 text-white font-black text-xl px-8 py-4 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border-4 border-black transition-all duration-200 flex items-center justify-center gap-3 ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
            whileHover={!isSubmitting ? { scale: 1.05, rotate: 1 } : {}}
            whileTap={!isSubmitting ? { scale: 0.95 } : {}}
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
            {isSubmitting ? "Bentar ya..." : "Bikin Link Prank!"}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
};

export default CreatePrankForm;
