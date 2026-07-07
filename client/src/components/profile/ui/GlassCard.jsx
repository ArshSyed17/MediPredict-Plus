import React from "react";

const GlassCard = ({ title, subtitle, className = "", children, action }) => (
  <section className={`rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl ${className}`}>
    {(title || subtitle || action) && (
      <header className="mb-4 flex items-start justify-between gap-3">
        <div>
          {title && <h3 className="text-lg font-semibold text-white">{title}</h3>}
          {subtitle && <p className="text-sm text-slate-300">{subtitle}</p>}
        </div>
        {action}
      </header>
    )}
    {children}
  </section>
);

export default GlassCard;
