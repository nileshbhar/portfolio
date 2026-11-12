import { Download, Mail } from "lucide-react";
import Button from "@/components/ui/Button";
import { personal } from "@/data/personal";

/**
 * "Download CV" that never links to a missing file.
 * When personal.resume.available is false it becomes an email request instead.
 */
export default function ResumeButton({ variant = "secondary", className }) {
  const { resume, email } = personal;

  if (resume.available) {
    return (
      <Button href={resume.path} download={resume.fileName} variant={variant} icon={Download} className={className}>
        Download CV
      </Button>
    );
  }

  return (
    <Button
      href={`mailto:${email}?subject=${encodeURIComponent("CV request")}`}
      variant={variant}
      icon={Mail}
      className={className}
      title="CV available on request"
    >
      Request CV
    </Button>
  );
}
