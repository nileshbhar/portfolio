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
  {
    title: "Full Stack Developer", // TODO: confirm job title
    company: "LetsEngage",
    companyUrl: "https://www.letsengage.com/",
    location: "",
    start: "", // TODO: add start date, e.g. "Jan 2023"
    end: "", // TODO: add end date
    verified: false,
    responsibilities: [
      "Maintained and debugged the live LetsEngage talent booking platform across releases, including Engage 3.0.",
      "Built large-scale talent filtering by category, subcategory, budget and location across 5,000+ profiles.",
      "Implemented radius-based location search so only talent within the selected miles appears.",
      "Added new payment methods and updated the payment flow.",
      "Developed and updated modules for the Engage 3.0 admin dashboard.",
    ],
    stack: ["Laravel", "PHP", "MySQL", "JavaScript"], // TODO: confirm
  },
];
