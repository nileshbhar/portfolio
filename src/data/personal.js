// ─────────────────────────────────────────────────────────────
// Personal details, links and site settings.
// Edit this file to update content used across the whole site.
// Leave a value as an empty string ("") to hide it on the site.
// ─────────────────────────────────────────────────────────────

export const personal = {
  name: "Nilesh Bhardwaj",
  firstName: "Nilesh",
  logo: "NILESH.DEV",
  title: "Full Stack Developer",
  tagline: "Full Stack Developer & Problem Solver",
  experienceYears: "3.6",
  location: "", // e.g. "India · Open to remote"

  // TODO: replace with your real contact email.
  email: "hello@nilesh.dev",

  // Resume: drop your PDF at /public/resume.pdf and set available to true.
  // While false, "Download CV" buttons show as "CV available on request"
  // and link to email instead of a missing file.
  resume: {
    available: false,
    path: "/resume.pdf",
    fileName: "Nilesh-Bhardwaj-Resume.pdf",
  },
};

// TODO: replace with your real profile URLs.
export const socials = {
  github: "https://github.com/nileshbhar",
  linkedin: "https://www.linkedin.com/in/nilesh-bhardwaj-1312aa270/",
};

export const site = {
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://nilesh.dev",
  title: "Nilesh Bhardwaj · Full Stack Developer",
  description:
    "Nilesh Bhardwaj is a Full Stack Developer building high-performance web applications and scalable backend systems with Laravel, React, Next.js, Node.js and AWS.",
  keywords: [
    "Nilesh Bhardwaj",
    "Full Stack Developer",
    "Laravel Developer",
    "React Developer",
    "Next.js Developer",
    "Node.js",
    "PHP",
    "AWS",
    "Web Application Development",
  ],
  locale: "en_US",
  twitterHandle: "", // e.g. "@nileshdev"
};

export const navLinks = [
  { label: "About", href: "#about", id: "about" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Experience", href: "#experience", id: "experience" },
  { label: "Contact", href: "#contact", id: "contact" },
];

export const hero = {
  label: "Full Stack Developer & Problem Solver",
  headingLine1: "Building the next",
  headingLine2: "digital frontier.",
  // {name} is replaced with the bold name.
  description:
    "Hi, I'm {name}. I specialize in crafting high-performance web applications and scalable backend systems, with a focus on clean code, thoughtful architecture, and user-centric design.",
};

export const about = {
  label: "01 / About me",
  heading: "A developer who enjoys solving complex problems.",
  paragraphs: [
    "I'm a Full Stack Developer with approximately 3.6 years of experience building and maintaining real-world web applications.",
    "My work spans frontend development, backend architecture, database design, API integrations, and cloud deployment.",
    "I enjoy transforming complex business requirements into reliable, scalable, and intuitive software solutions.",
    "Whether I'm developing a Laravel backend, building a React interface, designing a database, or deploying an application to AWS, I focus on writing maintainable code and delivering practical results.",
  ],
  highlights: [
    { title: "Full Stack Development", text: "Interfaces, APIs and data layers built as one coherent system." },
    { title: "SaaS Applications", text: "Multi-user business platforms with roles, workflows and reporting." },
    { title: "API Integrations", text: "OAuth flows and third-party services connected reliably." },
    { title: "Cloud Deployment", text: "Production releases and server management on AWS and Vercel." },
  ],
};

export const contact = {
  label: "05 / Contact",
  headingLine1: "Have something in mind?",
  headingLine2: "Let's build it together.",
  description:
    "I'm always interested in discussing interesting projects, collaboration opportunities, and software engineering roles. Feel free to reach out.",
};
