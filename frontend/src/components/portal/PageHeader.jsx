export default function PageHeader({ title, subtitle, action }) {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h1 className="text-[19px] font-bold text-neutral-900">{title}</h1>
        {subtitle && <p className="mt-0.5 text-[13px] text-neutral-500">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
