# Hiba Salim MBA Portfolio — Living Spec

## What it does

Single-page MBA portfolio for Hiba Salim, covering about, MBA pillars, selected projects, experience, skills, resume CTA, business quotes, and contact. The visual voice is colorful, optimistic, bubbly editorial, and recruiter-ready. The original soft palette remains documented in repository history; the active brighter treatment uses Airplane View `#69B9FF`, Peony Bundle `#FF9FB5`, bright Tropical Rain `#18C6AA`, Autumn Lavender `#BDB2FF`, Limeade `#DFF04A`, Tomato Jam `#FF6749`, Pure Sun `#FFD83D`, Monet Ponds `#B5C94A`, and Bubble Gum `#FF75B5`, grounded by cream and ink. Dark green no longer appears as a large section surface.

## Project data model

Projects are stored locally in the browser under `hiba-portfolio-projects-v2`. Core fields include identity, summary, role, tools, category, image, links, status, and featured state. Evidence-rich projects can also define KPI cards, analysis findings, frameworks, recommendations, chart data, comparison tables, process comparisons, report downloads, and in-progress notes.

## Key flows

- Visitors browse projects, filter by category, and open a project card to read a rich case-study reader with KPIs, native charts, process comparisons, report downloads, and dashboard links where available.
- Admin Studio is an instant local unlock from the header or hero. It supports add, edit, delete, and reset-to-default project records.
- Project changes persist in localStorage and show Sonner feedback.
- Contact form is a local feedback interaction only; no email integration is configured.
- The site is intentionally light-only so the supplied nine-color palette remains consistent.
- Three original business-belief quotes are drafted from Hiba's existing story and presented as colorful editorial cards for later wording review.
- Public positioning uses “Product Designer & Product Manager” and product-design language throughout; footwear-collection positioning has been removed.
- The hero uses Hiba's uploaded `llolo.jpeg` portrait with a bubbly yellow, teal, blue, and pink frame.
- Evidence-backed default projects include India Tourism DSS, Digital Campus Logistics (SPMS), Go Zero retail strategy, Amazon fleet optimization, CIAN Agro financial analysis, and a Bayer live project marked in progress.
- Bayer's official logo and verified outcomes remain pending user-provided assets/details; the current card uses a text mark and explicitly avoids claiming outcomes.

## Auth and roles

There is no authentication. Admin Studio is intentionally a lightweight demo/editor mode for this portfolio prototype.
