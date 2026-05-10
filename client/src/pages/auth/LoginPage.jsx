import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BriefcaseBusiness } from "lucide-react";

import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import { useAuth } from "../../context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const [formData, setFormData] = useState({
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
      await login(formData);

      navigate(location.state?.from?.pathname || "/dashboard");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f6f4] flex items-center justify-center px-6 py-10">
      <div className="relative flex w-full max-w-[1440px] items-center justify-center">

        {/* subtle background decoration */}
        <div className="absolute bottom-0 right-0 h-[260px] w-[260px] rounded-tl-[40px] bg-[#efede9]" />

        {/* login card */}
        <div className="relative z-10 w-full max-w-[430px] rounded-2xl border border-[#d9d5cf] bg-[#fcfbfa] px-8 py-10 shadow-sm">

          {/* logo */}
          <div className="mb-8 flex flex-col items-center text-center">
            <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#d9d5cf] bg-white">
              <BriefcaseBusiness
                size={30}
                strokeWidth={2.2}
                className="text-[#111827]"
              />
            </div>

            <h1 className="text-[42px] font-semibold tracking-[-0.04em] text-[#111827]">
              CareerTrack
            </h1>

            <p className="mt-3 text-[17px] leading-relaxed text-[#4b5563]">
              Log in to manage your professional pipeline
            </p>
          </div>

          {/* form */}
          <form onSubmit={handleSubmit} className="space-y-5">

            <Input
              label="EMAIL ADDRESS"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@company.com"
              required
            />

            <div>
              <div className="mb-2 flex items-center justify-between">
                <label className="text-xs font-semibold tracking-[0.18em] text-[#4b5563]">
                  PASSWORD
                </label>

                <button
                  type="button"
                  className="text-sm font-medium text-[#51627d] transition hover:opacity-70"
                >
                  Forgot Password?
                </button>
              </div>

              <Input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <Button
              type="submit"
              disabled={submitting}
              className="h-12 w-full rounded-xl bg-black text-base font-semibold text-white transition hover:bg-[#111111]"
            >
              {submitting ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          {/* footer */}
          <div className="mt-10 text-center">
            <p className="text-[17px] text-[#4b5563]">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-semibold text-black transition hover:opacity-70"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* bottom footer */}
        <div className="absolute bottom-[-50px] left-0 right-0 flex items-center justify-between text-sm text-[#7a7a7a]">
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
    </div>
  );
};

export default LoginPage;