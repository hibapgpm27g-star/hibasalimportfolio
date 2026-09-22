import { ArrowUpRight, ExternalLink, Pencil, Trash2 } from "lucide-react";
import { motion } from "motion/react";
import type { KeyboardEvent } from "react";
import type { Project } from "@/lib/projects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface ProjectCardProps {
  project: Project;
  isAdmin: boolean;
  onOpen: (project: Project) => void;
  onEdit: (project: Project) => void;
  onDelete: (project: Project) => void;
}

export default function ProjectCard({ project, isAdmin, onOpen, onEdit, onDelete }: ProjectCardProps) {
  const handleCardKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onOpen(project);
    }
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 14 }}
      transition={{ duration: 0.32 }}
      role="button"
      tabIndex={0}
      onClick={() => onOpen(project)}
      onKeyDown={handleCardKeyDown}
      data-testid={`project-card-${project.id}`}
      className={`group cursor-pointer overflow-hidden rounded-[1.75rem] border-2 border-ink/15 bg-card text-left shadow-[6px_6px_0_var(--brand)] outline-none transition-[transform,box-shadow,border-color] duration-300 hover:-translate-y-1 hover:-rotate-[0.35deg] hover:border-ink hover:shadow-[10px_10px_0_var(--pop-lime)] focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-4 ${project.isFeatured ? "lg:col-span-2 lg:grid lg:grid-cols-[1.15fr_0.85fr]" : ""}`}
    >
      <div className={`relative aspect-[1.2/0.78] overflow-hidden bg-muted ${project.isFeatured ? "lg:aspect-auto lg:min-h-[31rem]" : ""}`} data-testid={`project-image-frame-${project.id}`}>
        <img
          src={project.image}
          alt={`${project.title} project preview`}
          data-testid={`project-image-${project.id}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
        <div className="absolute left-5 top-5 flex items-center gap-2" data-testid={`project-card-meta-${project.id}`}>
          <Badge className="border-white/20 bg-white/90 text-ink hover:bg-white" data-testid={`project-category-${project.id}`}>
            {project.category}
          </Badge>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/80" data-testid={`project-year-${project.id}`}>
            {project.year}
          </span>
        </div>
        {project.status === "in-progress" && (
          <span className="absolute right-5 top-5 inline-flex items-center gap-2 rounded-full bg-[#106b43] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-white" data-testid={`project-status-${project.id}`}>
            <span className="size-1.5 animate-pulse rounded-full bg-white" /> In progress
          </span>
        )}
        {project.isFeatured && (
          <span className="absolute bottom-5 left-5 font-mono text-[10px] uppercase tracking-[0.2em] text-white" data-testid={`project-featured-label-${project.id}`}>
            Start here · Featured deep-dive
          </span>
        )}
      </div>
      <div className={`space-y-4 p-6 sm:p-7 ${project.isFeatured ? "lg:flex lg:flex-col lg:justify-between lg:p-10" : ""}`} data-testid={`project-card-content-${project.id}`}>
        <div className="flex items-start justify-between gap-4" data-testid={`project-card-heading-${project.id}`}>
          <div>
            <h3 className="font-heading text-2xl font-semibold tracking-tight text-ink" data-testid={`project-title-${project.id}`}>
              {project.title}
            </h3>
            {project.brandMark && <span className="mt-2 inline-block font-heading text-xs font-semibold tracking-[0.24em] text-brand" data-testid={`project-brand-mark-${project.id}`}>{project.brandMark}</span>}
            <p className="mt-2 text-sm leading-6 text-muted-foreground" data-testid={`project-summary-${project.id}`}>
              {project.summary}
            </p>
          </div>
          <ArrowUpRight className="mt-1 size-5 shrink-0 text-brand transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" aria-hidden="true" />
        </div>
        <div className="flex flex-wrap gap-2" data-testid={`project-tools-${project.id}`}>
          {project.tools.map((tool) => (
            <span key={tool} className="rounded-full bg-muted px-3 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted-foreground" data-testid={`project-tool-${project.id}-${tool.toLowerCase().replaceAll(" ", "-")}`}>
              {tool}
            </span>
          ))}
        </div>
        <div className="flex items-center justify-between border-t border-border pt-4" data-testid={`project-card-footer-${project.id}`}>
          <span className="text-xs font-medium text-muted-foreground" data-testid={`project-role-${project.id}`}>{project.role}</span>
          {isAdmin ? (
            <div className="flex items-center gap-1" data-testid={`project-admin-actions-${project.id}`} onClick={(event) => event.stopPropagation()}>
              <Button type="button" size="icon-sm" variant="ghost" onClick={() => onEdit(project)} aria-label={`Edit ${project.title}`} data-testid={`admin-edit-project-button-${project.id}`}>
                <Pencil aria-hidden="true" />
              </Button>
              <Button type="button" size="icon-sm" variant="ghost" onClick={() => onDelete(project)} aria-label={`Delete ${project.title}`} data-testid={`admin-delete-project-button-${project.id}`}>
                <Trash2 aria-hidden="true" />
              </Button>
            </div>
          ) : (
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand" data-testid={`project-read-link-${project.id}`}>
              Open the evidence <ExternalLink className="size-3.5" aria-hidden="true" />
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
