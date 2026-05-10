import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await login(formData);
      navigate(location.state?.from?.pathname || "/dashboard");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="panel p-8">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-brand-500">Job Tracker</p>
        <h1 className="mt-3 text-3xl font-semibold">Sign in to your workspace</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Track applications, interviews, and offers without losing momentum.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
        <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} required />
        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? "Signing in..." : "Sign in"}
        </Button>
      </form>
      <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
        No account yet?{" "}
        <Link to="/signup" className="font-semibold text-brand-500">
          Create one
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
