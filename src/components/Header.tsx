"use client";
import Link from "next/link";
import LetterSwapPingPong from "./ui-animate/letter-swap-pingpong-anim";
import { ThemeToggle } from "./ThemeToggle";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import WaitlistDialog from "@/app/_components/WaitlistDialog";
import { FaXTwitter } from "react-icons/fa6";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [pastHeroSection, setPastHeroSection] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      setPastHeroSection(window.scrollY > window.innerHeight * 0.5);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full transition-all duration-500">
      <div
        className={`
        mx-auto
        ${isScrolled ? "border-b border-border rounded-b-xl backdrop-blur-xl bg-background/60 shadow-md dark:shadow-[0px_0px_20px_0px_#1a1a1a]" : "bg-background"}
        transition-all duration-300 ease-in-out
        flex justify-between items-center px-5 md:px-20 py-3
      `}
      >
        <Link
          href={"/"}
          className="flex items-center gap-2 z-50 select-none focus-visible:border-neutral-300 focus-visible:ring-neutral-300/90 focus-visible:ring-[2px] outline-none transition-all duration-200"
        >
          <div className="relative h-10 w-10">
            <Image
              src={"/logo/logo.svg"}
              fill
              alt="logo"
              className="object-contain dark:invert"
            />
          </div>
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            StellarPay
          </span>
        </Link>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden lg:flex gap-1 xl:gap-4 text-base tracking-wider select-none">
          <Link
            href={"/#features"}
            className="focus-visible:border-neutral-300 focus-visible:ring-neutral-300/90 focus-visible:ring-[2px]  outline-none transition-all duration-200"
          >
            <LetterSwapPingPong
              reverse={false}
              staggerFrom={"center"}
              label="Features"
              className="text-neutral-500 dark:text-neutral-400 transition-all duration-200 px-3 rounded-xl"
            />
          </Link>
          <Link
            href={"/#stats"}
            className="focus-visible:border-neutral-300 focus-visible:ring-neutral-300/90 focus-visible:ring-[2px]  outline-none transition-all duration-200"
          >
            <LetterSwapPingPong
              reverse={true}
              staggerFrom={"center"}
              label="Stats"
              className="text-neutral-500 dark:text-neutral-400 transition-all duration-200 px-3 "
            />
          </Link>
          <Link
            href={"/#about"}
            className="focus-visible:border-neutral-300 focus-visible:ring-neutral-300/90 focus-visible:ring-[2px]  outline-none transition-all duration-200"
          >
            <LetterSwapPingPong
              reverse={false}
              staggerFrom={"center"}
              label="About"
              className="text-neutral-500 dark:text-neutral-400 transition-all duration-200 px-3 "
            />
          </Link>
        </div>
        <div className="relative flex items-center gap-2">
          <AnimatePresence>
            {pastHeroSection && (
              <motion.div
                className="hidden sm:block"
                initial={{ opacity: 0, filter: "blur(2px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: 10, filter: "blur(8px)" }}
                transition={{
                  duration: 0.5,
                  ease: "easeInOut",
                  opacity: { duration: 0.4 },
                  filter: { duration: 0.3 },
                }}
              >
                <WaitlistDialog
                  trigger={
                    <Button
                      size="lg"
                      className="cursor-pointer text-white dark:text-black bg-gradient-to-r from-purple-500 via-violet-600 to-purple-900 dark:from-fuchsia-200 dark:via-purple-300 dark:to-pink-200 hover:opacity-95 active:opacity-90 duration-200"
                    >
                      Waitlist <Loader />
                    </Button>
                  }
                />
              </motion.div>
            )}
          </AnimatePresence>

          <Button asChild variant="outline" size={"lg"}>
            <Link href={"https://x.com/early_finance"} target="_blank">
              <FaXTwitter />
            </Link>
          </Button>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
