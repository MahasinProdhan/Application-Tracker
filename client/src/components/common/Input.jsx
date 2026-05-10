const Input = ({ label, error, ...props }) => (
  <label className="block space-y-2">
    <span className="text-sm font-medium text-gray-700">{label}</span>
    <input className="input" {...props} />
    {error ? <span className="text-xs text-red-500">{error}</span> : null}
  </label>
);

export default Input;
