interface KpiCardProps {
  value: string;
  label: string;
  detail: string;
}

export function KpiCard({ value, label, detail }: KpiCardProps) {
  return (
    <div className="rounded-lg border-l-[3px] border-l-sustainability bg-white p-5 text-center shadow-sm">
      <p className="text-3xl font-extrabold text-primary">{value}</p>
      <p className="mt-1 text-sm font-semibold text-neutral-700">{label}</p>
      <p className="mt-0.5 text-xs text-neutral-400">{detail}</p>
    </div>
  );
}
