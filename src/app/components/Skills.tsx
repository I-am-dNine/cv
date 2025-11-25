import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";
import { RESUME_DATA } from "@/data/resume-data";
import { cn } from "@/lib/utils";
import { EditableField } from "@/components/ui/editable-field";

type SkillsList = readonly string[];

interface SkillsCategories {
  core: SkillsList;
  familiar: SkillsList;
  tools: SkillsList;
}

interface SkillsListProps {
  skills: SkillsList;
  className?: string;
  title?: string;
  isEditing?: boolean;
  onUpdate?: (value: string[]) => void;
}

/**
 * Renders a list of skills with middot separators
 */
function SkillsList({ skills, className, title, isEditing, onUpdate }: SkillsListProps) {
  if (isEditing && onUpdate) {
    return (
      <div className="space-y-2 print:space-y-1">
        {title && <h3 className="text-sm font-medium text-muted-foreground print:text-xs">{title}</h3>}
        <EditableField
          value={skills.join(", ")}
          onSave={(val) => onUpdate(val.split(",").map(s => s.trim()).filter(Boolean))}
          isEditing={isEditing}
          multiline
          className="text-xs"
        />
      </div>
    );
  }

  // Split skills into two lines intelligently (max 6 per line)
  const midpoint = Math.ceil(skills.length / 2);
  const line1 = skills.slice(0, Math.min(6, midpoint));
  const line2 = skills.slice(line1.length);

  return (
    <div className="space-y-1.5 print:space-y-1">
      {title && <h3 className="text-sm font-semibold text-muted-foreground print:text-xs">{title}</h3>}
      <div className="cv-skills-compact text-foreground/80">
        <p className="cv-body">
          {line1.join(' · ')}
        </p>
        {line2.length > 0 && (
          <p className="cv-body">
            {line2.join(' · ')}
          </p>
        )}
      </div>
    </div>
  );
}

interface SkillsProps {
  skills: SkillsCategories;
  className?: string;
  isEditing?: boolean;
  onUpdate?: (value: any) => void;
}

/**
 * Skills section component
 * Displays categorized lists of professional skills as badges
 */
export function Skills({ skills, className, isEditing = false, onUpdate = () => { } }: SkillsProps) {
  const handleUpdate = (category: keyof SkillsCategories, value: string[]) => {
    const newSkills = { ...skills, [category]: value };
    onUpdate(newSkills);
  };

  return (
    <Section className={`${className} mb-[16pt]`}>
      <h2 className="cv-section-title" id="skills-section">
        Skills
      </h2>
      <div className="space-y-3 print:space-y-2">
        <SkillsList
          skills={skills.core}
          title="Core"
          aria-labelledby="skills-section"
          isEditing={isEditing}
          onUpdate={(val) => handleUpdate("core", val)}
        />
        <SkillsList
          skills={skills.familiar}
          title="Familiar"
          aria-labelledby="skills-section"
          isEditing={isEditing}
          onUpdate={(val) => handleUpdate("familiar", val)}
        />
        <SkillsList
          skills={skills.tools}
          title="Tools & Workflow"
          aria-labelledby="skills-section"
          isEditing={isEditing}
          onUpdate={(val) => handleUpdate("tools", val)}
        />
      </div>
    </Section>
  );
}
