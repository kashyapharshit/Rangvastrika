export default function Button({
  children,
  type = "button",
  className = "",
  style,
  ...props
}) {
  const base =
    "px-5 py-2 rounded-full text-sm font-medium text-white transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed";

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