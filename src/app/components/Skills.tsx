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
 * Renders a list of skills as badges
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

  return (
    <div className="space-y-2 print:space-y-1">
      {title && <h3 className="text-sm font-medium text-muted-foreground print:text-xs">{title}</h3>}
      <ul
        className={cn("flex list-none flex-wrap gap-1 p-0 print:gap-[2px]", className)}
        aria-label="List of skills"
      >
        {skills.map((skill) => (
          <li key={skill}>
            <Badge className="print:text-[10px] print:py-0" aria-label={`Skill: ${skill}`}>
              {skill}
            </Badge>
          </li>
        ))}
      </ul>
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
    <Section className={className}>
      <h2 className="text-xl font-bold print:text-base print:mb-1" id="skills-section">
        Skills
      </h2>
      <div className="space-y-4 print:space-y-2">
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
