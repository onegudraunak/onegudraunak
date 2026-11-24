import { motion } from "framer-motion";
import { EDUCATION, EXPERIENCES } from "../constants";

export default function Work() {
  return (
    <div>
      <div className="section-heading">
        <div><p className="eyebrow"><span /> STORY MODE / 03</p><h2>The story<br /><em>so far.</em></h2></div>
        <p className="section-intro">From building an IT business to creating immersive customer experiences, my path has stayed close to real technology and real people.</p>
      </div>
      <div className="experience-list">
        {EXPERIENCES.map((experience, index) => (
          <motion.article
            className="experience-card"
            key={experience.company}
            initial={{ opacity: 0, x: index % 2 === 0 ? -28 : 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.24 }}
            transition={{ duration: 0.65 }}
          >
            <div className="experience-date"><span className="timeline-dot" />{experience.year}<span className="experience-index">0{index + 1}</span></div>
            <div className="experience-details">
              <div className="experience-heading">
                <div>
                  <p className="experience-role">{experience.role}</p>
                  <h3>{experience.company}</h3>
                </div>
                {(experience.logo || experience.image) && (
                  <div className={`experience-brand experience-brand--${experience.logo ? "computech" : "dreamplay"}`}>
                    <img
                      src={experience.logo || experience.image}
                      alt={experience.logoAlt || experience.imageAlt}
                      loading="lazy"
                    />
                  </div>
                )}
              </div>
              <ul>{experience.description.map((point) => <li key={point}>{point}</li>)}</ul>
              {experience.detail && <p className="experience-detail-note">{experience.detail}</p>}
            </div>
          </motion.article>
        ))}
      </div>
      <motion.div className="education-card" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <div><p className="eyebrow"><span /> EDUCATION</p><h3>{EDUCATION.degree}</h3><p>{EDUCATION.college} · {EDUCATION.location}</p></div>
        <span className="education-years">{EDUCATION.years}</span>
      </motion.div>
    </div>
  );
}
