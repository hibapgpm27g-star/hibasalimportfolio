# Hiba Salim MBA Portfolio — Living Spec

## What it does

Single-page MBA portfolio for Hiba Salim, covering about, MBA pillars, selected projects, experience, skills, resume CTA, and contact. The visual system uses warm editorial neutrals, clay-orange accents, Outfit headings, IBM Plex Sans body copy, and a light/dark theme toggle.

## Project data model

Projects are stored locally in the browser under `hiba-portfolio-projects`. Each project has: `id`, `title`, `summary`, `role`, `tools`, `year`, `category`, `image`, `liveLink`, `caseStudyLink`, `details`, `impactMetrics`, `keyTakeaway`, and `isFeatured`.

## Key flows

- Visitors browse projects, filter by category, and open a project card to read its case-study reader.
- Admin Studio is an instant local unlock from the header or hero. It supports add, edit, delete, and reset-to-default project records.
- Project changes persist in localStorage and show Sonner feedback.
- Contact form is a local feedback interaction only; no email integration is configured.
- Theme toggle persists the selected light/dark preference in localStorage.

## Auth and roles

There is no authentication. Admin Studio is intentionally a lightweight demo/editor mode for this portfolio prototype.
