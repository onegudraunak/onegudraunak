import project1 from "../assets/projects/netflix.png";
import project2 from "../assets/projects/lyrics2.png";
import computechLogo from "../assets/brands/computech-logo.jpeg";
import dreamplayImage from "../assets/brands/dreamplay.png";

export const EXPERIENCES = [
  {
    year: "May 2016 — Present",
    role: "Founder & Owner",
    company: "Computech Nagpur",
    logo: computechLogo,
    logoAlt: "Computech computer and IT services logo",
    description: [
      "Founded and manage a computer sales and service business serving both business and individual clients, with a 4.9-star Google rating.",
      "Install software, configure remote desktops, and build end-to-end networks with LAN cabling and infrastructure maps.",
      "Inspect client sites and troubleshoot network and server issues to improve performance.",
      "Resolve hardware and software problems, install systems, and plan upgrades for client teams.",
    ],
    detail:
      "Client sectors: finance · IT · education · transportation · healthcare · retail",
  },
  {
    year: "Feb 2020 — Aug 2024",
    role: "Co-Founder & Technology Head",
    company: "Dreamplay Nagpur",
    image: dreamplayImage,
    imageAlt: "Dreamplay family entertainment and play brand artwork",
    description: [
      "Co-founded and operated a children's entertainment center with virtual reality experiences and a soft-play area.",
      "Designed and built custom VR infrastructure with gaming PCs, VR headsets, projectors, and multiplayer networks.",
      "Managed routers, switches, CPUs, and network maps, troubleshooting issues and optimizing performance.",
      "Led a team of 3–5, improved daily operations, and helped guests set up equipment and play safely.",
      "Introduced VR games and organized promotions and special events to engage customers.",
    ],
  },
];

export const PROJECTS = [
  {
    title: "Netflix Clone",
    image: project1,
    href: "https://raunak94.github.io/netflix-clone/",
    description:
      "A responsive, full-stack streaming catalogue with title browsing and add, update, and delete flows. Built with JavaScript, HTML, CSS, Node.js, and MongoDB.",
    technologies: ["JavaScript", "HTML", "CSS", "Node.js", "MongoDB"],
  },
  {
    title: "Lyrics Now",
    image: project2,
    href: "https://github.com/Raunak94/Playing_songs_and_fetch_lyrics",
    description:
      "A Python application that finds lyrics for the currently playing track by connecting music-player APIs with online lyric databases.",
    technologies: ["Python", "Music APIs", "Automation"],
  },
];

export const SKILL_GROUPS = [
  {
    title: "Hardware & support",
    skills: [
      "PC and laptop repair",
      "Hardware diagnostics",
      "Component replacement",
      "Operating system installation",
      "Remote desktop configuration",
    ],
  },
  {
    title: "Networks & infrastructure",
    skills: [
      "LAN/WAN setup and configuration",
      "Network troubleshooting",
      "Router and switch configuration",
      "IP addressing and subnetting",
      "Wireless setup and security",
    ],
  },
  {
    title: "Systems & operations",
    skills: [
      "Software and operating system setup",
      "Infrastructure mapping",
      "Business IT support",
      "Computer sales and service",
      "VR systems and multiplayer networks",
    ],
  },
];

export const EDUCATION = {
  degree: "Bachelor of Computer Applications (BCA)",
  college: "VMV (Vrajlal Manilal Vasant) College",
  location: "Nagpur",
  years: "Mar 2012 — Mar 2015",
};

export const CONTACT = {
  address: "Nagpur, India",
  phoneNo: "+91 97661 28875",
  phoneHref: "+919766128875",
  email: "onegudraunak@gmail.com",
};
