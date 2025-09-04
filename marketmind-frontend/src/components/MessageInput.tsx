import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Send, Mic, TrendingUp, Brain } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MessageInputProps {
  message: string;
  setMessage: (message: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export function MessageInput({ message, setMessage, onSubmit }: MessageInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  // Auto-resize textarea
  const adjustTextareaHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = 'auto';
      textarea.style.height = `${Math.min(textarea.scrollHeight, 120)}px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [message]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Typing indicator
    setIsTyping(true);
    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }
    typingTimeoutRef.current = setTimeout(() => {
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (message.trim()) {
        onSubmit(e as any);
      }
    }
  };

  const quickSuggestions = [
    "AAPL analysis",
    "Tesla vs Ford",
    "Tech stocks today",
    "Market trends"
  ];

  return (
    <div className="space-y-4">
      {/* Quick Suggestions */}
      <AnimatePresence>
        {!message && !isFocused && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap gap-2 justify-center"
          >
            {quickSuggestions.map((suggestion, index) => (
              <motion.button
                key={suggestion}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMessage(suggestion)}
                className="px-3 py-1.5 text-xs font-medium text-gray-600 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              >
                {suggestion}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Input Container */}
      <form onSubmit={onSubmit} className="relative">
        <motion.div
          className={`relative rounded-2xl border transition-all duration-200 ${
            isFocused 
              ? 'border-blue-500 shadow-lg shadow-blue-500/20' 
              : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
          }`}
          animate={{
            scale: isFocused ? 1.02 : 1,
          }}
          transition={{ duration: 0.2 }}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900" />
          
          {/* Input field */}
          <div className="relative flex items-end p-4">
            <div className="flex items-center space-x-3 mr-3">
              <motion.div
                animate={isTyping ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.6, repeat: Infinity }}
                className="flex items-center justify-center w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900"
              >
                <Brain className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </motion.div>
            </div>
            
            <div className="flex-1">
              <textarea
                ref={textareaRef}
                value={message}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder="Ask about any stock, market trend, or financial analysis..."
                className="w-full resize-none bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border-0 outline-none text-base leading-6 max-h-[120px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600"
                rows={1}
              />
              
              {/* Typing indicator */}
              <AnimatePresence>
                {isTyping && (
                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    className="flex items-center space-x-1 mt-1"
                  >
                    <TrendingUp className="w-3 h-3 text-green-500" />
                    <span className="text-xs text-gray-500">MarketMind is thinking...</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            {/* Action buttons */}
            <div className="flex items-center space-x-2 ml-3">
              <Button
                type="button"
                size="sm"
                variant="ghost"
                className="rounded-full w-8 h-8 p-0 hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                <Mic className="w-4 h-4 text-gray-500" />
              </Button>
              
              <Button
                type="submit"
                size="sm"
                disabled={!message.trim()}
                className={`rounded-full w-8 h-8 p-0 transition-all duration-200 ${
                  message.trim()
                    ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/25'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                }`}
              >
                <motion.div
                  animate={message.trim() ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <Send className="w-4 h-4" />
                </motion.div>
              </Button>
            </div>
          </div>
          
          {/* Character count */}
          <AnimatePresence>
            {message.length > 100 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="px-4 pb-2"
              >
                <div className="text-xs text-gray-400 text-right">
                  {message.length}/500
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
        
        {/* Helper text */}
        <motion.p 
          className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Press Enter to send, Shift+Enter for new line
        </motion.p>
      </form>
    </div>
  );
}