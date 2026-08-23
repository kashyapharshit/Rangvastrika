export default function Input({
  label,
  id,
  className = "",
  labelClassName = "",
  ...props
}) {
  return (
    <label
      className={`flex flex-col gap-1 ${labelClassName}`.trim()}
      htmlFor={id}
    >
      {label && (
        <span className="text-sm font-medium text-[#4a2f1d]">{label}</span>
      )}
      <input
        id={id}
        className={`rounded-xl border border-amber-900/20 focus:border-[#7a5236] focus:ring-1 focus:ring-[#7a5236] px-4 py-2 text-sm text-[#2b1a12] placeholder-gray-400 outline-none transition ${className}`.trim()}
        {...props}
      />
    </label>
  );
}