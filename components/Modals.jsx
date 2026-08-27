"use client";

import { useState, useEffect } from "react";
import { X, Calendar, Clock, UserCheck, Users, CircleCheckBig, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { instruments } from "../lib/data";

export function TrialModal({ open, onClose, initialInstrument }) {
  const [step, setStep] = useState(1);
  const [booked, setBooked] = useState(false);
  const [trial, setTrial] = useState({
    instrument: initialInstrument || "Guitar",
    level: "Complete beginner",
    format: "In-person",
    time: "Tuesday · 6:30 PM",
    name: "",
    email: "",
  });

  useEffect(() => {
    if (open) {
      setTrial((prev) => ({
        ...prev,
        instrument: initialInstrument || "Guitar",
      }));
      setStep(1);
      setBooked(false);
    }
  }, [open, initialInstrument]);

  const instrument = instruments.find((x) => x.name === trial.instrument) || instruments[0];
  const multiplier = trial.format === "1:1" ? 1.55 : trial.format === "Online" ? 0.9 : 1;
  const price = Math.round(instrument.basePrice * multiplier);

  const selectInstrument = (name) => setTrial((t) => ({ ...t, instrument: name }));

  if (!open) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-beige-base/80 p-4 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="w-full max-w-xl rounded-3xl bg-beige-surface border border-beige-border p-8 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden relative"
        >
          <div className="absolute top-0 left-0 w-full h-1.5 bg-beige-surface">
            <motion.div 
              className="h-full bg-primary"
              initial={{ width: "25%" }}
              animate={{ width: `${(step / 4) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="flex items-start justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Free trial session</div>
              <h3 className="font-display text-3xl font-bold text-ink-primary">Let's get you playing.</h3>
            </div>
            <button onClick={onClose} className="rounded-full p-2 text-ink-secondary hover:text-ink-primary hover:bg-beige-surface transition-colors">
              <X />
            </button>
          </div>

          {!booked ? (
            <div className="mt-8">
              {step === 1 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h4 className="font-display text-xl font-bold text-ink-primary mb-5">What do you want to learn?</h4>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {instruments.map((x) => (
                      <button
                        key={x.id}
                        onClick={() => selectInstrument(x.name)}
                        className={`flex flex-col items-center justify-center rounded-2xl border p-5 text-center transition-all ${
                          trial.instrument === x.name
                            ? "border-primary bg-primary/10 text-ink-primary shadow-[0_0_15px_rgba(255,107,74,0.15)]"
                            : "border-beige-border bg-beige-surface text-ink-secondary hover:border-beige-border hover:bg-beige-surface hover:text-ink-primary"
                        }`}
                      >
                        <div className="mb-3 text-4xl opacity-90">{x.icon}</div>
                        <div className="text-sm font-bold">{x.name}</div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
              {step === 2 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h4 className="font-display text-xl font-bold text-ink-primary mb-5">What's your experience?</h4>
                  <div className="grid gap-4">
                    {["Complete beginner", "Some experience", "Intermediate"].map((v) => (
                      <button
                        key={v}
                        onClick={() => setTrial((t) => ({ ...t, level: v }))}
                        className={`rounded-2xl border p-5 text-left font-semibold transition-all ${
                          trial.level === v
                            ? "border-primary bg-primary/10 text-ink-primary"
                            : "border-beige-border bg-beige-surface text-ink-secondary hover:border-beige-border hover:bg-beige-surface hover:text-ink-primary"
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
              {step === 3 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h4 className="font-display text-xl font-bold text-ink-primary mb-5">Choose your format</h4>
                  <div className="grid gap-4 sm:grid-cols-3">
                    {["In-person", "1:1", "Online"].map((v) => (
                      <button
                        key={v}
                        onClick={() => setTrial((t) => ({ ...t, format: v }))}
                        className={`rounded-2xl border p-5 text-left transition-all ${
                          trial.format === v
                            ? "border-primary bg-primary/10 text-ink-primary"
                            : "border-beige-border bg-beige-surface text-ink-secondary hover:border-beige-border hover:bg-beige-surface hover:text-ink-primary"
                        }`}
                      >
                        <div className="font-bold">{v}</div>
                        <div className="mt-2 text-xs font-medium text-ink-secondary">
                          {v === "1:1" ? "Personal pace" : v === "Online" ? "Anywhere" : "Studio"}
                        </div>
                      </button>
                    ))}
                  </div>
                  <div className="mt-6 rounded-2xl bg-beige-surface border border-beige-border p-6">
                    <div className="text-sm font-bold text-ink-secondary uppercase tracking-wide">Estimated monthly plan</div>
                    <div className="mt-2 font-display text-4xl font-bold text-ink-primary">
                      ₹{price.toLocaleString("en-IN")}
                    </div>
                  </div>
                </motion.div>
              )}
              {step === 4 && (
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                  <h4 className="font-display text-xl font-bold text-ink-primary mb-5">Pick a time and save your spot.</h4>
                  <div className="grid gap-4 sm:grid-cols-2 mb-6">
                    {["Tuesday · 6:30 PM", "Wednesday · 7:00 PM", "Saturday · 10:00 AM", "Sunday · 11:30 AM"].map((v) => (
                      <button
                        type="button"
                        key={v}
                        onClick={() => setTrial((t) => ({ ...t, time: v }))}
                        className={`rounded-2xl border p-4 text-left font-medium transition-all ${
                          trial.time === v
                            ? "border-primary bg-primary/10 text-ink-primary"
                            : "border-beige-border bg-beige-surface text-ink-secondary hover:border-beige-border hover:text-ink-primary"
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setBooked(true);
                    }}
                    className="grid gap-4 sm:grid-cols-2"
                  >
                    <input
                      required
                      value={trial.name}
                      onChange={(e) => setTrial((t) => ({ ...t, name: e.target.value }))}
                      placeholder="Your name"
                      className="rounded-xl border border-beige-border bg-beige-surface px-4 py-3.5 font-medium outline-none focus:border-primary text-ink-primary placeholder:text-ink-secondary/60 transition-colors"
                    />
                    <input
                      required
                      type="email"
                      value={trial.email}
                      onChange={(e) => setTrial((t) => ({ ...t, email: e.target.value }))}
                      placeholder="Email address"
                      className="rounded-xl border border-beige-border bg-beige-surface px-4 py-3.5 font-medium outline-none focus:border-primary text-ink-primary placeholder:text-ink-secondary/60 transition-colors"
                    />
                    <button type="submit" className="sm:col-span-2 mt-2 w-full rounded-xl bg-primary px-4 py-4 font-bold text-ink-primary transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(255,107,74,0.3)]">
                      Request my free trial <ArrowRight className="inline h-5 w-5 ml-2" />
                    </button>
                  </form>
                </motion.div>
              )}

              <div className="mt-10 flex items-center justify-between border-t border-beige-border pt-6">
                <button
                  disabled={step === 1}
                  onClick={() => setStep((s) => s - 1)}
                  className="rounded-full px-5 py-2.5 text-sm font-bold text-ink-secondary hover:text-ink-primary disabled:opacity-30 disabled:hover:text-ink-secondary transition-colors"
                >
                  Back
                </button>
                {step < 4 && (
                  <button
                    onClick={() => setStep((s) => s + 1)}
                    className="rounded-full bg-primary text-white px-6 py-3 text-sm font-bold transition-transform hover:scale-105"
                  >
                    Continue <ArrowRight className="ml-1 inline h-4 w-4" />
                  </button>
                )}
              </div>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-12 text-center">
              <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-primary/20 text-primary mb-8">
                <CircleCheckBig className="h-12 w-12" />
              </div>
              <h3 className="font-display text-4xl font-bold text-ink-primary mb-4">Your trial is requested.</h3>
              <p className="mx-auto max-w-md text-ink-secondary leading-relaxed font-medium">
                We saved a <strong className="text-ink-primary">{trial.instrument}</strong> trial for{" "}
                <strong className="text-ink-primary">{trial.time}</strong>. We'll send the next steps to <strong className="text-ink-primary">{trial.email}</strong>.
              </p>
              <button
                onClick={onClose}
                className="mt-10 rounded-full bg-primary text-white px-10 py-4 font-bold transition-transform hover:scale-105"
              >
                Done
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

export function JoinClassModal({ classItem, onClose }) {
  const [reserved, setReserved] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  if (!classItem) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-beige-base/80 p-4 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="w-full max-w-md rounded-3xl bg-beige-surface border border-beige-border p-8 shadow-2xl"
        >
          <div className="flex items-start justify-between border-b border-beige-border pb-5">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-primary">Instant Class Pass</span>
              <h3 className="mt-2 font-display text-3xl font-bold text-ink-primary">Reserve a Seat</h3>
            </div>
            <button onClick={onClose} className="rounded-full p-2 text-ink-secondary hover:text-ink-primary hover:bg-beige-surface transition-colors">
              <X />
            </button>
          </div>

          {!reserved ? (
            <div className="mt-6 space-y-6">
              <div className="rounded-2xl border border-beige-border bg-beige-surface p-6">
                <div className="font-bold text-xl text-ink-primary">
                  {classItem.instrument} <span className="text-ink-secondary font-normal ml-2">{classItem.level}</span>
                </div>
                <div className="mt-5 flex flex-wrap gap-y-4 text-sm font-medium text-ink-secondary">
                  <div className="flex w-1/2 items-center gap-2">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>{classItem.day}s</span>
                  </div>
                  <div className="flex w-1/2 items-center gap-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>{classItem.time}</span>
                  </div>
                  <div className="flex w-1/2 items-center gap-2">
                    <UserCheck className="h-4 w-4 text-primary" />
                    <span>{classItem.teacher}</span>
                  </div>
                  <div className="flex w-1/2 items-center gap-2">
                    <Users className="h-4 w-4 text-primary" />
                    <span>{classItem.spots} seats left</span>
                  </div>
                </div>
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setReserved(true);
                }}
                className="space-y-4"
              >
                <input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your full name"
                  className="w-full rounded-xl border border-beige-border bg-beige-surface px-4 py-3.5 font-medium outline-none focus:border-primary text-ink-primary placeholder:text-ink-secondary/60 transition-colors"
                />
                <input
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="Email address"
                  className="w-full rounded-xl border border-beige-border bg-beige-surface px-4 py-3.5 font-medium outline-none focus:border-primary text-ink-primary placeholder:text-ink-secondary/60 transition-colors"
                />
                <button
                  type="submit"
                  className="w-full rounded-xl bg-primary py-4 font-bold text-ink-primary transition-all hover:scale-[1.02] shadow-[0_0_20px_rgba(255,107,74,0.3)] mt-2"
                >
                  Confirm Reservation <ArrowRight className="inline h-5 w-5 ml-2" />
                </button>
              </form>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-10 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 text-primary mb-6">
                <CircleCheckBig className="h-10 w-10" />
              </div>
              <h4 className="font-display text-3xl font-bold text-ink-primary mb-3">Spot Reserved!</h4>
              <p className="text-base font-medium text-ink-secondary leading-relaxed max-w-sm mx-auto">
                We reserved a seat for <strong className="text-ink-primary">{classItem.instrument}</strong> on{" "}
                <strong className="text-ink-primary">{classItem.day} at {classItem.time}</strong>. Check {formData.email} for studio directions.
              </p>
              <button
                onClick={onClose}
                className="mt-10 w-full rounded-full bg-primary text-white py-4 font-bold transition-transform hover:scale-105"
              >
                Done
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}

