"use client";

import { useState, useRef } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { teachers } from "../../lib/data";
import { TrialModal } from "../../components/Modals";

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

export default function TeachersPage() {
  const [teacher, setTeacher] = useState(null);
  const [trialOpen, setTrialOpen] = useState(false);
  const [trialInstrument, setTrialInstrument] = useState("Guitar");

  const openBook = (inst = "Guitar") => {
    setTrialInstrument(inst);
    setTrialOpen(true);
  };

  return (
    <main className="min-h-screen bg-beige-base">
      <section className="mx-auto w-[92vw] max-w-[1180px] pt-12 pb-16 md:pt-24 md:pb-24 border-b border-beige-border">
        <Reveal>
          <div className="text-xs font-bold uppercase tracking-widest text-ink-secondary/80 mb-4">Teachers</div>
          <h1 className="font-display text-[clamp(3rem,7vw,6rem)] font-bold leading-[0.95] tracking-tight text-ink-primary">
            Learn from people
            <br />
            <span className="text-ink-secondary/60">who still play.</span>
          </h1>
          <p className="mt-8 max-w-2xl text-lg md:text-xl leading-relaxed text-ink-secondary font-medium">
            Every SoundHouse teacher performs, creates, or teaches
            professionally. Meet the people behind the lessons.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto grid w-[92vw] max-w-[1180px] gap-8 py-20 md:grid-cols-3">
        {teachers.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.1}>
            <button
              onClick={() => setTeacher(t)}
              className="group w-full overflow-hidden rounded-3xl border border-beige-border bg-beige-surface text-left transition-all duration-300 hover:-translate-y-2 hover:border-primary flex flex-col h-full shadow-sm hover:shadow-xl"
            >
              <div className="relative h-48 w-full overflow-hidden">
                <img
                  src={t.image}
                  alt={`${t.name} - ${t.instrument} Studio`}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-beige-surface via-beige-surface/20 to-transparent" />
                <span className="absolute top-4 right-4 rounded-full bg-beige-surface/90 backdrop-blur-md border border-beige-border px-3.5 py-1 text-xs font-bold text-primary shadow-sm">
                  {t.instrument}
                </span>
                <div className="absolute -bottom-4 left-8 h-10 w-10 rounded-full border-2 border-beige-surface bg-primary text-white flex items-center justify-center font-display text-sm font-bold shadow-md">
                  {t.name.charAt(0)}
                </div>
              </div>
              <div className="p-8 md:p-10 flex flex-col flex-grow pt-8">
                <h2 className="font-display text-3xl font-bold text-ink-primary mb-1">
                  {t.name}
                </h2>
                <p className="text-xs font-bold uppercase tracking-widest text-primary mb-3">
                  {t.instrument} Studio
                </p>
                <p className="text-sm font-medium text-ink-secondary leading-relaxed">
                  {t.experience} experience · {t.focus}
                </p>
                <div className="mt-8 flex items-center justify-between border-t border-beige-border pt-6 mt-auto">
                  <span className="rounded-full border border-beige-border bg-beige-base px-4 py-1.5 text-xs font-bold text-ink-secondary">
                    <span className="text-primary mr-1">★</span> {t.rating.toFixed(1)} · {t.students} students
                  </span>
                  <div className="h-10 w-10 rounded-full border border-beige-border bg-beige-surface flex items-center justify-center transition-all group-hover:bg-primary group-hover:border-primary">
                    <ArrowUpRight className="h-5 w-5 text-ink-secondary transition-all group-hover:text-white group-hover:scale-110" />
                  </div>
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </section>

      <AnimatePresence>
        {teacher && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-beige-base/80 p-4 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              className="w-full max-w-lg rounded-3xl bg-beige-surface border border-beige-border p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative"
            >
              <div className="flex items-center justify-between border-b border-beige-border pb-5 mb-6">
                <div className="text-xs font-bold uppercase tracking-widest text-primary">Teacher profile</div>
                <button onClick={() => setTeacher(null)} className="rounded-full p-2 text-ink-secondary hover:text-ink-primary hover:bg-beige-border transition-colors">
                  <X />
                </button>
              </div>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="h-14 w-14 rounded-2xl bg-primary/10 border border-primary/20 text-primary flex items-center justify-center font-display text-2xl font-bold">
                  {teacher.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-display text-3xl font-bold text-ink-primary">
                    {teacher.name}
                  </h3>
                  <p className="text-sm font-bold uppercase tracking-wider text-primary">
                    {teacher.instrument} Mentor
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 text-sm font-medium text-ink-secondary mb-8">
                <span className="px-3 py-1 rounded-full bg-beige-base border border-beige-border">{teacher.experience}</span>
                <span className="w-1 h-1 rounded-full bg-beige-border" />
                <span className="px-3 py-1 rounded-full bg-beige-base border border-beige-border text-ink-primary"><span className="text-primary mr-1">★</span>{teacher.rating.toFixed(1)}</span>
              </div>
              
              <p className="leading-relaxed text-ink-secondary font-medium mb-10 border-t border-beige-border pt-8">
                Has taught <strong className="text-ink-primary">{teacher.students}+ students</strong>, from complete beginners
                to advanced players, focusing on real songs, confident technique,
                and performance habits that last. Specializes in <strong className="text-ink-primary">{teacher.focus}</strong>.
              </p>
              
              <button
                onClick={() => {
                  setTeacher(null);
                  openBook(teacher.instrument);
                }}
                className="w-full rounded-full bg-primary text-white px-4 py-4 font-bold transition-transform hover:scale-[1.02] shadow-md"
              >
                Book a trial with {teacher.name.split(' ')[0]}
              </button>
            </motion.div>
            <div className="absolute inset-0 z-[-1]" onClick={() => setTeacher(null)} />
          </div>
        )}
      </AnimatePresence>

      <TrialModal
        open={trialOpen}
        onClose={() => setTrialOpen(false)}
        initialInstrument={trialInstrument}
      />
    </main>
  );
}

