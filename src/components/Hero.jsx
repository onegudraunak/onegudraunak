import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import profilePic from "../assets/raunak-studio.png";

export default function Hero() {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothPointerX = useSpring(pointerX, { stiffness: 130, damping: 19, mass: 0.45 });
  const smoothPointerY = useSpring(pointerY, { stiffness: 130, damping: 19, mass: 0.45 });
  const cardRotateY = useTransform(smoothPointerX, [-0.5, 0.5], reduceMotion ? [0, 0] : [-8, 8]);
  const cardRotateX = useTransform(smoothPointerY, [-0.5, 0.5], reduceMotion ? [0, 0] : [6, -6]);
  const cardParallaxX = useTransform(smoothPointerX, [-0.5, 0.5], reduceMotion ? [0, 0] : [-5, 5]);
  const cardParallaxY = useTransform(smoothPointerY, [-0.5, 0.5], reduceMotion ? [0, 0] : [-4, 4]);

  const trackPointer = (event) => {
    if (reduceMotion || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - 0.5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - 0.5);
  };
  const resetPointer = () => {
    pointerX.set(0);
    pointerY.set(0);
  };


  return (
    <div className="hero-grid">
      <motion.div
        className="hero-copy"
        initial={reduceMotion ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.75, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <div className="hero-save-line"><span>LEONIDA / PLAYER FILE</span><b><i /> SAVE DATA FOUND</b></div>
        <p className="eyebrow"><span /> PROFILE / 001 <i>—</i> NAGPUR, INDIA</p>
        <h1>Raunak <em>Gaggar.</em></h1>
        <div className="hero-role-row">
          <span className="hero-role-index">01</span>
          <div>
            <p className="hero-role">IT professional, entrepreneur &amp; technology operator</p>
            <p className="hero-intro">
              I’m Raunak, a Nagpur-based IT professional with 8+ years of experience supporting business systems, repairing hardware, and building secure networks. I run Computech, a business that sells and services computers and laptops and provides comprehensive networking solutions for businesses and individuals. I also co-founded Dreamplay, where I designed and operated the technology behind immersive VR experiences.
            </p>
          </div>
        </div>
        <div className="hero-tags"><span>HARDWARE</span><span>NETWORKS</span><span>VR SYSTEMS</span></div>
        <div className="hero-actions">
          <a className="primary-action" href="#services">Start exploring <span>↘</span></a>
          <a className="secondary-action" href={`${import.meta.env.BASE_URL}resume.pdf`} target="_blank" rel="noopener noreferrer">Open resume <span aria-hidden="true">↗</span></a>
        </div>
        <div className="hero-note"><span className="note-line" /> REAL WORLD EXPERIENCE // NAGPUR, INDIA</div>
      </motion.div>

      <div className="hero-card-stage" onPointerMove={trackPointer} onPointerLeave={resetPointer}>
        <motion.div
          className="identity-card"
          style={{ rotateY: cardRotateY, rotateX: cardRotateX, x: cardParallaxX, y: cardParallaxY }}
          initial={reduceMotion ? false : { opacity: 0, rotate: 3 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
          role="group"
          aria-label="Raunak Gaggar player identity card"
        >
          <div className="id-card-header">
            <div className="id-brand"><span className="id-mark">RG</span><span>PLAYER PROFILE<br /><b>PERSONNEL / 001</b></span></div>
            <span className="id-chip" aria-hidden="true"><i /><i /><i /><i /></span>
          </div>
          <div className="id-photo-wrap">
            <motion.img src={profilePic} alt="Portrait of Raunak Gaggar" className="id-photo" />
            <span className="photo-scanline" aria-hidden="true" />
            <span className="id-photo-label">IDENTITY VERIFIED / RG</span>
          </div>
          <div className="id-details">
            <div className="id-name-row"><div><span className="id-label">NAME / OPERATOR</span><h2>Raunak Gaggar</h2></div><span className="id-status"><i /> ACTIVE</span></div>
            <p className="id-title">Hardware · Networks · VR Systems</p>
            <div className="id-divider" />
            <div className="id-facts"><span><b>SKILLSET</b> IT · Networks · Hardware · VR</span><span><b>BASE</b> Nagpur, India</span></div>
          </div>
          <div className="id-card-footer"><span>BUILD / SUPPORT / IMPROVE</span><span className="id-serial">RG—SYSTEMS—01</span></div>
          <div className="id-holo" aria-hidden="true" />
        </motion.div>
        <span className="card-float-label label-top">PLAYER CARD <b>↘</b></span>
        <span className="card-float-label label-bottom">SCROLL TO ROAM</span>
        <div className="card-orbit orbit-one" aria-hidden="true" />
        <div className="card-orbit orbit-two" aria-hidden="true" />
      </div>

    </div>
  );
}
