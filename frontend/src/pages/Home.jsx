import React, { useEffect, useMemo, useState } from "react";
import PropTypes from "prop-types";
import Testimonials from "../pages/Testimonials";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Award,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  DollarSign,
  Globe,
  Headphones,
  Map,
  MapPin,
  Play,
  Shield,
  Smartphone,
  Sparkles,
  Star,
  Users,
  Video,
} from "lucide-react";
import CountUp from "../components/CountUp";

const heroSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=2070&auto=format&fit=crop",
    title: "Alpine escape",
    location: "Lauterbrunnen, Switzerland",
  },
  {
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2070&auto=format&fit=crop",
    title: "Coastal reset",
    location: "Nusa Penida, Indonesia",
  },
  {
    image:
      "https://images.unsplash.com/photo-1491555103944-7c647fd857e6?q=80&w=2070&auto=format&fit=crop",
    title: "City discovery",
    location: "Prague, Czech Republic",
  },
];

const heroMetrics = [
  { end: 50, suffix: "K+", label: "Adventurers" },
  { end: 150, suffix: "+", label: "Destinations" },
  { end: 4.9, suffix: "/5", label: "Average rating", decimals: 1 },
];

const featureCards = [
  {
    icon: <Globe className="w-10 h-10" />,
    title: "AI Travel Planner",
    description:
      "Smart itinerary builder tailored to your interests, budget, and time.",
    color: "bg-cyan-100 text-cyan-700 dark:bg-cyan-500/15 dark:text-cyan-300",
  },
  {
    icon: <Shield className="w-10 h-10" />,
    title: "Local Advice",
    description:
      "Get real-time tips from locals and travelers before every decision.",
    color: "bg-teal-100 text-teal-700 dark:bg-teal-500/15 dark:text-teal-300",
  },
  {
    icon: <Smartphone className="w-10 h-10" />,
    title: "Smart Stays",
    description:
      "Find stays matched to reviews, transport, vibe, and nightly budget.",
    color: "bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300",
  },
  {
    icon: <Video className="w-10 h-10" />,
    title: "Live Translation",
    description:
      "Move through new places with instant support for 100+ languages.",
    color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
  },
  {
    icon: <Calendar className="w-10 h-10" />,
    title: "Offline Access",
    description:
      "Keep maps, routes, bookings, and plans available without internet.",
    color: "bg-orange-100 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300",
  },
  {
    icon: <Headphones className="w-10 h-10" />,
    title: "24/7 Support",
    description:
      "Get quick help from travel experts whenever plans suddenly shift.",
    color: "bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
  },
  {
    icon: <Users className="w-10 h-10" />,
    title: "Group Planner",
    description:
      "Vote on activities, sync schedules, and keep friends aligned.",
    color: "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/15 dark:text-indigo-300",
  },
  {
    icon: <DollarSign className="w-10 h-10" />,
    title: "Budget Tracker",
    description:
      "Track shared costs and get smarter alternatives while planning.",
    color: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  },
];

const journeySteps = [
  {
    number: "01",
    icon: <MapPin className="w-7 h-7" />,
    title: "Choose the vibe",
    description: "Share dates, pace, interests, budget, and must-see places.",
    color: "from-teal-500 to-cyan-500",
  },
  {
    number: "02",
    icon: <Sparkles className="w-7 h-7" />,
    title: "Shape the route",
    description: "TourEase balances landmarks, food, rest, and travel time.",
    color: "from-orange-500 to-amber-500",
  },
  {
    number: "03",
    icon: <Clock className="w-7 h-7" />,
    title: "Adapt on the go",
    description: "Plans stay flexible with weather, delays, and local tips.",
    color: "from-indigo-500 to-violet-500",
  },
  {
    number: "04",
    icon: <Award className="w-7 h-7" />,
    title: "Share the story",
    description: "Save memories, recommend gems, and help other travelers.",
    color: "from-emerald-500 to-teal-500",
  },
];

const communityCards = [
  {
    name: "Emily Chen",
    location: "New York, USA",
    quote:
      "TourEase made planning my Europe trip easy. The AI suggestions were spot-on, and I found hidden gems I would have missed.",
    trips: "23 Trips",
  },
  {
    name: "Marco Rossi",
    location: "Rome, Italy",
    quote:
      "The offline access and local notes made every city feel manageable, even when plans changed at the last minute.",
    trips: "47 Trips",
  },
  {
    name: "Priya Patel",
    location: "Mumbai, India",
    quote:
      "The budget tracker helped me travel more while spending less. It made the whole group trip calmer.",
    trips: "15 Trips",
  },
];

const revealVariants = {
  hidden: { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0 },
};

function Reveal({ children, className = "", delay = 0 }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : "hidden"}
      whileInView="visible"
      viewport={{ once: true, amount: 0.22 }}
      variants={revealVariants}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function AnimatedMetric({ end, suffix, label, decimals = 0 }) {
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.7 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return undefined;
    let frameId;
    const duration = 1400;
    const startedAt = performance.now();

    const tick = (timestamp) => {
      const progress = Math.min((timestamp - startedAt) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(end * eased);
      if (progress < 1) frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [end, inView]);

  return (
    <div ref={ref} className="min-w-[92px]">
      <p className="text-3xl font-black text-gray-950 dark:text-white">
        {value.toFixed(decimals)}
        <span className="text-orange-500">{suffix}</span>
      </p>
      <p className="mt-1 text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
        {label}
      </p>
    </div>
  );
}

function HeroShowcase() {
  const [activeSlide, setActiveSlide] = useState(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) return undefined;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current + 1) % heroSlides.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const currentSlide = heroSlides[activeSlide];

  return (
    <motion.div
      className="relative w-full max-w-[560px] lg:ml-auto"
      initial={reduceMotion ? false : { opacity: 0, x: 42 }}
      animate={reduceMotion ? undefined : { opacity: 1, x: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="absolute -left-4 top-12 z-20 hidden rounded-2xl border border-white/70 bg-white/80 p-4 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-gray-950/70 sm:block">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100 text-teal-700 dark:bg-teal-400/15 dark:text-teal-300">
            <Map className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-gray-500 dark:text-gray-400">
              Smart route
            </p>
            <p className="text-sm font-black text-gray-950 dark:text-white">
              7 days planned
            </p>
          </div>
        </div>
      </div>

      <motion.div
        className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-white/60 p-2 shadow-2xl backdrop-blur dark:border-white/10 dark:bg-white/5"
        animate={reduceMotion ? undefined : { y: [0, -12, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="relative min-h-[360px] overflow-hidden rounded-[1.5rem] sm:min-h-[460px]">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentSlide.image}
              src={currentSlide.image}
              alt={currentSlide.title}
              className="absolute inset-0 h-full w-full object-cover"
              initial={reduceMotion ? false : { opacity: 0, scale: 1.08 }}
              animate={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
              exit={reduceMotion ? undefined : { opacity: 0, scale: 1.03 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </AnimatePresence>
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

          <div className="absolute bottom-5 left-5 right-5">
            <div className="rounded-2xl border border-white/25 bg-white/15 p-4 text-white shadow-xl backdrop-blur-xl">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-100">
                Featured journey
              </p>
              <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <h3 className="text-2xl font-black">{currentSlide.title}</h3>
                  <p className="mt-1 flex items-center gap-2 text-sm text-white/80">
                    <MapPin className="h-4 w-4" />
                    {currentSlide.location}
                  </p>
                </div>
                <div className="flex gap-2">
                  {heroSlides.map((slide, index) => (
                    <button
                      key={slide.title}
                      type="button"
                      onClick={() => setActiveSlide(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === activeSlide ? "w-8 bg-orange-400" : "w-2 bg-white/60"
                      }`}
                      aria-label={`Show ${slide.title}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="absolute -bottom-5 right-3 z-20 rounded-2xl border border-white/70 bg-white/85 px-4 py-3 shadow-xl backdrop-blur-xl dark:border-white/10 dark:bg-gray-950/80 sm:right-8">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-orange-500" />
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-gray-700 dark:text-gray-200">
            Live trip ideas
          </p>
        </div>
      </div>
    </motion.div>
  );
}

function FeatureCarousel({ cards }) {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 1280,
  );

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const slidesToShow = useMemo(() => {
    if (viewportWidth < 768) return 1;
    if (viewportWidth < 1024) return 2;
    if (viewportWidth < 1280) return 3;
    return 4;
  }, [viewportWidth]);

  const maxSlideIndex = Math.max(0, cards.length - slidesToShow);

  useEffect(() => {
    if (activeSlide > maxSlideIndex) setActiveSlide(maxSlideIndex);
  }, [maxSlideIndex, activeSlide]);

  useEffect(() => {
    if (isPaused || maxSlideIndex <= 0) return undefined;
    const timer = window.setInterval(() => {
      setActiveSlide((current) => (current >= maxSlideIndex ? 0 : current + 1));
    }, 3200);
    return () => window.clearInterval(timer);
  }, [isPaused, maxSlideIndex]);

  const cardWidthPercent = 100 / slidesToShow;
  const indicatorCount = maxSlideIndex + 1;

  return (
    <div className="relative">
      <div className="mb-6 flex justify-end gap-3">
        <button
          type="button"
          onClick={() => setActiveSlide((current) => Math.max(0, current - 1))}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-300 hover:text-teal-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-teal-500"
          aria-label="Previous features"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={() => setActiveSlide((current) => Math.min(maxSlideIndex, current + 1))}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-sm transition hover:-translate-y-0.5 hover:border-teal-300 hover:text-teal-700 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-200 dark:hover:border-teal-500"
          aria-label="Next features"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>

      <div
        className="overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{
            transform: `translateX(-${activeSlide * cardWidthPercent}%)`,
            willChange: "transform",
          }}
        >
          {cards.map((card) => (
            <div
              key={card.title}
              className="box-border shrink-0 px-3"
              style={{
                flex: `0 0 ${cardWidthPercent}%`,
                maxWidth: `${cardWidthPercent}%`,
              }}
            >
              <motion.div
                className="group h-full rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-teal-200 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:hover:border-teal-500 dark:hover:shadow-[0_0_25px_rgba(45,212,191,0.25)]"
                whileHover={{ rotate: -0.5 }}
              >
                <div
                  className={`${card.color} mb-5 flex h-16 w-16 items-center justify-center rounded-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
                >
                  {card.icon}
                </div>
                <h3 className="mb-3 text-xl font-bold text-gray-950 dark:text-white">
                  {card.title}
                </h3>
                <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                  {card.description}
                </p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-7 flex items-center justify-center gap-2">
        {Array.from({ length: indicatorCount }, (_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveSlide(idx)}
            className={`h-2 rounded-full transition-all ${
              activeSlide === idx ? "w-9 bg-teal-500" : "w-2 bg-gray-300 dark:bg-gray-700"
            }`}
            aria-label={`Show feature slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-950 dark:bg-gray-950 dark:text-white">
      <section className="relative overflow-hidden bg-[linear-gradient(180deg,#ecfeff_0%,#ffffff_58%)] py-16 dark:bg-[linear-gradient(180deg,#07111f_0%,#030712_62%)] lg:py-24">
        <div className="absolute inset-x-0 top-0 h-32 bg-[linear-gradient(90deg,rgba(20,184,166,0.12),rgba(249,115,22,0.1),rgba(14,165,233,0.12))]" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1fr_0.9fr] lg:px-12">
          <motion.div
            className="max-w-2xl"
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/80 px-4 py-2 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-orange-500" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-700 dark:text-cyan-300">
                Explore the world
              </span>
            </div>

            <h1 className="text-5xl font-black leading-[1.05] tracking-tight text-gray-950 dark:text-white md:text-6xl lg:text-7xl">
              Plan trips that feel{" "}
              <span className="bg-gradient-to-r from-teal-500 via-cyan-500 to-orange-500 bg-clip-text text-transparent">
                effortless
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base font-medium leading-8 text-gray-600 dark:text-gray-300 md:text-lg">
              TourEase blends smart itineraries, local advice, budgets, and
              live support into one immersive travel planning experience.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/trip-planner"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-orange-500 px-7 py-3 font-bold text-white shadow-lg shadow-orange-500/25 transition hover:-translate-y-1 hover:bg-orange-600 hover:shadow-xl active:scale-95"
              >
                Start Your Journey
                <ArrowRight className="h-5 w-5 transition group-hover:translate-x-1" />
              </Link>
              <Link
                to="/demo"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white/80 px-7 py-3 font-bold text-gray-950 shadow-sm backdrop-blur transition hover:-translate-y-1 hover:border-teal-300 hover:text-teal-700 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:border-teal-400"
              >
                <Play className="h-5 w-5" />
                Watch Demo
              </Link>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-4 border-t border-gray-200 pt-6 dark:border-white/10">
              {heroMetrics.map((metric) => (
                <AnimatedMetric key={metric.label} {...metric} />
              ))}
            </div>
          </motion.div>

          <HeroShowcase />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-orange-500">
            Smart travel toolkit
          </p>
          <h2 className="text-4xl font-black tracking-tight text-gray-950 dark:text-white md:text-5xl">
            Everything you need to travel smarter
          </h2>
          <p className="mt-5 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Interactive planning tools, animated guidance, and practical travel
            support designed for every step of the journey.
          </p>
        </Reveal>

        <Reveal>
          <FeatureCarousel cards={featureCards} />
        </Reveal>
      </section>

      <section className="overflow-hidden bg-gray-50 py-20 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Reveal className="mb-14 grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-teal-600 dark:text-teal-300">
                Explore the world
              </p>
              <h2 className="text-4xl font-black tracking-tight text-gray-950 dark:text-white md:text-5xl">
                A smoother way from idea to itinerary
              </h2>
            </div>
            <p className="text-lg leading-8 text-gray-600 dark:text-gray-300">
              The landing flow now tells a clearer travel story: choose the vibe,
              shape a route, adapt during the trip, and share the experience.
            </p>
          </Reveal>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {journeySteps.map((step, index) => (
              <Reveal key={step.title} delay={index * 0.08}>
                <StepCard {...step} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <Reveal className="mx-auto mb-12 max-w-3xl text-center">
          <h2 className="text-4xl font-black tracking-tight text-gray-950 dark:text-white md:text-5xl">
            Join our global travel community
          </h2>
          <p className="mt-5 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Real stories, practical inspiration, and shared plans from travelers
            building better trips with TourEase.
          </p>
        </Reveal>

        <div className="grid gap-8 md:grid-cols-3">
          {communityCards.map((card, index) => (
            <Reveal key={card.name} delay={index * 0.08}>
              <CommunityCard {...card} />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 overflow-hidden rounded-[2rem] bg-[linear-gradient(135deg,#0f766e,#0891b2_48%,#f97316)] p-[1px] shadow-2xl shadow-cyan-900/10">
          <div className="relative overflow-hidden rounded-[calc(2rem-1px)] bg-gray-950 px-6 py-12 text-center text-white sm:px-10">
            <div className="absolute inset-0 opacity-20 [background-image:linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(rgba(255,255,255,.18)_1px,transparent_1px)] [background-size:42px_42px]" />
            <div className="relative mx-auto max-w-3xl">
              <Users className="mx-auto mb-5 h-16 w-16 text-cyan-200" />
              <h3 className="text-3xl font-black md:text-4xl">
                Join <CountUp /> travelers building smarter trips
              </h3>
              <p className="mx-auto mt-4 max-w-2xl text-lg text-white/75">
                Start with a destination, get a flexible plan, and keep every
                travel detail close.
              </p>
              <Link
                to="/trip-planner"
                className="mt-8 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-orange-500 px-8 py-3 font-bold text-white shadow-lg shadow-orange-500/25 transition hover:-translate-y-1 hover:bg-orange-600"
              >
                Get Started Free
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <Testimonials />

      <section className="bg-gradient-to-br from-teal-500 via-cyan-600 to-sky-700 py-20 text-white dark:from-gray-900 dark:via-teal-950 dark:to-gray-950">
        <Reveal className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-6 inline-flex rounded-full bg-white/15 px-4 py-2 text-sm font-bold uppercase tracking-[0.18em] backdrop-blur">
            Ready to explore?
          </div>
          <h2 className="text-4xl font-black tracking-tight md:text-6xl">
            Experience travel planning with more motion and less friction
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-xl text-white/85">
            Plan better, coordinate faster, and explore more confidently with
            TourEase.
          </p>

          <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/trip-planner"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-orange-500 px-8 py-3 font-bold text-white shadow-lg shadow-orange-900/20 transition hover:-translate-y-1 hover:bg-orange-600"
            >
              Get Started Free
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link
              to="/destinations"
              className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-8 py-3 font-bold text-teal-700 shadow-lg transition hover:-translate-y-1 hover:bg-gray-100"
            >
              Browse Destinations
            </Link>
          </div>

          <div className="mt-14 grid grid-cols-2 gap-5 md:grid-cols-4">
            {["Free plan", "5 min setup", "4.9 rating", "150+ countries"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur"
                >
                  <p className="text-lg font-black">{item.split(" ")[0]}</p>
                  <p className="mt-1 text-sm text-white/75">
                    {item.split(" ").slice(1).join(" ")}
                  </p>
                </div>
              ),
            )}
          </div>
        </Reveal>
      </section>
    </div>
  );
}

function StepCard({ number, icon, title, description, color }) {
  return (
    <motion.div
      className="group h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-gray-800 dark:bg-gray-950"
      whileHover={{ rotate: 0.5 }}
    >
      <div className="mb-6 flex items-center justify-between">
        <div
          className={`flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${color} text-white shadow-lg`}
        >
          {icon}
        </div>
        <span className="text-3xl font-black text-gray-100 transition group-hover:text-teal-100 dark:text-gray-800 dark:group-hover:text-teal-900/60">
          {number}
        </span>
      </div>
      <h3 className="text-xl font-bold text-gray-950 dark:text-white">{title}</h3>
      <p className="mt-3 leading-7 text-gray-600 dark:text-gray-300">
        {description}
      </p>
    </motion.div>
  );
}

function CommunityCard({ name, location, quote, trips }) {
  return (
    <motion.div
      className="group h-full rounded-2xl border border-gray-100 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-teal-200 hover:shadow-xl dark:border-gray-800 dark:bg-gray-900 dark:hover:border-teal-500"
      whileHover={{ rotate: -0.4 }}
    >
      <div className="mb-6 flex items-center">
        <div className="mr-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 text-xl font-black text-white shadow-lg shadow-teal-500/20">
          {name.charAt(0)}
        </div>
        <div>
          <h4 className="text-lg font-bold text-gray-950 dark:text-white">{name}</h4>
          <p className="text-sm text-gray-500 dark:text-gray-400">{location}</p>
        </div>
      </div>
      <p className="mb-6 leading-7 text-gray-600 dark:text-gray-300">
        "{quote}"
      </p>
      <div className="flex items-center text-sm font-bold text-teal-600 dark:text-teal-300">
        <MapPin className="mr-2 h-5 w-5" />
        {trips}
      </div>
    </motion.div>
  );
}

Reveal.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  delay: PropTypes.number,
};

AnimatedMetric.propTypes = {
  end: PropTypes.number.isRequired,
  suffix: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  decimals: PropTypes.number,
};

FeatureCarousel.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.node.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

StepCard.propTypes = {
  number: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
};

CommunityCard.propTypes = {
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  quote: PropTypes.string.isRequired,
  trips: PropTypes.string.isRequired,
};
