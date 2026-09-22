export type ProjectCategory =
  | "Marketing"
  | "Consulting"
  | "Strategy"
  | "Analytics"
  | "Operations"
  | "Finance";

export type ProjectStatus = "complete" | "in-progress";

export interface ProjectKpi {
  label: string;
  value: string;
  detail?: string;
}

export interface ProjectChartPoint {
  label: string;
  value: number;
  display: string;
}

export interface ProjectComparison {
  title: string;
  columns: string[];
  rows: string[][];
}

export interface ProjectInput {
  title: string;
  subtitle?: string;
  summary: string;
  role: string;
  tools: string[];
  year: string;
  category: ProjectCategory;
  status?: ProjectStatus;
  brandMark?: string;
  image: string;
  liveLink: string;
  liveLinkLabel?: string;
  caseStudyLink: string;
  reportUrl?: string;
  reportFileName?: string;
  reportNote?: string;
  details: string;
  businessProblem?: string;
  approach?: string;
  frameworks?: string[];
  analysis?: string[];
  recommendations?: string[];
  impactMetrics: string[];
  kpis?: ProjectKpi[];
  chartTitle?: string;
  chartData?: ProjectChartPoint[];
  comparison?: ProjectComparison;
  processComparison?: {
    asIs: string[];
    toBe: string[];
  };
  keyTakeaway: string;
  isFeatured: boolean;
}

export interface Project extends ProjectInput {
  id: string;
}

const STORAGE_KEY = "hiba-portfolio-projects-v2";

export const categories: ProjectCategory[] = [
  "Analytics",
  "Operations",
  "Strategy",
  "Finance",
  "Marketing",
  "Consulting",
];

const covers = {
  tourism: "https://static.prod-images.emergentagent.com/jobs/811eadd8-c38a-45e2-b601-bc4fdda81358/images/3912b076baf41b8000d0332330cf747e051be3d5871f0dd61e8d99aaaadc5b12.jpeg",
  spms: "https://static.prod-images.emergentagent.com/jobs/811eadd8-c38a-45e2-b601-bc4fdda81358/images/a37ccf3934a0447e0e3a3b99d8b7677d7dc10947d7c5a68e8051d2bc31079e29.jpeg",
  goZero: "https://static.prod-images.emergentagent.com/jobs/811eadd8-c38a-45e2-b601-bc4fdda81358/images/fbe7566b77ff48c5eaad295df9220fe3f326c76b22e2500e9549df41137f2c53.jpeg",
  finance: "https://static.prod-images.emergentagent.com/jobs/811eadd8-c38a-45e2-b601-bc4fdda81358/images/d238e3455ece5263816ba2a6d9451eecb96e3297babc2df85e3fa92c057ae437.jpeg",
  amazon: "https://static.prod-images.emergentagent.com/jobs/811eadd8-c38a-45e2-b601-bc4fdda81358/images/8fb30f848400ab5857c12c79a121a33ceecca0cd1c8a10da408f50ca3725b386.jpeg",
  bayer: "https://static.prod-images.emergentagent.com/jobs/811eadd8-c38a-45e2-b601-bc4fdda81358/images/7cc4fd236c4aae0a2ef86f022becf194278733325951775510bcd97d2ab8a8b3.jpeg",
  strategy: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=85",
  footwear: "https://images.unsplash.com/photo-1586868538513-51335a0c5337?auto=format&fit=crop&w=1200&q=85",
};

const reportUrls = {
  tourism: "https://customer-assets-39nsmqrw.emergentagent.net/job_mba-portfolio-13/artifacts/tf3r7efh_India_Tourism_Final_Report_B1-2_PROPERLY_ALIGNED.docx",
  cian: "https://customer-assets-39nsmqrw.emergentagent.net/job_mba-portfolio-13/artifacts/7x1v17am_FINANCIAL_RATIO_ANALYSIS_CIANAGRO%20DOCUMENT%20%281%29.docx",
  spms: "https://customer-assets-39nsmqrw.emergentagent.net/job_mba-portfolio-13/artifacts/bdp9u1dg_OM%20Group%20Project%20PPT.pptx",
  amazon: "https://customer-assets-39nsmqrw.emergentagent.net/job_mba-portfolio-13/artifacts/z1zzb9ku_Group%20B1%20QMDM%20Report%20%283%29.docx",
};

export const defaultProjects: Project[] = [
  {
    id: "india-tourism-decision-support",
    title: "India Tourism Decision Support System",
    subtitle: "A data-driven decision support system for government tourism planning",
    summary: "OLS regression and K-Means clustering across 100 Indian destinations to identify growth potential beyond historical footfall.",
    role: "Business Analytics Researcher",
    tools: ["OLS Regression", "K-Means", "ANOVA", "Python"],
    year: "2026",
    category: "Analytics",
    status: "complete",
    image: covers.tourism,
    liveLink: "https://india-tourism-insights.ananya-pgpm27g.chatgpt.site/",
    liveLinkLabel: "View dashboard",
    caseStudyLink: "",
    reportUrl: reportUrls.tourism,
    reportFileName: "India_Tourism_Final_Report.docx",
    details: "Built a seven-stage analytical pipeline across 208 indicators to help public planners compare destinations with true peers, diagnose constraints, and fund readiness before promotion.",
    businessProblem: "Public tourism budgets often reward historical visitor volume rather than true destination potential, reinforcing path dependency and overlooking high-upside locations constrained by solvable accessibility, safety, or infrastructure gaps.",
    approach: "Evaluated 100 destinations across 30 states and Union Territories. Standardized continuous predictors, resolved spatial outliers, and combined exploratory analysis, OLS regression, K-Means clustering, ANOVA validation, opportunity-gap analysis, and normalized constraint scoring.",
    frameworks: ["Multiple Linear Regression", "K-Means (K=4)", "One-Way ANOVA", "Opportunity Gap Analysis", "Constraint Scoring"],
    analysis: [
      "The final model was statistically significant: R² 0.419, adjusted R² 0.363, F-test p < 0.001.",
      "Accessibility (β +0.860, p 0.018) and safety (β +0.550, p 0.009) emerged as the significant positive drivers of popularity.",
      "ANOVA confirmed meaningful popularity variance across four destination clusters: F 23.53, p 2.84 × 10⁻¹¹.",
    ],
    recommendations: [
      "Validate the top three to five opportunity-gap destinations through field diagnostics and community consultation in the first six months.",
      "Deliver targeted access, amenity, safety, and provider-training pilots over months 6–18.",
      "Scale promotion only after local MSME revenue, length of stay, occupancy, and readiness metrics improve.",
    ],
    impactMetrics: ["100 destinations evaluated", "208 source indicators", "Top 5 undervalued destinations identified"],
    kpis: [
      { label: "Sample size", value: "100", detail: "Destinations" },
      { label: "Model fit", value: "41.9%", detail: "Explained variance" },
      { label: "Key drivers", value: "0.860 / 0.550", detail: "Access / safety β" },
      { label: "Cluster variance", value: "F 23.53", detail: "p < 0.001" },
    ],
    chartTitle: "Top model-led opportunity gaps",
    chartData: [
      { label: "Kanatal", value: 2.14, display: "+2.14" },
      { label: "Majuli Island", value: 2.12, display: "+2.12" },
      { label: "Chakrata", value: 2.11, display: "+2.11" },
      { label: "Kutch Interior", value: 2.07, display: "+2.07" },
      { label: "Dhanushkodi", value: 1.96, display: "+1.96" },
      { label: "Araku Valley", value: 1.92, display: "+1.92" },
    ],
    keyTakeaway: "Promote less blindly. Invest more precisely. Operational readiness and safety must precede promotional campaigns.",
    isFeatured: true,
  },
  {
    id: "digital-campus-logistics-spms",
    title: "Digital Campus Logistics (SPMS)",
    subtitle: "Student Parcel Management System: operations management and layout architecture",
    summary: "Lean process re-engineering to replace paper-ledger bottlenecks with digitally assigned rack, level, and bin locations.",
    role: "Operations & Process Design Team",
    tools: ["Lean", "Process Mapping", "Facility Layout", "SOP Design"],
    year: "2026",
    category: "Operations",
    status: "complete",
    image: covers.spms,
    liveLink: "",
    caseStudyLink: "",
    reportUrl: reportUrls.spms,
    reportFileName: "SPMS_Operations_Project.pptx",
    details: "Redesigned Great Lakes Gurgaon's parcel operation by connecting a digital information layer to standardized physical storage and role-based workflows.",
    businessProblem: "The campus handled 250+ parcels daily and 500+ at peaks through paper ledgers and unstructured storage, creating 10–15+ minute searches, 7–8 PM queues, misplacement risk, and no real-time operational visibility.",
    approach: "Used Gemba-style field observation, security and student interviews, and ledger evidence to diagnose waiting, motion, overprocessing, inventory, defects, and transportation waste before designing an 18-step TO-BE workflow.",
    frameworks: ["Lean Waste Elimination", "AS-IS / TO-BE Mapping", "Rack-Level-Bin Architecture", "Four Operating SOPs", "Dwell-Time Monitoring"],
    analysis: [
      "The AS-IS process used 12 sequential steps, one non-searchable information source, and duplicated searches by students and security.",
      "The TO-BE design assigns each parcel a size class and coded Rack-Level-Bin location at intake, then closes the bin digitally after verified collection.",
      "Four SOPs standardize receiving, collection, damaged-parcel, and misplaced-parcel handling.",
    ],
    recommendations: [
      "Replace paper registration with DigiCampus parcel check-in and a unique barcode or OTP identity.",
      "Implement coded racks, four levels per rack, size-based bins, 1.5 metre aisles, CCTV coverage, and a separate collection area.",
      "Track volume, dwell time, utilization, ageing parcels, peak load, and complaints through an admin console.",
    ],
    impactMetrics: ["250+ daily parcels", "500+ peak volume", "18-step standardized workflow"],
    kpis: [
      { label: "Daily volume", value: "250+", detail: "500+ at peak" },
      { label: "Current retrieval", value: "10–15+ min", detail: "Manual search" },
      { label: "Target retrieval", value: "1.6 min", detail: "Projected" },
      { label: "Efficiency gain", value: "~85%", detail: "Projected" },
    ],
    processComparison: {
      asIs: ["Paper ledger", "Random floor boxes", "Sequential dual search", "Manual signature"],
      toBe: ["Digital scan", "Assigned rack / level / bin", "Real-time notification", "OTP / QR handover"],
    },
    keyTakeaway: "Operational flow requires information flow. Physical layout cannot be optimized while its data ledger remains disconnected.",
    isFeatured: false,
  },
  {
    id: "go-zero-screen-to-shelf",
    title: "Go Zero: Screen to Shelf",
    subtitle: "Channel flip strategy: taking a high-growth D2C ice cream brand into physical retail",
    summary: "Commercial feasibility and a channel-flip strategy for expanding a D2C ice cream brand across Delhi NCR retail.",
    role: "Retail & Channel Strategy Researcher",
    tools: ["5Cs & 4Ps", "Unit Economics", "Consumer Research", "Phase Gates"],
    year: "2026",
    category: "Strategy",
    status: "complete",
    image: covers.goZero,
    liveLink: "",
    caseStudyLink: "",
    reportNote: "Full report file awaiting upload",
    details: "Combined consumer preference research, retailer interviews, and channel realisation modelling to design an offline launch that protects trial, margins, and trade trust.",
    businessProblem: "Strong online awareness was not converting into profitable shelf trial because of limited cold-chain penetration, fear of taste compromise, and retailer resistance to online discount conflicts.",
    approach: "Surveyed 30 target consumers and interviewed nine modern and traditional retailers across Delhi NCR to quantify taste priorities, pack-size preference, price-gap sensitivity, channel margins, and launch conditions.",
    frameworks: ["5Cs", "4Ps", "Willingness-to-Pay", "Channel Realisation Model", "Stage-Gated Launch"],
    analysis: [
      "Taste was the top trial factor for 16 of 30 consumers; 12 of 30 preferred a 100–125 ml single-serve cup.",
      "An online versus in-store price gap above ₹15–₹20 pushed 10 of 30 shoppers back to online ordering.",
      "General Trade produced the strongest net realisation at ₹263 or 66% of a ₹399 MRP, versus ₹211 or 53% for Quick Commerce.",
    ],
    recommendations: [
      "Launch a Delhi NCR modern-trade beachhead with an offline-exclusive 125 ml Grab Cup at ₹99.",
      "Protect trade partners with 15–20% margins, 24-hour replenishment, and online discounts capped at 25%.",
      "Scale only after rate of sale exceeds 15 units per freezer per week.",
    ],
    impactMetrics: ["30 consumer surveys", "9 retailer interviews", "2,500+ freezer roadmap"],
    kpis: [
      { label: "Trial driver", value: "16 / 30", detail: "Taste ranked first" },
      { label: "Retailer interest", value: "8 / 9", detail: "Open to trial" },
      { label: "Trade margin", value: "15–20%", detail: "Protected target" },
      { label: "Realisation lead", value: "66%", detail: "General Trade" },
    ],
    comparison: {
      title: "Channel net realisation on ₹399 MRP",
      columns: ["Channel", "Net realisation", "Share"],
      rows: [
        ["D2C / Web", "₹339", "85% before CAC / cold logistics"],
        ["General Trade", "₹263", "66%"],
        ["Modern Trade", "₹227", "57%"],
        ["Quick Commerce", "₹211", "53%"],
      ],
    },
    keyTakeaway: "Channel expansion without price discipline cannibalizes trade trust. Offline-exclusive packs protect both trial and retailer economics.",
    isFeatured: false,
  },
  {
    id: "amazon-fleet-zone-optimization",
    title: "Amazon Fleet-to-Zone Optimization",
    subtitle: "A linear-programming transportation model solved via LINGO and Excel",
    summary: "Reallocating last-mile fleet capacity to reduce daily fulfilment cost without adding vehicles or headcount.",
    role: "Optimization Consultant · QMDM",
    tools: ["Linear Programming", "LINGO", "Excel Solver", "Sensitivity Analysis"],
    year: "2026",
    category: "Analytics",
    status: "complete",
    image: covers.amazon,
    liveLink: "",
    caseStudyLink: "",
    reportUrl: reportUrls.amazon,
    reportFileName: "Amazon_Fleet_Optimization_Report.docx",
    details: "Modelled the daily allocation of motorcycles, scooters, and vans across four delivery zones using 43,540 cleaned records and operational capacity constraints.",
    businessProblem: "Historical dispatch habits over-used motorcycles and under-used lower-cost scooters, while zone-level delivery costs and fleet constraints were not jointly optimized.",
    approach: "Built a transportation-model LP in LINGO and Excel using 44 operating days of delivery data, three fleet types, four zones, demand constraints, capacity buffers, and sensitivity analysis.",
    frameworks: ["Linear Programming", "Transportation Model", "Capacity Constraints", "Shadow-Price Analysis"],
    analysis: [
      "The optimal plan shifted 102 deliveries per day from motorcycles to scooters in the Metropolitan zone.",
      "Scooter capacity reached 100% at 398 shifts per day; its shadow price was -₹48.97 per additional delivery.",
      "The model assigned vans to zero standard deliveries, supporting redeployment to heavy or bulky freight.",
    ],
    recommendations: [
      "Implement the optimized Metropolitan allocation immediately: 342 motorcycle and 398 scooter deliveries per day.",
      "Prioritize scooter fleet expansion and redeploy vans to heavy-freight use cases.",
      "Refresh the LP monthly with updated costs, capacities, and demand matrices.",
    ],
    impactMetrics: ["₹9,734 daily saving", "3.7% cost reduction", "₹35.53 lakh annual saving"],
    kpis: [
      { label: "Records", value: "43,540", detail: "Clean orders" },
      { label: "Daily saving", value: "₹9,734", detail: "3.7% reduction" },
      { label: "Annual saving", value: "₹35.53L", detail: "No added capex" },
      { label: "Scooter use", value: "100%", detail: "398 shifts / day" },
    ],
    chartTitle: "Daily operating cost: baseline vs optimized",
    chartData: [
      { label: "Baseline", value: 262802, display: "₹2,62,802" },
      { label: "Optimized", value: 253068, display: "₹2,53,068" },
    ],
    keyTakeaway: "Optimization corrected resource mismatch and created material savings without new capital expenditure or headcount.",
    isFeatured: false,
  },
  {
    id: "cian-agro-financial-analysis",
    title: "CIAN Agro Financial Analysis",
    subtitle: "Five-year ratio analysis and investment recommendation",
    summary: "Looking beyond acquisition-led headline growth to test liquidity, capital efficiency, solvency, and valuation risk.",
    role: "Financial Analysis Team",
    tools: ["Ratio Analysis", "Common-Size Analysis", "Peer Benchmarking", "Valuation"],
    year: "2026",
    category: "Finance",
    status: "complete",
    image: covers.finance,
    liveLink: "",
    caseStudyLink: "",
    reportUrl: reportUrls.cian,
    reportFileName: "CIAN_Agro_Financial_Ratio_Analysis.docx",
    details: "Evaluated CIAN Agro's five-year financial performance and acquisition-led transformation against listed peers and industry benchmarks.",
    businessProblem: "Rapid acquisition-led growth had dramatically increased scale, but headline sales and profit expansion did not reveal whether returns, liquidity, working capital, and valuation supported an investment case.",
    approach: "Combined FY2021–FY2025 horizontal trends, common-size statements, profitability, liquidity, efficiency, solvency, and investor ratios with peer and industry comparison.",
    frameworks: ["Horizontal Analysis", "Common-Size Analysis", "Ratio Analysis", "Peer Benchmarking", "Investment Screen"],
    analysis: [
      "FY2025 operating margin improved to 13.8% and net margin to 4.0%, but ROE fell to 2.1% and ROCE to 4.3%.",
      "Liquidity remained stressed: current ratio 0.81x, quick ratio 0.47x, cash ratio 0.01x, and net working capital -₹221 crore.",
      "At roughly 89x earnings versus a 19x industry average, valuation did not compensate for weak returns and 1.62x interest coverage.",
    ],
    recommendations: [
      "Do not invest at the current valuation; place the company on a watch list.",
      "Reassess after one to two years of audited post-acquisition performance.",
      "Require sustained improvement in ROE, ROCE, liquidity, cash generation, and working-capital efficiency before reconsideration.",
    ],
    impactMetrics: ["5 financial years reviewed", "89x P/E vs 19x industry", "Clear watch-list recommendation"],
    kpis: [
      { label: "Net margin", value: "4.0%", detail: "vs 1.8% industry" },
      { label: "ROE", value: "2.1%", detail: "vs 12.0% industry" },
      { label: "Current ratio", value: "0.81x", detail: "vs 1.25x industry" },
      { label: "Interest cover", value: "1.62x", detail: "vs 3.50x industry" },
    ],
    comparison: {
      title: "CIAN Agro versus industry benchmarks",
      columns: ["Metric", "CIAN FY2025", "Industry / peer norm"],
      rows: [
        ["Net margin", "4.0%", "1.8%"],
        ["ROE", "2.1%", "12.0%"],
        ["Current ratio", "0.81x", "1.25x"],
        ["Interest coverage", "1.62x", "3.50x"],
        ["Inventory days", "140", "~45"],
        ["P/E", "~89x", "~19x"],
      ],
    },
    keyTakeaway: "Margins can improve while shareholder returns deteriorate. Acquisition-led scale must be tested against capital efficiency and cash resilience.",
    isFeatured: false,
  },
  {
    id: "bayer-live-industry-project",
    title: "Bayer Live Industry Project",
    subtitle: "A live company engagement currently in discovery",
    summary: "An in-progress Bayer engagement using stakeholder management and design thinking to frame the right business problem.",
    role: "Live Project Team Member",
    tools: ["Stakeholder Management", "Design Thinking", "Problem Framing"],
    year: "2026",
    category: "Consulting",
    status: "in-progress",
    brandMark: "BAYER",
    image: covers.bayer,
    liveLink: "",
    caseStudyLink: "",
    reportNote: "Official Bayer logo and verified project outcomes will be added when provided.",
    details: "This company engagement is active. The portfolio deliberately shows only the confirmed working mode and current phase; scope, analysis, recommendations, and outcomes will be published after they are validated.",
    businessProblem: "Project scope is being defined with stakeholders.",
    approach: "Current work focuses on stakeholder alignment, discovery, design-thinking-led problem framing, and defining the evidence needed for the next phase.",
    frameworks: ["Stakeholder Management", "Design Thinking", "Discovery", "Problem Framing"],
    analysis: [],
    recommendations: [],
    impactMetrics: ["Live engagement", "Discovery phase", "Outcomes pending validation"],
    kpis: [
      { label: "Status", value: "In progress", detail: "Live company project" },
      { label: "Current phase", value: "Discovery", detail: "Scope validation" },
    ],
    keyTakeaway: "In progress — verified learnings and outcomes will be added as the engagement advances.",
    isFeatured: false,
  },
  {
    id: "mamaearth-strategy-analysis",
    title: "Mamaearth Strategy Analysis",
    summary: "Decoding a D2C brand's growth engine and unit economics.",
    role: "Business Strategy Analyst",
    tools: ["Market Sizing", "Unit Economics", "Competitive Mapping"],
    year: "2025",
    category: "Strategy",
    image: covers.strategy,
    liveLink: "https://mamaearth.in/",
    caseStudyLink: "",
    details: "Combined category research, competitor benchmarking, and unit economics to identify durable growth levers.",
    impactMetrics: ["6 competitor archetypes", "4 growth levers", "1 strategic thesis"],
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
    image: covers.footwear,
    liveLink: "",
    caseStudyLink: "",
    details: "Turned qualitative interviews and desk research into a target segment, differentiated positioning, and learning-led channel plan.",
    impactMetrics: ["40+ consumer responses", "5 segments compared", "3 launch hypotheses"],
    keyTakeaway: "The best go-to-market plans make the next learning loop obvious.",
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
