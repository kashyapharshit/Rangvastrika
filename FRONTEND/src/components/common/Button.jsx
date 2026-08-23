export default function Button({
  children,
  type = "button",
  className = "",
  style,
  ...props
}) {
  // Base classes for premium feel
  const base =
    "touch-target min-h-12 px-5 sm:px-6 py-3 sm:py-2.5 rounded-xl text-sm font-semibold text-white transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-none shadow-sm";

  return (
    <button
      type={type}
      className={`${base} ${className}`.trim()}
      style={{ backgroundColor: "#7a5236", ...style }}
      {...props}
    >
      {children}
    </button>
  );
}