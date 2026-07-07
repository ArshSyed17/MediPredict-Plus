import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Shield, Edit3, HeartPulse, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { fetchProfile } from "../../services/profileService";

const InfoRow = ({ label, value }) => (
  <div className="flex justify-between items-center py-3 border-b border-white/5 last:border-b-0">
    <span className="text-sm text-gray-400">{label}</span>
    <span className="text-sm text-white font-medium">{value || "—"}</span>
  </div>
);

const SectionCard = ({ title, icon: Icon, children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10"
  >
    <div className="flex items-center gap-3 mb-4">
      <div className="w-9 h-9 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center">
        <Icon className="w-4 h-4 text-white" />
      </div>
      <h3 className="text-white font-semibold text-lg">{title}</h3>
    </div>
    {children}
  </motion.div>
);

const ProfilePage = () => {
  const { user: authUser } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProfile();
        const user = data?.data || data;
        setProfile(user);
      } catch (err) {
        console.error("Profile load failed:", err);
        setProfile(authUser);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [authUser]);

  const displayProfile = profile || authUser;

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-950 via-teal-950/80 to-slate-950">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <HeartPulse className="w-8 h-8 text-white" />
          </div>
          <p className="text-gray-400 text-lg">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-teal-950/80 to-slate-950">
      {/* Background Grid */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate('/dashboard')}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6 transition-colors duration-200"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </motion.button>

        {/* Header Card */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-teal-600/20 via-cyan-600/20 to-emerald-600/20 backdrop-blur-xl rounded-2xl p-6 sm:p-8 border border-white/10 mb-6 relative overflow-hidden"
        >
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-500 rounded-full blur-3xl" />
          </div>
          <div className="relative flex items-center gap-5">
            <div className="w-20 h-20 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl shadow-teal-500/20">
              <User className="w-10 h-10 text-white" />
            </div>
            <div className="flex-1">
              <p className="text-teal-400 text-sm font-medium mb-1">{getGreeting()}</p>
              <h1 className="text-2xl sm:text-3xl font-bold text-white mb-1">
                {displayProfile?.firstName || "Arsh"} {displayProfile?.lastName || ""}
              </h1>
              <div className="flex items-center gap-3 flex-wrap">
                <span className="flex items-center gap-1 text-gray-400 text-sm">
                  <Mail className="w-3.5 h-3.5" />
                  {displayProfile?.email || "—"}
                </span>
                <span className="flex items-center gap-1.5 px-2.5 py-1 bg-teal-500/20 text-teal-300 text-xs rounded-full border border-teal-500/30 capitalize">
                  <Shield className="w-3 h-3" />
                  {displayProfile?.role || "patient"}
                </span>
              </div>
            </div>
              <div className="hidden sm:flex flex-col gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate('/settings')}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-teal-500/20 text-teal-300 rounded-xl border border-teal-500/30 hover:bg-teal-500/30 transition-colors duration-200 text-sm font-medium"
                >
                  <Edit3 className="w-4 h-4" />
                  Edit Profile
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    // Logic for saving changes would go here
                    alert("Changes saved successfully!");
                  }}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl shadow-lg shadow-teal-500/20 hover:from-teal-400 hover:to-emerald-400 transition-colors duration-200 text-sm font-medium"
                >
                  Save Changes
                </motion.button>
              </div>
          </div>
        </motion.div>

        {/* Info Cards */}
        <div className="grid gap-5 lg:grid-cols-2">
          <SectionCard title="Account Information" icon={User} delay={0.05}>
            <InfoRow label="First Name" value={displayProfile?.firstName} />
            <InfoRow label="Last Name" value={displayProfile?.lastName} />
            <InfoRow label="Email Address" value={displayProfile?.email} />
            <InfoRow
              label="Account Role"
              value={displayProfile?.role
                ? displayProfile.role.charAt(0).toUpperCase() + displayProfile.role.slice(1)
                : "Patient"}
            />
            <InfoRow
              label="Email Verified"
              value={displayProfile?.isEmailVerified ? "✓ Verified" : "Pending Verification"}
            />
          </SectionCard>

          <SectionCard title="Account Status" icon={Shield} delay={0.1}>
            <InfoRow label="Account Status" value={displayProfile?.isActive ? "✓ Active" : "Inactive"} />
            <InfoRow
              label="Last Login"
              value={displayProfile?.lastLogin
                ? new Date(displayProfile.lastLogin).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                : "—"}
            />
            <InfoRow
              label="Member Since"
              value={displayProfile?.createdAt
                ? new Date(displayProfile.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })
                : "—"}
            />
          </SectionCard>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 lg:col-span-2"
          >
            <h3 className="text-white font-semibold text-lg mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label: "AI Prediction", path: "/prediction", emoji: "🧬" },
                { label: "Risk Simulator", path: "/simulator", emoji: "📊" },
                { label: "Medical Reports", path: "/reports", emoji: "📋" },
                { label: "Account Settings", path: "/settings", emoji: "⚙️" },
              ].map(({ label, path, emoji }) => (
                <motion.button
                  key={path}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => navigate(path)}
                  className="flex flex-col items-center gap-2 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-teal-500/30 hover:bg-teal-500/10 transition-all duration-200 group"
                >
                  <span className="text-2xl">{emoji}</span>
                  <span className="text-xs text-gray-300 group-hover:text-teal-300 transition-colors font-medium text-center">{label}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
