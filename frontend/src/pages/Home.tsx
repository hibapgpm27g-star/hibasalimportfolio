import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { toast } from "sonner";
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  Briefcase,
  ChevronRight,
  Download,
  ExternalLink,
  Mail,
  MapPin,
  Menu,
  Moon,
  Pencil,
  Plus,
  Sparkles,
  Sun,
  Target,
  TrendingUp,
  Truck,
  Users,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";
import { Toaster } from "@/components/ui/sonner";
import ProjectCard from "@/components/ProjectCard";
import ProjectEditor from "@/components/ProjectEditor";
import { categories, defaultProjects, loadProjects, persistProjects, type Project, type ProjectCategory, type ProjectInput } from "@/lib/projects";

const heroImage = "https://images.unsplash.com/photo-1609436132311-e4b0c9370469?auto=format&fit=crop&w=900&q=85";

const pillars = [
  { name: "Marketing & brand strategy", level: 88, icon: Target, color: "bg-brand" },
  { name: "Structured consulting", level: 85, icon: Briefcase, color: "bg-emerald" },
  { name: "Business strategy", level: 83, icon: TrendingUp, color: "bg-amber" },
  { name: "Analytics & insights", level: 80, icon: BarChart3, color: "bg-navy" },
  { name: "Supply chain & operations", level: 90, icon: Truck, color: "bg-brand" },
  { name: "Leadership & product", level: 87, icon: Users, color: "bg-emerald" },
];

const experience = [
  { period: "2024 — 2025", role: "PGPM MBA Candidate", place: "Great Lakes Institute of Management", detail: "Marketing, business strategy, analytics, and live case work." },
  { period: "2021 — 2024", role: "Footwear Designer & Product Manager", place: "Retail & Apparel · Footwear Division", detail: "Owned the lifecycle from concept sketch to manufacturing, vendor negotiation, and retail launch." },
  { period: "2017 — 2021", role: "Bachelor of Design", place: "FDDI Chennai", detail: "Footwear design, production technology, ergonomics, and prototype testing." },
];

const skills = [
  { group: "Marketing", items: "Brand strategy · Market research · Consumer insights · GTM" },
  { group: "Analytics & data", items: "Excel · Power BI · SQL · Tableau · Python" },
  { group: "Operations & product", items: "Design thinking · Procurement · Sourcing · Merchandising" },
];

export default function Home() {
  const [projects, setProjects] = useState<Project[]>(() => loadProjects());
  const [activeCategory, setActiveCategory] = useState<"All" | ProjectCategory>("All");
  const [adminMode, setAdminMode] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => window.localStorage.getItem("hiba-portfolio-theme") === "dark");

  useEffect(() => {
    persistProjects(projects);
  }, [projects]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    window.localStorage.setItem("hiba-portfolio-theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const filteredProjects = useMemo(
    () => activeCategory === "All" ? projects : projects.filter((project) => project.category === activeCategory),
    [activeCategory, projects],
  );
  const openNewProject = () => {
    setEditingProject(null);
    setEditorOpen(true);
  };

  const openEditProject = (project: Project) => {
    setEditingProject(project);
    setEditorOpen(true);
  };

  const saveProject = (draft: ProjectInput) => {
    if (editingProject) {
      setProjects((current) => current.map((project) => project.id === editingProject.id ? { ...draft, id: editingProject.id } : project));
      toast.success("Project updated", { description: `${draft.title} is now live in your portfolio.` });
    } else {
      const id = typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : `project-${Date.now()}`;
      setProjects((current) => [{ ...draft, id }, ...current]);
      toast.success("Project added", { description: `${draft.title} is now part of your work.` });
    }
    setEditorOpen(false);
  };

  const deleteProject = (project: Project) => {
    if (!window.confirm(`Remove “${project.title}” from the portfolio?`)) return;
    setProjects((current) => current.filter((item) => item.id !== project.id));
    toast.success("Project removed", { description: "You can restore the original set from Admin Studio." });
  };

  const resetProjects = () => {
    if (!window.confirm("Reset all projects to the initial portfolio set?")) return;
    setProjects(defaultProjects);
    toast.success("Projects reset", { description: "The original project set is back." });
  };

  const toggleAdmin = () => {
    setAdminMode((current) => {
      const next = !current;
      toast(next ? "Admin Studio unlocked" : "Admin Studio closed", { description: next ? "Edit the project grid directly." : "Visitors will see the public portfolio view." });
      return next;
    });
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-background text-foreground" data-testid="portfolio-app">
      <Toaster position="bottom-right" richColors />
      <header className="sticky top-4 z-40 mx-4 rounded-full border border-border/80 bg-card/85 shadow-sm backdrop-blur-xl sm:mx-8 lg:mx-auto lg:max-w-[calc(100%-6rem)]" data-testid="portfolio-header">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-3 sm:px-6" data-testid="portfolio-navigation">
          <a href="#top" className="flex items-center gap-2 text-sm font-semibold tracking-tight text-ink" data-testid="nav-brand-link">
            <span className="grid size-8 place-items-center rounded-full bg-ink font-heading text-xs font-bold text-background" data-testid="nav-brand-mark">HS</span>
            <span data-testid="nav-brand-name">Hiba Salim</span>
          </a>
          <nav className={`${mobileMenuOpen ? "absolute left-0 right-0 top-[calc(100%+0.75rem)] flex flex-col rounded-3xl border border-border bg-card p-4 shadow-xl" : "hidden"} gap-1 lg:static lg:flex lg:flex-row lg:items-center lg:gap-1 lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none`} aria-label="Main navigation" data-testid="main-navigation-links">
            {[["About", "about"], ["Pillars", "pillars"], ["Projects", "projects"], ["Experience", "experience"], ["Contact", "contact"]].map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMobileMenuOpen(false)} className="rounded-full px-3 py-2 text-xs font-medium text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-ink" data-testid={`nav-${id}-link`}>{label}</a>
            ))}
          </nav>
          <div className="flex items-center gap-1" data-testid="header-actions">
            <button type="button" onClick={() => setDarkMode((current) => !current)} className="grid size-8 place-items-center rounded-full text-muted-foreground transition-colors duration-200 hover:bg-muted hover:text-ink" aria-label="Toggle color theme" data-testid="theme-toggle-button">
              {darkMode ? <Sun className="size-4" aria-hidden="true" /> : <Moon className="size-4" aria-hidden="true" />}
            </button>
            <button type="button" onClick={toggleAdmin} className={`hidden rounded-full px-4 py-2 text-xs font-semibold transition-colors duration-200 sm:block ${adminMode ? "bg-brand text-white" : "bg-muted text-ink hover:bg-brand/15"}`} data-testid="admin-mode-toggle-button">
              {adminMode ? "Admin on" : "Admin Studio"}
            </button>
            <button type="button" onClick={() => setMobileMenuOpen((current) => !current)} className="grid size-8 place-items-center rounded-full text-muted-foreground hover:bg-muted lg:hidden" aria-label={mobileMenuOpen ? "Close menu" : "Open menu"} data-testid="mobile-menu-toggle-button">
              {mobileMenuOpen ? <X className="size-4" aria-hidden="true" /> : <Menu className="size-4" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      <main id="top" data-testid="portfolio-main">
        <section className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-20 lg:px-12 lg:pb-28 lg:pt-28" data-testid="hero-section">
          <div className="absolute -left-24 top-24 -z-0 size-72 rounded-full bg-brand/10 blur-3xl" aria-hidden="true" />
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10" data-testid="hero-copy">
            <div className="mb-7 flex items-center gap-3" data-testid="hero-badge-row">
              <span className="size-2 rounded-full bg-brand" data-testid="hero-status-dot" />
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-brand" data-testid="hero-badge">PGPM Candidate @ Great Lakes · Ex-Footwear PM & Designer</p>
            </div>
            <h1 className="max-w-4xl font-heading text-5xl font-semibold leading-[0.98] tracking-[-0.05em] text-ink sm:text-6xl lg:text-[5.8rem]" data-testid="hero-headline">Designer turned Product Manager, shaping <span className="text-brand" data-testid="hero-headline-accent">business strategy</span> & marketing.</h1>
            <p className="mt-8 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg" data-testid="hero-description">Three years building physical collections from concept to retail — now layering analytics, consulting frameworks, and GTM strategy to solve complex business problems.</p>
            <div className="mt-9 flex flex-wrap items-center gap-3" data-testid="hero-actions">
              <a href="#projects" className="inline-flex h-10 items-center gap-2 rounded-full bg-brand px-5 text-sm font-semibold text-white transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-brand-hover" data-testid="hero-explore-projects-button">Explore projects <ArrowDownRight className="size-4" aria-hidden="true" /></a>
              <button type="button" onClick={toggleAdmin} className="inline-flex h-10 items-center gap-2 rounded-full border border-border bg-card px-5 text-sm font-semibold text-ink transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-muted" data-testid="hero-admin-button">{adminMode ? "Close Admin Studio" : "Launch Admin Studio"} <Pencil className="size-3.5" aria-hidden="true" /></button>
            </div>
            <div className="mt-14 grid max-w-xl grid-cols-3 border-y border-border py-5" data-testid="hero-statistics">
              {[{ value: "3 Yrs", label: "Product & sourcing" }, { value: "PGPM", label: "Great Lakes Gurgaon" }, { value: "8+", label: "Strategy cases" }].map((stat) => <div key={stat.label} className="border-r border-border px-3 first:pl-0 last:border-0" data-testid={`hero-stat-${stat.label.toLowerCase().replaceAll(" ", "-")}`}><strong className="block font-heading text-2xl font-semibold text-ink" data-testid={`hero-stat-value-${stat.value}`}>{stat.value}</strong><span className="mt-1 block text-[11px] leading-4 text-muted-foreground" data-testid={`hero-stat-label-${stat.label.toLowerCase().replaceAll(" ", "-")}`}>{stat.label}</span></div>)}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.12 }} className="relative z-10 lg:pb-8" data-testid="hero-portrait-panel">
            <div className="relative ml-auto max-w-md" data-testid="hero-portrait-frame">
              <div className="absolute -right-5 -top-5 size-24 rounded-full border border-brand/30" aria-hidden="true" />
              <div className="aspect-[0.82/1] overflow-hidden rounded-[2rem] bg-muted shadow-[20px_20px_0_var(--surface-subtle)]" data-testid="hero-portrait-image-wrap"><img src={heroImage} alt="Hiba Salim, MBA candidate and product manager" className="h-full w-full object-cover grayscale-[0.12]" data-testid="hero-portrait-image" /></div>
              <div className="absolute -bottom-8 -left-8 w-52 rounded-2xl border border-border bg-card/90 p-5 shadow-xl backdrop-blur" data-testid="hero-note-card"><Sparkles className="size-5 text-brand" aria-hidden="true" /><p className="mt-3 font-heading text-lg leading-tight text-ink" data-testid="hero-note-text">From sketchbook to strategy deck.</p><p className="mt-2 text-xs leading-5 text-muted-foreground" data-testid="hero-note-supporting-text">A builder's view of business.</p></div>
            </div>
          </motion.div>
        </section>

        <section id="about" className="border-y border-border bg-surface-subtle" data-testid="about-section">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24 lg:px-12 lg:py-28">
            <div data-testid="about-intro"><p className="eyebrow" data-testid="about-eyebrow">01 / About me</p><h2 className="mt-5 max-w-sm font-heading text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl" data-testid="about-heading">A maker's instinct, a strategist's toolkit.</h2></div>
            <div data-testid="about-content"><p className="max-w-3xl text-xl leading-9 text-ink sm:text-2xl" data-testid="about-summary">I started in design — building footwear collections from concept to retail — and grew into product management, owning the full lifecycle across development, sourcing, and merchandising.</p><p className="mt-7 max-w-2xl text-base leading-7 text-muted-foreground" data-testid="about-detail">That hands-on operator experience is what I bring into my MBA: a feel for how products, people, and supply chains actually move. I'm now layering on marketing, consulting, and analytics to move from building products to shaping business strategy.</p><div className="mt-10 flex flex-wrap gap-3" data-testid="about-tags">{["Gurgaon, India", "Product thinking", "Customer curiosity"].map((tag) => <span key={tag} className="rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-muted-foreground" data-testid={`about-tag-${tag.toLowerCase().replaceAll(", ", "-").replaceAll(" ", "-")}`}>{tag}</span>)}</div></div>
          </div>
        </section>

        <section id="pillars" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28" data-testid="pillars-section">
          <div className="flex flex-col justify-between gap-6 border-b border-border pb-8 sm:flex-row sm:items-end" data-testid="pillars-heading-row"><div><p className="eyebrow" data-testid="pillars-eyebrow">02 / MBA journey</p><h2 className="mt-5 max-w-xl font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl" data-testid="pillars-heading">Building expertise across the core MBA pillars.</h2></div><p className="max-w-xs text-sm leading-6 text-muted-foreground" data-testid="pillars-description">A live snapshot of the frameworks, tools, and business contexts I'm actively developing.</p></div>
          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-3" data-testid="pillars-grid">{pillars.map(({ name, level, icon: Icon, color }) => <div key={name} className="bg-card p-6 transition-colors duration-200 hover:bg-surface-subtle sm:p-7" data-testid={`pillar-card-${name.toLowerCase().replaceAll(" ", "-")}`}><div className="flex items-center justify-between" data-testid={`pillar-card-header-${name.toLowerCase().replaceAll(" ", "-")}`}><span className={`grid size-9 place-items-center rounded-xl ${color} text-white`} data-testid={`pillar-icon-${name.toLowerCase().replaceAll(" ", "-")}`}><Icon className="size-4" aria-hidden="true" /></span><span className="font-mono text-sm text-muted-foreground" data-testid={`pillar-level-${name.toLowerCase().replaceAll(" ", "-")}`}>{level}%</span></div><h3 className="mt-7 font-heading text-lg font-semibold capitalize text-ink" data-testid={`pillar-name-${name.toLowerCase().replaceAll(" ", "-")}`}>{name}</h3><div className="mt-4 h-1 overflow-hidden rounded-full bg-muted" data-testid={`pillar-progress-${name.toLowerCase().replaceAll(" ", "-")}`}><div className={`h-full rounded-full ${color}`} style={{ width: `${level}%` }} /></div></div>)}</div>
        </section>

        <section id="projects" className="bg-ink text-background" data-testid="projects-section">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between" data-testid="projects-header"><div><p className="eyebrow text-brand-light" data-testid="projects-eyebrow">03 / Selected work</p><h2 className="mt-5 max-w-2xl font-heading text-4xl font-semibold tracking-tight text-background sm:text-5xl" data-testid="projects-heading">Work that moves from question to <span className="text-brand-light" data-testid="projects-heading-accent">point of view.</span></h2><p className="mt-5 max-w-xl text-base leading-7 text-background/65" data-testid="projects-description">Strategy, analytics, operations, and marketing studies — built to make a decision clearer.</p></div><div className="flex flex-wrap gap-2" data-testid="project-filter-list"><button type="button" onClick={() => setActiveCategory("All")} className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors duration-200 ${activeCategory === "All" ? "bg-brand text-white" : "bg-white/10 text-background/70 hover:bg-white/15"}`} data-testid="project-filter-all">All <span data-testid="project-count-all">{projects.length}</span></button>{categories.map((category) => <button type="button" key={category} onClick={() => setActiveCategory(category)} className={`rounded-full px-4 py-2 text-xs font-semibold transition-colors duration-200 ${activeCategory === category ? "bg-brand text-white" : "bg-white/10 text-background/70 hover:bg-white/15"}`} data-testid={`project-filter-${category.toLowerCase()}`}>{category}</button>)}</div></div>
            {adminMode && <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-brand/30 bg-brand/10 p-4" data-testid="admin-mode-toolbar"><div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-light" data-testid="admin-toolbar-label">Admin Studio active</p><p className="mt-1 text-sm text-background/70" data-testid="admin-toolbar-description">Changes save in this browser automatically.</p></div><div className="flex flex-wrap gap-2" data-testid="admin-toolbar-actions"><Button type="button" size="sm" onClick={openNewProject} data-testid="admin-add-project-button"><Plus className="size-4" aria-hidden="true" /> Add project</Button><Button type="button" size="sm" variant="outline" onClick={resetProjects} className="border-white/20 bg-transparent text-background hover:bg-white/10 hover:text-background" data-testid="admin-reset-projects-button">Reset defaults</Button></div></div>}
            <div className="mt-12 grid gap-6 lg:grid-cols-2" data-testid="projects-grid"><AnimatePresence mode="popLayout">{filteredProjects.map((project) => <ProjectCard key={project.id} project={project} isAdmin={adminMode} onOpen={setSelectedProject} onEdit={openEditProject} onDelete={deleteProject} />)}</AnimatePresence></div>
            {filteredProjects.length === 0 && <div className="rounded-2xl border border-dashed border-white/20 p-10 text-center" data-testid="projects-empty-state"><p className="font-heading text-xl text-background" data-testid="projects-empty-title">No projects in this category yet.</p><p className="mt-2 text-sm text-background/60" data-testid="projects-empty-description">Switch filters or open Admin Studio to add one.</p></div>}
            <div className="mt-12 flex items-center justify-between border-t border-white/15 pt-6" data-testid="projects-footer"><p className="text-sm text-background/50" data-testid="projects-footer-note">{projects.length} stories in the working portfolio</p><a href="#contact" className="inline-flex items-center gap-2 text-sm font-semibold text-brand-light hover:text-white" data-testid="projects-contact-link">Have a project in mind? <ArrowUpRight className="size-4" aria-hidden="true" /></a></div>
          </div>
        </section>

        <section id="experience" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28" data-testid="experience-section"><div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]"><div><p className="eyebrow" data-testid="experience-eyebrow">04 / Experience</p><h2 className="mt-5 max-w-sm font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl" data-testid="experience-heading">Three years building products end-to-end.</h2></div><div className="divide-y divide-border border-y border-border" data-testid="experience-timeline">{experience.map((entry) => <article key={entry.period} className="grid gap-4 py-7 sm:grid-cols-[0.45fr_1fr] sm:gap-10" data-testid={`experience-entry-${entry.period.replaceAll(" ", "-")}`}><p className="font-mono text-xs uppercase tracking-[0.15em] text-brand" data-testid={`experience-period-${entry.period.replaceAll(" ", "-")}`}>{entry.period}</p><div><h3 className="font-heading text-xl font-semibold text-ink" data-testid={`experience-role-${entry.period.replaceAll(" ", "-")}`}>{entry.role}</h3><p className="mt-1 text-sm font-medium text-muted-foreground" data-testid={`experience-place-${entry.period.replaceAll(" ", "-")}`}>{entry.place}</p><p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground" data-testid={`experience-detail-${entry.period.replaceAll(" ", "-")}`}>{entry.detail}</p></div></article>)}</div></div></section>

        <section id="skills" className="border-y border-border bg-surface-subtle" data-testid="skills-section"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-24"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="eyebrow" data-testid="skills-eyebrow">05 / Toolkit</p><h2 className="mt-5 font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl" data-testid="skills-heading">A toolkit built across design, product & business.</h2></div><span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground" data-testid="skills-caption">Always learning / always applying</span></div><div className="mt-12 grid gap-5 md:grid-cols-3" data-testid="skills-grid">{skills.map((skill, index) => <div key={skill.group} className="rounded-2xl border border-border bg-card p-6" data-testid={`skill-card-${index + 1}`}><span className="font-mono text-xs text-brand" data-testid={`skill-index-${index + 1}`}>0{index + 1}</span><h3 className="mt-10 font-heading text-2xl font-semibold text-ink" data-testid={`skill-group-${index + 1}`}>{skill.group}</h3><p className="mt-4 text-sm leading-6 text-muted-foreground" data-testid={`skill-items-${index + 1}`}>{skill.items}</p></div>)}</div></div></section>

        <section id="resume" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28" data-testid="resume-section"><div className="relative overflow-hidden rounded-3xl bg-brand p-8 text-white sm:p-12 lg:p-16"><div className="absolute -right-10 -top-20 size-72 rounded-full border-[1px] border-white/20" aria-hidden="true" /><div className="absolute -right-2 -top-12 size-48 rounded-full border-[1px] border-white/20" aria-hidden="true" /><div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/70" data-testid="resume-eyebrow">06 / Resume</p><h2 className="mt-5 max-w-xl font-heading text-4xl font-semibold leading-tight tracking-tight sm:text-5xl" data-testid="resume-heading">One page. Every detail a recruiter needs.</h2><p className="mt-5 max-w-lg text-base leading-7 text-white/75" data-testid="resume-description">PGPM candidate · Marketing · Consulting · Product Strategy · Gurgaon, India</p></div><a href="mailto:hiba.salim@email.com?subject=Resume%20request" className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-brand transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-surface-subtle" data-testid="resume-download-button"><Download className="size-4" aria-hidden="true" /> Request resume</a></div></div></section>

        <section id="contact" className="bg-ink text-background" data-testid="contact-section"><div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24 lg:px-12 lg:py-28"><div><p className="eyebrow text-brand-light" data-testid="contact-eyebrow">07 / Contact</p><h2 className="mt-5 max-w-md font-heading text-4xl font-semibold tracking-tight sm:text-5xl" data-testid="contact-heading">Let's talk about what's next.</h2><p className="mt-6 max-w-sm text-base leading-7 text-background/60" data-testid="contact-description">Recruiting for an MBA role, or just want to connect? Drop a note and I'll get back within a day.</p><div className="mt-10 space-y-4" data-testid="contact-links"><a href="mailto:hiba.salim@email.com" className="flex items-center gap-3 text-sm text-background/75 hover:text-brand-light" data-testid="contact-email-link"><Mail className="size-4 text-brand-light" aria-hidden="true" /> hiba.salim@email.com</a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-background/75 hover:text-brand-light" data-testid="contact-linkedin-link"><ExternalLink className="size-4 text-brand-light" aria-hidden="true" /> linkedin.com/in/hibasalim</a><span className="flex items-center gap-3 text-sm text-background/75" data-testid="contact-location"><MapPin className="size-4 text-brand-light" aria-hidden="true" /> Gurgaon, India</span></div></div><form onSubmit={(event) => { event.preventDefault(); toast.success("Message ready", { description: "Thanks — Hiba will get back to you at the email you shared." }); }} className="rounded-2xl border border-white/15 bg-white/5 p-6 sm:p-8" data-testid="contact-form"><div className="grid gap-5 sm:grid-cols-2"><label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-background/55" data-testid="contact-name-field"><span data-testid="contact-name-label">Name</span><input required name="name" className="h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-sm text-background outline-none placeholder:text-background/30 focus:border-brand-light focus:ring-3 focus:ring-brand-light/20" placeholder="Your name" data-testid="contact-name-input" /></label><label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-background/55" data-testid="contact-email-field"><span data-testid="contact-email-label">Email</span><input required type="email" name="email" className="h-11 rounded-lg border border-white/15 bg-white/5 px-3 text-sm text-background outline-none placeholder:text-background/30 focus:border-brand-light focus:ring-3 focus:ring-brand-light/20" placeholder="you@company.com" data-testid="contact-email-input" /></label></div><label className="mt-5 grid gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-background/55" data-testid="contact-message-field"><span data-testid="contact-message-label">Message</span><textarea required name="message" className="min-h-32 resize-y rounded-lg border border-white/15 bg-white/5 px-3 py-3 text-sm text-background outline-none placeholder:text-background/30 focus:border-brand-light focus:ring-3 focus:ring-brand-light/20" placeholder="Tell me a little about what you're working on..." data-testid="contact-message-input" /></label><Button type="submit" className="mt-6 w-full bg-brand-light text-ink hover:bg-white" data-testid="contact-submit-button">Send message <ArrowUpRight className="size-4" aria-hidden="true" /></Button></form></div><footer className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-white/10 px-5 py-6 text-xs text-background/40 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12" data-testid="portfolio-footer"><span data-testid="footer-copyright">© 2025 Hiba Salim</span><a href="#top" className="inline-flex items-center gap-2 hover:text-brand-light" data-testid="footer-back-to-top-link">Back to top <ChevronRight className="size-3 -rotate-90" aria-hidden="true" /></a></footer></section>
      </main>

      <Dialog open={Boolean(selectedProject)} onOpenChange={(open) => { if (!open) setSelectedProject(null); }}>
        <DialogContent showCloseButton={false} className="max-h-[88vh] max-w-2xl overflow-y-auto border-border bg-card p-0" data-testid="project-reader-dialog">
          {selectedProject && <><div className="relative aspect-[2/1] overflow-hidden" data-testid="project-reader-image-frame"><img src={selectedProject.image} alt={`${selectedProject.title} case study`} className="h-full w-full object-cover" data-testid="project-reader-image" /><div className="absolute inset-0 bg-gradient-to-t from-black/65 to-transparent" /><div className="absolute bottom-6 left-6 right-6"><Badge className="bg-brand text-white" data-testid="project-reader-category">{selectedProject.category}</Badge><h2 className="mt-3 font-heading text-3xl font-semibold text-white" data-testid="project-reader-title">{selectedProject.title}</h2></div><DialogClose render={<Button type="button" variant="ghost" size="icon-sm" className="absolute right-4 top-4 bg-black/20 text-white hover:bg-black/40 hover:text-white" data-testid="project-reader-close-button" />}><X aria-hidden="true" /><span className="sr-only">Close case study</span></DialogClose></div><div className="space-y-7 p-6 sm:p-8" data-testid="project-reader-content"><div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-5"><p className="text-sm text-muted-foreground" data-testid="project-reader-role">{selectedProject.role} · {selectedProject.year}</p><div className="flex gap-2">{selectedProject.liveLink && <a href={selectedProject.liveLink} target={selectedProject.liveLink.startsWith("#") ? undefined : "_blank"} rel="noreferrer" className="inline-flex h-8 items-center gap-1.5 rounded-full border border-border px-3 text-xs font-semibold text-ink hover:bg-muted" data-testid="project-reader-live-link">Live link <ExternalLink className="size-3" aria-hidden="true" /></a>}{selectedProject.caseStudyLink && <a href={selectedProject.caseStudyLink} target={selectedProject.caseStudyLink.startsWith("#") ? undefined : "_blank"} rel="noreferrer" className="inline-flex h-8 items-center gap-1.5 rounded-full bg-brand px-3 text-xs font-semibold text-white hover:bg-brand-hover" data-testid="project-reader-case-study-link">Case study <ArrowUpRight className="size-3" aria-hidden="true" /></a>}</div></div><div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand" data-testid="project-reader-summary-label">The brief</p><p className="mt-3 text-lg leading-8 text-ink" data-testid="project-reader-summary">{selectedProject.details || selectedProject.summary}</p></div><div className="grid gap-4 sm:grid-cols-3" data-testid="project-reader-metrics">{selectedProject.impactMetrics.map((metric, index) => <div key={metric} className="rounded-xl bg-muted p-4" data-testid={`project-reader-metric-${index + 1}`}><span className="font-mono text-lg text-brand" data-testid={`project-reader-metric-index-${index + 1}`}>0{index + 1}</span><p className="mt-3 text-sm font-medium leading-5 text-ink" data-testid={`project-reader-metric-text-${index + 1}`}>{metric}</p></div>)}</div><div className="border-l-2 border-brand pl-5" data-testid="project-reader-takeaway"><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand" data-testid="project-reader-takeaway-label">Key takeaway</p><p className="mt-2 font-heading text-xl leading-7 text-ink" data-testid="project-reader-takeaway-text">{selectedProject.keyTakeaway || "A clear point of view creates momentum."}</p></div><div className="flex flex-wrap gap-2" data-testid="project-reader-tools">{selectedProject.tools.map((tool) => <Badge key={tool} variant="outline" data-testid={`project-reader-tool-${tool.toLowerCase().replaceAll(" ", "-")}`}>{tool}</Badge>)}</div></div></>}
        </DialogContent>
      </Dialog>
      <ProjectEditor open={editorOpen} project={editingProject} onOpenChange={setEditorOpen} onSave={saveProject} />
    </div>
  );
}
