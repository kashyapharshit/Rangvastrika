export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[85vh] overflow-y-auto p-6"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-amber-900/10">
          <h3 className="text-lg font-semibold text-[#2b1a12]">{title}</h3>
          <button
            className="text-sm text-gray-500 hover:text-[#4a2f1d] transition"
            onClick={onClose}
          >
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}