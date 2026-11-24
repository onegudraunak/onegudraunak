import { useEffect, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "framer-motion";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Technologies from "./components/Technologies";
import Work from "./components/Work";
import Contact from "./components/Contact";
import "./index.css";

const HIGHLIGHTS = [
  { value: "08+", label: "YEARS IN IT" },
  { value: "B2B / B2C", label: "CLIENT TYPES" },
  { value: "3–5", label: "TEAM LED" },
];

const MISSIONS = {
  hero: "Player profile loaded",
  services: "Support missions unlocked",
  technologies: "Technical loadout checked",
  work: "Career story synced",
  contact: "Contact waypoint reached",
};

const MAP_POINTS = {
  hero: [45, 55],
  services: [65, 39],
  technologies: [70, 66],
  work: [31, 44],
  contact: [49, 28],
};

function Minimap({ activeSection }) {
  const [x, y] = MAP_POINTS[activeSection] || MAP_POINTS.hero;

  return (
    <aside className="minimap-hud" aria-label={`Current waypoint: ${MISSIONS[activeSection]}`}>
      <div className="minimap-face">
        <svg viewBox="0 0 100 100" aria-hidden="true">
          <path className="map-road map-road--major" d="M-8 75 23 59 35 38 62 31 107 9" />
          <path className="map-road" d="M-4 25 25 38 44 34 57 50 76 53 105 74" />
          <path className="map-road" d="M13 103 20 78 44 65 52 51 51 24 69 -5" />
          <path className="map-road" d="M54 104 66 78 74 54 91 44 102 43" />
          <path className="map-route" d="M20 78 44 65 52 51 76 53" />
          <circle cx={x} cy={y} r="3.6" className="map-blip" />
          <circle cx={x} cy={y} r="8" className="map-ping" />
        </svg>
        <span className="map-north">N</span>
        <span className="map-player-arrow">▲</span>
      </div>
      <div className="minimap-caption"><b>NAGPUR</b><span>MAHARASHTRA / IN</span></div>
    </aside>
  );
}

function MissionToast({ activeSection }) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    const timer = window.setTimeout(() => setIsVisible(false), 3200);
    return () => window.clearTimeout(timer);
  }, [activeSection]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && <motion.aside
        className="mission-toast"
        key={activeSection}
        initial={{ opacity: 0, x: 28, y: 8 }}
        animate={{ opacity: 1, x: 0, y: 0 }}
        exit={{ opacity: 0, x: -12 }}
        transition={{ duration: 0.32 }}
        aria-live="polite"
      >
        <span className="toast-check">✓</span>
        <span><small>MISSION ACCOMPLISHED</small><b>{MISSIONS[activeSection]}</b></span>
      </motion.aside>}
    </AnimatePresence>
  );
}

export default function App() {
  const { scrollYProgress } = useScroll();
  const [activeSection, setActiveSection] = useState("hero");
  const [wantedLevel, setWantedLevel] = useState(1);
  const [clock, setClock] = useState("--:--");

  useMotionValueEvent(scrollYProgress, "change", (progress) => {
    const nextLevel = Math.min(5, Math.max(1, Math.floor(progress * 5) + 1));
    setWantedLevel((current) => current === nextLevel ? current : nextLevel);
  });

  useEffect(() => {
    const updateClock = () => setClock(new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: "Asia/Kolkata",
    }).format(new Date()));
    updateClock();
    const timer = window.setInterval(updateClock, 15000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const loader = document.getElementById("boot-loader");
    if (!loader) return undefined;

    let cancelled = false;
    let removeTimer;
    const startedAt = performance.now();
    const pageReady = document.readyState === "complete"
      ? Promise.resolve()
      : new Promise((resolve) => window.addEventListener("load", resolve, { once: true }));
    const fontsReady = document.fonts?.ready || Promise.resolve();
    const imagesReady = Promise.all(
      Array.from(document.images)
        .filter((image) => image.loading !== "lazy")
        .map((image) => image.complete
          ? Promise.resolve()
          : new Promise((resolve) => {
              image.addEventListener("load", resolve, { once: true });
              image.addEventListener("error", resolve, { once: true });
            })),
    );
    const minimumDisplay = new Promise((resolve) => window.setTimeout(resolve, 720));

    Promise.all([pageReady, fontsReady, imagesReady, minimumDisplay]).then(() => {
      if (cancelled) return;
      const remaining = Math.max(0, 980 - (performance.now() - startedAt));
      window.setTimeout(() => {
        if (cancelled) return;
        loader.classList.add("boot-loader--exit");
        document.documentElement.classList.remove("boot-loading");
        const root = document.getElementById("root");
        root?.removeAttribute("aria-hidden");
        root?.setAttribute("aria-busy", "false");
        removeTimer = window.setTimeout(() => loader.remove(), 620);
      }, remaining);
    });

    return () => {
      cancelled = true;
      window.clearTimeout(removeTimer);
    };
  }, []);
  useEffect(() => {
    const sections = document.querySelectorAll("[data-mission]");
    const observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActiveSection(visible.target.id);
    }, { rootMargin: "-28% 0px -52% 0px", threshold: [0.05, 0.2, 0.4] });

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="portfolio-shell" data-scene={activeSection}>
      <motion.div className="page-progress" style={{ scaleX: scrollYProgress }} aria-hidden="true" />
      <div className="world-backdrop" aria-hidden="true">
        <div className="world-sun" />
        <div className="world-horizon" />
        <div className="world-grain" />
      </div>

      <Navbar activeSection={activeSection} clock={clock} wantedLevel={wantedLevel} />

      <main className="game-world">
        <section id="hero" className="game-section game-section--hero" data-mission>
          <div className="game-container"><Hero /></div>
        </section>

        <section className="game-container highlight-band" aria-label="Career stats">
          <div className="stats-label"><span>PLAYER STATS</span><b>● LIVE</b></div>
          {HIGHLIGHTS.map((item, index) => (
            <motion.div
              className="highlight-item"
              key={item.value}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.55, delay: index * 0.12 }}
            >
              <span className="highlight-value">{item.value}</span>
              <span className="highlight-label">{item.label}</span>
            </motion.div>
          ))}
        </section>

        <section id="services" className="game-section game-section--services" data-mission>
          <div className="game-container"><Services /></div>
        </section>
        <section id="technologies" className="game-section game-section--technologies" data-mission>
          <div className="game-container"><Technologies /></div>
        </section>
        <section id="work" className="game-section game-section--work" data-mission>
          <div className="game-container"><Work /></div>
        </section>
        <section id="contact" className="game-section game-section--contact" data-mission>
          <div className="game-container"><Contact /></div>
        </section>
      </main>

      <footer className="game-footer game-container">
        <span>RAUNAK GAGGAR <i>·</i> PERSONAL PROFILE / 001</span>
        <span>LEONIDA MOOD // NAGPUR REALITY</span>
        <a href="#hero">RETURN TO FREE ROAM ↑</a>
      </footer>

      <Minimap activeSection={activeSection} />
      <MissionToast activeSection={activeSection} />
    </div>
  );
}
