import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Menu,
  X,
  Users,
  CircleCheckBig,
  Calendar,
  Clock,
  UserCheck,
} from "lucide-react";
import { classes, faqs, instruments, teachers } from "./data";

const MiniInstrument = ({ instrument, isHovered }) => {
  return (
    <div className="relative flex flex-col items-center justify-center">
      <div
        className={`absolute inset-0 rounded-full bg-[#ff6b4a]/10 blur-xl transition-opacity duration-300 ${
          isHovered ? "opacity-100 scale-125" : "opacity-0 scale-90"
        }`}
      />
      <div
        className={`relative z-10 select-none text-6xl drop-shadow-sm transition-all duration-300 md:text-7xl ${
          isHovered ? "scale-125 -rotate-6" : "rotate-0 scale-100"
        }`}
      >
        {instrument.icon}
      </div>
    </div>
  );
};

function Reveal({ children, delay = 0, className = "" }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function Layout({ children, onBook }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { pathname, hash } = useLocation();
  const links = [
    ["/", "Home"],
    ["/classes", "Classes"],
    ["/teachers", "Teachers"],
    ["/classes#schedule", "Schedule"],
    ["/#faq", "FAQ"],
  ];

  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname, hash]);

  return (
    <div className="min-h-screen bg-[#f7f3eb] text-[#171717]">
      <header className="sticky top-0 z-40 border-b border-black/5 bg-[#f7f3eb]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-[74px] w-[92vw] max-w-[1180px] items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-3 font-display text-lg font-bold"
          >
            <span className="relative h-4 w-7">
              <span className="absolute left-0 top-0 h-4 w-4 rounded-full bg-[#ff6b4a]" />
              <span className="absolute left-3 top-0 h-4 w-4 rounded-full bg-[#ff6b4a]/70" />
            </span>
            SOUNDHOUSE
          </Link>
          <nav
            className={`${
              mobileOpen
                ? "absolute left-0 right-0 top-[74px] z-10 flex bg-[#f7f3eb] p-6 shadow-lg"
                : "hidden"
            } flex-col gap-5 md:static md:z-auto md:flex md:flex-row md:items-center md:bg-transparent md:p-0 md:shadow-none`}
          >
            {links.map(([href, label]) => {
              const isActive = href.includes("#")
                ? pathname === href.split("#")[0] &&
                  hash === "#" + href.split("#")[1]
                : pathname === href;
              return (
                <Link
                  key={href}
                  onClick={() => setMobileOpen(false)}
                  to={href}
                  className={`text-sm transition hover:text-black ${
                    isActive ? "font-bold text-black" : "text-[#55504a]"
                  }`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onBook()}
              className="hidden rounded-full border border-black px-4 py-2 text-sm font-bold transition hover:bg-black hover:text-white md:block"
            >
              Book a trial <ArrowUpRight className="ml-1 inline h-4 w-4" />
            </button>
            <button
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="rounded-xl border border-black p-2 md:hidden"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileOpen && (
          <button
            aria-label="Close menu"
            className="fixed inset-0 top-[74px] z-[5] bg-black/30 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
        )}
      </header>

      {children}

      <footer className="mt-10 border-t border-black/10 bg-[#171717] pt-16 pb-8 text-white">
        <div className="mx-auto w-[92vw] max-w-[1180px]">
          <div className="mb-16 grid gap-10 md:grid-cols-4">
            <div className="md:col-span-2">
              <Link
                to="/"
                className="flex items-center gap-3 font-display text-lg font-bold text-white"
              >
                <span className="relative h-4 w-7">
                  <span className="absolute left-0 top-0 h-4 w-4 rounded-full bg-[#ff6b4a]" />
                  <span className="absolute left-3 top-0 h-4 w-4 rounded-full bg-[#ff6b4a]/70" />
                </span>
                SOUNDHOUSE
              </Link>
              <p className="mt-5 max-w-sm text-sm leading-relaxed text-[#c3beb7]">
                Live, practical music classes for beginners, hobbyists, and
                future performers. Learn from working musicians, play from day
                one, and build skills you actually use.
              </p>
            </div>

            <div>
              <strong className="mb-5 block text-white">Explore</strong>
              <ul className="space-y-3 text-sm text-[#c3beb7]">
                <li>
                  <Link
                    to="/classes"
                    className="transition hover:text-[#ff6b4a]"
                  >
                    Classes
                  </Link>
                </li>
                <li>
                  <Link
                    to="/teachers"
                    className="transition hover:text-[#ff6b4a]"
                  >
                    Teachers
                  </Link>
                </li>
                <li>
                  <Link
                    to="/classes#schedule"
                    className="transition hover:text-[#ff6b4a]"
                  >
                    Schedule
                  </Link>
                </li>
                <li>
                  <Link to="/#faq" className="transition hover:text-[#ff6b4a]">
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <strong className="mb-5 block text-white">Socials</strong>
              <ul className="space-y-3 text-sm text-[#c3beb7]">
                <li>
                  <a href="#" className="transition hover:text-[#ff6b4a]">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:text-[#ff6b4a]">
                    YouTube
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:text-[#ff6b4a]">
                    Twitter (X)
                  </a>
                </li>
                <li>
                  <a href="#" className="transition hover:text-[#ff6b4a]">
                    Spotify
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-4 border-t border-white/10 pt-8 text-sm text-[#c3beb7] md:flex-row">
            <div>© 2026 SoundHouse. All rights reserved.</div>
            <div className="flex gap-6">
              <a href="#" className="transition hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="transition hover:text-white">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function JoinClassModal({ classItem, onClose }) {
  const [reserved, setReserved] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "" });

  if (!classItem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-[#fffdf8] p-7 shadow-2xl">
        <div className="flex items-start justify-between border-b border-black/10 pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#ff6b4a]">
              Instant Class Pass
            </span>
            <h3 className="mt-1 font-display text-2xl font-bold">
              Reserve a Seat
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 transition hover:bg-black/5"
          >
            <X />
          </button>
        </div>

        {!reserved ? (
          <div className="mt-5 space-y-5">
            <div className="rounded-2xl border border-black/10 bg-[#f7f3eb] p-4 text-sm">
              <div className="font-bold text-base text-[#171717]">
                {classItem.instrument} · {classItem.level}
              </div>
              <div className="mt-3 flex flex-wrap gap-y-2 text-xs text-[#69645d]">
                <div className="flex w-1/2 items-center gap-1.5">
                  <Calendar className="h-4 w-4 text-[#ff6b4a]" />
                  <span>{classItem.day}s</span>
                </div>
                <div className="flex w-1/2 items-center gap-1.5">
                  <Clock className="h-4 w-4 text-[#ff6b4a]" />
                  <span>{classItem.time}</span>
                </div>
                <div className="flex w-1/2 items-center gap-1.5">
                  <UserCheck className="h-4 w-4 text-[#ff6b4a]" />
                  <span>{classItem.teacher}</span>
                </div>
                <div className="flex w-1/2 items-center gap-1.5">
                  <Users className="h-4 w-4 text-[#ff6b4a]" />
                  <span>{classItem.spots} seats remaining</span>
                </div>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                setReserved(true);
              }}
              className="space-y-3"
            >
              <input
                required
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                placeholder="Your full name"
                className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black"
              />
              <input
                required
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                placeholder="Email address"
                className="w-full rounded-2xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black"
              />
              <button
                type="submit"
                className="w-full rounded-full bg-[#ff6b4a] py-3.5 font-bold text-white transition hover:opacity-90"
              >
                Confirm Reservation ↗
              </button>
            </form>
          </div>
        ) : (
          <div className="py-6 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#ff6b4a] text-white">
              <CircleCheckBig className="h-7 w-7" />
            </div>
            <h4 className="mt-4 font-display text-2xl font-bold">
              Spot Reserved!
            </h4>
            <p className="mt-2 text-sm text-[#69645d]">
              We reserved a seat for <strong>{classItem.instrument}</strong> on{" "}
              <strong>
                {classItem.day} at {classItem.time}
              </strong>
              . Check {formData.email} for studio directions.
            </p>
            <button
              onClick={onClose}
              className="mt-6 rounded-full bg-black px-6 py-2.5 text-sm font-bold text-white"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function TrialModal({ open, onClose, initialInstrument }) {
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

  // Sync prop changes to modal state whenever it opens
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

  const instrument =
    instruments.find((x) => x.name === trial.instrument) || instruments[0];
  const multiplier =
    trial.format === "1:1" ? 1.55 : trial.format === "Online" ? 0.9 : 1;
  const price = Math.round(instrument.basePrice * multiplier);

  if (!open) return null;
  const selectInstrument = (name) =>
    setTrial((t) => ({ ...t, instrument: name }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4">
      <div className="w-full max-w-xl rounded-3xl bg-[#fffdf8] p-7 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <div className="label">Free trial session</div>
            <h3 className="mt-1 font-display text-3xl font-bold">
              Let's get you playing.
            </h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 transition hover:bg-black/5"
          >
            <X />
          </button>
        </div>
        {!booked ? (
          <div className="mt-6">
            <div className="mb-6 flex gap-2">
              {[1, 2, 3, 4].map((n) => (
                <div
                  key={n}
                  className={`h-1.5 flex-1 rounded-full ${n <= step ? "bg-black" : "bg-black/10"}`}
                />
              ))}
            </div>
            {step === 1 && (
              <div>
                <h4 className="font-display text-xl font-bold">
                  What do you want to learn?
                </h4>
                <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {instruments.map((x) => (
                    <button
                      key={x.id}
                      onClick={() => selectInstrument(x.name)}
                      className={`flex flex-col items-center justify-center rounded-2xl border p-4 text-center transition hover:-translate-y-0.5 ${
                        trial.instrument === x.name
                          ? "border-black bg-black text-white"
                          : "border-black/10 bg-white hover:border-black/30"
                      }`}
                    >
                      <div className="mb-1 text-3xl">{x.icon}</div>
                      <div className="text-sm font-bold">{x.name}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {step === 2 && (
              <div>
                <h4 className="font-display text-xl font-bold">
                  What's your experience?
                </h4>
                <div className="mt-4 grid gap-3">
                  {["Complete beginner", "Some experience", "Intermediate"].map(
                    (v) => (
                      <button
                        key={v}
                        onClick={() => setTrial((t) => ({ ...t, level: v }))}
                        className={`rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 ${
                          trial.level === v
                            ? "border-black bg-black text-white"
                            : "border-black/10 bg-white"
                        }`}
                      >
                        {v}
                      </button>
                    ),
                  )}
                </div>
              </div>
            )}
            {step === 3 && (
              <div>
                <h4 className="font-display text-xl font-bold">
                  Choose your format
                </h4>
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  {["In-person", "1:1", "Online"].map((v) => (
                    <button
                      key={v}
                      onClick={() => setTrial((t) => ({ ...t, format: v }))}
                      className={`rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 ${
                        trial.format === v
                          ? "border-black bg-black text-white"
                          : "border-black/10 bg-white"
                      }`}
                    >
                      <div className="font-bold">{v}</div>
                      <div className="mt-1 text-xs opacity-70">
                        {v === "1:1"
                          ? "Personal pace"
                          : v === "Online"
                            ? "Anywhere"
                            : "Studio"}
                      </div>
                    </button>
                  ))}
                </div>
                <div className="mt-5 rounded-2xl bg-[#ffe0d6] p-5">
                  <div className="text-sm font-semibold">
                    Estimated monthly plan
                  </div>
                  <div className="mt-1 font-display text-3xl font-bold">
                    ₹{price.toLocaleString("en-IN")}
                  </div>
                </div>
              </div>
            )}
            {step === 4 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setBooked(true);
                }}
              >
                <h4 className="font-display text-xl font-bold">
                  Pick a time and save your spot.
                </h4>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {[
                    "Tuesday · 6:30 PM",
                    "Wednesday · 7:00 PM",
                    "Saturday · 10:00 AM",
                    "Sunday · 11:30 AM",
                  ].map((v) => (
                    <button
                      type="button"
                      key={v}
                      onClick={() => setTrial((t) => ({ ...t, time: v }))}
                      className={`rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 ${
                        trial.time === v
                          ? "border-black bg-black text-white"
                          : "border-black/10 bg-white"
                      }`}
                    >
                      {v}
                    </button>
                  ))}
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <input
                    required
                    value={trial.name}
                    onChange={(e) =>
                      setTrial((t) => ({ ...t, name: e.target.value }))
                    }
                    placeholder="Your name"
                    className="rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-black"
                  />
                  <input
                    required
                    type="email"
                    value={trial.email}
                    onChange={(e) =>
                      setTrial((t) => ({ ...t, email: e.target.value }))
                    }
                    placeholder="Email address"
                    className="rounded-2xl border border-black/10 bg-white px-4 py-3 outline-none focus:border-black"
                  />
                </div>
                <button className="mt-4 w-full rounded-full bg-[#ff6b4a] px-4 py-3.5 font-bold text-white transition hover:opacity-90">
                  Request my free trial ↗
                </button>
              </form>
            )}
            <div className="mt-7 flex items-center justify-between">
              <button
                disabled={step === 1}
                onClick={() => setStep((s) => s - 1)}
                className="rounded-full border border-black px-4 py-2 text-sm font-bold disabled:opacity-30"
              >
                Back
              </button>
              {step < 4 && (
                <button
                  onClick={() => setStep((s) => s + 1)}
                  className="rounded-full bg-black px-5 py-2.5 text-sm font-bold text-white transition hover:opacity-90"
                >
                  Continue <ArrowRight className="ml-1 inline h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#ff6b4a] text-white">
              <CircleCheckBig className="h-8 w-8" />
            </div>
            <h3 className="mt-5 font-display text-3xl font-bold">
              Your trial is requested.
            </h3>
            <p className="mx-auto mt-3 max-w-md text-[#69645d]">
              We saved a <strong>{trial.instrument}</strong> trial for{" "}
              <strong>{trial.time}</strong>. We'll send the next steps to{" "}
              {trial.email}.
            </p>
            <button
              onClick={onClose}
              className="mt-6 rounded-full bg-black px-5 py-3 font-bold text-white"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ShelfSection({ onBook }) {
  const [hovered, setHovered] = useState(null);

  return (
    <section className="mx-auto w-[92vw] max-w-[1180px] pt-16 pb-20">
      <Reveal>
        <div className="mb-14 text-center">
          <h2 className="font-display text-[clamp(2.5rem,5vw,3.5rem)] font-bold leading-none tracking-tight text-[#171717]">
            Pick something. Give it a try.
          </h2>
          <p className="mt-4 text-lg text-[#69645d]">
            Swipe through the studio shelf and discover your sound.
          </p>
        </div>
      </Reveal>

      <Reveal delay={100}>
        <div className="relative pt-24 pb-8">
          <div className="pointer-events-none absolute bottom-8 left-0 right-0 z-0 h-4 rounded-full bg-[#e8e2d9] shadow-inner md:-ml-8 md:-mr-8" />
          <div className="pointer-events-none absolute bottom-6 left-2 right-2 z-0 h-4 bg-black/10 blur-md md:-ml-6 md:-mr-6" />

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
                  className={`group relative flex h-[280px] w-[180px] shrink-0 snap-center flex-col items-center justify-start rounded-2xl pt-6 outline-none transition-all duration-500 ease-out focus-visible:ring-4 focus-visible:ring-[#ff6b4a]/50 md:w-[190px] md:justify-end md:pt-0
                    ${isHovered ? "md:-translate-y-8 md:scale-110" : "md:translate-y-0 md:scale-100"}
                    ${isDimmed ? "md:opacity-30 md:grayscale" : "opacity-100"}
                  `}
                >
                  <div
                    className={`absolute top-0 flex w-full flex-col items-center text-center transition-all duration-300
                    translate-y-0 opacity-100 md:pointer-events-none md:translate-y-4 md:opacity-0
                    ${isHovered ? "md:!pointer-events-auto md:!translate-y-0 md:!opacity-100" : ""}`}
                  >
                    <h3 className="font-display text-2xl font-bold tracking-tight text-[#171717]">
                      {inst.name.toUpperCase()}
                    </h3>
                    <p className="mt-1 text-xs font-bold uppercase tracking-widest text-[#69645d]">
                      {inst.skills.slice(0, 3).join(" · ")}
                    </p>
                    <span className="mt-4 flex items-center gap-1 rounded-full bg-[#171717] px-5 py-2 text-xs font-bold text-white transition group-hover:bg-[#ff6b4a]">
                      TRY IT <ArrowRight className="h-3.5 w-3.5" />
                    </span>
                  </div>

                  <div className="relative mb-2 mt-auto flex h-36 w-36 items-center justify-center md:mt-0">
                    <div
                      className={`absolute -bottom-2 h-3 w-20 rounded-full bg-black/15 blur-sm transition-all duration-500 ${
                        isHovered
                          ? "scale-75 opacity-30"
                          : "scale-100 opacity-100"
                      }`}
                    />
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

function Home({ onBook, onJoinClass }) {
  const [faqOpen, setFaqOpen] = useState(0);

  const reviews = [
    {
      name: "Riya, 22",
      track: "Guitar · 4 months",
      text: "I stopped waiting to be good enough and started playing.",
    },
    {
      name: "Aarav",
      track: "Piano learner",
      text: "The biggest difference is that every class ends with me actually playing a song. I can hear the improvement week to week.",
    },
    {
      name: "Neha, 28",
      track: "Vocals · 2 months",
      text: "I've always been shy about singing, but the supportive environment here completely changed that.",
    },
    {
      name: "Kabir",
      track: "Drums learner",
      text: "Learning groove and fills hands-on from day one instead of just reading sheet music makes all the difference.",
    },
  ];

  return (
    <>
      <section className="relative w-full overflow-hidden pt-10 pb-20 md:pt-16 md:pb-32">
        <div className="absolute inset-0 z-0">
          <img
            className="h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=2000&q=80"
            alt="Warm music studio environment"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/30" />
        </div>
        <div className="relative z-10 mx-auto w-[92vw] max-w-[1180px]">
          <div className="max-w-2xl text-white">
            <h1 className="font-display text-[clamp(3.4rem,7vw,6.4rem)] font-bold leading-[1.1] tracking-[-.06em]">
              Learn music.{" "}
              <span className="text-[#ff6b4a]">Find your sound.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg font-medium leading-8 text-white/85">
              Live, practical music classes for beginners, hobbyists, and future
              performers. Learn from working musicians, play from day one, and
              build skills you actually use.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => onBook()}
                className="rounded-full bg-[#f7f3eb] px-6 py-3.5 font-bold text-[#171717] transition-colors hover:bg-white"
              >
                Book a free trial
              </button>
              <Link
                to="/classes"
                className="rounded-full border-2 border-white/20 bg-white/10 px-6 py-3.5 font-bold text-white backdrop-blur-md transition-all hover:bg-white hover:text-black"
              >
                Explore classes
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-[#171717] py-20 text-white">
        <div className="mx-auto grid w-[92vw] max-w-[1180px] gap-10 md:grid-cols-2 md:items-center">
          <Reveal>
            <div>
              <div className="label text-[#aaa49d]">Our approach</div>
              <h2 className="section-title text-white">
                Less "lesson".
                <br />
                More <span className="text-[#ff6b4a]">music.</span>
              </h2>
              <p className="mt-5 max-w-xl leading-7 text-[#c3beb7]">
                We keep the theory useful, the practice musical, and the
                progress visible. Every student gets a simple roadmap, real
                songs, and frequent chances to play with others.
              </p>
            </div>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Pick a goal — from first chord to first gig.",
              "Learn with a real musician, not a video library.",
              "Practice through songs you actually love.",
              "Perform, record and celebrate progress.",
            ].map((text, i) => (
              <Reveal key={text} delay={i * 90}>
                <div className="rounded-2xl border border-white/10 bg-[#202020] p-5 transition hover:border-[#ff6b4a]/40">
                  <div className="font-display text-4xl font-bold text-[#ff6b4a]">
                    0{i + 1}
                  </div>
                  <p className="mt-4 text-sm leading-6 text-[#c3beb7]">
                    {text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <ShelfSection onBook={onBook} />

      <section className="mx-auto w-[92vw] max-w-[1180px] pt-6 pb-10">
        <Reveal>
          <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="label">This week's picks</div>
              <h2 className="section-title">A few open seats right now.</h2>
            </div>
            <Link
              to="/classes#schedule"
              className="rounded-full border border-black px-5 py-2.5 text-sm font-bold transition hover:bg-black hover:text-white"
            >
              See full schedule →
            </Link>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="overflow-hidden rounded-3xl border border-black/10 bg-[#fffdf8]">
            {classes.slice(0, 3).map((x, i) => (
              <div
                key={`${x.day}-${x.time}-${x.instrument}`}
                className={`grid gap-3 p-5 md:grid-cols-[110px_1fr_180px_90px] md:items-center ${
                  i !== 2 ? "border-b border-black/8" : ""
                }`}
              >
                <div className="font-display font-bold">
                  {x.day} <span className="text-[#8a847c]">{x.time}</span>
                </div>
                <div>
                  <div className="font-bold">
                    {x.instrument} · {x.level}
                  </div>
                  <div className="text-sm text-[#6d675f]">{x.teacher}</div>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#6d675f]">
                  <Users className="h-4 w-4" />
                  {x.spots} spots left
                </div>
                <button
                  onClick={() => onJoinClass(x)}
                  className="rounded-full border border-black px-4 py-2 text-sm font-bold transition hover:bg-black hover:text-white"
                >
                  Join class
                </button>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="mx-auto w-full overflow-hidden pt-10 pb-20">
        <Reveal>
          <div className="mx-auto mb-10 w-[92vw] max-w-[1180px] text-center">
            <h2 className="section-title">Don't just take our word for it.</h2>
          </div>
        </Reveal>
        <div className="relative flex w-full flex-col gap-6 overflow-hidden">
          <div className="flex w-max animate-scroll gap-6 px-6 hover:[animation-play-state:paused]">
            {[...reviews, ...reviews].map((r, idx) => (
              <div
                key={idx}
                className="w-[350px] shrink-0 rounded-[30px] border border-black/10 bg-[#fffdf8] p-8 shadow-sm"
              >
                <div className="font-bold text-[#ff6b4a]">★★★★★</div>
                <p className="mt-4 text-lg leading-7">"{r.text}"</p>
                <div className="mt-6 text-sm text-[#6f6961]">
                  <strong className="text-black">{r.name}</strong> • {r.track}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="faq"
        className="mx-auto grid w-[92vw] max-w-[1180px] gap-10 py-20 md:grid-cols-[.85fr_1.15fr]"
      >
        <Reveal>
          <div>
            <div className="label">FAQ</div>
            <h2 className="section-title">
              Good questions.
              <br />
              Better answers.
            </h2>
            <p className="mt-5 max-w-md text-[#69645d]">
              Still not sure where to start? A trial session is the easiest way
              to find your fit.
            </p>
          </div>
        </Reveal>
        <Reveal delay={150}>
          <div>
            {faqs.map(([q, a], i) => (
              <div
                key={q}
                className="border-t border-black/10 py-5 last:border-b"
              >
                <button
                  onClick={() => setFaqOpen(faqOpen === i ? -1 : i)}
                  className="flex w-full items-center justify-between gap-5 text-left font-bold"
                >
                  <span>{q}</span>
                  {faqOpen === i ? (
                    <X className="h-4 w-4 text-[#ff6b4a]" />
                  ) : (
                    <ChevronDown className="h-4 w-4" />
                  )}
                </button>
                {faqOpen === i && (
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-[#69645d]">
                    {a}
                  </p>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </>
  );
}

function ClassesPage({ onBook, onJoinClass }) {
  const [filter, setFilter] = useState("All");
  const visible =
    filter === "All" ? classes : classes.filter((x) => x.instrument === filter);

  return (
    <main>
      <section className="mx-auto w-[92vw] max-w-[1180px] pt-6 pb-12 md:pt-10 md:pb-16">
        <Reveal>
          <div className="max-w-3xl">
            <div className="label">Classes</div>
            <h1 className="mt-2 font-display text-[clamp(3rem,7vw,6rem)] font-bold leading-[.92] tracking-[-.05em]">
              Choose your instrument.
              <br />
              <span className="text-[#ff6b4a]">Build your path.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[#69645d]">
              Explore what each track teaches, compare levels, and see live
              class times before you book a free trial.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto w-[92vw] max-w-[1180px] pb-20">
        <Reveal>
          <div className="flex flex-wrap gap-2">
            {[
              "All",
              "Guitar",
              "Piano",
              "Drums",
              "Vocals",
              "Violin",
              "Saxophone",
            ].map((x) => (
              <button
                key={x}
                onClick={() => setFilter(x)}
                className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                  filter === x
                    ? "bg-black text-white"
                    : "border-black/15 hover:bg-black/5"
                }`}
              >
                {x}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {instruments
            .filter((x) => filter === "All" || x.name === filter)
            .map((x, i) => (
              <Reveal key={x.id} delay={i * 80}>
                <article className="rounded-3xl border border-black/10 bg-[#fffdf8] p-6 transition hover:-translate-y-1 hover:shadow-lg">
                  <div className="flex items-start justify-between">
                    <span className="text-4xl">{x.icon}</span>
                    <span className="rounded-full bg-black/5 px-3 py-1 text-xs font-bold">
                      From ₹{x.basePrice.toLocaleString("en-IN")}/mo
                    </span>
                  </div>
                  <h2 className="mt-4 font-display text-3xl font-bold">
                    {x.name}
                  </h2>
                  <p className="mt-2 max-w-xl text-[#5e5951]">
                    {x.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {x.skills.map((s) => (
                      <span
                        key={s}
                        className="rounded-full border border-black/10 bg-black/5 px-3 py-1.5 text-xs font-semibold"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex items-center justify-between border-t border-black/5 pt-4 text-sm text-[#5d5750]">
                    <div>
                      Teacher: <strong>{x.teacher}</strong>
                    </div>
                    <button
                      onClick={() => onBook(x.name)}
                      className="rounded-full bg-black px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#ff6b4a]"
                    >
                      Book a free trial ↗
                    </button>
                  </div>
                </article>
              </Reveal>
            ))}
        </div>
      </section>

      <section className="mx-auto w-[92vw] max-w-[1180px] pb-24">
        <Reveal>
          <div className="mb-7">
            <div className="label">Schedule</div>
            <h2 className="section-title">This week's classes</h2>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <div className="overflow-hidden rounded-3xl border border-black/10 bg-[#fffdf8]">
            {visible.map((x, i) => (
              <div
                key={`${x.day}${x.time}${x.instrument}`}
                className={`grid gap-4 p-5 md:grid-cols-[120px_1fr_150px_90px] md:items-center ${
                  i < visible.length - 1 ? "border-b border-black/10" : ""
                }`}
              >
                <div className="font-bold">
                  {x.day}
                  <div className="text-sm font-normal text-[#777067]">
                    {x.time}
                  </div>
                </div>
                <div>
                  <strong>
                    {x.instrument} · {x.level}
                  </strong>
                  <div className="text-sm text-[#777067]">{x.teacher}</div>
                </div>
                <div className="text-sm text-[#777067]">
                  {x.spots} spots left
                </div>
                <button
                  onClick={() => onJoinClass(x)}
                  className="rounded-full border border-black px-3 py-2 text-sm font-bold transition hover:bg-black hover:text-white"
                >
                  Join
                </button>
              </div>
            ))}
          </div>
        </Reveal>
      </section>
    </main>
  );
}

function TeachersPage({ onBook }) {
  const [teacher, setTeacher] = useState(null);

  return (
    <main>
      <section className="mx-auto w-[92vw] max-w-[1180px] pt-6 pb-12 md:pt-10 md:pb-16">
        <Reveal>
          <div className="label">Teachers</div>
          <h1 className="mt-2 font-display text-[clamp(3rem,7vw,6rem)] font-bold leading-[.92] tracking-[-.05em]">
            Learn from people
            <br />
            <span className="text-[#ff6b4a]">who still play.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#69645d]">
            Every SoundHouse teacher performs, creates, or teaches
            professionally. Meet the people behind the lessons.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto grid w-[92vw] max-w-[1180px] gap-5 pb-24 md:grid-cols-3">
        {teachers.map((t, i) => (
          <Reveal key={t.name} delay={i * 100}>
            <button
              onClick={() => setTeacher(t)}
              className="group w-full overflow-hidden rounded-3xl border border-black/10 bg-[#fffdf8] text-left transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div className="p-8">
                <div className="text-xs uppercase tracking-[.14em] text-[#807a72]">
                  {t.instrument}
                </div>
                <h2 className="mt-1 font-display text-2xl font-bold">
                  {t.name}
                </h2>
                <p className="mt-2 text-sm text-[#69645d]">
                  {t.experience} · {t.focus}
                </p>
                <div className="mt-8 flex items-center justify-between border-t border-black/10 pt-5">
                  <span className="rounded-full bg-[#f1ece3] px-3 py-1 text-xs font-bold">
                    ★ {t.rating.toFixed(1)} · {t.students} students
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-[#171717] transition group-hover:text-[#ff6b4a]" />
                </div>
              </div>
            </button>
          </Reveal>
        ))}
      </section>

      {teacher && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4"
          onClick={() => setTeacher(null)}
        >
          <div
            className="w-full max-w-lg rounded-3xl bg-[#fffdf8] p-7 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="label">Teacher profile</div>
              <button onClick={() => setTeacher(null)}>
                <X />
              </button>
            </div>
            <div className="mt-5 border-b border-black/10 pb-5">
              <h3 className="font-display text-3xl font-bold">
                {teacher.name}
              </h3>
              <p className="mt-1 text-lg text-[#69645d]">
                {teacher.instrument} · {teacher.experience} · ★{" "}
                {teacher.rating.toFixed(1)}
              </p>
            </div>
            <p className="mt-6 leading-7 text-[#69645d]">
              Has taught {teacher.students}+ students, from complete beginners
              to advanced players, focusing on real songs, confident technique,
              and performance habits that last.
            </p>
            <button
              onClick={() => {
                setTeacher(null);
                onBook(teacher.instrument);
              }}
              className="mt-6 w-full rounded-full bg-[#ff6b4a] px-4 py-3 font-bold text-white transition hover:opacity-90"
            >
              Book a trial ↗
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

function ScrollToHash() {
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      requestAnimationFrame(() => {
        document
          .getElementById(id)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [hash]);
  return null;
}

function App() {
  const [trialOpen, setTrialOpen] = useState(false);
  const [trialInstrument, setTrialInstrument] = useState("Guitar");
  const [selectedClass, setSelectedClass] = useState(null);

  const openBook = (inst = "Guitar") => {
    setTrialInstrument(inst);
    setTrialOpen(true);
  };

  const openJoinClass = (classItem) => setSelectedClass(classItem);

  return (
    <>
      <ScrollToHash />
      <Layout onBook={openBook}>
        <Routes>
          <Route
            path="/"
            element={<Home onBook={openBook} onJoinClass={openJoinClass} />}
          />
          <Route
            path="/classes"
            element={
              <ClassesPage onBook={openBook} onJoinClass={openJoinClass} />
            }
          />
          <Route
            path="/teachers"
            element={<TeachersPage onBook={openBook} />}
          />
          <Route
            path="*"
            element={<Home onBook={openBook} onJoinClass={openJoinClass} />}
          />
        </Routes>
      </Layout>
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

export default function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}
