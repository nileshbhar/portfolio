// ─────────────────────────────────────────────────────────────
// Projects shown on the homepage and at /projects/[slug].
//
// To add a project, copy one object and change the slug.
//
// SCREENSHOTS
// 1. Put the images in a folder named after the project's slug, e.g.
//      public/images/projects/client-management-operations-platform/01-dashboard.png
//    Best results: 16:10 ratio (e.g. 1600 x 1000 or 2400 x 1500), PNG/JPG/WebP.
//    Next.js resizes and compresses them automatically.
// 2. List them in `screenshots`, in the order you want them shown:
//      screenshots: [
//        { src: "/images/projects/<slug>/01-dashboard.png", alt: "Dashboard", caption: "Project overview dashboard" },
//        { src: "/images/projects/<slug>/02-tasks.png", alt: "Task board", caption: "Tasks and work logs" },
//      ],
//    `alt` describes the image for screen readers; `caption` is shown under it.
//    Add as many as you like.
// 3. Where they appear:
//    - Project card (homepage): swipeable carousel, click to view fullscreen.
//    - Project page: the first image is the cover; all images appear in the
//      Screenshots gallery, each opening the fullscreen viewer.
// `cover` is optional. If set, it is shown first; if not, the first
// screenshot is used. Remove client names and personal data from captures.
//
// Any case-study field left as an empty array or "" is hidden on the page.
// `outcomes` is intentionally empty: add only results you can verify.
//
// REVIEW: the overview, problem, solution, challenges and architecture text
// below is a first draft written from the feature lists. Edit it so it
// describes exactly what you built.
// ─────────────────────────────────────────────────────────────

export const projectsSection = {
  label: "03 / Selected work",
  heading: "Selected projects.",
  subheading:
    "A selection of applications and systems I've worked on, focused on solving real business problems.",
};

export const projects = [
  {
    slug: "client-management-operations-platform",
    title: "Client Management & Operations Platform",
    status: "", // "In Development" shows a status badge
    year: "",
    role: "Full Stack Developer",
    description:
      "A comprehensive business management platform designed to streamline project workflows, team collaboration, client communication, reporting, and internal operations.",
    tech: ["Laravel", "PHP", "MySQL", "JavaScript", "AWS"],
    cover: "", // the first screenshot is used as the cover
    links: { live: "", repo: "" },
    overview:
      "An internal operations platform that brings projects, people, clients and reporting into one application. Teams plan and track work, log time, communicate with each other and with clients, and managers get a consolidated view of what is happening across the business.",
    problem:
      "Day-to-day operations were spread across separate tools for tasks, chat, meetings, time tracking and leave requests. Information was duplicated, access was hard to control per role, and producing a reliable picture of workload and progress took manual effort.",
    solution:
      "A single Laravel application with a shared data model for projects, tasks, users and clients. Each module (work logs, messaging, meetings, leave, reporting) builds on the same entities and the same permission layer, so data entered once is available everywhere it is needed.",
    responsibilities: [
      "Backend development in Laravel, including models, controllers, services and REST endpoints.",
      "Database design for projects, tasks, users, clients and their relationships in MySQL.",
      "Frontend functionality for dashboards, forms and interactive views in JavaScript.",
      "Role and permission rules across internal staff and client users.",
      "Deployment and maintenance of the application on AWS.",
    ],
    features: [
      "Project management",
      "Client portals",
      "Role-based permissions",
      "Work logs",
      "Team collaboration",
      "Chat and messaging",
      "Meeting management",
      "Reporting dashboards",
      "Employee leave management",
      "Notifications",
      "Kanban, list, Gantt and dashboard task views",
      "Task time tracking",
      "Notice board and announcements",
      "Employee directory",
      "Project, group and direct chats",
      "Granular per-user permissions",
      "Password vault with access approvals",
      "Client cost tracking from logged hours",
    ],
    challenges: [
      {
        title: "Permissions across very different users",
        text: "Internal staff, managers and client users all work inside the same application but must see different data. Access rules had to be enforced consistently at the query level, not only hidden in the interface.",
      },
      {
        title: "Keeping modules connected without coupling them",
        text: "Work logs, chat, meetings and reports all reference the same projects and users. The challenge was sharing that data while keeping each module independently maintainable.",
      },
      {
        title: "Reporting on growing data",
        text: "Dashboards aggregate tasks, time and activity. Queries needed careful indexing and eager loading to stay responsive as records accumulated.",
      },
    ],
    architecture: [
      {
        title: "Modular monolith in Laravel",
        text: "One codebase and one database, organised by domain module. This keeps deployment simple while allowing features to evolve separately.",
      },
      {
        title: "Central authorization layer",
        text: "Roles and permissions are resolved in one place and applied through policies and scoped queries, so every module inherits the same rules.",
      },
      {
        title: "Event-driven notifications",
        text: "Actions such as assignments, comments and approvals raise events that the notification system listens to, rather than each feature sending notifications directly.",
      },
    ],
    screenshots: [
      {
        src: "/images/projects/client-management-operations-platform/01-task-dashboard.webp",
        alt: "Task dashboard with status counts, tasks by status, tasks per member and overdue, upcoming and on-hold lists",
        caption: "Task dashboard: workload, overdue and upcoming work at a glance",
      },
      {
        src: "/images/projects/client-management-operations-platform/02-task-board.webp",
        alt: "Kanban board with To do, In progress, Pending review, Done, Blocked and On hold columns",
        caption: "Kanban board across every project",
      },
      {
        src: "/images/projects/client-management-operations-platform/03-task-detail.webp",
        alt: "Task detail panel with status, priority, assignees, repeat settings, description, subtasks, time tracking and comments",
        caption: "Task detail with subtasks, time tracking and comments",
      },
      {
        src: "/images/projects/client-management-operations-platform/04-dashboard.webp",
        alt: "Agency dashboard with client, onboarding, team and budget totals, slowest onboardings and team load",
        caption: "Agency dashboard with onboarding status and team load",
      },
      {
        src: "/images/projects/client-management-operations-platform/05-work-log.webp",
        alt: "Work log dashboard with total, client and internal hours, top clients by hours and hours by department",
        caption: "Work log dashboard: client vs internal hours and hours by department",
      },
      {
        src: "/images/projects/client-management-operations-platform/06-team-chat.webp",
        alt: "Team chat with direct and group conversations, mentions and a rich text composer",
        caption: "Team chat with direct messages, groups and mentions",
      },
      {
        src: "/images/projects/client-management-operations-platform/07-project-chats.webp",
        alt: "Project chat panel listing client projects, each with its own service conversations",
        caption: "Project chats organised by client and service",
      },
      {
        src: "/images/projects/client-management-operations-platform/08-notice-board.webp",
        alt: "Notice board with pinned, urgent and policy announcements and search filters",
        caption: "Notice board for team announcements",
      },
      {
        src: "/images/projects/client-management-operations-platform/09-edit-member.webp",
        alt: "Edit member form with account details, timezone, compensation, roles, reporting managers and specializations",
        caption: "Team member settings: roles, reporting lines and compensation",
      },
      {
        src: "/images/projects/client-management-operations-platform/10-permissions.webp",
        alt: "Permissions screen showing role-based permissions plus extra permissions granted to one person",
        caption: "Granular permissions on top of roles",
      },
    ],
    outcomes: [],
  },
  {
    slug: "multi-service-integration-platform",
    title: "Multi-Service Integration Platform",
    status: "",
    year: "",
    role: "Full Stack Developer",
    description:
      "A subscription-based SaaS for agencies to request platform access from clients through OAuth, collect onboarding forms, and send agreements for signature, with Stripe-powered billing.",
    tech: ["Next.js", "MongoDB", "NextAuth", "OAuth 2.0", "Google APIs", "Stripe"],
    cover: "", // the first screenshot is used as the cover
    links: { live: "", repo: "" },
    overview:
      "A Next.js SaaS application for agencies. An agency creates a guided access request, picks the platforms it needs (Meta, TikTok, Google, LinkedIn, Shopify, WordPress, YouTube) and sends the client a single link to grant access through OAuth. The same workspace handles client onboarding forms built from templates, client agreements with signature tracking, team members, and subscription billing through Stripe, with plan limits applied across every module.",
    problem:
      "Connecting business accounts to third-party platforms usually involves scattered credentials, manual access requests and little visibility into which service has access to what.",
    solution:
      "A central place to connect accounts through OAuth 2.0, track access requests through an approval workflow, and manage tokens and permissions per service from one interface. Forms, agreements and billing live in the same workspace so the whole client onboarding happens in one product.",
    responsibilities: [
      "Implemented Google and Facebook OAuth flows with NextAuth.",
      "Built the access request and approval workflow.",
      "Designed MongoDB collections for accounts, services, requests and permissions.",
      "Handled token storage and refresh logic for connected services.",
      "Built the management interface in Next.js.",
    ],
    features: [
      "Google OAuth",
      "Facebook OAuth",
      "Multi-platform access requests",
      "Service authorization",
      "Access request workflows",
      "Token handling",
      "API integration management",
      "Onboarding form templates",
      "Client agreements and e-signatures",
      "Team members and seat limits",
      "Subscription plans (monthly and annual)",
      "Stripe checkout and saved cards",
      "Plan-based usage limits",
      "Billing history",
    ],
    challenges: [
      {
        title: "Token lifecycle",
        text: "Access tokens expire and refresh tokens can be revoked. The system needed to detect expired or revoked access and prompt users to reconnect instead of failing silently.",
      },
      {
        title: "Different providers, one model",
        text: "Each provider returns different scopes and profile data. These were normalised into a consistent shape so the rest of the application doesn't depend on provider specifics.",
      },
    ],
    architecture: [
      {
        title: "NextAuth for authentication",
        text: "NextAuth handles provider sign-in and sessions, with custom callbacks to persist the provider tokens needed for later API calls.",
      },
      {
        title: "Document model in MongoDB",
        text: "Integration settings vary by provider, which suits a flexible document structure better than a fixed relational schema.",
      },
    ],
    screenshots: [
      {
        src: "/images/projects/multi-service-integration-platform/01-access-request.webp",
        alt: "Access request builder with platform selection for Meta, TikTok, Google, LinkedIn, Shopify, WordPress and YouTube",
        caption: "Access request builder: pick the platforms and send the client one guided link",
      },
      {
        src: "/images/projects/multi-service-integration-platform/02-agreements.webp",
        alt: "Agreements list with signed and waiting statuses, signature dates and reminder actions",
        caption: "Client agreements with signature tracking and reminders",
      },
      {
        src: "/images/projects/multi-service-integration-platform/03-form-templates.webp",
        alt: "Form template library with categories, field counts and usage counts",
        caption: "Onboarding form template library",
      },
      {
        src: "/images/projects/multi-service-integration-platform/04-subscription-plans.webp",
        alt: "Subscription plans page with Basic, Business, Pro and Enterprise tiers and a monthly or annual billing toggle",
        caption: "Subscription plans with monthly and annual billing",
      },
      {
        src: "/images/projects/multi-service-integration-platform/05-stripe-checkout.webp",
        alt: "Upgrade checkout with saved cards, order summary, AutoPay toggle and pay button",
        caption: "Stripe upgrade checkout with saved cards and AutoPay",
      },
      {
        src: "/images/projects/multi-service-integration-platform/06-team-members.webp",
        alt: "Settings page showing the team member table and seat usage for the current plan",
        caption: "Team members with plan-based seat limits",
      },
    ],
    outcomes: [],
  },
  {
    slug: "ai-powered-legal-research-platform",
    title: "AI-Powered Legal Research Platform",
    status: "In Development",
    year: "",
    role: "Full Stack Developer",
    description:
      "A legal research platform concept focused on searchable case information, AI-assisted headnotes, and subscription-based access.",
    tech: ["Next.js", "PostgreSQL", "AI APIs"],
    cover: "/images/projects/legal-research-cover.svg",
    links: { live: "", repo: "" },
    overview:
      "A legal research platform currently in planning and development. The goal is to make case information searchable and to use AI models to help produce concise headnotes, with access offered on a subscription basis.",
    problem:
      "Finding relevant case information is slow when documents are long and summaries are inconsistent or missing.",
    solution:
      "The planned approach combines structured case records in PostgreSQL with full-text search, and uses AI APIs to draft headnotes that can be reviewed. Subscription plans control access to the research tools.",
    responsibilities: [
      "Planning the data model for cases and related metadata.",
      "Designing the search and headnote generation workflow.",
      "Building the application foundation in Next.js.",
    ],
    features: [
      "Searchable case information (planned)",
      "AI-assisted headnotes (planned)",
      "Subscription-based access (planned)",
    ],
    challenges: [
      {
        title: "Reliability of generated summaries",
        text: "Legal summaries must be accurate. The design treats AI output as a draft that can be reviewed, not as an authoritative source.",
      },
    ],
    architecture: [
      {
        title: "PostgreSQL for structured legal data",
        text: "Cases, courts, dates and citations are relational by nature, and PostgreSQL's full-text search is a practical starting point before considering a dedicated search engine.",
      },
    ],
    screenshots: [],
    outcomes: [],
  },
  {
    slug: "payment-method-management-system",
    title: "Payment Method Management System",
    status: "",
    year: "",
    role: "Full Stack Developer",
    description:
      "A payment information management module built around controlled access, encrypted application fields, and administrative workflows.",
    tech: ["Laravel", "PHP", "MySQL"],
    cover: "/images/projects/payment-management-cover.svg",
    links: { live: "", repo: "" },
    overview:
      "A module inside a Laravel application for recording and managing payment method information. Sensitive fields are encrypted at the application level and access is limited by role.",
    problem:
      "Payment-related records were needed inside an internal system, which meant they had to be protected from casual access and only visible to the people responsible for them.",
    solution:
      "A dedicated module with encrypted model attributes, role-based access controls on every view and action, and administrative screens for adding, updating and reviewing records.",
    responsibilities: [
      "Built the create, update and view workflows.",
      "Applied application-level encryption to sensitive fields.",
      "Implemented role-based access for viewing and managing records.",
      "Built the administrative management screens.",
    ],
    features: [
      "Add and update payment method records",
      "View and manage stored information",
      "Encrypted application fields",
      "Role-based access controls",
      "Administrative management",
    ],
    challenges: [
      {
        title: "Encrypted fields and usability",
        text: "Encrypted columns cannot be searched or sorted directly in the database, so the interface was designed around non-sensitive identifiers for listing and lookup.",
      },
    ],
    architecture: [
      {
        title: "Laravel encrypted casts",
        text: "Sensitive attributes use Laravel's encryption so values are stored encrypted and only decrypted for authorised requests.",
      },
      {
        title: "Policies for every action",
        text: "Viewing, creating, updating and deleting records are each governed by policies tied to user roles.",
      },
    ],
    note: "This module uses application-level encryption and access controls. It is not presented as PCI DSS certified or as a payment-provider vault.",
    screenshots: [
      { src: "/images/projects/payment-management-screen-1.svg", alt: "Placeholder for the payment records management view", caption: "Records management (placeholder)" },
    ],
    outcomes: [],
  },
];

/**
 * All images for a project, in display order: `cover` (if set and not
 * already listed) followed by `screenshots`.
 */
export function getGallery(project) {
  const shots = (project.screenshots || []).filter((s) => s && s.src);
  if (project.cover && !shots.some((s) => s.src === project.cover)) {
    return [{ src: project.cover, alt: `${project.title} preview`, caption: "" }, ...shots];
  }
  return shots;
}

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}
