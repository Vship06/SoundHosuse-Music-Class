"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown, Users, Music } from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { TrialModal, JoinClassModal } from "../components/Modals";
import MiniInstrument from "../components/MiniInstrument";
import { instruments, faqs, classes } from "../lib/data";

function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.8, delay: delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ShelfSection({ onBook }) {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="mx-auto w-[92vw] max-w-[1180px] pt-24 pb-20 border-t border-beige-border">
      <Reveal>
        <div className="mb-14 text-center">
          <h2 className="font-display text-[clamp(2.5rem,5vw,3.5rem)] font-bold leading-none tracking-tight text-ink-primary">
            Pick something. <span className="text-ink-secondary/60">Give it a try.</span>
          </h2>
          <p className="mt-4 text-lg text-ink-secondary">
            Swipe through the studio shelf and discover your sound.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.2}>
        <div className="relative pt-24 pb-8">
          <div className="pointer-events-none absolute bottom-8 left-0 right-0 z-0 h-2 rounded-full bg-beige-surface shadow-inner md:-ml-8 md:-mr-8" />
          <div className="pointer-events-none absolute bottom-6 left-2 right-2 z-0 h-4 bg-beige-surface blur-md md:-ml-6 md:-mr-6 opacity-50" />

          <div className="no-scrollbar relative z-10 flex w-full snap-x snap-mandatory overflow-x-auto px-4 pb-4 md:justify-center md:gap-4 md:overflow-visible md:px-0">
            {instruments.map((inst) => {
              const isHovered = hovered === inst.id;
              const isDimmed = hovered && hovered !== inst.id;

              return (
                <button
                  key={inst.id}
                  onMouseEnter={() => setHovered(inst.id)}
                  onMouseLeave={() => setHovered(null)}
                  onFocus={() => setHovered(inst.id)}
                  onBlur={() => setHovered(null)}
                  onClick={() => onBook(inst.name)}
                  className={`group relative flex h-[280px] w-[180px] shrink-0 snap-center flex-col items-center justify-start rounded-2xl pt-6 outline-none transition-all duration-500 ease-out md:w-[190px] md:justify-end md:pt-0
                    ${isHovered ? "md:-translate-y-8 md:scale-110" : "md:translate-y-0 md:scale-100"}
                    ${isDimmed ? "md:opacity-40 md:grayscale" : "opacity-100"}
                  `}
                >
                  <div
                    className={`absolute top-0 flex w-full flex-col items-center text-center transition-all duration-300
                    translate-y-0 opacity-100 md:pointer-events-none md:translate-y-4 md:opacity-0
                    ${isHovered ? "md:!pointer-events-auto md:!translate-y-0 md:!opacity-100" : ""}`}
                  >
                    <h3 className="font-display text-2xl font-bold tracking-tight text-ink-primary">
                      {inst.name.toUpperCase()}
                    </h3>
                    <p className="mt-1 text-xs font-bold uppercase tracking-widest text-primary">
                      {inst.skills.slice(0, 3).join(" · ")}
                    </p>
                    <span className="mt-4 flex items-center gap-1 rounded-full bg-beige-surface border border-beige-border px-5 py-2 text-xs font-bold text-ink-primary transition-colors group-hover:bg-primary group-hover:border-primary group-hover:text-white">
                      TRY IT <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>

                  <div className="relative mb-2 mt-auto flex h-36 w-36 items-center justify-center md:mt-0 text-ink-secondary">
                    <MiniInstrument instrument={inst} isHovered={isHovered} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>
    </section>
  );
}

export default function Home() {
  const [trialOpen, setTrialOpen] = useState(false);
  const [trialInstrument, setTrialInstrument] = useState("Guitar");
  const [selectedClass, setSelectedClass] = useState(null);
  const [faqOpen, setFaqOpen] = useState(0);

  const openBook = (inst = "Guitar") => {
    setTrialInstrument(inst);
    setTrialOpen(true);
  };

  const reviews = [
    { name: "Riya, 22", track: "Guitar · 4 months", text: "I stopped waiting to be good enough and started playing." },
    { name: "Aarav", track: "Piano learner", text: "The biggest difference is that every class ends with me actually playing a song. I can hear the improvement week to week." },
    { name: "Neha, 28", track: "Vocals · 2 months", text: "I've always been shy about singing, but the supportive environment here completely changed that." },
    { name: "Kabir", track: "Drums learner", text: "Learning groove and fills hands-on from day one instead of just reading sheet music makes all the difference." },
  ];

  useEffect(() => {
    if (typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get("trial") === "true") {
        setTrialOpen(true);
        window.history.replaceState({}, "", "/");
      }
    }
  }, []);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative w-full overflow-hidden bg-[#0f0d0b]" style={{ minHeight: "92vh" }}>
        {/* Split grid: left copy panel + right image panel */}
        <div className="relative z-10 grid h-full min-h-[92vh] md:grid-cols-[1fr_1fr] lg:grid-cols-[55fr_45fr]">

          {/* LEFT — copy */}
          <div className="relative flex flex-col justify-center px-8 py-28 md:px-16 lg:px-24 z-10">
            {/* Subtle noise/gradient bg for the left panel */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#1a1208] via-[#0f0d0b] to-[#0f0d0b]" />

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm font-semibold text-white/70 mb-8 w-fit"
            >
              <Music className="w-4 h-4 text-primary" />
              <span>Premium Music Education</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="relative font-display text-[clamp(3rem,5.5vw,5rem)] font-bold leading-[1.06] tracking-tight text-white"
            >
              Learn music.<br />
              <span className="text-primary">Find your sound.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.18, ease: "easeOut" }}
              className="relative mt-6 max-w-md text-base md:text-lg font-medium leading-relaxed text-white/60"
            >
              Live, practical music classes for beginners, hobbyists, and future
              performers. Learn from working musicians, play from day one, and
              build skills you actually use.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.34, ease: "easeOut" }}
              className="relative mt-10 flex flex-wrap gap-4"
            >
              <button
                onClick={() => openBook()}
                className="rounded-full bg-primary px-8 py-4 text-sm font-bold text-white transition-all hover:scale-105 hover:bg-primary-hover shadow-[0_6px_28px_rgba(255,106,61,0.45)]"
              >
                Book a free trial
              </button>
              <Link
                href="/classes"
                className="rounded-full border border-white/15 bg-white/8 px-8 py-4 text-sm font-bold text-white/80 transition-all hover:bg-white/12 hover:text-white backdrop-blur-sm"
              >
                Explore classes
              </Link>
            </motion.div>

            {/* Stats row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.55 }}
              className="relative mt-14 flex items-center gap-8 border-t border-white/10 pt-8"
            >
              {[["6+", "Instruments"], ["500+", "Students"], ["4.9★", "Rating"]].map(([val, label]) => (
                <div key={label}>
                  <div className="font-display text-2xl font-bold text-white">{val}</div>
                  <div className="text-xs font-semibold uppercase tracking-widest text-white/40 mt-0.5">{label}</div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* RIGHT — classroom image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative hidden md:block"
          >
            <img
              className="absolute inset-0 h-full w-full object-cover object-center"
              src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=1400&q=85"
              alt="Music classroom with students learning instruments"
            />
            {/* Left edge fade to blend into dark left panel */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0f0d0b] via-transparent to-transparent" />
            {/* Bottom vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0f0d0b]/60 via-transparent to-transparent" />
          </motion.div>
        </div>
      </section>

      <section id="how-it-works" className="py-32 text-ink-primary relative bg-beige-base">
        <div className="mx-auto grid w-[92vw] max-w-[1180px] gap-16 md:grid-cols-2 md:items-center">
          <Reveal>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-ink-secondary/80 mb-3">Our approach</div>
              <h2 className="font-display text-4xl md:text-5xl font-bold tracking-tight text-ink-primary mb-6">
                Less "lesson".
                <br />
                More <span className="text-primary">music.</span>
              </h2>
              <p className="max-w-xl leading-relaxed text-ink-secondary text-lg">
                We keep the theory useful, the practice musical, and the
                progress visible. Every student gets a simple roadmap, real
                songs, and frequent chances to play with others.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              "Pick a goal — from first chord to first gig.",
              "Learn with a real musician, not a video library.",
              "Practice through songs you actually love.",
              "Perform, record and celebrate progress.",
            ].map((text, i) => (
              <Reveal key={text} delay={i * 0.1}>
                <div className="group bg-beige-surface border border-beige-border hover:border-primary rounded-2xl p-8 h-full flex flex-col justify-center transition-all duration-300 hover:shadow-[0_8px_30px_-5px_rgba(255,106,61,0.3)] hover:-translate-y-2">
                  <div className="font-display text-4xl font-black text-beige-hover group-hover:text-primary transition-colors duration-300 mb-4">
                    0{i + 1}
                  </div>
                  <p className="text-base leading-relaxed text-ink-secondary font-medium">
                    {text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ShelfSection onBook={openBook} />

      <section className="mx-auto w-[92vw] max-w-[1180px] pt-12 pb-24 border-t border-beige-border bg-beige-base">
        <Reveal>
          <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-ink-secondary/80 mb-2">This week's picks</div>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-ink-primary">A few open seats right now.</h2>
            </div>
            <Link
              href="/classes#schedule"
              className="rounded-full border border-beige-border px-6 py-3 text-sm font-bold text-ink-secondary transition-all hover:bg-primary hover:text-white hover:border-primary"
            >
              See full schedule →
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="overflow-hidden rounded-3xl border border-beige-border bg-beige-surface">
            {classes.slice(0, 3).map((x, i) => (
              <div
                key={`${x.day}-${x.time}-${x.instrument}`}
                className={`grid gap-4 p-6 md:grid-cols-[120px_1fr_180px_120px] md:items-center transition-colors hover:bg-beige-surface/50 ${i !== 2 ? "border-b border-beige-border" : ""
                  }`}
              >
                <div className="font-display font-bold text-ink-primary text-lg flex flex-col md:block">
                  {x.day} <span className="text-ink-secondary/80 text-sm md:ml-2 font-normal">{x.time}</span>
                </div>
                <div>
                  <div className="font-bold text-ink-primary text-lg mb-1">
                    {x.instrument} <span className="text-ink-secondary/80 font-normal text-sm ml-2 px-2 py-0.5 rounded-md bg-beige-surface border border-beige-border">{x.level}</span>
                  </div>
                  <div className="text-sm font-medium text-primary">{x.teacher}</div>
                </div>
                <div className="flex items-center gap-2 text-sm text-ink-secondary/80 font-medium">
                  <Users className="h-4 w-4 text-ink-secondary/60" />
                  {x.spots} spots left
                </div>
                <button
                  onClick={() => setSelectedClass(x)}
                  className="rounded-full border border-beige-border bg-beige-surface px-5 py-2.5 text-sm font-bold text-ink-primary transition hover:bg-primary hover:text-white hover:border-primary shadow-sm"
                >
                  Join class
                </button>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mx-auto w-full overflow-hidden pt-12 pb-32 border-t border-beige-border bg-beige-base relative">
        <Reveal>
          <div className="mx-auto mb-16 w-[92vw] max-w-[1180px] text-center">
            <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight text-ink-primary">Don't just take our word for it.</h2>
          </div>
        </Reveal>
        <div className="relative flex w-full flex-col overflow-hidden py-4">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-beige-base to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-beige-base to-transparent z-10 pointer-events-none" />

          <div className="flex w-full overflow-hidden group">
            <div className="flex shrink-0 w-max animate-marquee gap-6 pr-6 group-hover:[animation-play-state:paused]">
              {[...reviews, ...reviews].map((r, idx) => (
                <div
                  key={idx}
                  className="w-[400px] shrink-0 rounded-3xl border border-beige-border bg-beige-surface p-8 transition-all duration-300 hover:-translate-y-2 hover:border-primary shadow-sm"
                >
                  <div className="flex text-primary text-lg mb-6">
                    {Array(5).fill("★").map((star, i) => <span key={i}>{star}</span>)}
                  </div>
                  <p className="text-lg leading-relaxed text-ink-secondary font-medium mb-8">"{r.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-beige-surface border border-beige-border flex items-center justify-center font-bold text-ink-primary">
                      {r.name.charAt(0)}
                    </div>
                    <div className="text-sm">
                      <strong className="text-ink-primary block">{r.name}</strong>
                      <span className="text-ink-secondary/80">{r.track}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex shrink-0 w-max animate-marquee gap-6 pr-6 group-hover:[animation-play-state:paused]" aria-hidden="true">
              {[...reviews, ...reviews].map((r, idx) => (
                <div
                  key={`copy-${idx}`}
                  className="w-[400px] shrink-0 rounded-3xl border border-beige-border bg-beige-surface p-8 transition-all duration-300 hover:-translate-y-2 hover:border-primary shadow-sm"
                >
                  <div className="flex text-primary text-lg mb-6">
                    {Array(5).fill("★").map((star, i) => <span key={i}>{star}</span>)}
                  </div>
                  <p className="text-lg leading-relaxed text-ink-secondary font-medium mb-8">"{r.text}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-beige-surface border border-beige-border flex items-center justify-center font-bold text-ink-primary">
                      {r.name.charAt(0)}
                    </div>
                    <div className="text-sm">
                      <strong className="text-ink-primary block">{r.name}</strong>
                      <span className="text-ink-secondary/80">{r.track}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        id="faq"
        className="mx-auto grid w-[92vw] max-w-[1180px] gap-12 py-32 md:grid-cols-[.85fr_1.15fr] border-t border-beige-border bg-beige-base"
      >
        <Reveal>
          <div className="sticky top-32">
            <div className="text-xs font-bold uppercase tracking-widest text-ink-secondary/80 mb-3">FAQ</div>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-ink-primary mb-6">
              Good questions.
              <br />
              <span className="text-ink-secondary/60">Better answers.</span>
            </h2>
            <p className="max-w-md text-ink-secondary leading-relaxed text-lg">
              Still not sure where to start? A trial session is the easiest way
              to find your fit.
            </p>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="space-y-4">
            {faqs.map(([q, a], i) => (
              <div
                key={q}
                className="rounded-2xl border border-beige-border bg-beige-surface overflow-hidden transition-colors hover:border-primary"
              >
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? -1 : i)}
                  className="flex w-full items-center justify-between p-6 text-left font-bold text-ink-primary focus:outline-none"
                >
                  <span className="text-lg">{q}</span>
                  <motion.div animate={{ rotate: faqOpen === i ? 180 : 0 }} transition={{ duration: 0.2 }}>
                    <ChevronDown className={`h-5 w-5 ${faqOpen === i ? "text-primary" : "text-ink-secondary/60"}`} />
                  </motion.div>
                </button>
                <AnimatePresence>
                  {faqOpen === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="px-6 pb-6"
                    >
                      <p className="max-w-2xl text-base leading-relaxed text-ink-secondary font-medium">
                        {a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <TrialModal
        open={trialOpen}
        onClose={() => setTrialOpen(false)}
        initialInstrument={trialInstrument}
      />
      <JoinClassModal
        classItem={selectedClass}
        onClose={() => setSelectedClass(null)}
      />
    </>
  );
}

