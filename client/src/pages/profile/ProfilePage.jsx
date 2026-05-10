import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loader from "../../components/common/Loader";
import ProfileForm from "../../components/profile/ProfileForm";
import { useAuth } from "../../context/AuthContext";
import { getProfileRequest, updateProfileRequest } from "../../services/profileService";

const ProfilePage = () => {
  const { setUser } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await getProfileRequest();
        setProfile(data.profile);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleSubmit = async (formData) => {
    if (formData.newPassword || formData.confirmPassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        toast.error("New password and confirm password must match");
        return;
      }
    }

    setSubmitting(true);
    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        currentPassword: formData.currentPassword,
        newPassword: formData.newPassword,
      };

      const data = await updateProfileRequest(payload);
      setProfile(data.profile);
      setUser((current) => ({ ...current, ...data.profile }));
      toast.success(data.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <Loader text="Loading profile..." />;
  }

  return (
    <div className="space-y-6">
      <div className="mx-auto w-full max-w-3xl">
        <h2 className="text-3xl font-bold tracking-tight text-app-text">
          Profile settings
        </h2>
        <p className="mt-2 text-sm text-app-muted">
          Manage your account details and security in one focused workspace.
        </p>
      </div>
      <ProfileForm profile={profile} onSubmit={handleSubmit} submitting={submitting} />
    </div>
  );
};

export default ProfilePage;
