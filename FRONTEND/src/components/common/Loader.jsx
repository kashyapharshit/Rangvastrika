export default function Loader({ text = "Loading..." }) {
  return (
    <div className="flex items-center justify-center gap-2 py-6 text-sm text-[#4a2f1d]">
      <span className="h-4 w-4 rounded-full border-2 border-[#7a5236] border-t-transparent animate-spin" />
      {text}
    </div>
  );
}