import { ArrowUpRight, Download, ExternalLink, X } from "lucide-react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { ReactNode } from "react";
import type { Project } from "@/lib/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent } from "@/components/ui/dialog";

interface CaseStudyDialogProps {
  project: Project | null;
  onClose: () => void;
}

export default function CaseStudyDialog({ project, onClose }: CaseStudyDialogProps) {
  return (
    <Dialog open={Boolean(project)} onOpenChange={(open) => { if (!open) onClose(); }}>
      <DialogContent showCloseButton={false} className="max-h-[92vh] overflow-y-auto border-border bg-card p-0 sm:max-w-5xl" data-testid="project-reader-dialog">
        {project && (
          <>
            <div className="relative min-h-72 overflow-hidden sm:min-h-96" data-testid="project-reader-image-frame">
              <img src={project.image} alt={`${project.title} case study`} className="absolute inset-0 h-full w-full object-cover" data-testid="project-reader-image" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/15" />
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10" data-testid="project-reader-hero-copy">
                <div className="flex flex-wrap items-center gap-2" data-testid="project-reader-badges">
                  <Badge className="bg-brand text-white" data-testid="project-reader-category">{project.category}</Badge>
                  {project.status === "in-progress" && <Badge className="border-white/25 bg-white/15 text-white" data-testid="project-reader-status">In progress</Badge>}
                  {project.brandMark && <span className="rounded-full border border-white/30 bg-white/10 px-3 py-1 font-heading text-xs font-semibold tracking-[0.2em] text-white" data-testid="project-reader-brand-mark">{project.brandMark}</span>}
                </div>
                <h2 className="mt-4 max-w-3xl font-heading text-3xl font-semibold leading-tight text-white sm:text-5xl" data-testid="project-reader-title">{project.title}</h2>
                {project.subtitle && <p className="mt-3 max-w-2xl text-sm leading-6 text-white/75 sm:text-base" data-testid="project-reader-subtitle">{project.subtitle}</p>}
              </div>
              <DialogClose render={<Button type="button" variant="ghost" size="icon" className="absolute right-4 top-4 bg-black/25 text-white backdrop-blur hover:bg-black/50 hover:text-white" data-testid="project-reader-close-button" />}>
                <X aria-hidden="true" /><span className="sr-only">Close case study</span>
              </DialogClose>
            </div>

            <div className="space-y-10 p-6 sm:p-10" data-testid="project-reader-content">
              <div className="flex flex-col gap-5 border-b border-border pb-7 sm:flex-row sm:items-center sm:justify-between" data-testid="project-reader-meta-row">
                <p className="text-sm text-muted-foreground" data-testid="project-reader-role">{project.role} · {project.year}</p>
                <div className="flex flex-wrap gap-2" data-testid="project-reader-actions">
                  {project.reportUrl && (
                    <a href={project.reportUrl} download={project.reportFileName} target="_blank" rel="noreferrer" className="inline-flex h-9 items-center gap-2 rounded-full border border-border px-4 text-xs font-semibold text-ink transition-colors duration-200 hover:bg-muted" data-testid="project-reader-download-report-button">
                      <Download className="size-3.5" aria-hidden="true" /> Download report
                    </a>
                  )}
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noreferrer" className="inline-flex h-9 items-center gap-2 rounded-full bg-brand px-4 text-xs font-semibold text-white transition-colors duration-200 hover:bg-brand-hover" data-testid="project-reader-live-link">
                      {project.liveLinkLabel ?? "View project"} <ExternalLink className="size-3.5" aria-hidden="true" />
                    </a>
                  )}
                  {project.caseStudyLink && (
                    <a href={project.caseStudyLink} target="_blank" rel="noreferrer" className="inline-flex h-9 items-center gap-2 rounded-full bg-ink px-4 text-xs font-semibold text-background" data-testid="project-reader-case-study-link">
                      Full case study <ArrowUpRight className="size-3.5" aria-hidden="true" />
                    </a>
                  )}
                </div>
              </div>

              {project.kpis && project.kpis.length > 0 ? (
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4" data-testid="project-reader-kpi-grid">
                  {project.kpis.map((kpi, index) => (
                    <div key={kpi.label} className="rounded-2xl border border-border bg-surface-subtle p-5" data-testid={`project-reader-kpi-${index + 1}`}>
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground" data-testid={`project-reader-kpi-label-${index + 1}`}>{kpi.label}</p>
                      <strong className="mt-3 block font-heading text-2xl font-semibold text-ink" data-testid={`project-reader-kpi-value-${index + 1}`}>{kpi.value}</strong>
                      {kpi.detail && <span className="mt-1 block text-xs text-muted-foreground" data-testid={`project-reader-kpi-detail-${index + 1}`}>{kpi.detail}</span>}
                    </div>
                  ))}
                </div>
              ) : null}

              <div className="grid gap-8 lg:grid-cols-2" data-testid="project-reader-story-grid">
                <StoryBlock label="The messy bit" text={project.businessProblem ?? project.details} testId="project-reader-business-problem" />
                <StoryBlock label="What I did about it" text={project.approach ?? project.summary} testId="project-reader-approach" />
              </div>

              {project.frameworks && project.frameworks.length > 0 && (
                <section data-testid="project-reader-frameworks-section">
                  <SectionLabel>Tools I brought to the table</SectionLabel>
                  <div className="mt-4 flex flex-wrap gap-2" data-testid="project-reader-frameworks">
                    {project.frameworks.map((framework) => <Badge key={framework} variant="outline" data-testid={`project-reader-framework-${slug(framework)}`}>{framework}</Badge>)}
                  </div>
                </section>
              )}

              {project.analysis && project.analysis.length > 0 && (
                <section data-testid="project-reader-analysis-section">
                  <SectionLabel>What the numbers said</SectionLabel>
                  <div className="mt-5 divide-y divide-border border-y border-border" data-testid="project-reader-analysis-list">
                    {project.analysis.map((item, index) => <div key={item} className="grid gap-3 py-5 sm:grid-cols-[3rem_1fr]" data-testid={`project-reader-analysis-item-${index + 1}`}><span className="font-mono text-xs text-brand">0{index + 1}</span><p className="text-sm leading-7 text-ink">{item}</p></div>)}
                  </div>
                </section>
              )}

              {project.chartData && project.chartData.length > 0 && (
                <section className="rounded-2xl border border-border bg-surface-subtle p-5 sm:p-7" data-testid="project-reader-chart-section">
                  <SectionLabel>{project.chartTitle ?? "Project data"}</SectionLabel>
                  <div className="mt-6 h-72 w-full" data-testid="project-reader-chart">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={project.chartData} layout="vertical" margin={{ top: 4, right: 30, bottom: 4, left: 20 }}>
                        <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border)" />
                        <XAxis type="number" hide />
                        <YAxis type="category" dataKey="label" width={105} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} axisLine={false} tickLine={false} />
                        <Tooltip cursor={{ fill: "color-mix(in srgb, var(--brand) 8%, transparent)" }} formatter={(_value, _name, item) => item.payload.display} contentStyle={{ borderRadius: 12, borderColor: "var(--border)", background: "var(--card)", color: "var(--ink)" }} />
                        <Bar dataKey="value" fill="var(--brand)" radius={[0, 7, 7, 0]} barSize={18} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </section>
              )}

              {project.processComparison && (
                <section data-testid="project-reader-process-section">
                  <SectionLabel>Before, meet after</SectionLabel>
                  <div className="mt-5 grid gap-4 sm:grid-cols-2" data-testid="project-reader-process-comparison">
                    <ProcessColumn title="AS-IS · Manual" items={project.processComparison.asIs} tone="muted" testId="project-reader-process-as-is" />
                    <ProcessColumn title="TO-BE · SPMS" items={project.processComparison.toBe} tone="brand" testId="project-reader-process-to-be" />
                  </div>
                </section>
              )}

              {project.comparison && (
                <section data-testid="project-reader-comparison-section">
                  <SectionLabel>{project.comparison.title}</SectionLabel>
                  <div className="mt-5 overflow-x-auto rounded-2xl border border-border" data-testid="project-reader-comparison-table-wrap">
                    <table className="w-full min-w-[34rem] text-left text-sm" data-testid="project-reader-comparison-table">
                      <thead className="bg-surface-subtle text-xs uppercase tracking-[0.12em] text-muted-foreground"><tr>{project.comparison.columns.map((column) => <th key={column} className="px-5 py-4" data-testid={`project-reader-comparison-heading-${slug(column)}`}>{column}</th>)}</tr></thead>
                      <tbody className="divide-y divide-border">{project.comparison.rows.map((row, rowIndex) => <tr key={row.join("-")} data-testid={`project-reader-comparison-row-${rowIndex + 1}`}>{row.map((cell, cellIndex) => <td key={`${cell}-${cellIndex}`} className={`px-5 py-4 ${cellIndex === 0 ? "font-semibold text-ink" : "text-muted-foreground"}`}>{cell}</td>)}</tr>)}</tbody>
                    </table>
                  </div>
                </section>
              )}

              {project.recommendations && project.recommendations.length > 0 && (
                <section data-testid="project-reader-recommendations-section">
                  <SectionLabel>So, what now?</SectionLabel>
                  <div className="mt-5 grid gap-3 sm:grid-cols-3" data-testid="project-reader-recommendations">
                    {project.recommendations.map((recommendation, index) => <div key={recommendation} className="rounded-2xl bg-ink p-5 text-background" data-testid={`project-reader-recommendation-${index + 1}`}><span className="font-mono text-xs text-brand-light">0{index + 1}</span><p className="mt-4 text-sm leading-6 text-background/80">{recommendation}</p></div>)}
                  </div>
                </section>
              )}

              <div className="rounded-2xl border-l-4 border-brand bg-brand/8 p-6" data-testid="project-reader-takeaway">
                <SectionLabel>The bit I'll remember</SectionLabel>
                <p className="mt-3 font-heading text-xl leading-8 text-ink sm:text-2xl" data-testid="project-reader-takeaway-text">{project.keyTakeaway}</p>
              </div>

              {project.reportNote && <p className="rounded-xl border border-dashed border-border px-4 py-3 text-xs text-muted-foreground" data-testid="project-reader-report-note">{project.reportNote}</p>}
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

function StoryBlock({ label, text, testId }: { label: string; text: string; testId: string }) {
  return <section data-testid={testId}><SectionLabel>{label}</SectionLabel><p className="mt-4 text-base leading-8 text-ink">{text}</p></section>;
}

function SectionLabel({ children }: { children: ReactNode }) {
  return <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand">{children}</p>;
}

function ProcessColumn({ title, items, tone, testId }: { title: string; items: string[]; tone: "muted" | "brand"; testId: string }) {
  return <div className={`rounded-2xl p-5 ${tone === "brand" ? "bg-brand text-white" : "bg-surface-subtle text-ink"}`} data-testid={testId}><h3 className="font-heading text-lg font-semibold">{title}</h3><div className="mt-5 space-y-3">{items.map((item, index) => <div key={item} className="flex items-center gap-3 text-sm"><span className={`grid size-6 shrink-0 place-items-center rounded-full font-mono text-[10px] ${tone === "brand" ? "bg-white/15" : "bg-card text-brand"}`}>{index + 1}</span><span>{item}</span>{index < items.length - 1 && <ArrowUpRight className="ml-auto size-3 rotate-45 opacity-50" aria-hidden="true" />}</div>)}</div></div>;
}

function slug(value: string) {
  return value.toLowerCase().replaceAll(" ", "-").replaceAll("/", "-").replaceAll("&", "and");
}
