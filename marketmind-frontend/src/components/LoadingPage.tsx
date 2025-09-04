import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import { Brain, TrendingUp, BarChart3, Bot, Search, Zap } from "lucide-react";

const loadingSteps = [
  { icon: Search, text: "Parsing your query...", color: "text-blue-500" },
  { icon: TrendingUp, text: "Fetching market data...", color: "text-green-500" },
  { icon: BarChart3, text: "Calculating indicators...", color: "text-purple-500" },
  { icon: Bot, text: "Generating AI analysis...", color: "text-orange-500" },
  { icon: Zap, text: "Almost ready...", color: "text-yellow-500" }
];

export function LoadingPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepDuration = 1000; // 1 second per step
    const totalDuration = stepDuration * loadingSteps.length;
    
    const stepInterval = setInterval(() => {
      setCurrentStep(prev => (prev + 1) % loadingSteps.length);
    }, stepDuration);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) return 0;
        return prev + (100 / (totalDuration / 50)); // Update every 50ms
      });
    }, 50);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <motion.div 
      className="flex flex-col items-center justify-center h-full space-y-8 py-12"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.4 }}
    >
      {/* Logo Animation */}
      <motion.div 
        className="relative"
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          rotate: { duration: 3, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <Brain className="h-16 w-16 text-blue-600 dark:text-blue-400" />
        <motion.div
          className="absolute -bottom-2 -right-2"
          animate={{ 
            y: [-2, 2, -2],
            x: [-1, 1, -1] 
          }}
          transition={{ 
            duration: 1.5, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          <TrendingUp className="h-6 w-6 text-green-500" />
        </motion.div>
      </motion.div>

      {/* Progress Bar */}
      <div className="w-full max-w-md space-y-4">
        <div className="relative h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <motion.div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          />
          
          {/* Shimmer effect */}
          <motion.div
            className="absolute top-0 h-full w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ x: [-32, 320] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          />
        </div>
        
        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Analyzing...</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Loading Steps */}
      <div className="space-y-4 text-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="flex items-center justify-center space-x-3"
          >
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360] 
              }}
              transition={{ 
                scale: { duration: 0.6, ease: "easeInOut" },
                rotate: { duration: 1, ease: "linear" }
              }}
              className={loadingSteps[currentStep].color}
            >
              {React.createElement(loadingSteps[currentStep].icon, { 
                className: "h-5 w-5" 
              })}
            </motion.div>
            <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
              {loadingSteps[currentStep].text}
            </span>
          </motion.div>
        </AnimatePresence>

        {/* Step Indicators */}
        <div className="flex justify-center space-x-2">
          {loadingSteps.map((_, index) => (
            <motion.div
              key={index}
              className={`h-1.5 w-6 rounded-full transition-colors duration-300 ${
                index <= currentStep 
                  ? 'bg-blue-500' 
                  : 'bg-gray-200 dark:bg-gray-700'
              }`}
              animate={index === currentStep ? { scale: [1, 1.2, 1] } : {}}
              transition={{ duration: 0.3, repeat: index === currentStep ? Infinity : 0 }}
            />
          ))}
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-blue-400/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </motion.div>
  );
}