"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const links = [
    { name: "Home", href: "/" },
    { name: "Classes", href: "/classes" },
    { name: "Teachers", href: "/teachers" },
  ];

  // On the homepage (hero image behind), use light text; after scroll or on inner pages, use dark text
  const isHero = pathname === "/" && !scrolled;

  return (
    <>
      <header
        className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-beige-surface/80 py-4 backdrop-blur-md border-b border-beige-border"
            : "bg-transparent py-6"
        }`}
      >
        {/* Subtle top scrim — only on hero pages when not yet scrolled, to ensure nav contrast */}
        {!scrolled && (
          <div
            className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 to-transparent"
            aria-hidden="true"
          />
        )}

        <div className="relative mx-auto flex w-[92vw] max-w-[1180px] items-center justify-between">
          {/* Logo — light on hero, dark on beige */}
          <Link
            href="/"
            className="font-display text-xl font-bold tracking-tight transition-opacity hover:opacity-80"
            style={{ textShadow: isHero ? "0 1px 6px rgba(0,0,0,0.4)" : "none" }}
          >
            <span className={isHero ? "text-[#F7F1E7]" : "text-ink-primary"}>SOUND</span>
            <span className="text-primary">HOUSE</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {links.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-sm font-semibold transition-colors ${
                    active
                      ? isHero
                        ? "text-[#F7F1E7]"
                        : "text-ink-primary"
                      : isHero
                      ? "text-[#F7F1E7]/80 hover:text-[#F7F1E7]"
                      : "text-ink-secondary hover:text-ink-primary"
                  }`}
                  style={{ textShadow: isHero ? "0 1px 4px rgba(0,0,0,0.3)" : "none" }}
                >
                  {link.name}
                  {active && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-1.5 left-0 right-0 h-[2px] bg-primary rounded-full"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
            <Link
              href="/?trial=true"
              className={`group ml-4 flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-bold backdrop-blur-md transition-all shadow-sm hover:bg-primary hover:text-white hover:border-primary ${
                isHero
                  ? "border border-white/30 bg-white/10 text-[#F7F1E7]"
                  : "border border-beige-border bg-beige-surface/50 text-ink-primary"
              }`}
            >
              Book a trial
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:scale-110" />
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className={`p-2 md:hidden ${isHero ? "text-[#F7F1E7]" : "text-ink-primary"}`}
          >
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 flex flex-col bg-beige-surface/95 px-6 pt-28 backdrop-blur-lg md:hidden"
          >
            <nav className="flex flex-col gap-6">
              {links.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`font-display text-4xl font-bold tracking-tight ${
                    pathname === link.href ? "text-primary" : "text-ink-primary"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <div className="mt-8">
                <Link
                  href="/?trial=true"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-lg font-bold text-white"
                >
                  Book a free trial
                  <ArrowUpRight className="h-5 w-5" />
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
