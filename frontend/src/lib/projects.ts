export type ProjectCategory =
  | "Marketing"
  | "Consulting"
  | "Strategy"
  | "Analytics"
  | "Operations";

export interface ProjectInput {
  title: string;
  summary: string;
  role: string;
  tools: string[];
  year: string;
  category: ProjectCategory;
  image: string;
  liveLink: string;
  caseStudyLink: string;
  details: string;
  impactMetrics: string[];
  keyTakeaway: string;
  isFeatured: boolean;
}

export interface Project extends ProjectInput {
  id: string;
}

const STORAGE_KEY = "hiba-portfolio-projects";

export const categories: ProjectCategory[] = [
  "Marketing",
  "Consulting",
  "Strategy",
  "Analytics",
  "Operations",
];

const imageUrls = {
  analytics:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=85",
  strategy:
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85",
  logistics:
    "https://images.unsplash.com/photo-1608222351212-18fe0ec7b13b?auto=format&fit=crop&w=1200&q=85",
  footwear:
    "https://images.unsplash.com/photo-1586868538513-51335a0c5337?auto=format&fit=crop&w=1200&q=85",
};

export const defaultProjects: Project[] = [
  {
    id: "amazon-delivery-optimization",
    title: "Amazon Delivery Optimization",
    summary: "Reducing last-mile delivery cost through route and hub optimization.",
    role: "Strategy & Operations Lead",
    tools: ["Excel Solver", "SQL", "Process Mapping"],
    year: "2025",
    category: "Operations",
    image: imageUrls.logistics,
    liveLink: "https://www.amazon.in/",
    caseStudyLink: "#contact",
    details:
      "Mapped the last-mile network, isolated the cost drivers behind delivery exceptions, and designed a hub allocation approach that balanced service levels with route efficiency.",
    impactMetrics: ["12% route efficiency opportunity", "3 operating scenarios modeled", "Service level kept above 95%"],
    keyTakeaway: "Small operational decisions compound into meaningful customer and margin outcomes.",
    isFeatured: true,
  },
  {
    id: "mamaearth-strategy-analysis",
    title: "Mamaearth Strategy Analysis",
    summary: "Decoding a D2C brand's growth engine and unit economics.",
    role: "Business Strategy Analyst",
    tools: ["Market Sizing", "Unit Economics", "Competitive Mapping"],
    year: "2025",
    category: "Strategy",
    image: imageUrls.strategy,
    liveLink: "https://mamaearth.in/",
    caseStudyLink: "#contact",
    details:
      "Combined category research, competitor benchmarking, and unit economics to understand where a purpose-led D2C brand could protect differentiation while scaling distribution.",
    impactMetrics: ["6 competitor archetypes mapped", "4 growth levers prioritized", "1 clear strategic thesis"],
    keyTakeaway: "Growth becomes durable when brand promise and business model reinforce one another.",
    isFeatured: false,
  },
  {
    id: "market-research-go-to-market",
    title: "Market Research",
    summary: "Primary and secondary research shaping a go-to-market plan.",
    role: "Research & GTM Strategist",
    tools: ["Consumer Interviews", "Survey Design", "Segmentation"],
    year: "2025",
    category: "Marketing",
    image: imageUrls.footwear,
    liveLink: "#contact",
    caseStudyLink: "#contact",
    details:
      "Turned qualitative interviews and desk research into a sharper target segment, a differentiated positioning statement, and a channel plan designed for early learning.",
    impactMetrics: ["40+ consumer responses", "5 segments compared", "3 launch hypotheses tested"],
    keyTakeaway: "The best go-to-market plans make the next learning loop obvious.",
    isFeatured: false,
  },
  {
    id: "business-analytics-dashboard",
    title: "Business Analytics",
    summary: "Turning transaction data into actionable business insight.",
    role: "Analytics & Insights Lead",
    tools: ["Power BI", "Python", "Data Storytelling"],
    year: "2024",
    category: "Analytics",
    image: imageUrls.analytics,
    liveLink: "#contact",
    caseStudyLink: "#contact",
    details:
      "Built a decision-oriented dashboard that moved beyond reporting to reveal product, channel, and cohort patterns for a faster weekly business review.",
    impactMetrics: ["8 decision metrics defined", "3 dashboard views", "Weekly review made actionable"],
    keyTakeaway: "A useful dashboard is a conversation starter, not a wall of charts.",
    isFeatured: false,
  },
  {
    id: "marketing-strategy-full-funnel",
    title: "Marketing Strategy",
    summary: "A full-funnel plan from positioning to campaign mix.",
    role: "Brand Strategy Partner",
    tools: ["Positioning", "Funnel Planning", "Campaign Mix"],
    year: "2024",
    category: "Marketing",
    image: imageUrls.strategy,
    liveLink: "#contact",
    caseStudyLink: "#contact",
    details:
      "Connected a brand's promise to channel roles, creative territories, and measurement signals so each stage of the funnel had a job to do.",
    impactMetrics: ["5 funnel stages mapped", "4 creative territories", "1 measurement framework"],
    keyTakeaway: "Clarity at the strategy level gives creativity more room to work.",
    isFeatured: false,
  },
  {
    id: "supply-chain-resilience",
    title: "Supply Chain Optimization",
    summary: "Balancing service level, cost, and resilience across nodes.",
    role: "Operations & Product Analyst",
    tools: ["Network Design", "Scenario Planning", "Vendor Strategy"],
    year: "2024",
    category: "Operations",
    image: imageUrls.logistics,
    liveLink: "#contact",
    caseStudyLink: "#contact",
    details:
      "Evaluated sourcing and inventory scenarios to make trade-offs visible, then recommended a resilient operating model that could absorb demand shifts.",
    impactMetrics: ["4 network scenarios", "2 resilience levers", "Cost-service trade-off clarified"],
    keyTakeaway: "Resilience is a design choice made before the disruption arrives.",
    isFeatured: false,
  },
];

export function loadProjects(): Project[] {
  if (typeof window === "undefined") return defaultProjects;

  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) return defaultProjects;
    const parsed = JSON.parse(stored) as Project[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : defaultProjects;
  } catch {
    return defaultProjects;
  }
}

export function persistProjects(projects: Project[]) {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }
}
