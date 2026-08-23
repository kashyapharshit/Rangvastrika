export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;

  return (
    <div
      // Background ab thoda dhundhla (blur) ho jayega
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity"
      role="presentation"
      onClick={onClose}
    >
      <div
        // Modal box ab zyada premium aur rounded-3xl hai
        className="bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[85vh] overflow-y-auto p-6 sm:p-8"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-gray-100">
          <h3 className="text-xl font-serif font-bold text-[#2b1a12]">{title}</h3>
          
          {/* Close Button UI updated */}
          <button
            className="w-8 h-8 flex items-center justify-center rounded-full bg-gray-50 text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors"
            onClick={onClose}
            title="Close"
          >
            ✕
          </button>
        </div>
        
        {/* Modal Content */}
        <div className="text-gray-700">
          {children}
        </div>
      </div>
    </div>
  );
}