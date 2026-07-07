import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Bell, Search, Settings, User, LogOut, Check, X, FileText, Shield } from 'lucide-react';
import { useAuth } from "../../hooks/useAuth";
import notificationService from '../../services/notificationService';

const DashboardHeader = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: '1', title: 'Welcome to MediPredict+', message: 'Complete your profile to get the most accurate AI predictions.', read: false, time: 'Just now' },
    { id: '2', title: 'Daily Health Scan', message: 'Your daily health assessment is ready for review.', read: true, time: '2 hours ago' },
  ]);

  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const searchInputRef = useRef(null);
  const notificationsRef = useRef(null);
  const searchRef = useRef(null);

  const searchOptions = [
    { name: 'New AI Prediction', path: '/prediction', category: 'Features' },
    { name: 'Risk Simulator', path: '/simulator', category: 'Features' },
    { name: 'My Predictions', path: '/reports', category: 'Data' },
    { name: 'Ask AI', path: '/ask-ai', category: 'Features' },
    { name: 'Profile Information', path: '/profile', category: 'Account' },
    { name: 'Security Settings', path: '/settings', category: 'Settings' },
    { name: 'Notification Settings', path: '/settings', category: 'Settings' },
  ];

  const filteredSearch = searchQuery.trim() === '' ? [] : searchOptions.filter(option =>
    option.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    option.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const loadNotifs = async () => {
      try {
        const data = await notificationService.getNotifications();
        if (data && data.length > 0) {
          setNotifications(data);
        }
      } catch (err) {
        console.error('Failed to load notifications:', err);
      }
    };
    loadNotifs();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationsRef.current && !notificationsRef.current.contains(event.target)) {
        setShowNotifications(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearch(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  const handleMarkAllRead = async () => {
    try {
      await notificationService.markAllAsRead();
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    } catch (err) {
      setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    }
  };

  const handleMarkRead = async (id) => {
    try {
      await notificationService.markAsRead(id);
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    } catch (err) {
      setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    }
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex items-center justify-between mb-8 relative z-50"
    >
      {/* Left - Title */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">
          Health Dashboard
        </h1>
        <p className="text-gray-400 mt-1">
          Welcome back, {user?.firstName || 'Arsh'}
        </p>
      </div>

      {/* Right - Actions */}
      <div className="flex items-center gap-3 sm:gap-4 relative">
        {/* Search */}
        <div ref={searchRef} className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setShowSearch(prev => !prev);
              setShowNotifications(false);
            }}
            className={`p-2.5 rounded-xl text-gray-400 hover:text-white transition-colors duration-200 border border-white/10 ${
              showSearch ? 'bg-white/20 text-white' : 'bg-white/10 backdrop-blur-xl'
            }`}
            title="Search Pages"
          >
            <Search className="w-5 h-5" />
          </motion.button>

          <AnimatePresence>
            {showSearch && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-72 bg-slate-900 border border-white/10 rounded-2xl p-3 shadow-2xl z-[100] backdrop-blur-xl"
              >
                <div className="relative mb-2">
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search dashboard..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                <div className="max-h-48 overflow-y-auto space-y-1">
                  {filteredSearch.length > 0 ? (
                    filteredSearch.map((option) => (
                      <button
                        key={option.name}
                        onClick={() => {
                          navigate(option.path);
                          setShowSearch(false);
                          setSearchQuery('');
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg text-sm text-gray-300 hover:bg-white/15 hover:text-white flex items-center justify-between transition-colors duration-150"
                      >
                        <span>{option.name}</span>
                        <span className="text-xs px-2 py-0.5 bg-teal-500/20 text-teal-400 rounded-full border border-teal-500/20">
                          {option.category}
                        </span>
                      </button>
                    ))
                  ) : searchQuery.trim() !== '' ? (
                    <p className="text-gray-400 text-xs text-center py-2">No pages found</p>
                  ) : (
                    <div className="text-gray-400 text-xs p-2">
                      <p className="font-semibold mb-1 text-gray-300">Try searching for:</p>
                      <ul className="list-disc list-inside space-y-0.5">
                        <li>Predictions</li>
                        <li>Simulator</li>
                        <li>Reports</li>
                        <li>Profile</li>
                      </ul>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Notifications */}
        <div ref={notificationsRef} className="relative">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setShowNotifications(prev => !prev);
              setShowSearch(false);
            }}
            className={`p-2.5 rounded-xl text-gray-400 hover:text-white transition-colors duration-200 border border-white/10 relative ${
              showNotifications ? 'bg-white/20 text-white' : 'bg-white/10 backdrop-blur-xl'
            }`}
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full ring-2 ring-slate-900 animate-pulse" />
            )}
          </motion.button>

          <AnimatePresence>
            {showNotifications && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-80 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl z-[100] backdrop-blur-xl overflow-hidden"
              >
                <div className="p-3 border-b border-white/10 flex items-center justify-between">
                  <span className="font-semibold text-white text-sm">Notifications</span>
                  {unreadCount > 0 && (
                    <button
                      onClick={handleMarkAllRead}
                      className="text-xs text-teal-400 hover:text-teal-300 font-medium"
                    >
                      Mark all read
                    </button>
                  )}
                </div>

                <div className="max-h-64 overflow-y-auto divide-y divide-white/5">
                  {notifications.length > 0 ? (
                    notifications.map((notif) => (
                      <div
                        key={notif.id}
                        onClick={() => handleMarkRead(notif.id)}
                        className={`p-3 text-left transition-colors duration-150 cursor-pointer ${
                          notif.read ? 'bg-transparent hover:bg-white/5' : 'bg-teal-500/5 hover:bg-teal-500/10'
                        }`}
                      >
                        <div className="flex justify-between items-start mb-0.5">
                          <span className={`font-semibold text-xs ${notif.read ? 'text-gray-300' : 'text-teal-300'}`}>
                            {notif.title}
                          </span>
                          <span className="text-[10px] text-gray-500">{notif.time || '1d ago'}</span>
                        </div>
                        <p className="text-gray-400 text-[11px] leading-relaxed mb-1">{notif.message}</p>
                        {!notif.read && (
                          <span className="text-[10px] text-teal-400 font-medium flex items-center gap-1">
                            <Check className="w-3 h-3" /> Mark read
                          </span>
                        )}
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-400 text-xs text-center py-6">No notifications</p>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Settings */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/settings')}
          className="p-2.5 bg-white/10 backdrop-blur-xl rounded-xl text-gray-400 hover:text-white transition-colors duration-200 border border-white/10"
          title="Account Settings"
        >
          <Settings className="w-5 h-5" />
        </motion.button>

        {/* User Menu */}
        <div className="flex items-center gap-3 pl-4 border-l border-white/10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate('/profile')}
            className="w-10 h-10 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center"
            title="View Profile"
          >
            <User className="w-5 h-5 text-white" />
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={logout}
            className="p-2 bg-red-500/20 rounded-lg text-red-400 hover:bg-red-500/30 transition-colors duration-200"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default DashboardHeader;
