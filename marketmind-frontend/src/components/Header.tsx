
import React from 'react';
import { Brain, TrendingUp, Moon, Sun, BarChart3 } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useThemeStore } from '@/util/theme';
import { cn } from '@/util/utils';

interface HeaderProps {
  onLogoClick: () => void;
}

export function Header({ onLogoClick }: HeaderProps) {
  const { isDarkMode, toggleTheme } = useThemeStore();

  return (
    <header className="border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <button 
          onClick={onLogoClick}
          className={cn(
            "flex items-center space-x-3",
            "text-2xl font-bold",
            "hover:opacity-80 transition-all duration-200",
            "bg-transparent border-none p-2 cursor-pointer rounded-lg",
            "hover:bg-gray-100 dark:hover:bg-gray-800",
            isDarkMode ? "text-white" : "text-gray-900"
          )}
        >
          <div className="relative">
            <Brain className="h-7 w-7 text-blue-600 dark:text-blue-400" />
            <TrendingUp className="h-4 w-4 text-green-500 absolute -bottom-1 -right-1" />
          </div>
          <div className="flex items-center">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Market
            </span>
            <span className="text-gray-900 dark:text-white">Mind</span>
          </div>
        </button>

        <div className="flex items-center space-x-2">
          <div className="hidden sm:flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400 mr-4">
            <BarChart3 className="h-3 w-3" />
            <span>AI-Powered Analysis</span>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            {isDarkMode ? (
              <Sun className="h-5 w-5 text-yellow-500" />
            ) : (
              <Moon className="h-5 w-5 text-gray-600" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}