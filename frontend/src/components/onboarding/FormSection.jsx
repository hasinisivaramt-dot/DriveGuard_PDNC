export default function FormSection({ title, subtitle, optional, children }) {
  return (
    <div className="rounded-2xl border border-neutral-100 bg-white p-5 shadow-card sm:p-6">
      {title && (
        <div className="mb-4">
          <h3 className="text-[14.5px] font-bold text-neutral-900">
            {title}
            {optional && <span className="ml-1.5 font-normal text-neutral-400">(Optional)</span>}
          </h3>
          {subtitle && <p className="mt-0.5 text-[12.5px] text-neutral-500">{subtitle}</p>}
        </div>
      )}
      {children}
    </div>
  );
}
