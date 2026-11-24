import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { SKILL_GROUPS } from "../constants";

function SkillCard({ group, index }) {
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
      className="skill-group"
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      onPointerMove={trackPointer}
      onPointerLeave={resetPointer}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={reduceMotion ? undefined : { y: -7, scale: 1.015, transition: { duration: 0.2, delay: 0 } }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.55, delay: index * 0.1 }}
    >
      <div className="skill-group-content">
        <div className="skill-group-heading"><span>{String(index + 1).padStart(2, "0")}</span><h3>{group.title}</h3></div>
        <div className="skill-list">
          {group.skills.map((skill) => (
            <div className="skill-row" key={skill}>
              <span>{skill}</span><span className="skill-check" aria-hidden="true">↗</span>
            </div>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function Technologies() {
  return (
    <div>
      <div className="section-heading skill-heading">
        <div><p className="eyebrow"><span /> PLAYER LOADOUT / 02</p><h2>Select your<br /><em>loadout.</em></h2></div>
        <p className="section-intro">The practical hardware, support, and networking skills I use to keep devices and business systems running.</p>
      </div>
      <div className="skill-groups">
        {SKILL_GROUPS.map((group, index) => <SkillCard group={group} index={index} key={group.title} />)}
      </div>
    </div>
  );
}
