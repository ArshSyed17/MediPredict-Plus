import React from "react";
import { Moon, Sun } from "lucide-react";
import GlassCard from "../profile/ui/GlassCard";
import { useTheme } from "../../context/ThemeContext";

const ThemeOption = ({ active, onClick, icon: Icon, label, description }) => (
  <button
    type="button"
    onClick={onClick}
    className={`flex flex-1 flex-col items-center gap-2 rounded-xl border p-4 transition ${
      active
        ? "border-cyan-400 bg-cyan-500/10 text-cyan-200"
        : "border-white/10 bg-slate-950/40 text-slate-300 hover:border-white/20"
    }`}
  >
    <Icon className="h-6 w-6" />
    <span className="font-medium">{label}</span>
    <span className="text-center text-xs text-slate-400">{description}</span>
  </button>
);

const ThemeSettings = () => {
  const { theme, setTheme } = useTheme();

  return (
    <GlassCard title="Theme" subtitle="Choose your preferred interface appearance.">
      <div className="flex flex-col gap-3 sm:flex-row">
        <ThemeOption
          active={theme === "dark"}
          onClick={() => setTheme("dark")}
          icon={Moon}
          label="Dark Mode"
          description="Premium dark interface optimized for low light"
        />
        <ThemeOption
          active={theme === "light"}
          onClick={() => setTheme("light")}
          icon={Sun}
          label="Light Mode"
          description="Clean bright interface for daytime use"
        />
      </div>
    </GlassCard>
  );
};

export default ThemeSettings;
