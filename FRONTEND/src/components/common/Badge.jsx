export default function Badge({ children }) {
  return (
    <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-1.5 rounded-full bg-[#7a5236] text-white text-[11px] font-semibold leading-none">
      {children}
    </span>
  );
}