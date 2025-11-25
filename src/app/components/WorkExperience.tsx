import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { RESUME_DATA } from "@/data/resume-data";
import { cn } from "@/lib/utils";
import { EditableField } from "@/components/ui/editable-field";

type WorkExperience = (typeof RESUME_DATA)["work"][number];
type WorkBadges = readonly string[];

interface BadgeListProps {
  className?: string;
  badges: WorkBadges;
}

/**
 * Renders a list of badges for work experience
 * Handles both mobile and desktop layouts through className prop
 */
function BadgeList({ className, badges }: BadgeListProps) {
  if (badges.length === 0) return null;

  return (
    <ul
      className={cn("inline-flex list-none gap-x-1 p-0", className)}
      aria-label="Technologies used"
    >
      {badges.map((badge) => (
        <li key={badge}>
          <Badge
            variant="secondary"
            className="align-middle text-xs print:px-1 print:py-0.5 print:text-[8px] print:leading-tight"
          >
            {badge}
          </Badge>
        </li>
      ))}
    </ul>
  );
}

interface WorkPeriodProps {
  start: WorkExperience["start"];
  end?: WorkExperience["end"];
  isEditing: boolean;
  onUpdate: (field: string, value: string) => void;
}

/**
 * Displays the work period in a consistent format
 */
function WorkPeriod({ start, end, isEditing, onUpdate }: WorkPeriodProps) {
  if (isEditing) {
    return (
      <div className="flex items-center gap-2 text-sm tabular-nums text-gray-500">
        <div className="w-24">
          <EditableField
            value={start}
            onSave={(val) => onUpdate("start", val)}
            isEditing={isEditing}
            label="Start"
          />
        </div>
        <span>-</span>
        <div className="w-24">
          <EditableField
            value={end ?? ""}
            onSave={(val) => onUpdate("end", val)}
            isEditing={isEditing}
            label="End"
          />
        </div>
      </div>
    );
  }
  return (
    <div
      className="text-sm tabular-nums text-gray-500"
      aria-label={`Employment period: ${start} to ${end ?? "Present"}`}
    >
      {start} – {end ?? "Present"}
    </div>
  );
}

interface CompanyLinkProps {
  company: WorkExperience["company"];
  link: WorkExperience["link"];
  isEditing: boolean;
  onUpdate: (field: string, value: string) => void;
}

/**
 * Renders company name with optional link
 */
function CompanyLink({ company, link, isEditing, onUpdate }: CompanyLinkProps) {
  if (isEditing) {
    return (
      <div className="flex flex-col gap-4">
        <EditableField
          value={company}
          onSave={(val) => onUpdate("company", val)}
          isEditing={isEditing}
          className="font-semibold text-base"
          label="Company"
        />
        <EditableField
          value={link}
          onSave={(val) => onUpdate("link", val)}
          isEditing={isEditing}
          className="text-xs font-normal"
          label="Website URL"
        />
      </div>
    );
  }

  return (
    <a
      className="hover:underline"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${company} company website`}
    >
      {company}
    </a>
  );
}

interface WorkExperienceItemProps {
  work: WorkExperience;
  isEditing: boolean;
  onUpdate: (field: string, value: any) => void;
}

/**
 * Individual work experience card component
 * Handles responsive layout for badges (mobile/desktop)
 */
function WorkExperienceItem({ work, isEditing, onUpdate }: WorkExperienceItemProps) {
  const { company, link, badges, title, start, end, description } = work;

  return (
    <Card className="py-1 print:py-0">
      <CardHeader className="print:space-y-1">
        <div className="flex items-center justify-between gap-x-2 text-base">
          <h3 className="inline-flex items-center justify-center gap-x-1 font-semibold leading-none print:text-sm">
            <CompanyLink
              company={company}
              link={link}
              isEditing={isEditing}
              onUpdate={onUpdate}
            />
            <BadgeList
              className="hidden gap-x-1 sm:inline-flex"
              badges={badges}
            />
          </h3>
          <WorkPeriod
            start={start}
            end={end}
            isEditing={isEditing}
            onUpdate={onUpdate}
          />
        </div>

        <h4 className="font-mono text-sm font-semibold leading-none print:text-[12px]">
          <EditableField
            value={title}
            onSave={(val) => onUpdate("title", val)}
            isEditing={isEditing}
          />
        </h4>
      </CardHeader>

      <CardContent>
        <div className="cv-technical-highlights mt-2 text-xs text-foreground/80 print:mt-1 print:text-[10px] text-pretty">
          <EditableField
            value={description}
            onSave={(val) => onUpdate("description", val)}
            isEditing={isEditing}
            multiline
            markdown
          />
        </div>
        <div className="mt-2">
          <BadgeList
            className="-mx-2 flex-wrap gap-1 sm:hidden"
            badges={badges}
          />
        </div>
      </CardContent>
    </Card>
  );
}

interface WorkExperienceProps {
  work: (typeof RESUME_DATA)["work"];
  isEditing?: boolean;
  onUpdate?: (value: any) => void;
}

/**
 * Main work experience section component
 * Renders a list of work experiences in chronological order
 */
export function WorkExperience({ work, isEditing = false, onUpdate = () => { } }: WorkExperienceProps) {
  const handleUpdate = (index: number, field: string, value: any) => {
    const newWork = [...work];
    newWork[index] = { ...newWork[index], [field]: value };
    onUpdate(newWork);
  };

  return (
    <Section>
      <h2 className="cv-section-title" id="work-experience">
        Work Experience
      </h2>
      <div className="space-y-[10pt] print:space-y-[10pt]" role="feed" aria-labelledby="work-experience">
        {work.map((item, index) => (
          <article key={`${item.company}-${item.start}`} role="article">
            <WorkExperienceItem
              work={item}
              isEditing={isEditing}
              onUpdate={(field, value) => handleUpdate(index, field, value)}
            />
          </article>
        ))}
      </div>
    </Section>
  );
}
