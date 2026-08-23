export default function Input({ label, id, ...props }) {
  return (
    <label className="input-group" htmlFor={id}>
      {label && <span>{label}</span>}
      <input id={id} className="input" {...props} />
    </label>
  );
}
