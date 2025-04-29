"use client";

import { ChartNoAxesCombined, Dot, Eye, Goal } from "lucide-react";
import { GlowingEffect } from "../../components/ui-animate/glowing-effect";

export function GlowingEffectDemoSecond() {
  return (
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-2 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2">
      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/7]"
        icon={<Goal className="h-6 w-6 text-black dark:text-neutral-50" />}
        title="Mission"
        description="To deliver world-class blockchain-based payment and payroll solutions, making financial services faster, more affordable, and accessible to businesses and individuals globally."
      />

      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:2/1/3/7]"
        icon={<Eye className="h-6 w-6 text-black dark:text-neutral-50" />}
        title="Vision"
        description="To empower businesses and individuals worldwide with AI-driven, blockchain-enabled financial solutions, supported by robust, scalable software systems."
      />

      <GridItem
        area="md:[grid-area:1/7/3/13] xl:[grid-area:1/7/3/13]"
        icon={
          <ChartNoAxesCombined className="h-6 w-6 text-black dark:text-neutral-50" />
        }
        title="Industry"
        description={
          <ul>
            <li className="flex items-center gap-1 -ml-2">
              <Dot /> Remittance & Financial Services
            </li>
            <li className="flex items-center gap-1 -ml-2">
              <Dot /> Payroll & HR Solutions
            </li>
            <li className="flex items-center gap-1 -ml-2">
              <Dot /> Manufacturing & Industrial
            </li>
            <li className="flex items-center gap-1 -ml-2">
              <Dot /> Agriculture
            </li>
            <li className="flex items-center gap-1 -ml-2">
              <Dot /> Retail & E-commerce
            </li>
            <li className="flex items-center gap-1 -ml-2">
              <Dot /> Healthcare
            </li>
            <li className="flex items-center gap-1 -ml-2">
              <Dot /> Education & EdTech
            </li>
            <li className="flex items-center gap-1 -ml-2">
              <Dot /> NGOs and Non-profits
            </li>
            <li className="flex items-center gap-1 -ml-2">
              <Dot /> Logistics & Transportation
            </li>
            <li className="flex items-center gap-1 -ml-2">
              <Dot /> Technology & Startups
            </li>
          </ul>
        }
      />
    </ul>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
}

const GridItem = ({ area, icon, title, description }: GridItemProps) => {
  return (
    <li className={`min-h-[14rem] list-none select-none ${area}`}>
      <div className="relative h-full rounded-xl border p-2 md:p-3">
        <GlowingEffect
          blur={0}
          borderWidth={3}
          spread={80}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-lg p-6 md:p-6 shadow-[0px_0px_27px_0px_#cacaca] dark:shadow-[0px_0px_27px_0px_#1a1a1a]">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="w-fit rounded-xl border-2 border-black dark:border-white p-2">
              {icon}
            </div>
            <div className="space-y-3">
              <h3 className="-tracking-4 pt-0.5 text-xl/[1.375rem] font-semibold text-balance text-black md:text-2xl/[1.875rem] dark:text-white">
                {title}
              </h3>
              <h2 className="font-sans text-sm/[1.125rem] text-black md:text-base/[1.375rem] dark:text-neutral-400 [&_b]:md:font-semibold [&_strong]:md:font-semibold">
                {description}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
