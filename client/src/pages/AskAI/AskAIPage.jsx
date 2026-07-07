import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Send, Bot, User, Loader2, Sparkles, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import axiosInstance from '../../api/axiosInstance';

const STARTER_PROMPTS = [
  "What does a BMI of 28 mean?",
  "How can I lower my blood pressure naturally?",
  "What are early warning signs of diabetes?",
  "How much exercise is recommended weekly?",
  "What foods reduce cholesterol levels?",
];

const TypingDots = () => (
  <div className="flex items-center gap-1 py-1">
    {[0, 1, 2].map((i) => (
      <motion.span
        key={i}
        className="w-2 h-2 bg-teal-400 rounded-full"
        animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
        transition={{ duration: 0.8, delay: i * 0.2, repeat: Infinity }}
      />
    ))}
  </div>
);

const SYSTEM_CONTEXT = `You are MediPredict+ AI Health Assistant — a knowledgeable, empathetic medical information assistant. 
You provide general health information, wellness tips, and help users understand their health metrics.
You always remind users to consult a real doctor for diagnosis or treatment decisions.
Keep responses concise (2-4 short paragraphs), friendly, and easy to understand.
Do not diagnose conditions — only educate and guide.`;

const AskAIPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `Hi ${user?.firstName || 'there'}! 👋 I'm your MediPredict+ AI Health Assistant. I can answer general health questions, explain your health metrics, and provide wellness tips.\n\nHow can I help you today?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const sendMessage = async (text) => {
    const question = (text || input).trim();
    if (!question || loading) return;
    setInput('');

    const userMessage = { role: 'user', content: question, timestamp: new Date() };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      // Build history for context
      const history = messages.slice(-10).map((m) => ({
        role: m.role,
        content: m.content,
      }));

      // Try to call backend AI endpoint first
      let reply = '';
      try {
        const res = await axiosInstance.post('/ai/chat', {
          systemPrompt: SYSTEM_CONTEXT,
          history,
          message: question,
        });
        reply = res.data?.data?.reply || res.data?.reply || '';
      } catch {
        // Fallback: local health FAQ responses
        reply = generateLocalFallback(question);
      }

      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: reply, timestamp: new Date() },
      ]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "I'm sorry, I couldn't process that question right now. Please try again or consult a healthcare professional.",
          timestamp: new Date(),
          error: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([{
      role: 'assistant',
      content: `Hi ${user?.firstName || 'there'}! 👋 Chat cleared. How can I help you with your health today?`,
      timestamp: new Date(),
    }]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-teal-950/80 to-slate-950 flex flex-col">
      {/* Background Grid */}
      <div className="fixed inset-0 opacity-5 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Header */}
      <div className="relative z-10 border-b border-white/10 bg-slate-950/60 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline text-sm">Dashboard</span>
            </button>
            <div className="w-px h-5 bg-white/10" />
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">MediPredict+ AI</p>
                <p className="text-teal-400 text-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-teal-400 rounded-full animate-pulse" />
                  Health Assistant Online
                </p>
              </div>
            </div>
          </div>
          <button
            onClick={clearChat}
            className="flex items-center gap-1.5 text-gray-400 hover:text-white text-sm transition-colors"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Clear</span>
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto relative z-10">
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-4">
          {/* Starter Prompts - show when only initial message */}
          {messages.length === 1 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6"
            >
              {STARTER_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => sendMessage(prompt)}
                  className="text-left p-3 bg-white/5 rounded-xl border border-white/10 hover:border-teal-500/30 hover:bg-teal-500/10 transition-all duration-200 text-sm text-gray-300 hover:text-teal-300"
                >
                  <Sparkles className="w-3.5 h-3.5 text-teal-400 inline mr-2" />
                  {prompt}
                </button>
              ))}
            </motion.div>
          )}

          <AnimatePresence mode="popLayout">
            {messages.map((msg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                {/* Avatar */}
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  msg.role === 'assistant'
                    ? 'bg-gradient-to-br from-teal-500 to-emerald-500'
                    : 'bg-white/10'
                }`}>
                  {msg.role === 'assistant'
                    ? <Bot className="w-4 h-4 text-white" />
                    : <User className="w-4 h-4 text-gray-300" />}
                </div>

                {/* Bubble */}
                <div className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  msg.role === 'user'
                    ? 'bg-teal-600/30 border border-teal-500/20 text-white'
                    : msg.error
                    ? 'bg-rose-500/10 border border-rose-500/20 text-rose-300'
                    : 'bg-white/5 border border-white/10 text-gray-200'
                }`}>
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
                  <p className="text-xs text-gray-500 mt-1.5">
                    {msg.timestamp?.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </motion.div>
            ))}

            {loading && (
              <motion.div
                key="typing"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div className="bg-white/5 border border-white/10 rounded-2xl px-4 py-3">
                  <TypingDots />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Disclaimer */}
      <div className="relative z-10 text-center px-4 py-2">
        <p className="text-xs text-gray-600">
          ⚕️ This AI provides general information only. Always consult a licensed healthcare professional.
        </p>
      </div>

      {/* Input */}
      <div className="relative z-10 border-t border-white/10 bg-slate-950/60 backdrop-blur-xl">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-end gap-3">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask me anything about your health..."
              rows={1}
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm resize-none focus:outline-none focus:border-teal-500/50 focus:bg-white/10 transition-all duration-200 max-h-32 overflow-y-auto"
              style={{ lineHeight: '1.5' }}
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => sendMessage()}
              disabled={!input.trim() || loading}
              className="w-11 h-11 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-xl flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-teal-500/20 flex-shrink-0"
            >
              {loading
                ? <Loader2 className="w-5 h-5 text-white animate-spin" />
                : <Send className="w-4 h-4 text-white" />}
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Local fallback responses when backend AI is unavailable
function generateLocalFallback(question) {
  const q = question.toLowerCase();
  if (q.includes('bmi')) return "BMI (Body Mass Index) measures body fat based on height and weight. A BMI of 18.5–24.9 is considered healthy, 25–29.9 is overweight, and 30+ is classified as obese. Your BMI is a useful screening tool, but it doesn't account for muscle mass or fat distribution. Always discuss your results with a doctor.";
  if (q.includes('blood pressure') || q.includes('hypertension')) return "Normal blood pressure is below 120/80 mmHg. To reduce blood pressure naturally:\n\n• Reduce sodium intake to less than 2,300mg/day\n• Exercise 150 minutes per week (walking, swimming, cycling)\n• Maintain a healthy weight\n• Limit alcohol and quit smoking\n• Practice stress-reduction techniques like meditation\n\nIf your blood pressure is consistently above 130/80, consult your doctor.";
  if (q.includes('diabetes') || q.includes('blood sugar')) return "Early warning signs of diabetes include:\n\n• Frequent urination, especially at night\n• Increased thirst and hunger\n• Unexplained weight loss\n• Blurry vision or fatigue\n• Slow-healing cuts or bruises\n• Tingling or numbness in hands/feet\n\nIf you experience these symptoms, consult a doctor. A fasting blood glucose above 126 mg/dL or HbA1c above 6.5% may indicate diabetes.";
  if (q.includes('exercise') || q.includes('workout')) return "The WHO recommends:\n\n• Adults: 150–300 minutes of moderate-intensity exercise per week (like brisk walking) OR 75–150 minutes of vigorous exercise (like running)\n• Plus muscle-strengthening activities (weights, yoga) 2+ days per week\n\nRegular exercise reduces risks of heart disease, diabetes, and depression while improving sleep and energy levels.";
  if (q.includes('cholesterol')) return "To naturally reduce cholesterol:\n\n• Eat more soluble fiber (oats, beans, lentils, fruits)\n• Include healthy fats (avocados, olive oil, nuts)\n• Reduce saturated fats from red meat and dairy\n• Exercise regularly — even walking 30 minutes/day helps\n• Avoid trans fats found in processed foods\n• Omega-3 rich foods like salmon and flaxseed are beneficial\n\nAim for LDL below 100 mg/dL. Consult your doctor if lifestyle changes aren't enough.";
  if (q.includes('sleep')) return "Adults need 7–9 hours of quality sleep per night. To improve sleep:\n\n• Keep a consistent sleep schedule, even on weekends\n• Create a dark, cool, quiet bedroom environment\n• Avoid screens 1 hour before bed\n• Limit caffeine after 2 PM\n• Avoid large meals before bedtime\n\nChronic sleep deprivation is linked to obesity, diabetes, heart disease, and weakened immunity.";
  return "That's a great health question! For personalized medical advice, please consult a qualified healthcare professional. I can share general wellness information — here are some general health tips:\n\n• Stay hydrated: drink 8 glasses of water daily\n• Eat a balanced diet rich in vegetables, fruits, and lean proteins\n• Exercise at least 150 minutes per week\n• Get 7–9 hours of quality sleep\n• Manage stress through meditation, hobbies, or social connections\n• Schedule regular health check-ups\n\nFeel free to ask me specific questions about any health topic!";
}

export default AskAIPage;
