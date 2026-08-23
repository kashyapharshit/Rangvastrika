export default function Loader({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-10 text-sm font-medium text-[#7a5236]">
      {/* Two-tone spinner */}
      <span className="h-8 w-8 rounded-full border-4 border-[#7a5236]/20 border-t-[#7a5236] animate-spin shadow-sm" />
      <span className="animate-pulse tracking-wide">{text}</span>
    </div>
  );
}