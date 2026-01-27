import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left"
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-3",
        align === "center" ? "text-center" : "text-left"
      )}
    >
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-sky-200">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-2xl font-semibold text-white md:text-3xl">{title}</h2>
      {description ? (
        <p className="text-sm text-slate-300 md:text-base">{description}</p>
      ) : null}
    </div>
  );
}
