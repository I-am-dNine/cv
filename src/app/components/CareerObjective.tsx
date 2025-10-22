import { RESUME_DATA } from "@/data/resume-data";
import { Section } from "../../components/ui/section";

interface CareerObjectiveProps {
  careerObjective: typeof RESUME_DATA.careerObjective;
  className?: string;
}

/**
 * Career Objective section component
 * Displays career goals and job application objectives
 */
export function CareerObjective({ careerObjective, className }: CareerObjectiveProps) {
  return (
    <Section className={className}>
      <h2 className="text-xl font-bold" id="career-objective-section">
        求職目標
      </h2>
      <div
        className="text-pretty font-mono text-sm text-foreground/80 print:text-[12px]"
        aria-labelledby="career-objective-section"
      >
        {careerObjective}
      </div>
    </Section>
  );
}
