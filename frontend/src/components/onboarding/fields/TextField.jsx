import FieldLabel from "./FieldLabel.jsx";

export default function TextField({
  label,
  required,
  optional,
  info,
  type = "text",
  value,
  onChange,
  placeholder,
  className = "",
}) {
  return (
    <div className={className}>
      <FieldLabel label={label} required={required} optional={optional} info={info} />
      <input
        type={type}
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg border border-neutral-200 px-3.5 py-2.5 text-[13.5px] text-neutral-800 outline-none placeholder:text-neutral-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}
