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
      <h2 className="text-xl font-bold" id="about-section">
        Summary
      </h2>
      <div
        className="text-pretty font-mono text-sm text-foreground/80 print:text-[12px]"
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
