import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin } from "lucide-react";
import ProfileAvatar from "./ProfileAvatar";

const ProfileCard = ({ profile, onAvatarUpload }) => (
  <motion.section
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl"
  >
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
      <ProfileAvatar profile={profile} onUpload={onAvatarUpload} />
      <div className="flex-1 text-center sm:text-left">
        <h2 className="text-2xl font-bold text-white">
          {profile.firstName} {profile.lastName}
        </h2>
        <p className="text-sm text-cyan-300">Patient ID: {profile.id}</p>
        <div className="mt-3 space-y-1.5 text-sm text-slate-300">
          <p className="flex items-center justify-center gap-2 sm:justify-start">
            <Mail className="h-4 w-4 text-slate-400" />
            {profile.email}
          </p>
          <p className="flex items-center justify-center gap-2 sm:justify-start">
            <Phone className="h-4 w-4 text-slate-400" />
            {profile.phone}
          </p>
          <p className="flex items-center justify-center gap-2 sm:justify-start">
            <MapPin className="h-4 w-4 text-slate-400" />
            {profile.address}
          </p>
        </div>
      </div>
    </div>
  </motion.section>
);

export default ProfileCard;
