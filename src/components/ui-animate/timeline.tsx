"use client";
import { LucideIcon } from "lucide-react";
import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
  icon: LucideIcon;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div className="w-full" ref={containerRef}>
      <div ref={ref} className="relative max-w-7xl mx-auto">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-15 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-30 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-9 w-9 lg:h-11 lg:w-11 absolute left-3 md:left-3 rounded-xl text-white dark:text-black bg-gradient-to-r from-purple-500 via-violet-600 to-purple-900 dark:from-fuchsia-200 dark:via-purple-300 dark:to-pink-200 flex items-center justify-center">
                {item.icon && <item.icon className="w-5 h-5 lg:w-6 lg:h-6" />}
              </div>
              <h3 className="hidden md:block text-xl md:pl-18 md:text-4xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 via-violet-600 to-purple-900 dark:from-fuchsia-200 dark:via-purple-300 dark:to-pink-200">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-semibold text-black dark:text-white">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute left-7 lg:left-8 top-0 overflow-hidden w-[4px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[4px] bg-gradient-to-t from-purple-500 via-violet-600 to-purple-900 dark:from-fuchsia-200 dark:via-purple-300 dark:to-pink-200 rounded-full"
          />
        </div>
      </div>
    </div>
  );
};
