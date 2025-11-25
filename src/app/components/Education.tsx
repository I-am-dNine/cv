import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import { RESUME_DATA } from "@/data/resume-data";
import { EditableField } from "@/components/ui/editable-field";

type Education = (typeof RESUME_DATA)["education"][number];

interface EducationPeriodProps {
  start: Education["start"];
  end: Education["end"];
  isEditing: boolean;
  onUpdate: (field: string, value: string) => void;
}

/**
 * Displays the education period in a consistent format
 */
function EducationPeriod({ start, end, isEditing, onUpdate }: EducationPeriodProps) {
  if (isEditing) {
    return (
      <div className="flex gap-2 text-sm tabular-nums text-gray-500">
        <EditableField
          value={start}
          onSave={(val) => onUpdate("start", val)}
          isEditing={isEditing}
          className="w-20"
        />
        <span>-</span>
        <EditableField
          value={end}
          onSave={(val) => onUpdate("end", val)}
          isEditing={isEditing}
          className="w-20"
        />
      </div>
    );
  }
  return (
    <div
      className="text-sm tabular-nums text-gray-500"
      aria-label={`Period: ${start} to ${end}`}
    >
      {start} – {end}
    </div>
  );
}

interface EducationItemProps {
  education: Education;
  isEditing: boolean;
  onUpdate: (field: string, value: string) => void;
}

/**
 * Individual education card component
 */
function EducationItem({ education, isEditing, onUpdate }: EducationItemProps) {
  const { school, start, end, degree } = education;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between gap-x-2 text-base">
          <h3
            className="cv-education-subtle leading-none text-[10.5pt]"
            id={`education-${school.toLowerCase().replace(/\s+/g, "-")}`}
          >
            <EditableField
              value={school}
              onSave={(val) => onUpdate("school", val)}
              isEditing={isEditing}
            />
          </h3>
          <EducationPeriod
            start={start}
            end={end}
            isEditing={isEditing}
            onUpdate={onUpdate}
          />
        </div>
      </CardHeader>
      <CardContent
        className="cv-education-subtle mt-2 text-[10.3pt] text-foreground/80 print:text-[11px]"
        aria-labelledby={`education-${school
          .toLowerCase()
          .replace(/\s+/g, "-")}`}
      >
        <EditableField
          value={degree}
          onSave={(val) => onUpdate("degree", val)}
          isEditing={isEditing}
        />
      </CardContent>
    </Card>
  );
}

interface EducationListProps {
  education: readonly Education[];
  isEditing?: boolean;
  onUpdate?: (value: any) => void;
}

/**
 * Main education section component
 * Renders a list of education experiences
 */
export function Education({ education, isEditing = false, onUpdate = () => { } }: EducationListProps) {
  const handleUpdate = (index: number, field: string, value: any) => {
    const newEducation = [...education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    onUpdate(newEducation);
  };

  return (
    <Section>
      <h2 className="cv-section-title" id="education-section">
        Education
      </h2>
      <div
        className="space-y-[10pt]"
        role="feed"
        aria-labelledby="education-section"
      >
        {education.map((item, index) => (
          <article key={item.school} role="article">
            <EducationItem
              education={item}
              isEditing={isEditing}
              onUpdate={(field, value) => handleUpdate(index, field, value)}
            />
          </article>
        ))}
      </div>
    </Section>
  );
}
