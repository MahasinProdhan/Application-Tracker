import { useEffect, useState } from "react";
import Button from "../common/Button";
import Input from "../common/Input";

const ProfileForm = ({ profile, onSubmit, submitting }) => {
  const [formData, setFormData] = useState({
    name: profile?.name || "",
    email: profile?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    setFormData((current) => ({
      ...current,
      name: profile?.name || "",
      email: profile?.email || "",
    }));
  }, [profile]);

  const initials =
    profile?.name
      ?.split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "U";

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    await onSubmit(formData);

    setFormData((current) => ({
      ...current,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    }));
  };

  return (
    <div className="mx-auto w-full max-w-3xl space-y-6">
      <section className="panel p-6 md:p-8">
        <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-app-primary text-lg font-semibold text-white">
            {initials}
          </div>
          <div className="space-y-1">
            <h2 className="text-2xl font-semibold tracking-tight text-app-text">
              {profile?.name}
            </h2>
            <p className="text-sm text-app-muted">{profile?.email}</p>
          </div>
        </div>
      </section>

      <form onSubmit={handleSubmit} className="space-y-6">
        <section className="panel p-6 md:p-8">
          <div className="mb-6 border-b border-app-outline pb-5">
            <h3 className="text-lg font-semibold text-app-text">Personal Information</h3>
            <p className="mt-1 text-sm text-app-muted">
              Update the basic details tied to your account.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="Full name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <Input
              label="Email address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
        </section>

        <section className="panel p-6 md:p-8">
          <div className="mb-6 border-b border-app-outline pb-5">
            <h3 className="text-lg font-semibold text-app-text">Security</h3>
            <p className="mt-1 text-sm text-app-muted">
              Change your password when needed to keep your account secure.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <Input
              label="Current password"
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Enter current password"
            />
            <div className="hidden md:block" />
            <Input
              label="New password"
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Minimum 6 characters"
            />
            <Input
              label="Confirm password"
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Repeat new password"
            />
          </div>
        </section>

        <div className="flex justify-end">
          <Button type="submit" disabled={submitting} className="min-w-32">
            {submitting ? "Saving..." : "Save changes"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
