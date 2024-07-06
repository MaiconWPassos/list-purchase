import React, { useState, useEffect } from "react";
import { LuMoon, LuSun } from "react-icons/lu";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Button } from "@/components/ui/button";

interface ThemeToggleButtonProps {
  className?: string;
}
const ToggleButton: React.FC<ThemeToggleButtonProps> = ({ className }) => {
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem("darkMode");
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.body.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={toggleDarkMode}
            variant="secondary"
            size="sm"
            className={className}
          >
            {darkMode ? <LuSun /> : <LuMoon />}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>{darkMode ? "Light Mode" : "Dark Mode"}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ToggleButton;
