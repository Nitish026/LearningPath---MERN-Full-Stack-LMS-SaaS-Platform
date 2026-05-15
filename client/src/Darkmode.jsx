import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './components/ui/dropdown-menu';
import { Moon, Sun } from 'lucide-react';
import { Button } from './components/ui/button';
import { useTheme } from './components/ThemeProvider';

const Darkmode = () => {
  const { theme, setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="relative 
  bg-white dark:bg-gray-800 
  border border-gray-300 dark:border-gray-600 
  text-black dark:text-white
  hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          {/* Sun Icon */}
          <Sun className="h-[1.2rem] w-[1.2rem] transition-all dark:scale-0 dark:-rotate-90" />

          {/* Moon Icon */}
          <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />

          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="z-[999] min-w-[140px] 
        bg-white text-gray-800 
        dark:bg-gray-900 dark:text-white 
        border border-gray-200 dark:border-gray-700 
        shadow-lg rounded-md"
      >
        <DropdownMenuItem
          onClick={() => setTheme('light')}
          className={`cursor-pointer font-medium px-3 py-2 rounded-md 
          hover:bg-gray-100 dark:hover:bg-gray-800 
          ${theme === 'light' ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
        >
          ☀️ Light
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => setTheme('dark')}
          className={`cursor-pointer font-medium px-3 py-2 rounded-md 
          hover:bg-gray-100 dark:hover:bg-gray-800 
          ${theme === 'dark' ? 'bg-gray-100 dark:bg-gray-800' : ''}`}
        >
          🌙 Dark
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Darkmode;
