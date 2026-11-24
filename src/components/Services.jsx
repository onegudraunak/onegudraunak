import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";

const SERVICES = [
  {
    number: "01",
    title: "IT & network solutions",
    description: "Practical support for homes and businesses, from computer setup and remote desktop configuration to LAN cabling, network mapping, and server troubleshooting.",
    tags: ["Network setup", "IT support", "Troubleshooting"],
  },
  {
    number: "02",
    title: "Business technology",
    description: "Computer sales, installations, upgrades, and dependable after-sales support shaped around the way each client works.",
    tags: ["Hardware", "Installation", "Ongoing support"],
  },
  {
    number: "03",
    title: "VR systems & operations",
    description: "Technology leadership for immersive customer experiences, from multiplayer VR infrastructure and equipment setup to daily operations and team coordination.",
    tags: ["VR infrastructure", "Customer operations", "Team leadership"],
  },
];

function ServiceCard({ service, index }) {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothPointerX = useSpring(pointerX, { stiffness: 150, damping: 20, mass: 0.45 });
  const smoothPointerY = useSpring(pointerY, { stiffness: 150, damping: 20, mass: 0.45 });
  const rotateY = useTransform(smoothPointerX, [-0.5, 0.5], reduceMotion ? [0, 0] : [-8, 8]);
  const rotateX = useTransform(smoothPointerY, [-0.5, 0.5], reduceMotion ? [0, 0] : [6, -6]);

  const trackPointer = (event) => {
    if (reduceMotion || event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width;
    const y = (event.clientY - bounds.top) / bounds.height;
    pointerX.set(x - 0.5);
    pointerY.set(y - 0.5);
    event.currentTarget.style.setProperty("--pointer-x", `${x * 100}%`);
    event.currentTarget.style.setProperty("--pointer-y", `${y * 100}%`);
  };

  const resetPointer = (event) => {
    pointerX.set(0);
    pointerY.set(0);
    event.currentTarget.style.setProperty("--pointer-x", "50%");
    event.currentTarget.style.setProperty("--pointer-y", "50%");
  };

  return (
    <motion.article
      className="service-card"
      key={service.number}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onPointerMove={trackPointer}
      onPointerLeave={resetPointer}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={reduceMotion ? undefined : { y: -7, scale: 1.015 }}
      viewport={{ once: true, amount: 0.28 }}
      transition={{ duration: 0.58, delay: index * 0.12 }}
    >
      <div className="service-card-content">
        <span className="service-number">{service.number} <i>/ 03</i></span>
        <div className="service-icon" aria-hidden="true">{index === 0 ? "⌘" : index === 1 ? "↗" : "◌"}</div>
        <h3>{service.title}</h3>
        <p>{service.description}</p>
        <div className="service-tags">{service.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
      </div>
    </motion.article>
  );
}

export default function Services() {
  return (
    <div>
      <div className="section-heading">
        <div><p className="eyebrow"><span /> MISSION BOARD / 01</p><h2>Mission<br /><em>accomplished.</em></h2></div>
        <p className="section-intro">A hands-on mix of support, infrastructure, software, and the day-to-day work that keeps systems running.</p>
      </div>
      <div className="service-grid">
        {SERVICES.map((service, index) => <ServiceCard service={service} index={index} key={service.number} />)}
      </div>
    </div>
  );
}
