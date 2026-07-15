type GridBgProps = {
  /** "light" for use on white/light section backgrounds,
   *  "dark" for use on black/video/dark section backgrounds. */
  variant?: "light" | "dark";
  size?: number;
  className?: string;
};

// Reusable technical grid texture — kept as its own component (instead of
// one global fixed layer) precisely because a single hardcoded color/opacity
// can't read correctly on both light and dark section backgrounds at once.
// Each section renders this itself, the same way sections already render
// <NoisyBg />, and just picks the variant that matches its own background.
const GridBg = ({
  variant = "light",
  size = 40,
  className = "",
}: GridBgProps) => {
  const lineColor = variant === "dark" ? "#ffffff14" : "#0f172a08";

  return (
    <div
      aria-hidden
      className={`absolute inset-0 pointer-events-none ${
        variant === "dark" ? "mix-blend-overlay" : ""
      } ${className}`}
      style={{
        backgroundImage: `linear-gradient(to right, ${lineColor} 1px, transparent 1px), linear-gradient(to bottom, ${lineColor} 1px, transparent 1px)`,
        backgroundSize: `${size}px ${size}px`,
      }}
    />
  );
};

export default GridBg;
