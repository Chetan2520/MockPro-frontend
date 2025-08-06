import React, { useState } from "react";
import {
  Calendar,
  User,
  MessageSquare,
  Send,
  Briefcase,
  Home,
  ArrowLeft,
  Clock,
  CheckCircle,
  Users,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";

const ScheduleInterviewForm = () => {
  const [formData, setFormData] = useState({
    userId: "",
    interviewType: "HR",
    scheduleDate: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [notifications, setNotifications] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const showNotification = (message, type = "success") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 4000);
  };

  const validateForm = () => {
    const { userId, interviewType, scheduleDate } = formData;
    if (!userId || !interviewType || !scheduleDate) {
      showNotification("Please fill in all required fields.", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      const res = await fetch("https://mockpro-backend.onrender.com/user/scheduleInterview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        showNotification("Interview scheduled successfully! 🎉", "success");
        setFormData({
          userId: "",
          interviewType: "HR",
          scheduleDate: "",
          message: "",
        });
      } else {
        showNotification(data?.msg || "Something went wrong.", "error");
      }
    } catch (err) {
      console.error("Error:", err);
      showNotification("Server error. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBackHome = () => {
    // Mock navigation back to home
    showNotification("Navigation to home page", "success");
  };

  return (
    <div className="lg:h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Enhanced Background Effects - Removed white elements */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs - darker tones */}
        {/* <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-gray-800 to-gray-900 opacity-20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-gray-900 to-black opacity-15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-gray-700 to-gray-800 opacity-10 rounded-full blur-3xl animate-pulse delay-2000"></div>
         */}
        {/* Floating particles - darker colors */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-gray-600 opacity-20 rounded-full animate-bounce delay-100"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-gray-700 opacity-25 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-40 left-1/3 w-3 h-3 bg-gray-800 opacity-15 rounded-full animate-bounce delay-500"></div>
        <div className="absolute bottom-20 right-1/3 w-1 h-1 bg-gray-600 opacity-20 rounded-full animate-bounce delay-700"></div>
      </div>

      {/* Geometric patterns - removed white, using dark gray */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
              <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#374151" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)"/>
        </svg>
      </div>

      <div className="relative z-10 p-4 flex items-center justify-center h-full">
        {/* Enhanced Notifications */}
        <div className="fixed top-6 right-6 z-50 space-y-3">
          {notifications.map((n) => (
            <div
              key={n.id}
              className={`px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-lg border text-white transform transition-all duration-300 ease-out ${
                n.type === "success" 
                  ? "bg-gradient-to-r from-emerald-500/90 to-green-500/90 border-green-400/50" 
                  : "bg-gradient-to-r from-red-500/90 to-rose-500/90 border-red-400/50"
              } animate-pulse`}
            >
              <div className="flex items-center space-x-3">
                {n.type === "success" ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <Zap className="w-5 h-5" />
                )}
                <span className="font-medium">{n.message}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="max-w-6xl w-full  grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side - Hero Section */}
          <div className="space-y-8  text-white lg:pr-8">
            <div className="space-y-6">
              <div className="inline-flex   items-center px-4 py-2  backdrop-blur-lg ">
                <Link
                  to="/past-interviews"
                  className="animated-glow-border flex items-center gap-2    text-blue-200 font-bold px-10 py-3 rounded-full shadow-xl  transition-all duration-200"
                  style={{ textShadow: '0 2px 8px #60a5fa55' }}
                >
                  <Clock className="w-5 h-5 text-blue-300" />
                  <span>View Past Interviews</span>
                </Link>
              </div>
              
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 bg-clip-text text-transparent">
                  Schedule Your
                </span>
                <br />
                <span className="text-gray-100">Dream Interview</span>
              </h1>
              
              <p className="text-xl text-gray-300 leading-relaxed">
                Take the next step in your career journey. Our streamlined process makes it easy to book your interview with our expert team.
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
                <Users className="w-8 h-8 text-gray-300 mb-3" />
                <h3 className="font-semibold text-gray-200 mb-2">Expert Interviewers</h3>
                <p className="text-sm text-gray-400">Industry professionals ready to assess your skills</p>
              </div>
              
              <div className="bg-gray-800/30 backdrop-blur-lg rounded-2xl p-6 border border-gray-700/50">
                <Zap className="w-8 h-8 text-gray-300 mb-3" />
                <h3 className="font-semibold text-gray-200 mb-2">Fast Response</h3>
                <p className="text-sm text-gray-400">Get confirmation within 24 hours</p>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/30 backdrop-blur-lg rounded-2xl p-6 border border-gray-600/50">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full flex items-center justify-center text-gray-200 font-bold">
                  A
                </div>
                <div>
                  <p className="text-gray-300 italic mb-2">
                    "The interview process was smooth and professional. Highly recommend!"
                  </p>
                  <p className="text-sm text-gray-400">— Alex Johnson, Software Engineer</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="relative w-full">
            {/* Form Container - Made wider and smaller */}
            <div className="bg-gray-800/40 backdrop-blur-2xl border border-gray-700/50 rounded-3xl shadow-2xl p-6 space-y-4 w-full max-w-2xl mx-auto">
              {/* Header - Reduced spacing */}
              <div className="text-center space-y-2">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-gray-600 to-gray-700 rounded-2xl mb-2 shadow-lg">
                  <Briefcase className="w-8 h-8 text-gray-200" />
                </div>
                <h2 className="text-xl font-bold text-gray-100">
                  Book Your Interview
                </h2>
                <p className="text-gray-300 text-sm">
                  Fill in your details and we'll get back to you soon
                </p>
              </div>

              {/* Form - Reduced spacing */}
              <div className="space-y-4">
                {/* Email Field */}
                <div className="group">
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Email Address <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-gray-200 transition-colors" />
                    <input
                      type="email"
                      name="userId"
                      value={formData.userId}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="w-full pl-12 pr-4 py-3 bg-gray-700/50 backdrop-blur-lg border border-gray-600/50 rounded-2xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400/50 focus:border-gray-400/50 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Interview Type */}
                <div className="group">
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Interview Type <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-gray-200 transition-colors" />
                    <select
                      name="interviewType"
                      value={formData.interviewType}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-gray-700/50 backdrop-blur-lg border border-gray-600/50 rounded-2xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400/50 focus:border-gray-400/50 cursor-pointer appearance-none transition-all duration-200"
                    >
                      <option value="HR" className="bg-gray-800 text-gray-100">HR Interview</option>
                      <option value="Technical" className="bg-gray-800 text-gray-100">Technical Interview</option>
                    </select>
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                      <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Schedule Date */}
                <div className="group">
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Preferred Date & Time <span className="text-red-400">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-gray-200 transition-colors" />
                    <input
                      type="datetime-local"
                      name="scheduleDate"
                      value={formData.scheduleDate}
                      onChange={handleChange}
                      className="w-full pl-12 pr-4 py-3 bg-gray-700/50 backdrop-blur-lg border border-gray-600/50 rounded-2xl text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400/50 focus:border-gray-400/50 transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="group">
                  <label className="block text-sm font-medium text-gray-200 mb-1">
                    Additional Notes
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-gray-200 transition-colors" />
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={3}
                      placeholder="Tell us anything special we should know..."
                      className="w-full pl-12 pr-4 py-3 bg-gray-700/50 backdrop-blur-lg border border-gray-600/50 rounded-2xl text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400/50 focus:border-gray-400/50 resize-none transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-green-700 to-green-800 hover:from-green-600 hover:to-green-700 disabled:from-green-600 disabled:to-green-700 text-green-100 font-bold py-3 px-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] disabled:hover:scale-100 transition-all duration-200 flex items-center justify-center space-x-3"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-green-300/30 border-t-green-300 rounded-full animate-spin"></div>
                      <span>Scheduling Interview...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>Schedule My Interview</span>
                    </>
                  )}
                </button>
              </div>

              {/* Enhanced Go Home Button */}
              <div className="pt-4 border-t border-green-700/50">
                <Link
                to="/"
                  onClick={handleBackHome}
                  className="group flex items-center justify-center space-x-3 w-full bg-gray-800/50 hover:bg-gray-700/50 border border-gray-600/50 hover:border-gray-500/50 text-gray-100 font-medium py-2.5 px-6 rounded-2xl transition-all duration-200 hover:scale-[1.02]"
                >
                  <div className="flex items-center border border-green-600 justify-center w-7 h-7 bg-gradient-to-r from-gray-600 to-gray-700 rounded-full group-hover:scale-110 transition-transform">
                    <Home className="w-3.5 h-3.5 " />
                  </div>
                  <span >Back to Home</span>
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform " />
                </Link>
              </div>

             
            </div>

            {/* Decorative elements around form */}
            <div className="absolute -top-6 -left-6 w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-800 opacity-15 rounded-full blur-lg"></div>
            <div className="absolute -bottom-6 -right-6 w-8 h-8 bg-gradient-to-r from-gray-800 to-gray-900 opacity-15 rounded-full blur-lg"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleInterviewForm;