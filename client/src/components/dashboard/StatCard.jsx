const StatCard = ({ title, value, hint }) => (
  <div className="panel flex h-[120px] flex-col justify-between p-4">
    <div className="flex items-start justify-between">
      <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-app-muted">
        {title}
      </p>
      <span className="text-app-outline-strong">•</span>
    </div>
    <div className="flex items-end gap-2">
      <p className="text-3xl font-bold tracking-tight text-app-text">{value}</p>
      <p className="pb-1 text-xs text-app-secondary">{hint}</p>
    </div>
  </div>
);

export default StatCard;
