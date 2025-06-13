import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { Plus, Copy } from "lucide-react";
import BackgroundAnimation from "./components/BackgroundAnimation";
import FloatingStickers from "./components/FloatingStickers";
import PrankCard from "./components/PrankCard";
import ResultCard from "./components/ResultCard";
import CreatePrankForm from "./components/CreatePrankForm";
import LandingPage from "./components/LandingPage";

type AppState = "landing" | "form" | "prank" | "result";

function App() {
  const [appState, setAppState] = useState<AppState>("landing");
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [prankData, setPrankData] = useState({
    statement: "I'm handsome",
    resultText: "I already knew I'm handsome!",
  });
  const [shareUrl, setShareUrl] = useState("");

  const updateWindowSize = useCallback(() => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }, []);

  useEffect(() => {
    updateWindowSize();
    window.addEventListener("resize", updateWindowSize);

    // Check if this is a prank link
    const urlParams = new URLSearchParams(window.location.search);
    const statement = urlParams.get("statement");
    const resultText = urlParams.get("result");

    if (statement || resultText) {
      setPrankData({
        statement: statement ? decodeURIComponent(statement) : "I'm handsome",
        resultText: resultText
          ? decodeURIComponent(resultText)
          : "I already knew I'm handsome!",
      });
      setAppState("prank");
    }

    return () => window.removeEventListener("resize", updateWindowSize);
  }, [updateWindowSize]);

  const handleYesClick = useCallback(() => {
    setShowConfetti(true);
    setAppState("result");

    setTimeout(() => {
      setShowConfetti(false);
    }, 5000);
  }, []);

  const handleNoClick = useCallback(() => {
    // No action needed
  }, []);

  const handleCreatePrank = useCallback(() => {
    setAppState("form");
  }, []);

  const handleFormSubmit = useCallback((data: typeof prankData) => {
    setPrankData(data);
    const url = `${window.location.origin}?statement=${encodeURIComponent(
      data.statement
    )}&result=${encodeURIComponent(data.resultText)}`;
    setShareUrl(url);
  }, []);

  const copyShareUrl = useCallback(() => {
    navigator.clipboard.writeText(shareUrl);
  }, [shareUrl]);

  const resetToLanding = useCallback(() => {
    setAppState("landing");
    setShowConfetti(false);
    setPrankData({
      statement: "I'm handsome",
      resultText: "I already knew I'm handsome!",
    });
    setShareUrl("");
  }, []);

  const resetPrank = useCallback(() => {
    setAppState("form");
    setShowConfetti(false);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      <BackgroundAnimation />
      <FloatingStickers />

      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={100}
          recycle={false}
          colors={[
            "#ff6b6b",
            "#4ecdc4",
            "#45b7d1",
            "#f9ca24",
            "#6c5ce7",
            "#fd79a8",
          ]}
        />
      )}

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0, rotate: -10 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20,
            delay: 0.2,
          }}
          className="w-full max-w-md"
        >
          <AnimatePresence mode="wait">
            {appState === "landing" && (
              <LandingPage key="landing" onCreatePrank={handleCreatePrank} />
            )}

            {appState === "form" && (
              <CreatePrankForm key="form" onSubmit={handleFormSubmit} />
            )}

            {shareUrl && appState === "form" && (
              <div className="mt-4 bg-white brutalism-card">
                <h3 className="text-xl font-black text-gray-800 mb-4 text-center">
                  🎉 Prank Created!
                </h3>
                <div className="bg-gray-100 p-3 rounded-xl brutalism-input line-clamp-1  mb-4">
                  <p className="text-sm text-gray-600 break-all">{shareUrl}</p>
                </div>
                <div className="flex gap-2">
                  <motion.button
                    onClick={copyShareUrl}
                    className="flex-1 violet-brutalism flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Copy className="w-4 h-4" />
                    Copy Link
                  </motion.button>
                  <motion.button
                    onClick={resetToLanding}
                    className="bg-gray-400 hover:bg-gray-300 text-black font-black px-4 py-3 rounded-xl shadow-gray-500 border-gray-500 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] border-2  transition-colors"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Plus className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            )}

            {appState === "prank" && (
              <PrankCard
                key="prank"
                prankData={prankData}
                onYesClick={handleYesClick}
                onNoClick={handleNoClick}
              />
            )}

            {appState === "result" && (
              <ResultCard
                key="result"
                prankData={prankData}
                onReset={resetPrank}
              />
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}

export default App;
