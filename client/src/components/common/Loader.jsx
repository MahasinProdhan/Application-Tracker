const Loader = ({ text = "Loading..." }) => (
  <div className="flex min-h-[240px] items-center justify-center">
    <div className="flex items-center gap-3 rounded-full border border-gray-200 bg-white px-5 py-3 text-sm text-gray-600 shadow-sm">
      <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-gray-900" />
      {text}
    </div>
  </div>
);

export default Loader;
