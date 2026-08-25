import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useState, useEffect } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  Menu,
  X,
  Users,
  CircleCheckBig,
} from "lucide-react";
import { classes, faqs, instruments, teachers } from "./data";

const toneClasses = {
  orange: "bg-[#ffe0d6]",
  lavender: "bg-[#ddd7ff]",
  peach: "bg-[#f6d2c7]",
  lime: "bg-[#d9ff59]",
};

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

  // Close the mobile menu on Escape, and whenever the route changes.
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
              <span className="absolute left-3 top-0 h-4 w-4 rounded-full bg-[#d9ff59]" />
            </span>
            SOUNDHOUSE
          </Link>
          <nav
            className={`${mobileOpen ? "absolute left-0 right-0 top-[74px] z-10 flex bg-[#f7f3eb] p-6 shadow-lg" : "hidden"} flex-col gap-5 md:static md:z-auto md:flex md:flex-row md:items-center md:bg-transparent md:p-0 md:shadow-none`}
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
                  className={`text-sm transition hover:text-black ${isActive ? "font-bold text-black" : "text-[#55504a]"}`}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
          <div className="flex items-center gap-2">
            <button
              onClick={onBook}
              className="hidden rounded-full border border-black px-4 py-2 text-sm font-bold md:block"
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
      <footer className="border-t border-black/10">
        <div className="mx-auto flex w-[92vw] max-w-[1180px] flex-col justify-between gap-3 py-7 text-sm text-[#69645d] md:flex-row">
          <div>
            <strong className="font-display text-black">SOUNDHOUSE</strong> ·
            Music that sticks.
          </div>
          <div>© 2026 SoundHouse · Made for learners, not labels.</div>
        </div>
      </footer>
    </div>
  );
}

function TrialModal({ open, onClose, initialInstrument = "Guitar" }) {
  const [step, setStep] = useState(1);
  const [booked, setBooked] = useState(false);
  const [trial, setTrial] = useState({
    instrument: initialInstrument,
    level: "Complete beginner",
    format: "In-person",
    time: "Tuesday · 6:30 PM",
    name: "",
    email: "",
  });
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
      <div className="w-full max-w-xl rounded-3xl bg-[#fffdf8] p-7">
        <div className="flex items-start justify-between">
          <div>
            <div className="label">Free trial session</div>
            <h3 className="mt-1 font-display text-3xl font-bold">
              Let's get you playing.
            </h3>
          </div>
          <button onClick={onClose}>
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
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {instruments.map((x) => (
                    <button
                      key={x.id}
                      onClick={() => selectInstrument(x.name)}
                      className={`rounded-2xl border p-4 text-left ${trial.instrument === x.name ? "border-black bg-black text-white" : "border-black/10 bg-white"}`}
                    >
                      <div className="text-3xl">{x.icon}</div>
                      <div className="mt-2 font-bold">{x.name}</div>
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
                        className={`rounded-2xl border p-4 text-left ${trial.level === v ? "border-black bg-black text-white" : "border-black/10 bg-white"}`}
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
                      className={`rounded-2xl border p-4 text-left ${trial.format === v ? "border-black bg-black text-white" : "border-black/10 bg-white"}`}
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
                <div className="mt-5 rounded-2xl bg-[#d9ff59] p-5">
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
                      className={`rounded-2xl border p-4 text-left ${trial.time === v ? "border-black bg-black text-white" : "border-black/10 bg-white"}`}
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
                    className="rounded-2xl border border-black/10 bg-white px-4 py-3"
                  />
                  <input
                    required
                    type="email"
                    value={trial.email}
                    onChange={(e) =>
                      setTrial((t) => ({ ...t, email: e.target.value }))
                    }
                    placeholder="Email address"
                    className="rounded-2xl border border-black/10 bg-white px-4 py-3"
                  />
                </div>
                <button className="mt-4 w-full rounded-full bg-black px-4 py-3.5 font-bold text-white">
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
                  className="rounded-full bg-black px-5 py-2.5 text-sm font-bold text-white"
                >
                  Continue <ArrowRight className="ml-1 inline h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="py-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#d9ff59]">
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

function Home({ onBook }) {
  const [selected, setSelected] = useState("guitar");
  const [faqOpen, setFaqOpen] = useState(0);
  const instrument = instruments.find((x) => x.id === selected);

  return (
    <>
      <section className="mx-auto grid w-[92vw] max-w-[1180px] gap-10 py-12 md:grid-cols-[1.03fr_.97fr] md:items-center md:py-20">
        <div>
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#cfc8bc] px-3 py-2 text-xs font-bold uppercase tracking-[.12em] text-[#5d5750]">
            <span className="h-2 w-2 rounded-full bg-[#5f9d3f]" /> New batches
            open for 2026
          </div>
          <h1 className="max-w-3xl font-display text-[clamp(3.4rem,7vw,6.4rem)] font-bold leading-[.9] tracking-[-.06em]">
            Learn music.
            <br />
            <span className="rounded-[.08em] bg-[#d9ff59] px-2">
              Find your sound.
            </span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-[#69645d]">
            Live, practical music classes for beginners, hobbyists and future
            performers. Learn from working musicians, play from day one, and
            build skills you actually use.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              onClick={onBook}
              className="rounded-full bg-[#171717] px-5 py-3.5 font-bold text-white"
            >
              Book a free trial <ArrowRight className="ml-1 inline h-4 w-4" />
            </button>
            <Link
              to="/classes"
              className="rounded-full border border-black px-5 py-3.5 font-bold"
            >
              Explore classes ↓
            </Link>
          </div>
          <div className="mt-7 flex flex-wrap gap-6 text-sm text-[#68635b]">
            <div>
              <strong className="block text-base text-black">4.9/5</strong>from
              300+ learners
            </div>
            <div>
              <strong className="block text-base text-black">
                1:1 + small groups
              </strong>
              flexible formats
            </div>
            <div>
              <strong className="block text-base text-black">
                Beginner friendly
              </strong>
              no experience needed
            </div>
          </div>
        </div>
        <div className="relative min-h-[410px] overflow-hidden rounded-[32px] shadow-[0_20px_60px_rgba(26,22,18,.10)] md:min-h-[560px]">
          <img
            className="absolute inset-0 h-full w-full object-cover"
            src="https://images.unsplash.com/photo-1524368535928-5b5e00ddc76b?auto=format&fit=crop&w=1400&q=85"
            alt="Musicians performing together"
          />
          <div className="absolute left-5 top-5 -rotate-6 rounded-2xl bg-[#d9ff59] px-4 py-3 font-display font-bold shadow-lg">
            PLAY LOUD.
            <br />
            STAY CURIOUS.
          </div>
          <div className="absolute bottom-5 right-5 w-56 rounded-2xl bg-[#fffdf8]/95 p-4 shadow-xl">
            <div className="text-xs text-[#6c665e]">Next beginner batch</div>
            <div className="mt-1 font-display text-lg font-bold">
              Tuesday · 6:30 PM
            </div>
            <div className="my-2 tracking-[.2em] text-[#ed6d45]">★★★★★</div>
            <div className="text-xs text-[#6c665e]">2 seats left</div>
          </div>
        </div>
      </section>

      <section id="classes" className="mx-auto w-[92vw] max-w-[1180px] py-20">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="label">Pick your instrument</div>
            <h2 className="section-title">Start where your curiosity is.</h2>
          </div>
          <p className="max-w-md text-[#69645d]">
            Choose an instrument, meet your teacher, and get a learning path
            tailored to your goal — not a one-size-fits-all syllabus.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {instruments.map((x) => (
            <button
              key={x.id}
              onClick={() => setSelected(x.id)}
              className={`group relative min-h-[230px] rounded-3xl border p-5 text-left transition hover:-translate-y-1 hover:shadow-xl ${toneClasses[x.tone]} ${selected === x.id ? "border-black ring-2 ring-black/10" : "border-black/10"}`}
            >
              <ArrowUpRight className="absolute right-4 top-4 h-5 w-5" />
              <div className="text-5xl grayscale">{x.icon}</div>
              <div className="mt-10">
                <h3 className="font-display text-xl font-bold">{x.name}</h3>
                <p className="mt-1 text-sm text-[#5e5951]">{x.subtitle}</p>
              </div>
            </button>
          ))}
        </div>
        <div className="mt-7 grid gap-5 rounded-[30px] border border-black/10 bg-[#fffdf8] p-5 md:grid-cols-[1fr_.8fr] md:p-7">
          <div>
            <div className="label">Selected path</div>
            <div className="mt-2 flex items-start gap-4">
              <div className="rounded-2xl bg-black p-4 text-3xl">
                {instrument.icon}
              </div>
              <div>
                <h3 className="font-display text-3xl font-bold">
                  {instrument.name}
                </h3>
                <p className="mt-2 text-[#69645d]">{instrument.description}</p>
              </div>
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {instrument.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full border border-black/10 bg-[#f6f1e7] px-3 py-1.5 text-xs font-semibold"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div className="rounded-3xl bg-[#171717] p-6 text-white">
            <div className="text-sm text-[#a9a59e]">From</div>
            <div className="mt-1 font-display text-4xl font-bold">
              ₹{instrument.basePrice.toLocaleString("en-IN")}
              <span className="text-base font-normal text-[#a9a59e]">
                {" "}
                / month
              </span>
            </div>
            <div className="mt-3 text-sm text-[#bdb9b0]">
              with {instrument.teacher}
            </div>
            <button
              onClick={onBook}
              className="mt-6 w-full rounded-full bg-[#d9ff59] px-4 py-3 font-bold text-black"
            >
              Book a free trial ↗
            </button>
          </div>
        </div>
      </section>

      <section id="how-it-works" className="bg-[#171717] py-20 text-white">
        <div className="mx-auto grid w-[92vw] max-w-[1180px] gap-10 md:grid-cols-2 md:items-center">
          <div>
            <div className="label text-[#aaa49d]">Our approach</div>
            <h2 className="section-title text-white">
              Less "lesson".
              <br />
              More <span className="text-[#d9ff59]">music.</span>
            </h2>
            <p className="mt-5 max-w-xl leading-7 text-[#c3beb7]">
              We keep the theory useful, the practice musical, and the progress
              visible. Every student gets a simple roadmap, real songs, and
              frequent chances to play with others.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {[
              "Pick a goal — from first chord to first gig.",
              "Learn with a real musician, not a video library.",
              "Practice through songs you actually love.",
              "Perform, record and celebrate progress.",
            ].map((text, i) => (
              <div
                key={text}
                className="rounded-2xl border border-white/10 bg-[#202020] p-5"
              >
                <div className="font-display text-4xl font-bold text-[#d9ff59]">
                  0{i + 1}
                </div>
                <p className="mt-4 text-sm leading-6 text-[#c3beb7]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-[92vw] max-w-[1180px] py-20">
        <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="label">This week's picks</div>
            <h2 className="section-title">A few open seats right now.</h2>
          </div>
          <Link
            to="/classes#schedule"
            className="rounded-full border border-black px-5 py-2.5 text-sm font-bold"
          >
            See full schedule →
          </Link>
        </div>
        <div className="overflow-hidden rounded-3xl border border-black/10 bg-[#fffdf8]">
          {classes.slice(0, 3).map((x, i) => (
            <div
              key={`${x.day}-${x.time}-${x.instrument}`}
              className={`grid gap-3 p-5 md:grid-cols-[110px_1fr_180px_90px] md:items-center ${i !== 2 ? "border-b border-black/8" : ""}`}
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
                onClick={onBook}
                className="rounded-full border border-black px-4 py-2 text-sm font-bold"
              >
                Join class
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto w-[92vw] max-w-[1180px] py-20">
        <div className="mb-8">
          <div className="label">Teachers</div>
          <h2 className="section-title">People who still love playing.</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {teachers.map((t) => (
            <Link
              key={t.name}
              to="/teachers"
              className="group overflow-hidden rounded-3xl border border-black/10 bg-[#fffdf8]"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  src={t.image}
                  alt={t.name}
                />
              </div>
              <div className="p-5">
                <div className="text-xs uppercase tracking-[.12em] text-[#807a72]">
                  {t.instrument}
                </div>
                <h3 className="mt-1 font-display text-xl font-bold">
                  {t.name}
                </h3>
                <p className="mt-2 text-sm text-[#69645d]">
                  {t.experience} · {t.focus} · ★ {t.rating.toFixed(1)}
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-5 text-right">
          <Link
            to="/teachers"
            className="font-bold underline decoration-2 underline-offset-4"
          >
            Meet all teachers →
          </Link>
        </div>
      </section>

      <section className="mx-auto grid w-[92vw] max-w-[1180px] gap-4 py-20 md:grid-cols-[.9fr_1.1fr]">
        <div className="flex min-h-[300px] flex-col justify-between rounded-[30px] bg-[#ff6b4a] p-8 text-white">
          <div className="font-display text-3xl font-bold leading-tight">
            "I stopped waiting to be good enough and started playing."
          </div>
          <div className="text-sm text-white/85">
            <strong>Riya, 22</strong>
            <br />
            Guitar · 4 months
          </div>
        </div>
        <div className="flex min-h-[300px] flex-col justify-between rounded-[30px] border border-black/10 bg-[#fffdf8] p-8">
          <div>
            <div className="font-bold text-[#ed6d45]">★★★★★</div>
            <p className="mt-5 text-xl leading-8">
              "The biggest difference is that every class ends with me actually
              playing a song. I can hear the improvement week to week."
            </p>
          </div>
          <div className="text-sm text-[#6f6961]">— Aarav, piano learner</div>
        </div>
      </section>

      <section
        id="faq"
        className="mx-auto grid w-[92vw] max-w-[1180px] gap-10 py-20 md:grid-cols-[.85fr_1.15fr]"
      >
        <div>
          <div className="label">FAQ</div>
          <h2 className="section-title">
            Good questions.
            <br />
            Better answers.
          </h2>
          <p className="mt-5 max-w-md text-[#69645d]">
            Still not sure where to start? A trial session is the easiest way to
            find your fit.
          </p>
        </div>
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
                  <X className="h-4 w-4" />
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
      </section>

      <section className="mx-auto w-[92vw] max-w-[1180px] pb-20">
        <div className="flex flex-col justify-between gap-6 rounded-[30px] bg-[#d9ff59] p-8 md:flex-row md:items-center md:p-12">
          <div>
            <div className="label">Ready when you are</div>
            <h2 className="section-title">
              Bring the curiosity.
              <br />
              We'll bring the music.
            </h2>
          </div>
          <button
            onClick={onBook}
            className="self-start rounded-full bg-[#171717] px-5 py-3.5 font-bold text-white"
          >
            Book your free trial ↗
          </button>
        </div>
      </section>
    </>
  );
}

function ClassesPage({ onBook }) {
  const [filter, setFilter] = useState("All");
  const visible =
    filter === "All" ? classes : classes.filter((x) => x.instrument === filter);
  return (
    <main>
      <section className="mx-auto w-[92vw] max-w-[1180px] py-16 md:py-24">
        <div className="max-w-3xl">
          <div className="label">Classes</div>
          <h1 className="mt-2 font-display text-[clamp(3rem,7vw,6rem)] font-bold leading-[.92] tracking-[-.05em]">
            Choose your instrument.
            <br />
            <span className="rounded-[.08em] bg-[#d9ff59] px-2">
              Build your path.
            </span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-[#69645d]">
            Explore what each track teaches, compare levels and see live class
            times before you book a free trial.
          </p>
        </div>
      </section>
      <section className="mx-auto w-[92vw] max-w-[1180px] pb-20">
        <div className="flex flex-wrap gap-2">
          {["All", "Guitar", "Piano", "Drums", "Vocals"].map((x) => (
            <button
              key={x}
              onClick={() => setFilter(x)}
              className={`rounded-full border px-4 py-2 text-sm font-bold ${filter === x ? "bg-black text-white" : "border-black/15"}`}
            >
              {x}
            </button>
          ))}
        </div>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {instruments
            .filter((x) => filter === "All" || x.name === filter)
            .map((x) => (
              <article
                key={x.id}
                className={`rounded-3xl border border-black/10 p-6 ${toneClasses[x.tone]}`}
              >
                <div className="flex items-start justify-between">
                  <div className="text-5xl">{x.icon}</div>
                  <span className="rounded-full bg-white/60 px-3 py-1 text-xs font-bold">
                    From ₹{x.basePrice.toLocaleString("en-IN")}/mo
                  </span>
                </div>
                <h2 className="mt-8 font-display text-3xl font-bold">
                  {x.name}
                </h2>
                <p className="mt-2 max-w-xl text-[#5e5951]">{x.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {x.skills.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-black/10 bg-white/50 px-3 py-1.5 text-xs font-semibold"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-between gap-3">
                  <div className="text-sm text-[#5d5750]">
                    Teacher: <strong>{x.teacher}</strong>
                  </div>
                  <button
                    onClick={onBook}
                    className="rounded-full bg-black px-4 py-2.5 text-sm font-bold text-white"
                  >
                    Book a free trial ↗
                  </button>
                </div>
              </article>
            ))}
        </div>
      </section>
      <section className="mx-auto w-[92vw] max-w-[1180px] pb-24">
        <div className="mb-7">
          <div className="label">Schedule</div>
          <h2 className="section-title">This week's classes</h2>
        </div>
        <div className="overflow-hidden rounded-3xl border border-black/10 bg-[#fffdf8]">
          {visible.map((x, i) => (
            <div
              key={`${x.day}${x.time}${x.instrument}`}
              className={`grid gap-4 p-5 md:grid-cols-[120px_1fr_150px_90px] md:items-center ${i < visible.length - 1 ? "border-b border-black/10" : ""}`}
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
              <div className="text-sm text-[#777067]">{x.spots} spots left</div>
              <button
                onClick={onBook}
                className="rounded-full border border-black px-3 py-2 text-sm font-bold"
              >
                Join
              </button>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function TeachersPage({ onBook }) {
  const [teacher, setTeacher] = useState(null);
  return (
    <main>
      <section className="mx-auto w-[92vw] max-w-[1180px] py-16 md:py-24">
        <div className="label">Teachers</div>
        <h1 className="mt-2 font-display text-[clamp(3rem,7vw,6rem)] font-bold leading-[.92] tracking-[-.05em]">
          Learn from people
          <br />
          <span className="rounded-[.08em] bg-[#d9ff59] px-2">
            who still play.
          </span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#69645d]">
          Every SoundHouse teacher performs, creates or teaches professionally.
          Meet the people behind the lessons.
        </p>
      </section>
      <section className="mx-auto grid w-[92vw] max-w-[1180px] gap-5 pb-24 md:grid-cols-3">
        {teachers.map((t, i) => (
          <button
            key={t.name}
            onClick={() => setTeacher(t)}
            className="group overflow-hidden rounded-3xl border border-black/10 bg-[#fffdf8] text-left"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={t.image}
                alt={t.name}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="p-6">
              <div className="text-xs uppercase tracking-[.14em] text-[#807a72]">
                {t.instrument}
              </div>
              <h2 className="mt-1 font-display text-2xl font-bold">{t.name}</h2>
              <p className="mt-2 text-sm text-[#69645d]">
                {t.experience} · {t.focus}
              </p>
              <div className="mt-5 flex items-center justify-between">
                <span className="rounded-full bg-[#f1ece3] px-3 py-1 text-xs font-bold">
                  ★ {t.rating.toFixed(1)} · {t.students} students
                </span>
                <ArrowUpRight className="h-5 w-5" />
              </div>
            </div>
          </button>
        ))}
      </section>
      <section className="mx-auto w-[92vw] max-w-[1180px] pb-24">
        <div className="rounded-[30px] bg-[#171717] p-8 text-white md:p-12">
          <div className="label text-[#aaa49d]">Not sure who to choose?</div>
          <h2 className="section-title text-white">
            Start with the instrument.
            <br />
            We'll match the teacher.
          </h2>
          <button
            onClick={onBook}
            className="mt-7 rounded-full bg-[#d9ff59] px-5 py-3 font-bold text-black"
          >
            Find my match ↗
          </button>
        </div>
      </section>
      {teacher && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 p-4"
          onClick={() => setTeacher(null)}
        >
          <div
            className="w-full max-w-lg rounded-3xl bg-[#fffdf8] p-7"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <div className="label">Teacher profile</div>
              <button onClick={() => setTeacher(null)}>
                <X />
              </button>
            </div>
            <div className="mt-5 flex items-center gap-4">
              <img
                src={teacher.image}
                alt={teacher.name}
                className="h-20 w-20 rounded-2xl object-cover"
              />
              <div>
                <h3 className="font-display text-2xl font-bold">
                  {teacher.name}
                </h3>
                <p className="text-[#69645d]">
                  {teacher.instrument} · {teacher.experience} · ★{" "}
                  {teacher.rating.toFixed(1)}
                </p>
              </div>
            </div>
            <p className="mt-6 leading-7 text-[#69645d]">
              Has taught {teacher.students}+ students, from complete beginners
              to advanced players, focusing on real songs, confident technique
              and performance habits that last.
            </p>
            <button
              onClick={onBook}
              className="mt-6 w-full rounded-full bg-black px-4 py-3 font-bold text-white"
            >
              Book a trial ↗
            </button>
          </div>
        </div>
      )}
    </main>
  );
}

// React Router's <Link> only does client-side navigation — it never
// triggers the browser's native "scroll to element with this id" behavior,
// so hash links like /#schedule silently do nothing. This watches the
// route and performs that scroll manually, on every navigation.
function ScrollToHash() {
  const { hash, pathname, key } = useLocation();
  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      // wait one frame so the destination route has actually rendered
      requestAnimationFrame(() => {
        document
          .getElementById(id)
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    } else {
      window.scrollTo({ top: 0 });
    }
  }, [hash, pathname, key]);
  return null;
}

function App() {
  const location = useLocation();
  const [trialOpen, setTrialOpen] = useState(false);
  const openBook = () => setTrialOpen(true);
  return (
    <>
      <ScrollToHash />
      <Layout onBook={openBook}>
        <Routes>
          <Route path="/" element={<Home onBook={openBook} />} />
          <Route path="/classes" element={<ClassesPage onBook={openBook} />} />
          <Route
            path="/teachers"
            element={<TeachersPage onBook={openBook} />}
          />
          <Route path="*" element={<Home onBook={openBook} />} />
        </Routes>
      </Layout>
      <TrialModal open={trialOpen} onClose={() => setTrialOpen(false)} />
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
