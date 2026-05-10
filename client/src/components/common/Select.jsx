const Select = ({ label, children, ...props }) => (
  <label className="block space-y-2">
    <span className="text-sm font-medium text-gray-700">{label}</span>
    <select className="input" {...props}>
      {children}
    </select>
  </label>
);

export default Select;
