import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { useAuth } from "../../context/AuthContext";

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    try {
      await signup(formData);
      navigate("/dashboard");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="panel p-8">
      <div className="mb-8">
        <p className="text-sm uppercase tracking-[0.3em] text-brand-500">Get started</p>
        <h1 className="mt-3 text-3xl font-semibold">Create your tracker account</h1>
        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
          Build a job search pipeline that stays organized from first click to final offer.
        </p>
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input label="Name" name="name" value={formData.name} onChange={handleChange} required />
        <Input label="Email" type="email" name="email" value={formData.email} onChange={handleChange} required />
        <Input label="Password" type="password" name="password" value={formData.password} onChange={handleChange} required />
        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? "Creating account..." : "Create account"}
        </Button>
      </form>
      <p className="mt-6 text-sm text-slate-500 dark:text-slate-400">
        Already have an account?{" "}
        <Link to="/login" className="font-semibold text-brand-500">
          Sign in
        </Link>
      </p>
    </div>
  );
};

export default SignupPage;
