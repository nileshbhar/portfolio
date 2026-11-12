# Nilesh Bhardwaj · Portfolio

Personal portfolio built with Next.js 16 (App Router), JavaScript, Tailwind CSS 4, Framer Motion and Lucide icons.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # production build
npm start          # serve the production build
```

Requires Node.js 20.9 or newer.

## Before you publish: checklist

All content lives in `src/data`. Nothing below requires touching components.

1. `src/data/personal.js`
   - `email`: your real address (currently `hello@nilesh.dev` as a placeholder)
   - `socials.github` and `socials.linkedin`: your profile URLs
   - `site.url`: your final domain (or set `NEXT_PUBLIC_SITE_URL` in Vercel)
2. Resume: put your PDF at `public/resume.pdf`, then set `resume.available: true`.
   Until then the buttons read "Request CV" and open an email, so there is never a broken download link.
3. `src/data/experience.js`: add the company name and confirm the start date.
4. `src/data/projects.js`: the case-study text (overview, problem, solution, challenges, architecture) is a first draft written from your feature lists. Read it and correct anything that doesn't match exactly what you built. `outcomes` is empty on purpose: add only results you can verify.
5. Project images in `public/images/projects` are labelled wireframe placeholders. Replace them with real screenshots (see below).

## Adding project screenshots

1. Create a folder per project named after its slug and drop the images in, numbered in display order:

   ```
   public/images/projects/client-management-operations-platform/01-dashboard.png
   public/images/projects/client-management-operations-platform/02-tasks.png
   public/images/projects/client-management-operations-platform/03-chat.png
   ```

   A 16:10 ratio (1600 x 1000 or 2400 x 1500) fits the frames best. PNG, JPG or WebP all work; Next.js resizes and compresses them.

2. List them in that project's `screenshots` array in `src/data/projects.js`:

   ```js
   cover: "", // optional; leave empty to use the first screenshot as the cover
   screenshots: [
     { src: "/images/projects/client-management-operations-platform/01-dashboard.png", alt: "Project dashboard", caption: "Overview dashboard with project status" },
     { src: "/images/projects/client-management-operations-platform/02-tasks.png", alt: "Task board", caption: "Tasks and work logs" },
     { src: "/images/projects/client-management-operations-platform/03-chat.png", alt: "Team chat", caption: "Team chat and messaging" },
   ],
   ```

   `alt` is for screen readers, `caption` is shown under the image. There's no limit on how many.

Where they show up:
- Homepage project card: a carousel with arrows, dots and swipe, plus a screenshot count. Clicking the image opens a fullscreen viewer; clicking the title still opens the project page.
- Project page: the first image is the large cover, and the Screenshots section shows every image. Each opens the fullscreen viewer, which supports arrow keys, Esc, swipe and thumbnails.

Remove client names and personal data from captures before adding them.

## Contact form

The form posts to `/api/contact`, which sends through [Resend](https://resend.com) with a plain `fetch`.

- Configured: set `RESEND_API_KEY`, `CONTACT_TO_EMAIL` and optionally `CONTACT_FROM_EMAIL` (see `.env.example`).
- Not configured: the API returns `configured: false` and the form tells the visitor it wasn't sent, then offers a pre-filled email link. It never pretends to send.

Spam protection: hidden honeypot field, a minimum time-to-submit check, server-side validation and length limits, and a light per-instance rate limit.

## Adding content

- New project: copy an object in `src/data/projects.js`, give it a unique `slug`. The card, the `/projects/[slug]` page, metadata and sitemap entry are all generated from it. Leave any field empty to hide that section.
- `status: "In Development"` shows a badge and relabels features as "Planned features".
- New job: add an object to the top of `src/data/experience.js`.
- Skills: edit `src/data/skills.js`.

## Structure

```
src/
  app/            layout, home page, project pages, sitemap, robots, OG image, contact API
  components/
    layout/       Navbar, Footer
    sections/     Hero, About, Skills, Projects, Experience, Contact, ContactForm
    ui/           Button, Container, SectionHeading, ProjectCard, Reveal, ResumeButton, Icons
  data/           personal, projects, experience, skills
  lib/utils.js
public/images/projects/
```

## Deploy to Vercel

Push to GitHub, import the repo in Vercel, add `NEXT_PUBLIC_SITE_URL` (and the Resend variables if you want the form to send). No other configuration is needed.
