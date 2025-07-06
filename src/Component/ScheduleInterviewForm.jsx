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
      const res = await fetch("https://mock-pro-backend-m.vercel.app/api/user/scheduleInterview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const contentType = res.headers.get("content-type");
  
      const raw = await res.text(); // Get raw response body (debug)
      console.log("🚨 Raw Response:", raw);
      console.log("📎 Content-Type:", contentType);
      
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
  
      if (!contentType?.includes("application/json")) {
        throw new Error("Unexpected server response format.");
      }
  
      const data = JSON.parse(raw); // Safely parse now
  
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
      console.error("Error:", err.message);
      showNotification(err.message || "Server error. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };
  

  return (
    <div className="lg:h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 relative overflow-hidden">
      {/* Notifications */}
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
      <div className="relative z-10 p-4 flex items-center justify-center h-full">
        <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 items-center">
          {/* Left Side */}
          <div className="space-y-8 text-white lg:pr-8">
            <div className="space-y-6">
              <Link
                to="/past-interviews"
                className="flex items-center gap-2 px-10 py-3 text-blue-200 font-bold rounded-full shadow-xl transition-all duration-200"
              >
                <Clock className="w-5 h-5 text-blue-300" />
                <span>View Past Interviews</span>
              </Link>

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
          </div>

          {/* Right Side - Form */}
          <div className="relative w-full">
            <form
              onSubmit={handleSubmit}
              className="bg-gray-800/40 backdrop-blur-2xl border border-gray-700/50 rounded-3xl shadow-2xl p-6 space-y-4 w-full max-w-2xl mx-auto"
            >
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

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Email Address <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full pl-4 pr-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-2xl text-gray-100 placeholder-gray-400"
                />
              </div>

              {/* Interview Type */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Interview Type <span className="text-red-400">*</span>
                </label>
                <select
                  name="interviewType"
                  value={formData.interviewType}
                  onChange={handleChange}
                  className="w-full pl-4 pr-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-2xl text-gray-100"
                >
                  <option value="HR">HR Interview</option>
                  <option value="Technical">Technical Interview</option>
                </select>
              </div>

              {/* Schedule Date */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Preferred Date & Time <span className="text-red-400">*</span>
                </label>
                <input
                  type="datetime-local"
                  name="scheduleDate"
                  value={formData.scheduleDate}
                  onChange={handleChange}
                  className="w-full pl-4 pr-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-2xl text-gray-100"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-1">
                  Additional Notes
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Tell us anything special we should know..."
                  className="w-full pl-4 pr-4 py-3 bg-gray-700/50 border border-gray-600/50 rounded-2xl text-gray-100"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-green-700 to-green-800 hover:from-green-600 hover:to-green-700 text-green-100 font-bold py-3 px-6 rounded-2xl shadow-xl transition-all duration-200"
              >
                {isSubmitting ? "Scheduling..." : "Schedule My Interview"}
              </button>

              {/* Back to Home */}
              <Link
                to="/"
                className="flex items-center justify-center gap-2 mt-3 text-sm text-gray-300 hover:underline"
              >
                <Home className="w-4 h-4" />
                Back to Home
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleInterviewForm;
