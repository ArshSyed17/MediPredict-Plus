import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBars, FaTimes, FaHeartbeat } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '../constants';

const NavLink = ({ name, href, isActive, onClick, isScrolled }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className="relative font-medium transition-colors duration-200 group"
    >
      <span className={isScrolled ? (isActive ? 'text-teal-600' : 'text-gray-700') : (isActive ? 'text-teal-300' : 'text-white')}>
        {name}
      </span>
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: isActive ? '100%' : 0 }}
        className={`absolute bottom-0 left-0 h-0.5 ${isScrolled ? 'bg-teal-600' : 'bg-teal-300'}`}
      />
      <motion.div
        initial={{ width: 0 }}
        whileHover={{ width: '100%' }}
        className={`absolute bottom-0 left-0 h-0.5 ${isScrolled ? 'bg-teal-600' : 'bg-teal-300'}`}
      />
    </motion.button>
  );
};

const Navbar = () => {
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);

      // Update active section based on scroll position
      const sections = ['home', 'features', 'ai-demo', 'contact'];
      sections.forEach((section) => {
        const element = document.querySelector(`#${section}`);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Features', href: '#features' },
    { name: 'AI Demo', href: '#ai-demo' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-white/80 backdrop-blur-xl shadow-lg py-2'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`flex items-center justify-between transition-all duration-500 ${isScrolled ? 'h-16' : 'h-20'}`}>
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => scrollToSection('#home')}
          >
            <FaHeartbeat
              className={`text-3xl transition-colors duration-300 ${
                isScrolled ? 'text-teal-600' : 'text-white'
              }`}
            />
            <span
              className={`text-2xl font-bold transition-colors duration-300 ${
                isScrolled ? 'text-gray-900' : 'text-white'
              }`}
            >
              MediPredict+
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                name={link.name}
                href={link.href}
                isActive={activeSection === link.href.replace('#', '')}
                onClick={() => scrollToSection(link.href)}
                isScrolled={isScrolled}
              />
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(ROUTES.LOGIN)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                isScrolled
                  ? 'text-gray-700 border-2 border-gray-300 hover:border-teal-600 hover:text-teal-600'
                  : 'text-white border-2 border-white/50 hover:border-white hover:text-white'
              }`}
            >
              Login
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate(ROUTES.REGISTER)}
              className="relative px-6 py-2 bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 text-white rounded-full font-medium overflow-hidden group"
            >
              <span className="relative z-10">Get Started</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-cyan-600 via-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
            </motion.button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-lg transition-colors ${
              isScrolled ? 'text-gray-900' : 'text-white'
            }`}
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-white/95 backdrop-blur-xl shadow-lg border-t border-white/10"
          >
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate(ROUTES.LOGIN)}
                  className="block w-full text-left text-gray-700 font-medium hover:text-teal-600 transition-colors py-2"
                >
                  {link.name}
                </motion.button>
              ))}
              <div className="pt-4 space-y-3">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(ROUTES.LOGIN)}
                  className="w-full px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-full font-medium hover:border-teal-600 hover:text-teal-600 transition-all"
                >
                  Login
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(ROUTES.REGISTER)}
                  className="w-full px-6 py-3 bg-gradient-to-r from-teal-600 via-cyan-600 to-emerald-600 text-white rounded-full font-medium hover:shadow-lg hover:shadow-teal-500/50 transition-all"
                >
                  Get Started
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
