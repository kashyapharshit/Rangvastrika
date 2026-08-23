export default function Footer() {
  return (
    <footer
      className="w-full text-center py-4 text-sm text-white/80 border-t border-amber-900/40"
      style={{
        background:
          "linear-gradient(90deg, #2b1a12 0%, #4a2f1d 35%, #1f130c 100%)",
      }}
    >
      © {new Date().getFullYear()} Rangvastrika
    </footer>
  );
}