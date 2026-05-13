const EmptyState = ({ title, description, onAction }) => (
  <div className="panel flex flex-col items-center justify-center gap-4 px-8 py-16 text-center">
    {onAction ? (
      <button
        type="button"
        onClick={onAction}
        className="flex h-20 w-20 cursor-pointer items-center justify-center rounded-full bg-zinc-100 text-3xl text-gray-700 transition hover:bg-zinc-200 hover:text-gray-900"
        aria-label="Add application"
      >
        <span>+</span>
      </button>
    ) : (
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-100 text-3xl text-gray-700">
        <span>+</span>
      </div>
    )}
    <div className="space-y-2">
      <h3 className="text-xl font-semibold text-gray-900">{title}</h3>
      <p className="max-w-md text-sm text-gray-500">{description}</p>
    </div>
  </div>
);

export default EmptyState;
