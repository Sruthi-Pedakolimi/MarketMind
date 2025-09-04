// import React from 'react';
// import { Button } from "@/components/ui/button";

// interface ExamplePromptProps {
//   text: string;
//   onClick: (text: string) => void;
// }

// interface LandingPageProps {
//   onExampleClick: (text: string) => void;
// }

// function ExamplePrompt({ text, onClick }: ExamplePromptProps) {
//   return (
//     <Button 
//       variant="outline" 
//       className="text-left h-auto w-full justify-start text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
//       onClick={() => onClick(text)}
//     >
//       <p>{text}</p>
//     </Button>
//   );
// }

// export function LandingPage({ onExampleClick }: LandingPageProps) {
//   return (
//     <div className="space-y-6">
//       <div className="text-center">
//         <h2 className="text-2xl md:text-3xl font-bold mb-2 text-gray-900 dark:text-white">
//           Welcome to StockSage AI
//         </h2>
//         <p className="text-gray-600 dark:text-gray-300">
//           Ask me anything about stocks, market trends, or financial analysis. Try these examples:
//         </p>
//       </div>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//         <ExamplePrompt text="How did Tesla perform last year?" onClick={onExampleClick} />
//         <ExamplePrompt text="Show me a random trending tech stock." onClick={onExampleClick} />
//         <ExamplePrompt text="NVIDIA price for the past week." onClick={onExampleClick} />
//         <ExamplePrompt text="Apple stock performance in the last 6 months in a 1 day interval." onClick={onExampleClick} />
//       </div>
//     </div>
//   );
// } 

import React from 'react';
import { Button } from "@/components/ui/button";
import { Brain, TrendingUp, Zap, Bot, BarChart3, Search, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ExamplePromptProps {
  text: string;
  onClick: (text: string) => void;
  icon: React.ReactNode;
  category: string;
}

interface LandingPageProps {
  onExampleClick: (text: string) => void;
}

function ExamplePrompt({ text, onClick, icon, category }: ExamplePromptProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <Button 
        variant="outline" 
        className="text-left h-auto w-full justify-start p-4 group hover:shadow-lg transition-all duration-200 border-2 hover:border-blue-200 dark:hover:border-blue-800"
        onClick={() => onClick(text)}
      >
        <div className="flex items-start space-x-3 w-full">
          <div className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900 transition-colors">
            {icon}
          </div>
          <div className="flex-1 text-left">
            <span className="text-xs font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide">
              {category}
            </span>
            <p className="text-sm font-medium text-gray-900 dark:text-white mt-1 leading-relaxed">
              {text}
            </p>
          </div>
          <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-500 transition-colors" />
        </div>
      </Button>
    </motion.div>
  );
}

export function LandingPage({ onExampleClick }: LandingPageProps) {
  const examples = [
    {
      text: "How did Tesla perform last year?",
      icon: <TrendingUp className="h-4 w-4" />,
      category: "Performance Analysis"
    },
    {
      text: "Show me Apple's technical indicators",
      icon: <BarChart3 className="h-4 w-4" />,
      category: "Technical Analysis"
    },
    {
      text: "NVIDIA price trends for the past week",
      icon: <Search className="h-4 w-4" />,
      category: "Price Discovery"
    },
    {
      text: "Compare Microsoft's fundamentals",
      icon: <Bot className="h-4 w-4" />,
      category: "AI Analysis"
    }
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <motion.div 
        className="text-center space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="space-y-4">
          <div className="flex justify-center items-center space-x-3 mb-6">
            <motion.div
              className="relative"
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Brain className="h-12 w-12 text-blue-600 dark:text-blue-400" />
              <TrendingUp className="h-6 w-6 text-green-500 absolute -bottom-1 -right-1" />
            </motion.div>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            AI-Powered
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block">
              Stock Analysis
            </span>
          </h1>
          
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Get intelligent financial insights with natural language queries. 
            Powered by advanced AI and real-time market data.
          </p>
        </div>

        {/* Feature Highlights */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {[
            { icon: <Bot className="h-4 w-4" />, label: "Multi-LLM AI" },
            { icon: <TrendingUp className="h-4 w-4" />, label: "Real-time Data" },
            { icon: <BarChart3 className="h-4 w-4" />, label: "Technical Analysis" },
            { icon: <Zap className="h-4 w-4" />, label: "Instant Insights" }
          ].map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
              <div className="text-blue-600 dark:text-blue-400">
                {feature.icon}
              </div>
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {feature.label}
              </span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      {/* Examples Section */}
      <motion.div 
        className="space-y-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Try These Examples
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Click any example to see MarketMind's AI analysis in action
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {examples.map((example, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 * index }}
            >
              <ExamplePrompt {...example} onClick={onExampleClick} />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Call to Action */}
      <motion.div 
        className="text-center pt-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Or type your own question below ↓
        </p>
      </motion.div>
    </div>
  );
}