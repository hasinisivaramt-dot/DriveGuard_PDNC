import FieldLabel from "./FieldLabel.jsx";

export default function TextAreaField({
  label,
  required,
  optional,
  info,
  value,
  onChange,
  placeholder,
  rows = 3,
  className = "",
}) {
  return (
    <div className={className}>
      <FieldLabel label={label} required={required} optional={optional} info={info} />
      <textarea
        value={value ?? ""}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        rows={rows}
        className="w-full resize-none rounded-lg border border-neutral-200 px-3.5 py-2.5 text-[13.5px] text-neutral-800 outline-none placeholder:text-neutral-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}
