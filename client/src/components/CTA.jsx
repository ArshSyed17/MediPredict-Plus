import React from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';

const CTA = () => {
  const navigate = useNavigate();

  const footerLinks = {
    Product: [
      { name: 'Features', href: '#features' },
      { name: 'AI Demo', href: '#ai-demo' },
    ],
    Company: [
      { name: 'About', href: '#home' },
    ],
  };

  return (
    <>
      {/* CTA Section */}
      <section id="contact" className="relative py-20 bg-gradient-to-b from-slate-900 via-teal-900/30 to-slate-900 overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }} />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Ready to Explore MediPredict+?
            </h2>
            <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
              Register now to start analyzing your health metrics and get instant risk insights with explainable AI.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(ROUTES.REGISTER)}
                className="px-8 py-4 bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 text-white rounded-full font-semibold text-lg hover:shadow-xl hover:shadow-teal-500/50 transition-all duration-300"
              >
                Sign Up
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate(ROUTES.LOGIN)}
                className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-semibold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300"
              >
                Login
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-slate-950 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {/* Brand */}
            <div className="col-span-2">
              <h3 className="text-2xl font-bold text-white mb-4">MediPredict+</h3>
              <p className="text-gray-400 mb-6 max-w-sm">
                AI-powered preventive healthcare platform that predicts diseases before they become problems.
              </p>
            </div>

            {/* Footer Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h4 className="text-white font-semibold mb-4">{category}</h4>
                <ul className="space-y-3">
                  {links.map((link) => (
                    <li key={link.name}>
                      <motion.a
                        href={link.href}
                        whileHover={{ x: 5 }}
                        className="text-gray-400 hover:text-white transition-colors duration-300 block"
                      >
                        {link.name}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Contact Info */}
          <div className="mt-12 pt-8 border-t border-white/10">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-500/20 rounded-full flex items-center justify-center">
                  <FaEnvelope className="text-teal-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Email</p>
                  <p className="text-white">arshmastankhadarali@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-500/20 rounded-full flex items-center justify-center">
                  <FaMapMarkerAlt className="text-teal-400" />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Location</p>
                  <p className="text-white">Mangalagiri, Andhra Pradesh, India</p>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2026 MediPredict+. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default CTA;
