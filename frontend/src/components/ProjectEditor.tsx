import { useEffect, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { categories, type Project, type ProjectCategory, type ProjectInput } from "@/lib/projects";

interface ProjectEditorProps {
  open: boolean;
  project: Project | null;
  onOpenChange: (open: boolean) => void;
  onSave: (project: ProjectInput) => void;
}

const blankProject: ProjectInput = {
  title: "",
  summary: "",
  role: "",
  tools: [],
  year: new Date().getFullYear().toString(),
  category: "Marketing",
  image: "",
  liveLink: "",
  caseStudyLink: "",
  details: "",
  impactMetrics: [],
  keyTakeaway: "",
  isFeatured: false,
};

export default function ProjectEditor({ open, project, onOpenChange, onSave }: ProjectEditorProps) {
  const [form, setForm] = useState<ProjectInput>(blankProject);

  useEffect(() => {
    if (open) setForm(project ? { ...project } : { ...blankProject });
  }, [open, project]);

  const update = (field: keyof ProjectInput, value: string | boolean | string[]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSave({
      ...form,
      tools: form.tools.filter(Boolean),
      impactMetrics: form.impactMetrics.filter(Boolean),
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent showCloseButton={false} className="max-h-[90vh] overflow-y-auto border-2 border-ink bg-background p-0 sm:max-w-2xl" data-testid="project-editor-dialog">
        <form onSubmit={submit} data-testid="project-editor-form">
          <DialogHeader className="border-b-2 border-ink bg-autumn-lavender px-6 py-6 text-[#25151f] sm:px-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-brand" data-testid="project-editor-kicker">Admin studio / project record</p>
            <DialogTitle className="font-heading text-3xl font-semibold text-ink" data-testid="project-editor-title">{project ? "Edit project" : "Add a new project"}</DialogTitle>
            <DialogDescription data-testid="project-editor-description">Keep the portfolio current with the story, signals, and links a recruiter needs to act.</DialogDescription>
            <DialogClose render={<Button type="button" variant="ghost" size="icon-sm" className="absolute right-4 top-4" data-testid="project-editor-close-button" />}>
              <X aria-hidden="true" />
              <span className="sr-only">Close project editor</span>
            </DialogClose>
          </DialogHeader>
          <div className="grid gap-5 px-6 py-6 sm:grid-cols-2 sm:px-8" data-testid="project-editor-fields">
            <Field label="Project title" testId="project-title-field" className="sm:col-span-2">
              <Input required value={form.title} onChange={(event) => update("title", event.target.value)} placeholder="e.g. Retail Growth Strategy" data-testid="project-editor-title-input" />
            </Field>
            <Field label="Category" testId="project-category-field">
              <select required value={form.category} onChange={(event) => update("category", event.target.value as ProjectCategory)} className="h-9 w-full rounded-lg border border-input bg-transparent px-2.5 text-sm text-ink outline-none focus-visible:border-brand focus-visible:ring-3 focus-visible:ring-brand/20" data-testid="project-editor-category-select">
                {categories.map((category) => <option key={category} value={category}>{category}</option>)}
              </select>
            </Field>
            <Field label="Year" testId="project-year-field">
              <Input required value={form.year} onChange={(event) => update("year", event.target.value)} placeholder="2025" data-testid="project-editor-year-input" />
            </Field>
            <Field label="Your role" testId="project-role-field">
              <Input required value={form.role} onChange={(event) => update("role", event.target.value)} placeholder="Strategy Analyst" data-testid="project-editor-role-input" />
            </Field>
            <Field label="Cover image URL" testId="project-image-field">
              <Input required type="url" value={form.image} onChange={(event) => update("image", event.target.value)} placeholder="https://..." data-testid="project-editor-image-input" />
            </Field>
            <Field label="Short summary" testId="project-summary-field" className="sm:col-span-2">
              <Textarea required value={form.summary} onChange={(event) => update("summary", event.target.value)} placeholder="The one-line result this project created." data-testid="project-editor-summary-input" />
            </Field>
            <Field label="Tools (comma separated)" testId="project-tools-field" className="sm:col-span-2">
              <Input value={form.tools.join(", ")} onChange={(event) => update("tools", event.target.value.split(",").map((tool) => tool.trim()))} placeholder="Power BI, SQL, Market sizing" data-testid="project-editor-tools-input" />
            </Field>
            <Field label="Live link" testId="project-live-link-field">
              <Input type="url" value={form.liveLink} onChange={(event) => update("liveLink", event.target.value)} placeholder="https://..." data-testid="project-editor-live-link-input" />
            </Field>
            <Field label="Case-study link" testId="project-case-link-field">
              <Input type="url" value={form.caseStudyLink} onChange={(event) => update("caseStudyLink", event.target.value)} placeholder="https://..." data-testid="project-editor-case-link-input" />
            </Field>
            <Field label="Detailed story" testId="project-details-field" className="sm:col-span-2">
              <Textarea value={form.details} onChange={(event) => update("details", event.target.value)} placeholder="What was the challenge, approach, and recommendation?" data-testid="project-editor-details-input" />
            </Field>
            <Field label="Impact metrics (one per line)" testId="project-impact-field" className="sm:col-span-2">
              <Textarea value={form.impactMetrics.join("\n")} onChange={(event) => update("impactMetrics", event.target.value.split("\n"))} placeholder="12% efficiency opportunity\n3 scenarios modeled" data-testid="project-editor-impact-input" />
            </Field>
            <Field label="Key takeaway" testId="project-takeaway-field" className="sm:col-span-2">
              <Input value={form.keyTakeaway} onChange={(event) => update("keyTakeaway", event.target.value)} placeholder="The strategic lesson in one sentence." data-testid="project-editor-takeaway-input" />
            </Field>
            <label className="flex items-center gap-3 text-sm font-medium text-ink sm:col-span-2" data-testid="project-featured-field">
              <input type="checkbox" checked={form.isFeatured} onChange={(event) => update("isFeatured", event.target.checked)} className="size-4 accent-[var(--brand)]" data-testid="project-editor-featured-checkbox" />
              Feature this project at the top of the grid
            </label>
          </div>
          <DialogFooter className="border-t-2 border-ink bg-peony-bundle px-6 py-4 sm:px-8" data-testid="project-editor-footer">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} data-testid="project-editor-cancel-button">Cancel</Button>
            <Button type="submit" className="bg-tropical-rain text-white hover:bg-monet-ponds" data-testid="admin-save-project-button">{project ? "Save changes" : "Add project"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function Field({ label, testId, children, className = "" }: { label: string; testId: string; children: ReactNode; className?: string }) {
  return (
    <label className={`grid gap-2 text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground ${className}`} data-testid={testId}>
      <span data-testid={`${testId}-label`}>{label}</span>
      {children}
    </label>
  );
}
