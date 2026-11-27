
interface NavbarProps {
  title: string;
  description?: string;
  eyebrow?: string;
}

export default function Navbar({
  title,
  description,
  eyebrow = "NEXUS ONE / WORKSPACE",
}: NavbarProps) {
  return (
    <section className="nexus-fade-in mb-10">

      {/* Small section label */}
      <div className="mb-4 flex items-center gap-2">

        <span className="h-1.5 w-1.5 rounded-full bg-accent" />

        <span className="nexus-eyebrow">
          {eyebrow}
        </span>

      </div>

      {/* Page title */}
      <h1 className="text-4xl font-medium tracking-[-0.045em] text-foreground sm:text-5xl lg:text-6xl">
        {title}
      </h1>

      {/* Description */}
      {description && (
        <p className="nexus-description mt-4 max-w-2xl">
          {description}
        </p>
      )}

    </section>
  );
}
