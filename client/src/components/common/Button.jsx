import { cn } from "../../utils/classNames";

const variants = {
  primary:
    "bg-app-primary text-white hover:opacity-95 focus:ring-app-primary/15",
  secondary:
    "border border-app-outline bg-app-surface text-app-secondary hover:bg-app-surface-low focus:ring-app-outline",
  danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-100",
};

const Button = ({
  children,
  className,
  variant = "primary",
  type = "button",
  ...props
}) => (
  <button
    type={type}
    className={cn(
      "inline-flex items-center justify-center rounded-lg px-4 py-2.5 text-sm font-semibold transition duration-200 focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60",
      variants[variant],
      className
    )}
    {...props}
  >
    {children}
  </button>
);

export default Button;
