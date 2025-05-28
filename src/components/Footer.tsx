"use client";
import Link from "next/link";
import Image from "next/image";
// import { motion } from "motion/react";
// import { Button } from "./ui/button";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { name: "About", href: "/#about" },
    { name: "Our Team", href: "/team" },
    { name: "Careers", href: "/careers" },
    { name: "Contact", href: "/#contact" },
  ];

  const resourceLinks = [
    { name: "Services", href: "/#services" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Blogs", href: "/#blog" },
    { name: "FAQ", href: "/faq" },
  ];

  const legalLinks = [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
    { name: "Cookie Policy", href: "/cookies" },
  ];

  return (
    <footer className="w-full border-t border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-5 md:px-20 py-10 md:py-16">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-8 lg:gap-10">
          {/* Company Info */}
          <div className="flex flex-col gap-5 w-full lg:w-auto">
            <div className="select-none">
              <div className="relative h-16 sm:h-20 w-16 sm:w-20">
                <Image
                  src={"/logo/logo.svg"}
                  fill
                  alt="logo"
                  className="object-contain dark:invert"
                />
              </div>
              <div>
                <span className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                  StellarPay
                </span>
                <p className="text-neutral-400 dark:text-neutral-700 text-lg sm:text-xl">
                  /ˈstɛlə/-/peɪ/
                </p>
                <p className="text-muted-foreground text-lg sm:text-xl italic">
                  Pay Effortlessly
                </p>
              </div>
            </div>
          </div>

          {/* Links Container */}
          <div className="w-full lg:w-auto lg:min-w-xl border px-4 sm:px-8 py-6 rounded-xl">
            <div className="flex flex-col sm:flex-row justify-between gap-8">
              {/* Company */}
              <div className="mb-6 sm:mb-0">
                <h3 className="text-base font-semibold mb-4 text-foreground">
                  Company
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {companyLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-sm text-neutral-600 hover:text-primary dark:text-neutral-300 dark:hover:text-primary transition-colors duration-200 flex items-center group"
                      >
                        <span className="relative overflow-hidden">
                          {link.name}
                          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300"></span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div className="mb-6 sm:mb-0">
                <h3 className="text-base font-semibold mb-4 text-foreground">
                  Resources
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {resourceLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-sm text-neutral-600 hover:text-primary dark:text-neutral-300 dark:hover:text-primary transition-colors duration-200 flex items-center group"
                      >
                        <span className="relative overflow-hidden">
                          {link.name}
                          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300"></span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h3 className="text-base font-semibold mb-4 text-foreground">
                  Legal
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {legalLinks.map((link, index) => (
                    <li key={index}>
                      <Link
                        href={link.href}
                        className="text-sm text-neutral-600 hover:text-primary dark:text-neutral-300 dark:hover:text-primary transition-colors duration-200 flex items-center group"
                      >
                        <span className="relative overflow-hidden">
                          {link.name}
                          <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-300"></span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom section with copyright */}
        <div className="flex flex-col sm:flex-row justify-between items-center border-t border-neutral-200 dark:border-neutral-800 mt-8 lg:mt-12 pt-6 lg:pt-8 text-neutral-500 dark:text-neutral-400">
          <p className="text-xs">
            © {currentYear} StellarPay. All rights reserved.
          </p>
          <div className="flex items-center mt-4 sm:mt-0 text-xs">
            <span>Made with precision in {new Date().getFullYear()}</span>
            <span className="mx-2">•</span>
            <a
              href="https://synelime.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-colors"
            >
              stellar-pay.vercel.app
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
