import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const LINKS = [
  ["hero", "PROFILE"],
  ["services", "MISSION ACCOMPLISHED"],
  ["technologies", "LOADOUT"],
  ["work", "STORY"],
  ["contact", "CONTACT"],
];

export default function Navbar({ activeSection, clock, wantedLevel }) {
  const [isOpen, setIsOpen] = useState(false);
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav className="site-navbar" aria-label="Main navigation">
      <div className="nav-inner game-container">
        <button className="nav-logo" onClick={() => scrollToSection("hero")} aria-label="Return to player profile">
          <span className="logo-emblem">RG</span>
          <span className="logo-copy"><b>RAUNAK GAGGAR</b><small>PLAYER PROFILE / 001</small></span>
        </button>

        <div className="nav-links" aria-label="Portfolio menu">
          {LINKS.map(([id, label]) => (
            <button className={`nav-link${activeSection === id ? " is-active" : ""}`} key={id} onClick={() => scrollToSection(id)} aria-current={activeSection === id ? "location" : undefined}>
              {label}
            </button>
          ))}
        </div>

        <div className="nav-hud">
          <div className="nav-clock"><small>NAGPUR / IST</small><b>{clock}</b></div>
          <div className="wanted-meter" aria-label={`Wanted level ${wantedLevel} of 5`}>
            <small>HEAT</small>
            <span className="wanted-stars">{Array.from({ length: 5 }, (_, index) => <i className={index < wantedLevel ? "is-lit" : ""} key={index}>★</i>)}</span>
          </div>
          <button className="nav-toggle" onClick={() => setIsOpen((open) => !open)} aria-label={isOpen ? "Close navigation" : "Open navigation"} aria-expanded={isOpen} aria-controls="mobile-navigation">
            {isOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div id="mobile-navigation" className="mobile-links game-container">
          {LINKS.map(([id, label], index) => (
            <button className={activeSection === id ? "is-active" : ""} key={id} onClick={() => scrollToSection(id)}>
              <span>0{index + 1}</span>{label}<b>↗</b>
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
