import { motion } from "framer-motion";
import { PROJECTS } from "../constants";

export default function Projects() {
  return (
    <div>
      <div className="section-heading">
        <div><p className="eyebrow"><span /> PERSONAL PROJECTS</p><h2>Ideas made<br /><em>practical.</em></h2></div>
        <p className="section-intro">Software projects that let me explore APIs, interfaces, and the details behind an application.</p>
      </div>
      <div className="projects-grid">
        {PROJECTS.map((project, index) => (
          <motion.article
            className="project-card"
            key={project.title}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.62, delay: index * 0.12 }}
          >
            <a className="project-image-link" href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title}`}>
              <img src={project.image} alt={`${project.title} project preview`} className="project-image" />
              <span className="project-open">VIEW PROJECT ↗</span>
            </a>
            <div className="project-content">
              <p className="project-kicker">PROJECT / {String(index + 1).padStart(2, "0")}</p>
              <div className="project-title-row"><h3>{project.title}</h3><a href={project.href} target="_blank" rel="noopener noreferrer" aria-label={`Open ${project.title} in a new tab`}>↗</a></div>
              <p className="project-description">{project.description}</p>
              <div className="project-tags">{project.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>
            </div>
          </motion.article>
        ))}
      </div>
      <motion.div className="coding-note" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <span className="coding-note-mark">&gt;_</span>
        <p><b>Always learning:</b> regular Codeforces and LeetCode practice, with 100+ problems solved.</p>
      </motion.div>
    </div>
  );
}
