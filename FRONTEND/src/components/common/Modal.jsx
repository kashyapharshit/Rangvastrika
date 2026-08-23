export default function Modal({ open, title, children, onClose }) {
  if (!open) return null;

  return (
    <div className="modal-overlay" role="presentation" onClick={onClose}>
      <div className="modal" role="dialog" aria-modal="true" onClick={(e) => e.stopPropagation()}>
        <div className="row-between">
          <h3>{title}</h3>
          <button className="link-btn" onClick={onClose}>Close</button>
        </div>
        {children}
      </div>
    </div>
  );
}
