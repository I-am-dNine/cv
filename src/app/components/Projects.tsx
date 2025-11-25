import { Badge } from "../../components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../../components/ui/card";
import { Section } from "../../components/ui/section";
import { RESUME_DATA } from "../../data/resume-data";
import { EditableField } from "@/components/ui/editable-field";

type ProjectTags = readonly string[];

interface ProjectLinkProps {
  title: string;
  link?: string;
  isEditing: boolean;
  onUpdate: (field: string, value: string) => void;
}

/**
 * Renders project title with optional link and status indicator
 */
function ProjectLink({ title, link, isEditing, onUpdate }: ProjectLinkProps) {
  if (isEditing) {
    return (
      <div className="flex flex-col gap-1">
        <EditableField
          value={title}
          onSave={(val) => onUpdate("title", val)}
          isEditing={isEditing}
          className="font-semibold"
        />
        <EditableField
          value={link || ""}
          onSave={(val) => onUpdate("link", val)}
          isEditing={isEditing}
          className="text-xs font-normal"
          label="Link"
        />
      </div>
    );
  }

  if (!link) {
    return <span>{title}</span>;
  }

  return (
    <>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 hover:underline"
        aria-label={`${title} project (opens in new tab)`}
      >
        {title}
        <span
          className="size-1 rounded-full bg-green-500"
          aria-label="Active project indicator"
        />
      </a>
      <div
        className="hidden font-mono text-xs underline print:visible"
        aria-hidden="true"
      >
        {link.replace("https://", "").replace("www.", "").replace("/", "")}
      </div>
    </>
  );
}

interface ProjectTagsProps {
  tags: ProjectTags;
}

/**
 * Renders a list of technology tags used in the project
 */
function ProjectTags({ tags }: ProjectTagsProps) {
  if (tags.length === 0) return null;

  return (
    <ul
      className="mt-2 flex list-none flex-wrap gap-1 p-0"
      aria-label="Technologies used"
    >
      {tags.map((tag) => (
        <li key={tag}>
          <Badge
            className="px-1 py-0 text-[10px] print:px-1 print:py-0.5 print:text-[8px] print:leading-tight"
            variant="secondary"
          >
            {tag}
          </Badge>
        </li>
      ))}
    </ul>
  );
}

interface ProjectCardProps {
  title: string;
  description: string;
  tags: ProjectTags;
  link?: string;
  isEditing: boolean;
  onUpdate: (field: string, value: any) => void;
}

/**
 * Card component displaying project information
 */
function ProjectCard({ title, description, tags, link, isEditing, onUpdate }: ProjectCardProps) {
  return (
    <Card
      className="flex h-full flex-col overflow-hidden border p-3"
      role="article"
    >
      <CardHeader>
        <div className="space-y-1">
          <CardTitle className="text-base">
            <ProjectLink
              title={title}
              link={link}
              isEditing={isEditing}
              onUpdate={onUpdate}
            />
          </CardTitle>
          <CardDescription
            className="text-pretty font-mono text-xs print:text-[10px]"
            aria-label="Project description"
          >
            <EditableField
              value={description}
              onSave={(val) => onUpdate("description", val)}
              isEditing={isEditing}
              multiline
            />
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="mt-auto flex">
        <ProjectTags tags={tags} />
      </CardContent>
    </Card>
  );
}

interface ProjectsProps {
  projects: readonly {
    title: string;
    techStack: readonly string[];
    description: string;
    link?: {
      label: string;
      href: string;
    };
  }[];
  isEditing?: boolean;
  onUpdate?: (value: any) => void;
}

/**
 * Section component displaying all side projects
 */
export function Projects({ projects, isEditing = false, onUpdate = () => { } }: ProjectsProps) {
  if (!projects || projects.length === 0) {
    return null;
  }

  const handleUpdate = (index: number, field: string, value: any) => {
    const newProjects = [...projects];
    if (field === "link") {
      // Handle link object update if needed, but for now assuming string or simple object structure
      // The original data has link as { label, href } or string?
      // Looking at resume-data.tsx, projects have link: { label, href }
      // But ProjectCard expects link as string.
      // Let's check how it was passed.
      // In original Projects component: link={"link" in project ? project.link.href : undefined}
      // So we are updating the href.
      const currentLink = newProjects[index].link;
      if (currentLink && typeof currentLink === 'object') {
        newProjects[index] = { ...newProjects[index], link: { ...currentLink, href: value } };
      }
    } else {
      newProjects[index] = { ...newProjects[index], [field]: value };
    }
    onUpdate(newProjects);
  };

  if (!projects || projects.length === 0) return null;

  return (
    <Section className="print-force-new-page scroll-mb-16 print:space-y-4 print:pt-12">
      <h2 className="cv-section-title" id="side-projects">
        Side projects
      </h2>
      <div
        className="-mx-3 grid grid-cols-1 gap-4 print:grid-cols-3 print:gap-[10pt] md:grid-cols-2 lg:grid-cols-3"
        role="feed"
        aria-labelledby="side-projects"
      >
        {projects.map((project, index) => (
          <article
            key={project.title}
            className="h-full" // Added h-full here
          >
            <ProjectCard
              title={project.title}
              description={project.description}
              tags={project.techStack}
              link={project.link ? project.link.href : undefined}
              isEditing={isEditing}
              onUpdate={(field, value) => handleUpdate(index, field, value)}
            />
          </article>
        ))}
      </div>
    </Section>
  );
}
