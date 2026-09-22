# Hiba Salim MBA Portfolio — Living Spec

## What it does

Single-page MBA portfolio for Hiba Salim, covering about, MBA pillars, selected projects, experience, skills, resume CTA, and contact. The visual voice is playful editorial and recruiter-ready: butter yellow, coral, pink, blue, and lime accents; bold bordered cards; Playfair Display headlines; DM Sans body copy; conversational microcopy; and a persistent light/dark theme toggle. The tone draws inspiration from high-energy personal-brand storytelling without copying the reference brand or its text.

## Project data model

Projects are stored locally in the browser under `hiba-portfolio-projects-v2`. Core fields include identity, summary, role, tools, category, image, links, status, and featured state. Evidence-rich projects can also define KPI cards, analysis findings, frameworks, recommendations, chart data, comparison tables, process comparisons, report downloads, and in-progress notes.

## Key flows

- Visitors browse projects, filter by category, and open a project card to read a rich case-study reader with KPIs, native charts, process comparisons, report downloads, and dashboard links where available.
- Admin Studio is an instant local unlock from the header or hero. It supports add, edit, delete, and reset-to-default project records.
- Project changes persist in localStorage and show Sonner feedback.
- Contact form is a local feedback interaction only; no email integration is configured.
- Theme toggle persists the selected light/dark preference in localStorage.
- Evidence-backed default projects include India Tourism DSS, Digital Campus Logistics (SPMS), Go Zero retail strategy, Amazon fleet optimization, CIAN Agro financial analysis, and a Bayer live project marked in progress.
- Bayer's official logo and verified outcomes remain pending user-provided assets/details; the current card uses a text mark and explicitly avoids claiming outcomes.

## Auth and roles

There is no authentication. Admin Studio is intentionally a lightweight demo/editor mode for this portfolio prototype.
