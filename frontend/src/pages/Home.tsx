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
  Pencil,
  Plus,
  Sparkles,
  Target,
  TrendingUp,
  Truck,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import CaseStudyDialog from "@/components/CaseStudyDialog";
import ProjectCard from "@/components/ProjectCard";
import ProjectEditor from "@/components/ProjectEditor";
import { categories, defaultProjects, loadProjects, persistProjects, type Project, type ProjectCategory, type ProjectInput } from "@/lib/projects";

const heroImage = "https://customer-assets-39nsmqrw.emergentagent.net/job_mba-portfolio-13/artifacts/0te9nx13_llolo.jpeg";

const pillars = [
  { name: "Marketing & brand strategy", level: 88, icon: Target, color: "bg-tomato-jam", surface: "bg-airplane-view" },
  { name: "Structured consulting", level: 85, icon: Briefcase, color: "bg-tropical-rain", surface: "bg-peony-bundle" },
  { name: "Business strategy", level: 83, icon: TrendingUp, color: "bg-monet-ponds", surface: "bg-autumn-lavender" },
  { name: "Analytics & insights", level: 80, icon: BarChart3, color: "bg-tropical-rain", surface: "bg-limeade" },
  { name: "Supply chain & operations", level: 90, icon: Truck, color: "bg-tomato-jam", surface: "bg-pure-sun" },
  { name: "Leadership & product", level: 87, icon: Users, color: "bg-tropical-rain", surface: "bg-bubble-gum" },
];

const experience = [
  { id: "bayer-live", period: "2026 — Present", role: "Live Industry Project — Bayer", place: "In progress · Official logo pending", detail: "Working through stakeholder management, discovery, and design-thinking-led problem framing. Scope and verified outcomes will be published as the engagement progresses." },
  { id: "pgpm", period: "2024 — 2025", role: "PGPM MBA Candidate", place: "Great Lakes Institute of Management", detail: "Marketing, business strategy, analytics, stakeholder management, and live case work." },
  { id: "product-design", period: "2021 — 2024", role: "Product Designer & Product Manager", place: "Consumer Products · Design & Development", detail: "Used design thinking and stakeholder management to own the lifecycle from concept sketch through sourcing, vendor negotiation, and retail launch." },
  { id: "bdes", period: "2017 — 2021", role: "Bachelor of Design", place: "FDDI Chennai", detail: "Product design, production technology, ergonomics, materials, and prototype testing." },
];

const skills = [
  { group: "Marketing", items: "Brand strategy · Market research · Consumer insights · GTM" },
  { group: "Analytics & data", items: "Excel · Power BI · SQL · Tableau · Python" },
  { group: "Operations & product", items: "Design thinking · Procurement · Sourcing · Merchandising" },
  { group: "Planning & finance tools", items: "Oracle Primavera P6 · TallyPrime · Excel Solver · LINGO" },
];

const skillColors = ["bg-pure-sun", "bg-autumn-lavender", "bg-airplane-view", "bg-limeade"];
const experienceColors = ["bg-peony-bundle", "bg-airplane-view", "bg-autumn-lavender", "bg-pure-sun"];

const businessQuotes = [
  { quote: "A strategy only becomes useful when someone can act on it Monday morning.", note: "On making recommendations practical", color: "bg-airplane-view" },
  { quote: "The best data story does not end with an insight. It ends with a decision.", note: "On analytics with a point", color: "bg-pure-sun" },
  { quote: "Good product design makes complexity feel obvious — in a product, a process, or a plan.", note: "On carrying a design mindset into business", color: "bg-bubble-gum" },
];

export default function Home() {
  const [projects, setProjects] = useState<Project[]>(() => loadProjects());
  const [activeCategory, setActiveCategory] = useState<"All" | ProjectCategory>("All");
  const [adminMode, setAdminMode] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    persistProjects(projects);
  }, [projects]);

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
      <div className="bg-pop-yellow px-4 py-2 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-[#25151f]" data-testid="portfolio-announcement">Currently: decoding tourism data, redesigning operations, and asking “but what does this mean for the business?”</div>
      <header className="sticky top-4 z-40 mx-4 rounded-full border-2 border-ink bg-card/90 shadow-[4px_4px_0_var(--ink)] backdrop-blur-xl sm:mx-8 lg:mx-auto lg:max-w-[calc(100%-6rem)]" data-testid="portfolio-header">
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
            <button type="button" onClick={toggleAdmin} className={`hidden rounded-full px-4 py-2 text-xs font-semibold transition-colors duration-200 sm:block ${adminMode ? "bg-brand text-white" : "bg-muted text-ink hover:bg-brand/15"}`} data-testid="admin-mode-toggle-button">
              {adminMode ? "Studio on" : "Behind the scenes"}
            </button>
            <button type="button" onClick={() => setMobileMenuOpen((current) => !current)} className="grid size-8 place-items-center rounded-full text-muted-foreground hover:bg-muted lg:hidden" aria-label={mobileMenuOpen ? "Close menu" : "Open menu"} data-testid="mobile-menu-toggle-button">
              {mobileMenuOpen ? <X className="size-4" aria-hidden="true" /> : <Menu className="size-4" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </header>

      <main id="top" data-testid="portfolio-main">
        <section className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end lg:gap-20 lg:px-12 lg:pb-28 lg:pt-28" data-testid="hero-section">
          <div className="absolute -left-28 top-24 -z-0 size-72 rounded-full bg-pure-sun/55" aria-hidden="true" />
          <div className="absolute -right-36 top-10 -z-0 size-64 rounded-full bg-autumn-lavender/70" aria-hidden="true" />
          <div className="absolute left-[45%] top-14 -z-0 size-24 rotate-12 rounded-[2rem] bg-limeade/60" aria-hidden="true" />
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="relative z-10" data-testid="hero-copy">
            <div className="mb-7 flex items-center gap-3" data-testid="hero-badge-row">
              <span className="size-2 rounded-full bg-brand" data-testid="hero-status-dot" />
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-brand" data-testid="hero-badge">Designer by training · Operator by experience · Strategist on purpose</p>
            </div>
            <h1 className="max-w-4xl font-heading text-5xl font-semibold leading-[0.96] tracking-[-0.055em] text-ink sm:text-6xl lg:text-[5.8rem]" data-testid="hero-headline">I make messy business questions feel <span className="playful-underline italic text-brand" data-testid="hero-headline-accent">surprisingly solvable.</span></h1>
            <p className="mt-8 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg" data-testid="hero-description">Hi, I'm Hiba — an MBA candidate who started in product design and somehow ended up happily inside regression models, retail margins, and last-mile routes. The through-line? I like turning complexity into a plan people can actually use.</p>
            <div className="mt-9 flex flex-wrap items-center gap-3" data-testid="hero-actions">
              <a href="#projects" className="inline-flex h-11 items-center gap-2 rounded-full border-2 border-ink bg-brand px-5 text-sm font-semibold text-white shadow-[4px_4px_0_var(--ink)] transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-0.5 hover:bg-brand-hover hover:shadow-[2px_2px_0_var(--ink)]" data-testid="hero-explore-projects-button">Show me the proof <ArrowDownRight className="size-4" aria-hidden="true" /></a>
              <button type="button" onClick={toggleAdmin} className="inline-flex h-11 items-center gap-2 rounded-full border-2 border-ink bg-pop-lime px-5 text-sm font-semibold text-[#25151f] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[4px_4px_0_var(--ink)]" data-testid="hero-admin-button">{adminMode ? "Close the studio" : "Peek behind the scenes"} <Pencil className="size-3.5" aria-hidden="true" /></button>
            </div>
            <div className="mt-14 grid max-w-xl grid-cols-3 border-y border-border py-5" data-testid="hero-statistics">
              {[{ value: "3 Yrs", label: "Building real products" }, { value: "PGPM", label: "MBA brain: loading" }, { value: "8+", label: "Cases with receipts" }].map((stat) => <div key={stat.label} className="border-r border-border px-3 first:pl-0 last:border-0" data-testid={`hero-stat-${stat.label.toLowerCase().replaceAll(" ", "-")}`}><strong className="block font-heading text-2xl font-semibold text-ink" data-testid={`hero-stat-value-${stat.value}`}>{stat.value}</strong><span className="mt-1 block text-[11px] leading-4 text-muted-foreground" data-testid={`hero-stat-label-${stat.label.toLowerCase().replaceAll(" ", "-")}`}>{stat.label}</span></div>)}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, delay: 0.12 }} className="relative z-10 lg:pb-8" data-testid="hero-portrait-panel">
            <div className="relative ml-auto max-w-md" data-testid="hero-portrait-frame">
              <div className="absolute -right-5 -top-5 size-24 rounded-full border border-brand/30" aria-hidden="true" />
              <div className="aspect-[0.82/1] rotate-2 overflow-hidden rounded-[2.25rem] border-2 border-ink bg-muted shadow-[14px_14px_0_var(--pop-pink)]" data-testid="hero-portrait-image-wrap"><img src={heroImage} alt="Hiba Salim, MBA candidate and product manager" className="h-full w-full object-cover object-top grayscale-[0.08]" data-testid="hero-portrait-image" /></div>
              <div className="sticker-float absolute -bottom-8 -left-8 w-52 rounded-2xl border-2 border-ink bg-pop-blue p-5 shadow-[5px_5px_0_var(--ink)]" data-testid="hero-note-card"><Sparkles className="size-5 text-brand" aria-hidden="true" /><p className="mt-3 font-heading text-lg leading-tight text-[#25151f]" data-testid="hero-note-text">Sketchbook → spreadsheet → strategy deck.</p><p className="mt-2 text-xs leading-5 text-[#25151f]/70" data-testid="hero-note-supporting-text">Plot twist: it all connects.</p></div>
            </div>
          </motion.div>
        </section>

        <section id="about" className="border-y-2 border-ink bg-peony-bundle" data-testid="about-section">
          <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:px-8 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24 lg:px-12 lg:py-28">
            <div data-testid="about-intro"><p className="eyebrow" data-testid="about-eyebrow">01 / The plot twist</p><h2 className="mt-5 max-w-sm font-heading text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl" data-testid="about-heading">I came for the design. I stayed for the decisions.</h2></div>
            <div data-testid="about-content"><p className="max-w-3xl text-xl leading-9 text-ink sm:text-2xl" data-testid="about-summary">Product design taught me that a good idea means very little until materials, vendors, timelines, people, and customers all agree to cooperate. (They rarely do on the first try.)</p><p className="mt-7 max-w-2xl text-base leading-7 text-[#25151f]/70" data-testid="about-detail">Nearly three years of owning products from concept to retail gave me an operator's view of business. My MBA is adding the strategy, analytics, and consulting language to explain what I already loved doing: finding the knot, untangling it, and getting everyone moving in the same direction.</p><div className="mt-10 flex flex-wrap gap-3" data-testid="about-tags">{["Gurgaon, India", "Product design brain", "Customer curious", "Spreadsheet friendly"].map((tag) => <span key={tag} className="-rotate-1 rounded-full border-2 border-ink bg-background px-4 py-2 text-xs font-semibold text-ink shadow-[2px_2px_0_var(--pure-sun)]" data-testid={`about-tag-${tag.toLowerCase().replaceAll(", ", "-").replaceAll(" ", "-")}`}>{tag}</span>)}</div></div>
          </div>
        </section>

        <section className="border-b-2 border-ink text-[#25151f]" data-testid="principles-strip">
          <div className="mx-auto grid max-w-7xl divide-y-2 divide-ink sm:grid-cols-3 sm:divide-x-2 sm:divide-y-0" data-testid="principles-grid">
            {[{ kicker: "Make it", word: "Useful", note: "A framework should earn its slide.", color: "bg-limeade" }, { kicker: "Make it", word: "Measurable", note: "If the number moved, say by how much.", color: "bg-airplane-view" }, { kicker: "Make it", word: "Human", note: "Operations still happen to real people.", color: "bg-pure-sun" }].map((item, index) => <div key={item.word} className={`p-6 sm:p-8 ${item.color}`} data-testid={`principle-${index + 1}`}><span className="font-mono text-[10px] uppercase tracking-[0.2em]" data-testid={`principle-kicker-${index + 1}`}>{item.kicker}</span><strong className="mt-2 block font-heading text-4xl italic" data-testid={`principle-word-${index + 1}`}>{item.word}.</strong><p className="mt-3 text-sm opacity-70" data-testid={`principle-note-${index + 1}`}>{item.note}</p></div>)}
          </div>
        </section>

        <section id="pillars" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28" data-testid="pillars-section">
          <div className="flex flex-col justify-between gap-6 border-b border-border pb-8 sm:flex-row sm:items-end" data-testid="pillars-heading-row"><div><p className="eyebrow" data-testid="pillars-eyebrow">02 / The toolkit gets an upgrade</p><h2 className="mt-5 max-w-xl font-heading text-3xl font-semibold tracking-tight text-ink sm:text-4xl" data-testid="pillars-heading">Good instincts are nice. Frameworks make them repeatable.</h2></div><p className="max-w-xs text-sm leading-6 text-muted-foreground" data-testid="pillars-description">The MBA tabs currently open in my brain — from brand strategy to operations research.</p></div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="pillars-grid">{pillars.map(({ name, level, icon: Icon, color, surface }) => <div key={name} className={`${surface} rounded-3xl border-2 border-ink p-6 text-[#25151f] shadow-[5px_5px_0_var(--ink)] transition-transform duration-200 hover:-translate-y-1 sm:p-7`} data-testid={`pillar-card-${name.toLowerCase().replaceAll(" ", "-")}`}><div className="flex items-center justify-between" data-testid={`pillar-card-header-${name.toLowerCase().replaceAll(" ", "-")}`}><span className={`grid size-10 place-items-center rounded-full ${color} text-white`} data-testid={`pillar-icon-${name.toLowerCase().replaceAll(" ", "-")}`}><Icon className="size-4" aria-hidden="true" /></span><span className="font-mono text-sm opacity-65" data-testid={`pillar-level-${name.toLowerCase().replaceAll(" ", "-")}`}>{level}%</span></div><h3 className="mt-7 font-heading text-xl font-semibold capitalize" data-testid={`pillar-name-${name.toLowerCase().replaceAll(" ", "-")}`}>{name}</h3><div className="mt-4 h-2 overflow-hidden rounded-full bg-white/55" data-testid={`pillar-progress-${name.toLowerCase().replaceAll(" ", "-")}`}><div className={`h-full rounded-full ${color}`} style={{ width: `${level}%` }} /></div></div>)}</div>
        </section>

        <section className="border-y-2 border-ink bg-background px-5 py-20 sm:px-8 lg:px-12 lg:py-24" data-testid="business-quotes-section">
          <div className="mx-auto max-w-7xl" data-testid="business-quotes-content"><p className="eyebrow" data-testid="business-quotes-eyebrow">Notes I keep coming back to</p><h2 className="mt-5 max-w-xl font-heading text-4xl font-semibold text-ink sm:text-5xl" data-testid="business-quotes-heading">A few things I believe about good business.</h2><div className="mt-10 grid gap-5 lg:grid-cols-3" data-testid="business-quotes-grid">{businessQuotes.map((item, index) => <blockquote key={item.quote} className={`${item.color} rounded-3xl border-2 border-ink p-7 text-[#25151f] shadow-[6px_6px_0_var(--ink)] ${index === 1 ? "lg:-translate-y-4" : ""}`} data-testid={`business-quote-${index + 1}`}><span className="font-heading text-6xl leading-none opacity-30" aria-hidden="true">“</span><p className="-mt-4 font-heading text-2xl font-semibold leading-8" data-testid={`business-quote-text-${index + 1}`}>{item.quote}</p><footer className="mt-7 font-mono text-[10px] uppercase tracking-[0.16em] opacity-60" data-testid={`business-quote-note-${index + 1}`}>{item.note}</footer></blockquote>)}</div></div>
        </section>

        <section id="projects" className="border-y-2 border-ink bg-tropical-rain text-white" data-testid="projects-section">
          <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28">
            <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between" data-testid="projects-header"><div><p className="font-mono text-[10px] uppercase tracking-[0.22em] text-pure-sun" data-testid="projects-eyebrow">03 / The work — with receipts</p><h2 className="mt-5 max-w-2xl font-heading text-4xl font-semibold tracking-tight text-white sm:text-6xl" data-testid="projects-heading">Big questions. Real numbers. <span className="italic text-peony-bundle" data-testid="projects-heading-accent">No vague strategy fog.</span></h2><p className="mt-5 max-w-xl text-base leading-7 text-white/70" data-testid="projects-description">Open a card for the model, the messy bit, the recommendation, and what the numbers actually changed.</p></div><div className="flex flex-wrap gap-2" data-testid="project-filter-list"><button type="button" onClick={() => setActiveCategory("All")} className={`rounded-full border-2 border-white/40 px-4 py-2 text-xs font-semibold transition-colors duration-200 ${activeCategory === "All" ? "bg-pure-sun text-[#25151f]" : "bg-white/10 text-white/80 hover:bg-white/20"}`} data-testid="project-filter-all">All the good stuff <span data-testid="project-count-all">{projects.length}</span></button>{categories.map((category) => <button type="button" key={category} onClick={() => setActiveCategory(category)} className={`rounded-full border-2 border-white/40 px-4 py-2 text-xs font-semibold transition-colors duration-200 ${activeCategory === category ? "bg-pure-sun text-[#25151f]" : "bg-white/10 text-white/80 hover:bg-white/20"}`} data-testid={`project-filter-${category.toLowerCase()}`}>{category}</button>)}</div></div>
            {adminMode && <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-brand/30 bg-brand/10 p-4" data-testid="admin-mode-toolbar"><div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-light" data-testid="admin-toolbar-label">Admin Studio active</p><p className="mt-1 text-sm text-background/70" data-testid="admin-toolbar-description">Changes save in this browser automatically.</p></div><div className="flex flex-wrap gap-2" data-testid="admin-toolbar-actions"><Button type="button" size="sm" onClick={openNewProject} data-testid="admin-add-project-button"><Plus className="size-4" aria-hidden="true" /> Add project</Button><Button type="button" size="sm" variant="outline" onClick={resetProjects} className="border-white/20 bg-transparent text-background hover:bg-white/10 hover:text-background" data-testid="admin-reset-projects-button">Reset defaults</Button></div></div>}
            <div className="mt-12 grid gap-6 lg:grid-cols-2" data-testid="projects-grid"><AnimatePresence mode="popLayout">{filteredProjects.map((project) => <ProjectCard key={project.id} project={project} isAdmin={adminMode} onOpen={setSelectedProject} onEdit={openEditProject} onDelete={deleteProject} />)}</AnimatePresence></div>
            {filteredProjects.length === 0 && <div className="rounded-2xl border border-dashed border-white/20 p-10 text-center" data-testid="projects-empty-state"><p className="font-heading text-xl text-background" data-testid="projects-empty-title">No projects in this category yet.</p><p className="mt-2 text-sm text-background/60" data-testid="projects-empty-description">Switch filters or open Admin Studio to add one.</p></div>}
            <div className="mt-12 flex items-center justify-between border-t border-white/15 pt-6" data-testid="projects-footer"><p className="text-sm text-background/50" data-testid="projects-footer-note">{projects.length} projects. Several spreadsheets. Zero mystery metrics.</p><a href="#contact" className="inline-flex items-center gap-2 text-sm font-semibold text-pop-yellow hover:text-white" data-testid="projects-contact-link">Got a knot to untangle? <ArrowUpRight className="size-4" aria-hidden="true" /></a></div>
          </div>
        </section>

        <section id="experience" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28" data-testid="experience-section"><div className="grid gap-12 lg:grid-cols-[0.7fr_1.3fr]"><div><p className="eyebrow" data-testid="experience-eyebrow">04 / How I got here</p><h2 className="mt-5 max-w-sm font-heading text-3xl font-semibold tracking-tight text-ink sm:text-5xl" data-testid="experience-heading">A career path with range. <span className="italic text-brand">And a point.</span></h2></div><div className="grid gap-4" data-testid="experience-timeline">{experience.map((entry, index) => <article key={entry.id} className={`${experienceColors[index % experienceColors.length]} grid gap-4 rounded-3xl border-2 border-ink p-6 text-[#25151f] shadow-[5px_5px_0_var(--ink)] sm:grid-cols-[0.35fr_1fr] sm:gap-10`} data-testid={`experience-entry-${entry.id}`}><p className="font-mono text-xs uppercase tracking-[0.15em] opacity-65" data-testid={`experience-period-${entry.id}`}>{entry.period}</p><div><h3 className="font-heading text-xl font-semibold" data-testid={`experience-role-${entry.id}`}>{entry.role}</h3><p className="mt-1 text-sm font-medium opacity-60" data-testid={`experience-place-${entry.id}`}>{entry.place}</p><p className="mt-4 max-w-xl text-sm leading-6 opacity-75" data-testid={`experience-detail-${entry.id}`}>{entry.detail}</p></div></article>)}</div></div></section>

        <section id="skills" className="border-y-2 border-ink bg-bubble-gum text-[#25151f]" data-testid="skills-section"><div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-24"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="font-mono text-[10px] uppercase tracking-[0.22em]" data-testid="skills-eyebrow">05 / Tabs open in my brain</p><h2 className="mt-5 font-heading text-3xl font-semibold tracking-tight sm:text-5xl" data-testid="skills-heading">Strategy in one hand. Spreadsheet in the other.</h2></div><span className="font-mono text-xs uppercase tracking-[0.18em] opacity-60" data-testid="skills-caption">Always learning / immediately applying</span></div><div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4" data-testid="skills-grid">{skills.map((skill, index) => <div key={skill.group} className={`${skillColors[index % skillColors.length]} rounded-2xl border-2 border-[#25151f] p-6 shadow-[5px_5px_0_#25151f]`} data-testid={`skill-card-${index + 1}`}><span className="font-mono text-xs opacity-60" data-testid={`skill-index-${index + 1}`}>0{index + 1}</span><h3 className="mt-10 font-heading text-2xl font-semibold" data-testid={`skill-group-${index + 1}`}>{skill.group}</h3><p className="mt-4 text-sm leading-6 opacity-70" data-testid={`skill-items-${index + 1}`}>{skill.items}</p></div>)}</div></div></section>

        <section id="resume" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-12 lg:py-28" data-testid="resume-section"><div className="relative rotate-[-0.5deg] overflow-hidden rounded-3xl border-2 border-ink bg-pop-blue p-8 text-[#25151f] shadow-[9px_9px_0_var(--ink)] sm:p-12 lg:p-16"><div className="absolute -right-10 -top-20 size-72 rounded-full border-2 border-[#25151f]/15" aria-hidden="true" /><div className="absolute -right-2 -top-12 size-48 rounded-full border-2 border-[#25151f]/15" aria-hidden="true" /><div className="relative grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="font-mono text-[10px] uppercase tracking-[0.22em] opacity-60" data-testid="resume-eyebrow">06 / The neat one-page version</p><h2 className="mt-5 max-w-xl font-heading text-4xl font-semibold leading-tight tracking-tight sm:text-5xl" data-testid="resume-heading">Need the tidy version? I made one, obviously.</h2><p className="mt-5 max-w-lg text-base leading-7 opacity-70" data-testid="resume-description">PGPM candidate · Marketing · Consulting · Product Strategy · Gurgaon, India</p></div><a href="mailto:hiba.salim@email.com?subject=Resume%20request" className="inline-flex h-11 items-center justify-center gap-2 rounded-full border-2 border-[#25151f] bg-pop-yellow px-5 text-sm font-semibold shadow-[4px_4px_0_#25151f] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[2px_2px_0_#25151f]" data-testid="resume-download-button"><Download className="size-4" aria-hidden="true" /> Send me the resume</a></div></div></section>

        <section id="contact" className="border-t-2 border-ink bg-tomato-jam text-white" data-testid="contact-section"><div className="mx-auto grid max-w-7xl gap-14 px-5 py-20 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24 lg:px-12 lg:py-28"><div><p className="font-mono text-[10px] uppercase tracking-[0.22em] text-pure-sun" data-testid="contact-eyebrow">07 / Your move</p><h2 className="mt-5 max-w-lg font-heading text-4xl font-semibold tracking-tight sm:text-6xl" data-testid="contact-heading">Got a problem with too many moving parts? <span className="italic text-peony-bundle">My kind of conversation.</span></h2><p className="mt-6 max-w-sm text-base leading-7 text-white/75" data-testid="contact-description">Recruiting for an MBA role, building something ambitious, or simply comparing notes? Say hello. Bonus points for a genuinely messy brief.</p><div className="mt-10 space-y-4" data-testid="contact-links"><a href="mailto:hiba.salim@email.com" className="flex items-center gap-3 text-sm text-white/85 hover:text-pure-sun" data-testid="contact-email-link"><Mail className="size-4 text-pure-sun" aria-hidden="true" /> hiba.salim@email.com</a><a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm text-white/85 hover:text-pure-sun" data-testid="contact-linkedin-link"><ExternalLink className="size-4 text-pure-sun" aria-hidden="true" /> linkedin.com/in/hibasalim</a><span className="flex items-center gap-3 text-sm text-white/85" data-testid="contact-location"><MapPin className="size-4 text-pure-sun" aria-hidden="true" /> Gurgaon, India</span></div></div><form onSubmit={(event) => { event.preventDefault(); toast.success("Message ready", { description: "Thanks — Hiba will get back to you at the email you shared." }); }} className="rotate-[0.5deg] rounded-3xl border-2 border-ink bg-limeade p-6 text-[#25151f] shadow-[8px_8px_0_var(--ink)] sm:p-8" data-testid="contact-form"><div className="grid gap-5 sm:grid-cols-2"><label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.12em] opacity-60" data-testid="contact-name-field"><span data-testid="contact-name-label">Your name</span><input required name="name" className="h-11 rounded-xl border-2 border-[#25151f]/20 bg-white/60 px-3 text-sm outline-none placeholder:text-[#25151f]/35 focus:border-brand focus:ring-3 focus:ring-brand/20" placeholder="The person behind the email" data-testid="contact-name-input" /></label><label className="grid gap-2 text-xs font-semibold uppercase tracking-[0.12em] opacity-60" data-testid="contact-email-field"><span data-testid="contact-email-label">Best email</span><input required type="email" name="email" className="h-11 rounded-xl border-2 border-[#25151f]/20 bg-white/60 px-3 text-sm outline-none placeholder:text-[#25151f]/35 focus:border-brand focus:ring-3 focus:ring-brand/20" placeholder="you@company.com" data-testid="contact-email-input" /></label></div><label className="mt-5 grid gap-2 text-xs font-semibold uppercase tracking-[0.12em] opacity-60" data-testid="contact-message-field"><span data-testid="contact-message-label">What are we untangling?</span><textarea required name="message" className="min-h-32 resize-y rounded-xl border-2 border-[#25151f]/20 bg-white/60 px-3 py-3 text-sm outline-none placeholder:text-[#25151f]/35 focus:border-brand focus:ring-3 focus:ring-brand/20" placeholder="Give me the interesting version..." data-testid="contact-message-input" /></label><Button type="submit" className="mt-6 w-full border-2 border-[#25151f] bg-pure-sun text-[#25151f] shadow-[4px_4px_0_#25151f] hover:bg-airplane-view" data-testid="contact-submit-button">Let's make it clearer <ArrowUpRight className="size-4" aria-hidden="true" /></Button></form></div><footer className="mx-auto flex max-w-7xl flex-col gap-3 border-t border-white/25 px-5 py-6 text-xs text-white/60 sm:flex-row sm:items-center sm:justify-between sm:px-8 lg:px-12" data-testid="portfolio-footer"><span data-testid="footer-copyright">© 2026 Hiba Salim · Made with curiosity and an unreasonable number of tabs</span><a href="#top" className="inline-flex items-center gap-2 hover:text-pure-sun" data-testid="footer-back-to-top-link">Do the scroll again <ChevronRight className="size-3 -rotate-90" aria-hidden="true" /></a></footer></section>
      </main>

      <CaseStudyDialog project={selectedProject} onClose={() => setSelectedProject(null)} />
      <ProjectEditor open={editorOpen} project={editingProject} onOpenChange={setEditorOpen} onSave={saveProject} />
    </div>
  );
}
