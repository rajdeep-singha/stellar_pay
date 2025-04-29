"use client";

import React, { useRef } from "react";
import { motion, useInView } from "motion/react";
import { useTheme } from "next-themes";

import AnimatedGradient from "../../components/ui-animate/animated-gradient-with-svg";

interface BentoCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  delay: number;
  isInView: boolean;
}

const StatCard: React.FC<BentoCardProps> = ({
  title,
  value,
  subtitle,
  delay,
  isInView,
}) => {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // Use theme-specific colors
  const colors = isDark
    ? ["#a855f7", "#7c3aed", "#581c87"]
    : ["#f5d0fe", "#d8b4fe", "#fbcfe8"];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: delay * 0.5,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.2 } },
  };

  return (
    <motion.div
      className="relative overflow-hidden h-full bg-neutral-50 dark:bg-neutral-950 border rounded-lg"
      initial={{ opacity: 0 }}
      animate={{ opacity: isInView ? 1 : 0 }}
      transition={{ duration: 0.2, delay: isInView ? delay * 0.5 : 0 }}
    >
      <AnimatedGradient colors={colors} speed={20} blur="medium" />
      <motion.div
        className="relative z-10 p-5 md:p-8 text-foreground dark:text-neutral-200"
        variants={container}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
      >
        <motion.h3 className="text-sm sm:text-base md:text-lg" variants={item}>
          {title}
        </motion.h3>
        <motion.p
          className="text-2xl sm:text-4xl md:text-5xl font-medium mb-4"
          variants={item}
        >
          {value}
        </motion.p>
        {subtitle && (
          <motion.p className="text-sm opacity-80" variants={item}>
            {subtitle}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};

const Stats: React.FC = () => {
  // Create a single ref and isInView state for the entire section
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <div className="bg-background h-full" ref={sectionRef}>
      {/* Market Size Section */}
      <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 grow">
          {/* Global Remittance Market */}
          <div className="md:col-span-7">
            <StatCard
              title="Global Remittance Flows"
              value="$860+ Billion"
              subtitle="World Bank data (2023)"
              delay={0.2}
              isInView={isInView}
            />
          </div>

          {/* EWA Market */}
          <div className="md:col-span-5">
            <StatCard
              title="US Early Wage Access Market (2024)"
              value="$20+ Billion"
              subtitle="Projected to reach $200+ billion globally by 2030"
              delay={0.4}
              isInView={isInView}
            />
          </div>

          {/* Payroll Tech Market */}
          <div className="md:col-span-8">
            <StatCard
              title="Global Payroll Tech Market (2024)"
              value="$40+ Billion"
              subtitle="Companies increasingly shifting toward global payrolls with remote work boom"
              delay={0.6}
              isInView={isInView}
            />
          </div>

          {/* Paycheck to Paycheck */}
          <div className="md:col-span-4">
            <StatCard
              title="Paycheck-to-Paycheck Workers"
              value="70%+"
              subtitle="High demand for instant access to earned wages"
              delay={0.8}
              isInView={isInView}
            />
          </div>
        </div>
      </div>

      {/* Comparison Section */}
      <div className="mt-5 md:mt-10 lg:mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 grow">
          {/* Traditional Side */}
          <div>
            <h3 className="text-lg md:text-xl font-medium mb-2 px-4">
              Traditional Systems
            </h3>
            <div className="grid grid-cols-1 gap-4 mb-4">
              <StatCard
                title="Traditional Fee Range"
                value="6-8%"
                subtitle="Per international transaction"
                delay={1.0}
                isInView={isInView}
              />
              <StatCard
                title="Traditional Settlement"
                value="1-5 Days"
                subtitle="For cross-border transfers"
                delay={1.2}
                isInView={isInView}
              />
            </div>
          </div>

          {/* Stellar Side */}
          <div>
            <h3 className="text-lg md:text-xl font-medium mb-2 px-4 text-right">
              Stellar Network
            </h3>
            <div className="grid grid-cols-1 gap-4">
              <StatCard
                title="Stellar Transaction Fee"
                value="<$0.00001"
                subtitle="Almost free transfers"
                delay={1.4}
                isInView={isInView}
              />
              <StatCard
                title="Stellar Settlement"
                value="2-5 Seconds"
                subtitle="Transaction finality"
                delay={1.6}
                isInView={isInView}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
