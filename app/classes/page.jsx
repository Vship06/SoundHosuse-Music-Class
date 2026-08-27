"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { instruments, classes } from "../../lib/data";
import { TrialModal, JoinClassModal } from "../../components/Modals";

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

export default function ClassesPage() {
  const [filter, setFilter] = useState("All");
  const [trialOpen, setTrialOpen] = useState(false);
  const [trialInstrument, setTrialInstrument] = useState("Guitar");
  const [selectedClass, setSelectedClass] = useState(null);

  const visible = filter === "All" ? classes : classes.filter((x) => x.instrument === filter);

  const openBook = (inst = "Guitar") => {
    setTrialInstrument(inst);
    setTrialOpen(true);
  };

  return (
    <main className="min-h-screen bg-beige-base">
      <section className="mx-auto w-[92vw] max-w-[1180px] pt-12 pb-16 md:pt-24 md:pb-24 border-b border-beige-border">
        <Reveal>
          <div className="max-w-3xl">
            <div className="text-xs font-bold uppercase tracking-widest text-ink-secondary/80 mb-4">Classes</div>
            <h1 className="font-display text-[clamp(3rem,7vw,6rem)] font-bold leading-[0.95] tracking-tight text-ink-primary">
              Choose your instrument.
              <br />
              <span className="text-ink-secondary/60">Build your path.</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg md:text-xl leading-relaxed text-ink-secondary font-medium">
              Explore what each track teaches, compare levels, and see live
              class times before you book a free trial.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto w-[92vw] max-w-[1180px] py-16">
        <Reveal>
          <div className="flex flex-wrap gap-3 mb-12">
            {["All", "Guitar", "Piano", "Drums", "Vocals", "Violin", "Saxophone"].map((x) => (
              <button
                key={x}
                onClick={() => setFilter(x)}
                className={`rounded-full px-6 py-3 text-sm font-bold transition-all ${
                  filter === x
                    ? "bg-primary text-white shadow-md shadow-primary/20"
                    : "border border-beige-border bg-beige-surface text-ink-secondary hover:bg-beige-surface/80 hover:text-ink-primary"
                }`}
              >
                {x}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div layout className="grid gap-6 md:grid-cols-2">
          <AnimatePresence>
            {instruments
              .filter((x) => filter === "All" || x.name === filter)
              .map((x, i) => (
                <motion.article
                  key={x.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="group overflow-hidden rounded-3xl border border-beige-border bg-beige-surface transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-primary flex flex-col"
                >
                  <div className="relative h-48 w-full overflow-hidden">
                    <img
                      src={x.image}
                      alt={x.name}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-beige-surface via-beige-surface/30 to-transparent" />
                    <span className="absolute top-4 right-4 rounded-full bg-beige-surface/90 backdrop-blur-md border border-beige-border px-4 py-1.5 text-xs font-bold text-ink-primary shadow-sm">
                      From ₹{x.basePrice.toLocaleString("en-IN")}/mo
                    </span>
                  </div>
                  <div className="p-8 md:p-10 flex flex-col flex-grow pt-2">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-primary">{x.icon}</span>
                      <h2 className="font-display text-3xl font-bold text-ink-primary">
                        {x.name}
                      </h2>
                    </div>
                    <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
                      {x.subtitle}
                    </p>
                    <p className="text-ink-secondary leading-relaxed font-medium">
                      {x.description}
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {x.skills.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-beige-border bg-beige-base px-3.5 py-1 text-xs font-semibold text-ink-secondary"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="mt-8 flex items-center justify-between border-t border-beige-border pt-6 mt-auto">
                      <div className="text-sm text-ink-secondary/80">
                        Teacher: <strong className="text-ink-primary ml-1">{x.teacher}</strong>
                      </div>
                      <button
                        onClick={() => openBook(x.name)}
                        className="rounded-full bg-primary text-white px-5 py-2.5 text-sm font-bold transition-transform hover:scale-105 shadow-md"
                      >
                        Book a free trial ↗
                      </button>
                    </div>
                  </div>
                </motion.article>
              ))}
          </AnimatePresence>
        </motion.div>
      </section>

      <section id="schedule" className="mx-auto w-[92vw] max-w-[1180px] pb-32">
        <Reveal>
          <div className="mb-12">
            <div className="text-xs font-bold uppercase tracking-widest text-ink-secondary/80 mb-3">Schedule</div>
            <h2 className="font-display text-4xl font-bold tracking-tight text-ink-primary">This week's classes</h2>
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="overflow-hidden rounded-3xl border border-beige-border bg-beige-surface">
            <AnimatePresence>
              {visible.map((x, i) => (
                <motion.div
                  key={`${x.day}${x.time}${x.instrument}`}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className={`grid gap-6 p-6 md:p-8 md:grid-cols-[140px_1fr_150px_100px] md:items-center transition-colors hover:bg-beige-base ${
                    i < visible.length - 1 ? "border-b border-beige-border" : ""
                  }`}
                >
                  <div className="font-bold text-ink-primary text-xl">
                    {x.day}
                    <div className="text-sm font-normal text-ink-secondary/80 mt-1">
                      {x.time}
                    </div>
                  </div>
                  <div>
                    <strong className="text-ink-primary text-lg block mb-1">
                      {x.instrument} <span className="text-ink-secondary/80 font-normal ml-2 px-2 py-0.5 rounded-md bg-beige-surface border border-beige-border text-sm inline-block">{x.level}</span>
                    </strong>
                    <div className="text-sm font-medium text-primary mt-1">{x.teacher}</div>
                  </div>
                  <div className="text-sm font-medium text-ink-secondary">
                    {x.spots} spots left
                  </div>
                  <button
                    onClick={() => setSelectedClass(x)}
                    className="rounded-full border border-beige-border bg-beige-surface px-5 py-3 text-sm font-bold text-ink-primary transition-all hover:bg-primary hover:text-white hover:border-primary shadow-sm"
                  >
                    Join
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>
            {visible.length === 0 && (
              <div className="p-16 text-center text-ink-secondary/80 font-medium text-lg">
                No classes scheduled for {filter} this week.
              </div>
            )}
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
    </main>
  );
}

