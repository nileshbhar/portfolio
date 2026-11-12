// Experience timeline entries. Newest first.
// Set `company` to your employer's name. While it's empty, nothing is shown
// in its place. `verified` is a reminder for you only and is never displayed:
// flip it to true once the dates are confirmed.

export const experienceSection = {
  label: "04 / Experience",
  heading: "My professional journey.",
};

export const experience = [
  {
    title: "Full Stack Developer",
    company: "", // TODO: add company name
    companyUrl: "",
    location: "",
    start: "Aug 2023", // TODO: verify
    end: "Present",
    verified: false,
    responsibilities: [
      "Developed and maintained scalable business web applications.",
      "Implemented Laravel backend systems and REST APIs.",
      "Designed database structures and relationships.",
      "Built project management and reporting modules.",
      "Integrated third-party services.",
      "Developed frontend functionality with modern JavaScript frameworks.",
      "Worked on AWS infrastructure and production deployments.",
      "Debugged and optimized application functionality.",
    ],
    stack: ["Laravel", "PHP", "MySQL", "JavaScript", "React.js", "Next.js", "AWS"],
  },
];
