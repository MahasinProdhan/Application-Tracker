import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BriefcaseBusiness } from "lucide-react";

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

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
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
    <div className="relative flex min-h-screen items-center justify-center bg-[#f7f6f4] px-6 py-6">

      {/* background decoration */}
      <div className="absolute bottom-0 right-0 h-[220px] w-[220px] rounded-tl-[36px] bg-[#efede9]" />

      {/* auth card */}
      <div className="relative z-10 w-full max-w-[430px] rounded-2xl border border-[#d9d5cf] bg-[#fcfbfa] px-8 py-8 shadow-sm">

        {/* logo */}
        <div className="mb-6 flex flex-col items-center text-center">

          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#d9d5cf] bg-white">
            <BriefcaseBusiness
              size={30}
              strokeWidth={2.2}
              className="text-[#111827]"
            />
          </div>

          <h1 className="text-[38px] font-semibold tracking-[-0.04em] text-[#111827]">
            CareerTrack
          </h1>

          <p className="mt-3 text-[17px] leading-relaxed text-[#4b5563]">
            Create your account and manage your career pipeline
          </p>
        </div>

        {/* form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          <Input
            label="FULL NAME"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
          />

          <Input
            label="EMAIL ADDRESS"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="name@company.com"
            required
          />

          <Input
            label="PASSWORD"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />

          <Button
            type="submit"
            disabled={submitting}
            className="h-12 w-full rounded-xl bg-black text-base font-semibold text-white transition hover:bg-[#111111]"
          >
            {submitting ? "Creating Account..." : "Create Account"}
          </Button>
        </form>

        {/* footer */}
        <div className="mt-8 text-center">
          <p className="text-[17px] text-[#4b5563]">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-black transition hover:opacity-70"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* bottom footer */}
      <div className="absolute bottom-4 left-0 right-0 flex items-center justify-between px-8 text-sm text-[#7a7a7a]">

        <p>© 2026 CareerTrack Inc.</p>

        <div className="flex items-center gap-6">
          <span className="cursor-pointer hover:text-black">
            Privacy Policy
          </span>

          <span className="cursor-pointer hover:text-black">
            Terms of Service
          </span>

          <span className="cursor-pointer hover:text-black">
            Help Center
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;