// Skill groups shown in the Expertise section.
// `icon` must be a key from the iconMap in src/components/sections/Skills.jsx.

export const skillsSection = {
  label: "02 / Expertise",
  heading: "Technologies I work with.",
};

export const skillGroups = [
  {
    category: "Frontend",
    icon: "layout",
    summary: "Responsive, accessible interfaces.",
    items: ["React.js", "Next.js", "JavaScript", "Tailwind CSS", "HTML", "CSS"],
  },
  {
    category: "Backend",
    icon: "server",
    summary: "APIs, auth and business logic.",
    items: ["Laravel", "PHP", "Node.js", "REST APIs"],
  },
  {
    category: "Databases",
    icon: "database",
    summary: "Schema design and query tuning.",
    items: ["MySQL", "MongoDB"],
  },
  {
    category: "Cloud & Tools",
    icon: "cloud",
    summary: "Deployment and daily tooling.",
    items: ["AWS", "Vercel", "Git", "GitHub", "Postman"],
  },
];
