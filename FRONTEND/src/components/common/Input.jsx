export default function Input({
  label,
  id,
  className = "",
  labelClassName = "",
  ...props
}) {
  return (
    <label
      className={`flex flex-col gap-1.5 ${labelClassName}`.trim()}
      htmlFor={id}
    >
      {label && (
        <span className="text-sm font-semibold text-[#2b1a12] ml-1">{label}</span>
      )}
      <input
        id={id}
        className={`w-full rounded-xl border border-gray-300 bg-gray-50/50 focus:bg-white focus:border-[#7a5236] focus:ring-4 focus:ring-[#7a5236]/15 px-4 py-3 text-sm text-[#2b1a12] placeholder-gray-400 outline-none transition-all duration-200 shadow-sm ${className}`.trim()}
        {...props}
      />
    </label>
  );
}