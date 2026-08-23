export default function Badge({ children }) {
  return (
    <span className="inline-flex items-center justify-center min-w-[20px] h-[20px] px-1.5 rounded-full bg-[#7a5236] text-white text-[11px] font-bold tracking-wide leading-none shadow-sm border border-white">
      {children}
    </span>
  );
}