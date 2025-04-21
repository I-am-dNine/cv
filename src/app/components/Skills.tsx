import { Badge } from "@/components/ui/badge";
import { Section } from "@/components/ui/section";
import { RESUME_DATA } from "@/data/resume-data";
import { cn } from "@/lib/utils";

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
}

/**
 * Renders a list of skills as badges
 */
function SkillsList({ skills, className, title }: SkillsListProps) {
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
}

/**
 * Skills section component
 * Displays categorized lists of professional skills as badges
 */
export function Skills({ skills, className }: SkillsProps) {
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
        />
        <SkillsList 
          skills={skills.familiar} 
          title="Familiar" 
          aria-labelledby="skills-section" 
        />
        <SkillsList 
          skills={skills.tools} 
          title="Tools & Workflow" 
          aria-labelledby="skills-section" 
        />
      </div>
    </Section>
  );
}
