import React, { useEffect, useState } from "react";
import { Search, Filter, CheckCircle, XCircle } from "lucide-react";
import axios from "axios";
const PastInterview = () => {
  const [pastInterviews, setPastInterviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  

  

  useEffect(() => { 
    axios.get("https://mock-pro-frontend.vercel.app/user/scheduled-data").then((res) => {
      
      let response = res.data.data;
      
      setPastInterviews(response);
      
    }).catch((err) => {
      console.log(err);  
    });
  }, []);

  const filteredInterviews = pastInterviews.filter(item => {
    const matchesSearch =
      item.userId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.interviewType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.message && item.message.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterType === "all" || item.interviewType.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  // Accent color for type, approved, or rejected
  const getTypeDot = (item) => {
    if (item.isRejected) return 'bg-red-500';
    if (item.isNotified && !item.isRejected) return 'bg-green-500';
    return item.interviewType === 'Technical' ? 'bg-blue-500' : 'bg-purple-500';
  };
  const getLeftBorder = (item) => {
    if (item.isRejected) return 'border-l-4 border-red-500';
    if (item.isNotified && !item.isRejected) return 'border-l-4 border-green-500';
    return 'border-l-4 border-blue-700';
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Header Section */}
      <div className="border-b border-[#18181b] bg-black/90 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-2">
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Past Interviews</h1>
          <p className="text-gray-500 text-base font-normal">Your interview history</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {/* Total Interviews Card */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#18181b]  shadow-sm w-fit">
            <span className="text-base font-medium text-gray-400">Total : </span>
            <span className="text-base font-bold text-white">{pastInterviews.length}</span>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 w-5 h-5" />
            <input
              type="text"
              placeholder="Search interviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#18181b] border border-[#23232b] rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all shadow-sm"
            />
          </div>
          <div className="relative w-44">
            <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600 w-5 h-5" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="w-full bg-[#18181b] border border-[#23232b] rounded-lg pl-10 pr-8 py-2 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer shadow-sm"
            >
              <option value="all">All Types</option>
              <option value="Technical">Technical</option>
              <option value="HR">HR</option>
            </select>
          </div>
        </div>

        {/* Card Strips Section */}
        {filteredInterviews.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500 mb-2">No interviews found.</p>
            <p className="text-gray-600">Try adjusting your search or filter.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {filteredInterviews.map((item, idx) => (
              <div
                key={item._id || idx}
                className={`w-full bg-[#18181b] ${getLeftBorder(item)} rounded-2xl shadow-lg px-8 py-6 min-h-[72px] relative flex flex-col sm:flex-row sm:items-center gap-y-1 gap-x-4`}
                style={{ boxShadow: '0 4px 24px 0 rgba(0,0,0,0.18)' }}
              >
                {/* Type dot */}
                <span className={`w-3 h-3 rounded-full ${getTypeDot(item)} flex-shrink-0`} />
                {/* Type */}
                <span className="text-base font-semibold text-blue-400 min-w-[90px] max-w-[110px] whitespace-nowrap flex-shrink-0 flex items-center" title={item.interviewType}>{item.interviewType}</span>
                {/* User */}
                <span className="text-base text-white truncate min-w-[120px] max-w-[220px] whitespace-nowrap flex-shrink-0 flex items-center" title={item.userId}>{item.userId}</span>
                {/* Date */}
                <span className="text-base text-gray-400 min-w-[110px] max-w-[120px] whitespace-nowrap flex-shrink-0 flex items-center" title={new Date(item.scheduleDate).toLocaleDateString()}>{new Date(item.scheduleDate).toLocaleDateString()}</span>
                {/* Time */}
                <span className="text-base text-gray-400 min-w-[70px] max-w-[80px] whitespace-nowrap flex-shrink-0 flex items-center" title={new Date(item.scheduleDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}>{new Date(item.scheduleDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                {/* Message */}
                <span className="flex-1 text-base text-gray-300 truncate flex items-center" title={item.message}>{item.message || '-'}</span>
                {/* Notified/Approved/Rejected */}
                <span className="flex items-center justify-end min-w-[120px] sm:ml-auto">
                  {item.isRejected ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-900/20 text-red-400 text-sm rounded-full font-semibold whitespace-nowrap">
                      <XCircle className="w-4 h-4" /> Rejected
                    </span>
                  ) : item.isNotified ? (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-900/20 text-green-400 text-sm rounded-full font-semibold whitespace-nowrap">
                      <span className="w-2 h-2 rounded-full bg-green-400" /> Approved
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-gray-800 text-gray-400 text-xs rounded-full font-medium whitespace-nowrap">
                      <XCircle className="w-4 h-4" />
                      {item.isRejected ? (
                        <span className="text-red-400 font-semibold ml-1">Rejected</span>
                      ) : null}
                    </span>
                  )}
                </span>
                {/* Divider */}
                {idx !== filteredInterviews.length - 1 && (
                  <div className="absolute left-8 right-8 -bottom-2 h-px bg-[#23232b] opacity-60" />
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PastInterview;
