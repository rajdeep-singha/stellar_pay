"use client";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";

const sunCircle = "M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0";
const sunRays = [
  "M12 2v2",
  "M12 20v2",
  "M4.93 4.93l1.41 1.41",
  "M17.66 17.66l1.41 1.41",
  "M2 12h2",
  "M20 12h2",
  "M6.34 17.66l-1.41 1.41",
  "M19.07 4.93l-1.41 1.41",
];

const moonPath = "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9";
const moonPlus = ["M20 3v4", "M22 5h-4"];

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const toggleTheme = () => {
    // Toggle between light and dark only
    setTheme(theme === "light" ? "dark" : "light");
  };

  if (!mounted) return null;

  // Determine if the current theme is light mode
  // If the theme is system, we need to check what it resolves to
  const isLight =
    theme === "light" ||
    (theme === "system" &&
      window.matchMedia("(prefers-color-scheme: light)").matches);

  return (
    <Button
      variant="outline"
      size={"lg"}
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="cursor-pointer z-50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-[1.2rem] w-[1.2rem]"
      >
        <AnimatePresence mode="wait" initial={false}>
          {isLight ? (
            <>
              <motion.path
                key="sun-circle"
                d={sunCircle}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                exit={{ pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
              {sunRays.map((ray, i) => (
                <motion.path
                  key={`sun-ray-${i}`}
                  d={ray}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: {
                      delay: 0.2 + i * 0.05,
                      duration: 0.3,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                />
              ))}
            </>
          ) : (
            <>
              <motion.path
                key="moon"
                d={moonPath}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                exit={{ pathLength: 0, opacity: 0 }}
                transition={{ duration: 0.4 }}
              />
              {moonPlus.map((plus, i) => (
                <motion.path
                  key={`moon-plus-${i}`}
                  d={plus}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    transition: {
                      delay: 0.2 + i * 0.05,
                      duration: 0.3,
                    },
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0,
                    transition: {
                      duration: 0.2,
                    },
                  }}
                />
              ))}
            </>
          )}
        </AnimatePresence>
      </svg>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
