import { motion } from "framer-motion";
import { CONTACT } from "../constants";

export default function Contact() {
  return (
    <div className="contact-panel">
      <motion.div className="contact-copy" initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <p className="eyebrow"><span /> SAFEHOUSE / CONTACT</p>
        <h2>Ready to<br /><em>connect?</em></h2>
        <p>I’m always glad to talk about practical IT, networks, software projects, or interesting opportunities.</p>
      </motion.div>
      <motion.div className="contact-details" initial={{ opacity: 0, x: 24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <a href={`mailto:${CONTACT.email}`}><span>EMAIL</span>{CONTACT.email}<b>↗</b></a>
        <a href={`tel:${CONTACT.phoneHref}`}><span>PHONE</span>{CONTACT.phoneNo}<b>↗</b></a>
        <div><span>BASED IN</span>{CONTACT.address}<b>⌖</b></div>
        <div className="contact-socials">
          <a href="https://github.com/Raunak94" target="_blank" rel="noopener noreferrer">GITHUB ↗</a>
          <a href="https://www.linkedin.com/in/raunak-gaggar-743721188/" target="_blank" rel="noopener noreferrer">LINKEDIN ↗</a>
          <a href="https://www.instagram.com/pc_laptop_repair_professional/" target="_blank" rel="noopener noreferrer">INSTAGRAM ↗</a>
        </div>
      </motion.div>
    </div>
  );
}
