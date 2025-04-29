import { GlowingEffectDemoSecond } from "@/app/_components/GlowCards";
import Stats from "@/app/_components/Stats";
import { Features } from "@/app/_components/Features";
import { Button } from "@/components/ui/button";
import { Users, ArrowRight } from "lucide-react";
import Link from "next/link";
import Hero from "./_components/Hero";

export default function Home() {
  return (
    <main className="px-5 sm:px-10 md:px-20">
      {/* hero section */}
      <section className="mt-10 mb-20 md:mb-40">
        <Hero />
      </section>

      {/* bento section */}
      <section
        id="bento"
        className="scroll-m-25 mb-20 md:mb-40 max-w-6xl mx-auto"
      >
        <GlowingEffectDemoSecond />
      </section>

      {/* features section */}
      <section id="features" className="scroll-m-25 mb-20 md:mb-40">
        <div className="text-center text-xl md:text-3xl">
          How do we make payments effortless on{" "}
          <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
            StellarPay
          </span>
          ?
        </div>
        <Features />
      </section>

      {/* stats section */}
      <section
        id="stats"
        className="scroll-m-25 mb-20 md:mb-40 max-w-6xl mx-auto"
      >
        <div className="text-center text-xl md:text-3xl mb-4 md:mb-8">
          Market opportunities we're addressing with Stellar technology
        </div>
        <Stats />
      </section>

      {/* about section */}
      <section
        id="about"
        className="scroll-m-25 mb-20 md:mb-40 max-w-7xl mx-auto"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-4 border rounded-lg">
          <div className="relative aspect-square lg:aspect-[4/3] overflow-hidden rounded-sm bg-neutral-100 dark:bg-neutral-900">
            <div className="absolute inset-0 flex items-center justify-center">
              <Users
                size={120}
                strokeWidth={0.5}
                className="text-neutral-300 dark:text-neutral-700"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent" />
          </div>
          <div className="space-y-5">
            <h2 className="text-3xl md:text-4xl font-medium">
              About StellarPay
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground">
              A blockchain-based platform leveraging the Stellar network to
              facilitate cross-border remittance payments, early wage access for
              employees, and on/off-ramp payroll systems.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <ArrowRight className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Our Mission</h3>
                  <p className="text-muted-foreground">
                    To enable fast, low-cost cross-border payments, provide
                    employees with real-time access to earned wages, and
                    streamline payroll processes worldwide.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  <ArrowRight className="text-primary" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-medium">Our Approach</h3>
                  <p className="text-muted-foreground">
                    We combine cutting-edge blockchain technology with robust
                    compliance measures to create financial solutions that are
                    secure, accessible, and user-friendly.
                  </p>
                </div>
              </div>
            </div>
            <Button variant="outline" asChild>
              <Link href="https://x.com/early_finance" target="_blank">
                Learn more about us
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
