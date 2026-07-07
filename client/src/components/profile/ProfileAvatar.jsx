import React, { useRef } from "react";
import { Camera } from "lucide-react";

const ProfileAvatar = ({ profile, onUpload, size = "lg" }) => {
  const inputRef = useRef(null);
  const sizeClass = size === "lg" ? "h-24 w-24 text-2xl" : "h-16 w-16 text-lg";
  const initials = `${profile.firstName?.[0] ?? ""}${profile.lastName?.[0] ?? ""}`;

  const handleFile = (event) => {
    const file = event.target.files?.[0];
    if (file) onUpload?.(file);
  };

  return (
    <div className="relative">
      <div
        className={`${sizeClass} flex items-center justify-center overflow-hidden rounded-2xl border-2 border-cyan-400/30 bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 font-bold text-white`}
      >
        {profile.avatarUrl ? (
          <img src={profile.avatarUrl} alt={`${profile.firstName} ${profile.lastName}`} className="h-full w-full object-cover" />
        ) : (
          initials
        )}
      </div>
      {onUpload && (
        <>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-slate-900 text-cyan-300 transition hover:bg-slate-800"
            aria-label="Upload avatar"
          >
            <Camera className="h-4 w-4" />
          </button>
          <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
        </>
      )}
    </div>
  );
};

export default ProfileAvatar;
