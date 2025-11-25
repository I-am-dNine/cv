import { RESUME_DATA } from "@/data/resume-data";
import { Section } from "../../components/ui/section";
import { EditableField } from "@/components/ui/editable-field";

interface AboutProps {
  summary: string;
  className?: string;
  isEditing?: boolean;
  onUpdate?: (value: string) => void;
}

/**
 * Summary section component
 * Displays a summary of professional experience and goals
 */
export function Summary({ summary, className, isEditing = false, onUpdate = () => { } }: AboutProps) {
  return (
    <Section className={className}>
      <h2 className="cv-section-title" id="about-section">
        Summary
      </h2>
      <div
        className="cv-body text-pretty text-foreground/80"
        aria-labelledby="about-section"
      >
        <EditableField
          value={summary}
          onSave={onUpdate}
          isEditing={isEditing}
          multiline
          markdown
        />
      </div>
    </Section>
  );
}
