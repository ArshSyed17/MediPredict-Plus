import React from "react";
import { motion } from "framer-motion";

const AdminHeader = ({ title, subtitle }) => (
  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
    <h1 className="text-2xl font-bold text-white sm:text-3xl">{title}</h1>
    {subtitle && <p className="mt-1 text-slate-300">{subtitle}</p>}
  </motion.div>
);

export default AdminHeader;
