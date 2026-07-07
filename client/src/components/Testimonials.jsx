import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuoteLeft, FaStar, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Arsh M.',
      role: 'Final Year CSE Student',
      content: 'Developing this project as a capstone was an incredible experience. Hooking up the XGBoost models with FastAPI and building the React dashboard was a great learning curve!',
      rating: 5,
      avatar: 'AM',
    },
    {
      name: 'Syed K.',
      role: 'Peer Reviewer / Beta Tester',
      content: 'I tested the lifestyle simulator and CKD predictions. The SHAP values summary makes it extremely easy to understand how the AI calculates risk. Very impressive student project!',
      rating: 5,
      avatar: 'SK',
    },
    {
      name: 'Prof. R. Krishna',
      role: 'Project Advisor',
      content: 'MediPredict+ is a stellar demonstration of combining machine learning with modern web architectures. The integration of WebSockets and explainable AI (XAI) shows strong technical depth.',
      rating: 5,
      avatar: 'RK',
    },
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="relative py-20 bg-gradient-to-b from-slate-900 via-purple-900/20 to-slate-900 overflow-hidden">
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

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            What Our Peers Say
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Feedback from academic peers and project evaluators
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white/5 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-white/10 max-w-4xl mx-auto"
            >
              <div className="flex flex-col md:flex-row gap-8 items-center">
                {/* Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                    {testimonials[currentIndex].avatar}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 text-center md:text-left">
                  <FaQuoteLeft className="text-blue-400 text-3xl mb-4" />
                  <p className="text-gray-300 text-lg leading-relaxed mb-6">
                    {testimonials[currentIndex].content}
                  </p>
                  
                  {/* Rating */}
                  <div className="flex justify-center md:justify-start gap-1 mb-4">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400" />
                    ))}
                  </div>

                  {/* Author */}
                  <div>
                    <h4 className="text-white font-bold text-lg">
                      {testimonials[currentIndex].name}
                    </h4>
                    <p className="text-gray-400 text-sm">
                      {testimonials[currentIndex].role}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-4 mt-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevTestimonial}
              className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              <FaChevronLeft />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextTestimonial}
              className="w-12 h-12 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
            >
              <FaChevronRight />
            </motion.button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-blue-500 w-8'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
