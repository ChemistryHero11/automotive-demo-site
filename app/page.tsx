"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import {
  ArrowRight,
  Calendar,
  Car,
  CheckCircle2,
  ChevronDown,
  Disc3,
  Gauge,
  LifeBuoy,
  ShieldCheck,
  Star,
  Video,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { useMemo, useRef, useState, type ReactNode } from "react";

import { useSmoothScroll } from "@/components/smooth-scroll";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] },
  },
};

const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

function RevealText({ text }: { text: string }) {
  const chars = useMemo(() => Array.from(text), [text]);

  return (
    <motion.span
      aria-label={text}
      className="inline-block"
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.032, delayChildren: 0.12 } },
      }}
    >
      {chars.map((char, idx) => (
        <motion.span
          key={`${char}-${idx}`}
          aria-hidden="true"
          className="inline-block"
          variants={{
            hidden: { y: "0.9em", opacity: 0, filter: "blur(6px)" },
            visible: {
              y: "0em",
              opacity: 1,
              filter: "blur(0px)",
              transition: { duration: 0.72, ease: [0.2, 0.8, 0.2, 1] },
            },
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </motion.span>
  );
}

function MagneticButton({
  children,
  onClick,
  className,
  icon,
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  icon?: LucideIcon;
}) {
  const ref = useRef<HTMLButtonElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 260, damping: 18, mass: 0.2 });
  const springY = useSpring(y, { stiffness: 260, damping: 18, mass: 0.2 });

  const Icon = icon;

  return (
    <motion.button
      ref={ref}
      type="button"
      onClick={onClick}
      onMouseMove={(e) => {
        const rect = ref.current?.getBoundingClientRect();
        if (!rect) return;
        const dx = e.clientX - (rect.left + rect.width / 2);
        const dy = e.clientY - (rect.top + rect.height / 2);
        x.set(dx * 0.12);
        y.set(dy * 0.12);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
      style={{ x: springX, y: springY }}
      whileHover={{
        boxShadow:
          "0 0 0 1px rgba(220, 38, 38, 0.5), 0 16px 60px rgba(220, 38, 38, 0.22)",
      }}
      whileTap={{ scale: 0.98 }}
      className={
        "group relative inline-flex items-center justify-center gap-3 rounded-full px-6 py-3 font-display text-sm uppercase tracking-[0.18em] text-slate-100 " +
        "bg-red-600/18 border border-red-500/35 " +
        "backdrop-blur-xl " +
        "transition-colors duration-300 hover:bg-red-600/22 " +
        (className ?? "")
      }
    >
      <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_20%,rgba(226,232,240,0.18),rgba(15,23,42,0)_55%)] opacity-60" />
      <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_80%_80%,rgba(220,38,38,0.22),rgba(15,23,42,0)_55%)] opacity-70" />
      <span className="relative flex items-center gap-3">
        {children}
        {Icon ? (
          <Icon className="h-4 w-4 opacity-80 transition-transform duration-300 group-hover:translate-x-0.5" />
        ) : null}
      </span>
    </motion.button>
  );
}

function FloatingNav() {
  const { scrollTo } = useSmoothScroll();

  const links = useMemo(
    () => [
      { label: "Services", href: "#services" },
      { label: "Reviews", href: "#reviews" },
      { label: "FAQ", href: "#faq" },
      { label: "Book Now", href: "#book" },
    ],
    [],
  );

  return (
    <motion.nav
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1], delay: 0.4 }}
      className="fixed bottom-6 left-1/2 z-50 w-[min(640px,calc(100%-2rem))] -translate-x-1/2"
    >
      <div className="glass-panel relative overflow-hidden rounded-full px-3 py-3 shadow-[0_30px_90px_rgba(0,0,0,0.55)]">
        <div className="pointer-events-none absolute inset-0 opacity-60 noise-surface" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(226,232,240,0.12),rgba(15,23,42,0)_60%)]" />

        <div className="relative grid grid-cols-4 gap-1">
          {links.map((l) => (
            <button
              key={l.href}
              type="button"
              onClick={() => scrollTo(l.href, { offset: -80 })}
              className={
                "rounded-full px-2 py-2 text-xs font-display uppercase tracking-[0.22em] " +
                "text-slate-200/90 transition-colors duration-200 " +
                "hover:bg-slate-200/10 hover:text-slate-100"
              }
            >
              {l.label}
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
}

function TrustTicker() {
  const line = "ASE CERTIFIED • 24/7 TOWING • MICHELIN AUTHORIZED • 500+ 5-STAR REVIEWS";

  return (
    <section aria-label="Trust signals" className="border-y border-slate-200/10 bg-slate-950/40">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-35 noise-surface" />
        <div
          className="flex w-[200%] select-none items-center gap-10 whitespace-nowrap py-3 text-xs font-display uppercase tracking-[0.34em] text-slate-200/80 animate-marquee"
          style={{ animationDuration: "7.5s" }}
        >
          <div className="flex w-1/2 items-center justify-around gap-10">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={`a-${i}`}>{line}</span>
            ))}
          </div>
          <div className="flex w-1/2 items-center justify-around gap-10" aria-hidden="true">
            {Array.from({ length: 4 }).map((_, i) => (
              <span key={`b-${i}`}>{line}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type BentoId = "tires" | "diagnostics" | "brakes" | "roadside";

function ServicesBento() {
  const [active, setActive] = useState<BentoId | null>(null);

  const dim = (id: BentoId) => (active ? active !== id : false);

  return (
    <section id="services" className="relative py-24">
      <div className="pointer-events-none absolute inset-0 opacity-35 noise-surface" />
      <div className="mx-auto w-full max-w-7xl px-6">
        <motion.div
          className="max-w-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={stagger}
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-xs uppercase tracking-[0.32em] text-slate-200/70"
          >
            Signature services
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-display text-4xl uppercase tracking-[-0.04em] text-slate-100 md:text-5xl"
          >
            Built like a race team.
            <span className="text-red-500"> Run like a concierge.</span>
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-sm text-slate-200/75 md:text-base">
            Tires, diagnostics, brakes, and emergency response—precision-tuned with digital inspection and
            dealer-grade tooling.
          </motion.p>
        </motion.div>

        <div className="mt-12 grid grid-cols-12 gap-4">
          <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1] }}
            onMouseEnter={() => setActive("tires")}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive("tires")}
            onBlur={() => setActive(null)}
            className={
              "glass-panel group relative col-span-12 overflow-hidden rounded-2xl p-8 outline-none " +
              "md:col-span-7 md:row-span-2 " +
              (dim("tires") ? "opacity-40" : "opacity-100")
            }
          >
            <div className="pointer-events-none absolute inset-0 opacity-70 texture-carbon" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(220,38,38,0.18),rgba(15,23,42,0)_55%)]" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(226,232,240,0.12),rgba(15,23,42,0)_60%)]" />

            <div className="relative flex items-start justify-between gap-6">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.32em] text-slate-200/60">
                  Tires & Wheels
                </p>
                <h3 className="mt-3 font-display text-2xl uppercase tracking-[-0.03em] text-slate-100 md:text-3xl">
                  Grip you can feel.
                </h3>
                <p className="mt-3 max-w-md text-sm text-slate-200/75">
                  Fitment, balancing, and performance alignment with a showroom-level finish.
                </p>
              </div>

              <div className="hidden shrink-0 md:block">
                <span className="inline-flex items-center gap-2 rounded-full border border-slate-200/15 bg-slate-950/35 px-4 py-2 font-mono text-xs text-slate-200/70">
                  Michelin Authorized
                  <ShieldCheck className="h-4 w-4 text-slate-200/70" />
                </span>
              </div>
            </div>

            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute -bottom-16 -right-10 h-64 w-64 rounded-full"
              animate={
                active === "tires"
                  ? { opacity: 1, rotate: 360, scale: 1 }
                  : { opacity: 0.12, rotate: 0, scale: 0.92 }
              }
              transition={
                active === "tires"
                  ? { rotate: { duration: 1.3, ease: "linear", repeat: Infinity }, opacity: { duration: 0.2 } }
                  : { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }
              }
              style={{
                background:
                  "conic-gradient(from 0deg, rgba(226,232,240,0.6), rgba(226,232,240,0.08), rgba(226,232,240,0.55), rgba(226,232,240,0.12), rgba(226,232,240,0.6))",
              }}
            >
              <div className="absolute inset-[10%] rounded-full bg-slate-950" />
              <div
                className="absolute inset-[18%] rounded-full"
                style={{
                  background:
                    "repeating-linear-gradient(90deg, rgba(226,232,240,0.18) 0 2px, rgba(15,23,42,0) 2px 14px)",
                }}
              />
              <div className="absolute inset-[44%] rounded-full bg-slate-950" />
            </motion.div>

            <div className="relative mt-10 flex flex-wrap gap-2">
              {["Seasonal swap", "Road-force balance", "Performance alignment"].map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-slate-200/10 bg-slate-950/40 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-slate-200/65"
                >
                  {t}
                </span>
              ))}
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1], delay: 0.04 }}
            onMouseEnter={() => setActive("diagnostics")}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive("diagnostics")}
            onBlur={() => setActive(null)}
            className={
              "glass-panel group relative col-span-12 overflow-hidden rounded-2xl p-8 outline-none " +
              "md:col-span-5 md:row-span-3 " +
              (dim("diagnostics") ? "opacity-40" : "opacity-100")
            }
          >
            <div className="pointer-events-none absolute inset-0 opacity-60 texture-carbon" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_40%_15%,rgba(226,232,240,0.14),rgba(15,23,42,0)_55%)]" />

            <div className="relative flex items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.32em] text-slate-200/60">
                  Engine Diagnostics
                </p>
                <h3 className="mt-3 font-display text-2xl uppercase tracking-[-0.03em] text-slate-100 md:text-3xl">
                  No guesswork.
                </h3>
                <p className="mt-3 text-sm text-slate-200/75">
                  Dealer-grade scan tools, live data, and verified root-cause fixes.
                </p>
              </div>

              <motion.div
                aria-hidden="true"
                className="relative mt-1 h-11 w-11 rounded-full border border-red-500/35 bg-red-600/15"
                animate={{ opacity: [0.5, 1, 0.5], scale: [1, 1.05, 1] }}
                transition={{ duration: 1.35, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_35%_35%,rgba(220,38,38,0.35),rgba(15,23,42,0)_65%)]" />
                <Gauge className="absolute left-1/2 top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 text-red-400" />
              </motion.div>
            </div>

            <div className="relative mt-10 space-y-3">
              {[
                { label: "Live data", value: "Real-time" },
                { label: "Codes", value: "Verified" },
                { label: "Report", value: "Texted video" },
              ].map((r) => (
                <div key={r.label} className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-[0.22em] text-slate-200/55">
                    {r.label}
                  </span>
                  <span className="rounded-full border border-slate-200/10 bg-slate-950/40 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.22em] text-slate-200/70">
                    {r.value}
                  </span>
                </div>
              ))}
            </div>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-950/80 to-transparent" />
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1], delay: 0.07 }}
            onMouseEnter={() => setActive("brakes")}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive("brakes")}
            onBlur={() => setActive(null)}
            className={
              "glass-panel group relative col-span-12 overflow-hidden rounded-2xl p-8 outline-none " +
              "md:col-span-7 md:row-span-1 " +
              (dim("brakes") ? "opacity-40" : "opacity-100")
            }
          >
            <div className="pointer-events-none absolute inset-0 opacity-65 texture-carbon" />
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(226,232,240,0.12),rgba(15,23,42,0)_60%)]" />

            <div className="relative flex items-center justify-between gap-6">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.32em] text-slate-200/60">Brake Service</p>
                <h3 className="mt-3 font-display text-2xl uppercase tracking-[-0.03em] text-slate-100">
                  Confidence at every stop.
                </h3>
              </div>
              <div className="relative flex items-center gap-3">
                <Disc3 className="h-9 w-9 text-slate-200/70" />
                <span className="font-mono text-xs uppercase tracking-[0.22em] text-slate-200/55">
                  Torque spec
                </span>
              </div>
            </div>

            <p className="relative mt-4 text-sm text-slate-200/75">
              Pads, rotors, fluid—done clean, measured, and road-tested.
            </p>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1], delay: 0.09 }}
            onMouseEnter={() => setActive("roadside")}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive("roadside")}
            onBlur={() => setActive(null)}
            className={
              "glass-panel group relative col-span-12 overflow-hidden rounded-2xl p-8 outline-none " +
              "md:col-span-7 md:row-span-1 " +
              (dim("roadside") ? "opacity-40" : "opacity-100")
            }
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(220,38,38,0.32),rgba(15,23,42,0)_60%)]" />
            <div className="pointer-events-none absolute inset-0 opacity-50 noise-surface" />

            <div className="relative flex items-center justify-between gap-6">
              <div>
                <p className="font-mono text-xs uppercase tracking-[0.32em] text-slate-200/70">
                  Roadside Assistance
                </p>
                <h3 className="mt-3 font-display text-2xl uppercase tracking-[-0.03em] text-slate-100">
                  24/7 emergency response.
                </h3>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-600/18 px-4 py-2 font-mono text-xs uppercase tracking-[0.22em] text-slate-100">
                Priority dispatch
                <LifeBuoy className="h-4 w-4" />
              </div>
            </div>

            <p className="relative mt-4 text-sm text-slate-200/80">
              Tow, jump, lockout, tire change—handled with premium care.
            </p>
          </motion.article>
        </div>
      </div>
    </section>
  );
}

function ProcessTimeline() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const grow = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const steps = useMemo(
    () => [
      {
        title: "Drop Off",
        desc: "Fast intake. Clean bay. Your time respected.",
        icon: Car,
      },
      {
        title: "Digital Inspection",
        desc: "We text you a video with what we see—no surprises.",
        icon: Video,
      },
      {
        title: "Approval",
        desc: "Approve work from your phone with transparent options.",
        icon: CheckCircle2,
      },
      {
        title: "Pickup",
        desc: "Final road test + a crisp, simple summary.",
        icon: Calendar,
      },
    ],
    [],
  );

  return (
    <section className="relative py-24">
      <div className="pointer-events-none absolute inset-0 opacity-30 noise-surface" />
      <div className="mx-auto w-full max-w-7xl px-6">
        <motion.div
          className="max-w-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={stagger}
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-xs uppercase tracking-[0.32em] text-slate-200/70"
          >
            The process
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-display text-4xl uppercase tracking-[-0.04em] text-slate-100 md:text-5xl"
          >
            Road-tested service—step by step.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-sm text-slate-200/75 md:text-base">
            A vertical timeline that feels like a precision road-map—drawn as you scroll.
          </motion.p>
        </motion.div>

        <div ref={ref} className="relative mt-12 grid gap-6 md:grid-cols-[56px_1fr]">
          <div className="relative hidden md:block">
            <div className="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-slate-200/10" />
            <motion.div
              className="absolute left-1/2 top-0 h-full w-[3px] -translate-x-1/2 origin-top bg-gradient-to-b from-red-500 via-slate-200/60 to-transparent"
              style={{ scaleY: grow }}
            />
          </div>

          <div className="space-y-4">
            {steps.map((s, idx) => {
              const Icon = s.icon;

              return (
                <motion.div
                  key={s.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.65, ease: [0.2, 0.8, 0.2, 1] }}
                  className="glass-panel relative overflow-hidden rounded-2xl p-6 md:p-7"
                >
                  <div className="pointer-events-none absolute inset-0 opacity-55 texture-carbon" />
                  <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(226,232,240,0.12),rgba(15,23,42,0)_55%)]" />

                  <div className="relative flex items-start gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200/15 bg-slate-950/45">
                      <Icon className="h-5 w-5 text-slate-100/80" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="font-display text-xl uppercase tracking-[-0.03em] text-slate-100">
                          {s.title}
                        </h3>
                        <span className="font-mono text-xs uppercase tracking-[0.22em] text-slate-200/55">
                          0{idx + 1}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-slate-200/75">{s.desc}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  const reviews = useMemo(
    () => [
      {
        quote:
          "Fast, immaculate, and transparent. The digital inspection video was a game-changer.",
        name: "Jordan M.",
      },
      {
        quote:
          "Tires mounted and balanced perfectly. The shop feels like a boutique performance garage.",
        name: "Sam R.",
      },
      {
        quote: "Called at 2am for a tow—arrived quickly and treated my car like it was theirs.",
        name: "Alex T.",
      },
    ],
    [],
  );

  return (
    <section id="reviews" className="relative py-24">
      <div className="pointer-events-none absolute inset-0 opacity-28 noise-surface" />
      <div className="mx-auto w-full max-w-7xl px-6">
        <motion.div
          className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={stagger}
        >
          <div className="max-w-2xl">
            <motion.p
              variants={fadeUp}
              className="font-mono text-xs uppercase tracking-[0.32em] text-slate-200/70"
            >
              Reviews
            </motion.p>
            <motion.h2
              variants={fadeUp}
              className="mt-4 font-display text-4xl uppercase tracking-[-0.04em] text-slate-100 md:text-5xl"
            >
              500+ five-star finishes.
            </motion.h2>
          </div>

          <motion.div
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200/15 bg-slate-950/40 px-4 py-2 font-mono text-xs uppercase tracking-[0.22em] text-slate-200/70"
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="h-4 w-4 text-slate-200/70" />
            ))}
            Avg 4.9
          </motion.div>
        </motion.div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {reviews.map((r, i) => (
            <motion.article
              key={r.name}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, ease: [0.2, 0.8, 0.2, 1], delay: i * 0.04 }}
              className="glass-panel relative overflow-hidden rounded-2xl p-7"
            >
              <div className="pointer-events-none absolute inset-0 opacity-55 texture-carbon" />
              <div className="relative">
                <p className="text-sm text-slate-200/80">“{r.quote}”</p>
                <p className="mt-5 font-mono text-xs uppercase tracking-[0.22em] text-slate-200/60">
                  {r.name}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  const faqs = useMemo(
    () => [
      {
        q: "Do you send estimates before doing work?",
        a: "Yes. You get a digital inspection, a clear estimate, and approval options before we proceed.",
      },
      {
        q: "What brands do you carry for tires?",
        a: "Premium lines like Michelin and performance-focused options—fitment matched to your vehicle.",
      },
      {
        q: "Do you offer towing at night?",
        a: "24/7. Emergency tow requests get priority dispatch and status updates.",
      },
      {
        q: "How fast can I book?",
        a: "Use the service menu below—pick a service, send details, and we’ll confirm quickly.",
      },
    ],
    [],
  );

  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24">
      <div className="pointer-events-none absolute inset-0 opacity-30 noise-surface" />
      <div className="mx-auto w-full max-w-7xl px-6">
        <motion.div
          className="max-w-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={stagger}
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-xs uppercase tracking-[0.32em] text-slate-200/70"
          >
            FAQ
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-display text-4xl uppercase tracking-[-0.04em] text-slate-100 md:text-5xl"
          >
            Answers, without the grease.
          </motion.h2>
        </motion.div>

        <div className="mt-12 grid gap-3">
          {faqs.map((f, idx) => {
            const isOpen = open === idx;

            return (
              <motion.div
                key={f.q}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.65, ease: [0.2, 0.8, 0.2, 1] }}
                className="glass-panel overflow-hidden rounded-2xl"
              >
                <button
                  type="button"
                  onClick={() => setOpen((v) => (v === idx ? null : idx))}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                >
                  <span className="font-display text-lg uppercase tracking-[-0.03em] text-slate-100">
                    {f.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.25, ease: "easeOut" }}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200/15 bg-slate-950/40"
                  >
                    <ChevronDown className="h-4 w-4 text-slate-200/70" />
                  </motion.span>
                </button>

                <motion.div
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{ duration: 0.32, ease: [0.2, 0.8, 0.2, 1] }}
                  className="overflow-hidden"
                >
                  <div className="px-6 pb-6 text-sm text-slate-200/75">{f.a}</div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ServiceMenuForm() {
  const [service, setService] = useState<string>("Tires");

  const services = useMemo(
    () => [
      { label: "Tires", icon: Disc3 },
      { label: "Oil Change", icon: Wrench },
      { label: "Check Engine", icon: Gauge },
      { label: "Emergency Tow", icon: LifeBuoy },
    ],
    [],
  );

  return (
    <section id="book" className="relative py-24">
      <div className="pointer-events-none absolute inset-0 opacity-30 noise-surface" />
      <div className="mx-auto w-full max-w-7xl px-6">
        <motion.div
          className="max-w-2xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
          variants={stagger}
        >
          <motion.p
            variants={fadeUp}
            className="font-mono text-xs uppercase tracking-[0.32em] text-slate-200/70"
          >
            Book now
          </motion.p>
          <motion.h2
            variants={fadeUp}
            className="mt-4 font-display text-4xl uppercase tracking-[-0.04em] text-slate-100 md:text-5xl"
          >
            Service menu—built like a dashboard.
          </motion.h2>
          <motion.p variants={fadeUp} className="mt-4 text-sm text-slate-200/75 md:text-base">
            Tap a service type, drop your details, and we’ll confirm availability.
          </motion.p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75, ease: [0.2, 0.8, 0.2, 1] }}
          onSubmit={(e) => e.preventDefault()}
          className="glass-panel relative mt-12 overflow-hidden rounded-3xl p-8"
        >
          <div className="pointer-events-none absolute inset-0 opacity-55 texture-carbon" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(220,38,38,0.18),rgba(15,23,42,0)_55%)]" />

          <div className="relative grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.32em] text-slate-200/60">
                Service type
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                {services.map((s) => {
                  const Icon = s.icon;
                  const active = service === s.label;

                  return (
                    <button
                      key={s.label}
                      type="button"
                      onClick={() => setService(s.label)}
                      className={
                        "group flex items-center justify-between gap-3 rounded-2xl border px-4 py-4 text-left transition-colors duration-200 " +
                        (active
                          ? "border-red-500/50 bg-red-600/15"
                          : "border-slate-200/12 bg-slate-950/35 hover:bg-slate-950/45")
                      }
                    >
                      <div>
                        <div className="font-display text-sm uppercase tracking-[0.18em] text-slate-100">
                          {s.label}
                        </div>
                        <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.22em] text-slate-200/55">
                          {active ? "Selected" : "Tap to choose"}
                        </div>
                      </div>
                      <Icon className={"h-5 w-5 " + (active ? "text-red-400" : "text-slate-200/70")} />
                    </button>
                  );
                })}
              </div>

              <div className="mt-8 grid gap-4 md:grid-cols-2">
                <div>
                  <label className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate-200/60">
                    Name
                  </label>
                  <input
                    className="mt-2 w-full rounded-xl border border-slate-200/12 bg-slate-950/45 px-4 py-3 font-mono text-sm text-slate-100 outline-none transition-colors focus:border-red-500/50"
                    placeholder="Full name"
                  />
                </div>
                <div>
                  <label className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate-200/60">
                    Phone
                  </label>
                  <input
                    className="mt-2 w-full rounded-xl border border-slate-200/12 bg-slate-950/45 px-4 py-3 font-mono text-sm text-slate-100 outline-none transition-colors focus:border-red-500/50"
                    placeholder="(555) 000-0000"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="font-mono text-[11px] uppercase tracking-[0.22em] text-slate-200/60">
                    Vehicle / Notes
                  </label>
                  <textarea
                    rows={4}
                    className="mt-2 w-full resize-none rounded-xl border border-slate-200/12 bg-slate-950/45 px-4 py-3 font-mono text-sm text-slate-100 outline-none transition-colors focus:border-red-500/50"
                    placeholder="Year / make / model + what you’re experiencing"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col justify-between gap-6">
              <div className="rounded-2xl border border-slate-200/12 bg-slate-950/35 p-6">
                <p className="font-mono text-xs uppercase tracking-[0.32em] text-slate-200/60">
                  Summary
                </p>
                <p className="mt-3 font-display text-2xl uppercase tracking-[-0.03em] text-slate-100">
                  {service}
                </p>
                <p className="mt-3 text-sm text-slate-200/75">
                  We’ll respond with time slots, pricing range, and next steps.
                </p>

                <div className="mt-6 space-y-3">
                  {["Digital inspection video", "Transparent approval", "Final road test"].map((t) => (
                    <div key={t} className="flex items-start gap-3">
                      <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full border border-slate-200/12 bg-slate-950/40">
                        <CheckCircle2 className="h-4 w-4 text-slate-200/70" />
                      </span>
                      <span className="text-sm text-slate-200/80">{t}</span>
                    </div>
                  ))}
                </div>
              </div>

              <MagneticButton className="w-full justify-center" icon={ArrowRight}>
                Request Appointment
              </MagneticButton>

              <div className="text-center font-mono text-[11px] uppercase tracking-[0.22em] text-slate-200/50">
                Or call for 24/7 towing priority.
              </div>
            </div>
          </div>
        </motion.form>
      </div>
    </section>
  );
}

export default function Page() {
  const { scrollTo } = useSmoothScroll();

  return (
    <main className="relative overflow-hidden texture-carbon">
      <div className="pointer-events-none absolute inset-0 opacity-45 noise-surface" />

      <section className="relative flex h-screen items-end overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/MechanicHero.mp4"
          autoPlay
          muted
          loop
          playsInline
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/95 via-slate-900/55 to-slate-900/10" />
        <div className="pointer-events-none absolute inset-0 opacity-35 noise-surface" />

        <div className="relative mx-auto w-full max-w-7xl px-6 pb-28">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={stagger}
            className="max-w-3xl"
          >
            <motion.p
              variants={fadeUp}
              className="font-mono text-xs uppercase tracking-[0.34em] text-slate-200/70"
            >
              Pro Auto Services
            </motion.p>

            <motion.h1
              variants={fadeUp}
              className="mt-4 font-display text-5xl uppercase tracking-[-0.05em] text-slate-100 md:text-7xl lg:text-8xl"
            >
              <RevealText text="DEALER PRECISION. LOCAL HEART." />
            </motion.h1>

            <motion.p variants={fadeUp} className="mt-6 max-w-xl text-base text-slate-200/75 md:text-lg">
              High-end automotive care for tires, mechanics, and roadside response—engineered for speed,
              clarity, and control.
            </motion.p>

            <motion.div variants={fadeUp} className="mt-9 flex flex-wrap items-center gap-4">
              <MagneticButton onClick={() => scrollTo("#book", { offset: -80 })} icon={ArrowRight}>
                Book Appointment
              </MagneticButton>

              <div className="glass-panel inline-flex items-center gap-2 rounded-full px-5 py-3">
                <Wrench className="h-4 w-4 text-slate-200/70" />
                <span className="font-mono text-xs uppercase tracking-[0.22em] text-slate-200/70">
                  Digital inspections
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <FloatingNav />
      <TrustTicker />
      <ServicesBento />
      <ProcessTimeline />
      <Reviews />
      <Faq />
      <ServiceMenuForm />

      <footer className="border-t border-slate-200/10 py-10">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-start justify-between gap-4 px-6 md:flex-row md:items-center">
          <div className="font-display text-sm uppercase tracking-[0.22em] text-slate-200/70">
            Pro Auto Services
          </div>
          <div className="font-mono text-xs uppercase tracking-[0.22em] text-slate-200/50">
            Dealer precision. Local heart.
          </div>
        </div>
      </footer>
    </main>
  );
}
