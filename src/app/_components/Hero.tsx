"use client";

import { Blocks, Loader, Mouse } from "lucide-react";

import { LayoutGroup, motion } from "motion/react";
import TextRotate from "../../components/ui-animate/text-rotate";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import WaitlistDialog from "./WaitlistDialog";

export default function Hero() {
  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5, staggerChildren: 0.1 },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, filter: "blur(10px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  };

  const words =
    "Your Gateway to Instant Remittances, Early Wage Access and Seamless Payroll.".split(
      " "
    );

  return (
    <div className="flex justify-between gap-20 items-center w-full relative mx-auto max-w-7xl">
      <div className="space-y-5 lg:space-y-10 flex-[3]">
        <div className="text-4xl md:text-6xl">
          <div className="flex gap-6 items-end">
            <LayoutGroup>
              <motion.div className="flex whitespace-pre" layout>
                <motion.span
                  className="pt-0.5 sm:pt-1 md:pt-2"
                  layout
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                >
                  <span className="underline">Think</span>{" "}
                </motion.span>
                <TextRotate
                  texts={["Swift", "Secure", "Stellar"]}
                  mainClassName="font-bold text-white dark:text-black bg-gradient-to-r from-purple-500 via-violet-600 to-purple-900 dark:from-fuchsia-200 dark:via-purple-300 dark:to-pink-200 px-2 sm:px-2 md:px-3 overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center"
                  staggerFrom={"last"}
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  staggerDuration={0.025}
                  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                  transition={{ type: "spring", damping: 30, stiffness: 400 }}
                  rotationInterval={4000}
                />
              </motion.div>
            </LayoutGroup>
          </div>
          <div>Pay Effortlessly</div>
        </div>
        <hr />
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInVariants}
          className="text-2xl md:text-3xl"
        >
          {words.map((word, index) => (
            <motion.span
              key={index}
              variants={wordVariants}
              className="inline-block mr-1.5"
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
        <hr />
        <div className="flex gap-4 flex-col-reverse md:flex-row items-start">
          <Button
            variant={"outline"}
            size={"xl"}
            className="cursor-pointer"
            asChild
          >
            <Link href={"/#bento"}>
              Know More <Mouse className="inline" />
            </Link>
          </Button>
          <WaitlistDialog
            trigger={
              <Button
                size="xl"
                className="cursor-pointer text-white dark:text-black bg-gradient-to-r from-purple-500 via-violet-600 to-purple-900 dark:from-fuchsia-200 dark:via-purple-300 dark:to-pink-200 hover:opacity-95 active:opacity-90 duration-200"
              >
                Join the Waitlist <Loader />
              </Button>
            }
          />
        </div>
      </div>
      <div className="flex-[2] absolute -z-50 opacity-10 inset-x-0 mx-auto w-full max-w-full overflow-hidden xl:ml-10 xl:opacity-100 xl:static xl:inset-x-auto xl:mx-0 h-full max-h-[calc(100vh-50px)]">
        <video
          src="/video/gradient.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="rounded-xl object-contain w-full h-full"
          style={{
            WebkitMask: "url('/logo/video-mask.svg') center/contain no-repeat",
            mask: "url('/logo/video-mask.svg') center/contain no-repeat",
          }}
        />
      </div>
    </div>
  );
}
