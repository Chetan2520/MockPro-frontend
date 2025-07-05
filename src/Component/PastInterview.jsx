import React, { useEffect, useState } from "react";
import { Calendar, Clock, MessageSquare, TrendingUp, User, Search, Filter, MoreVertical } from "lucide-react";

const PastInterview = () => {
  const [pastInterviews, setPastInterviews] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");

  // Mock data for demonstration
  const mockData = [
    {
      _id: "1",
      scheduleDate: "2024-06-15T10:30:00Z",
      interviewType: "Technical Interview",
      message: "Great discussion about React and system design. Candidate showed strong problem-solving skills.",
      status: "completed",
      duration: "45 min"
    },
    {
      _id: "2", 
      scheduleDate: "2024-06-10T14:00:00Z",
      interviewType: "Behavioral Interview",
      message: "Excellent communication skills and cultural fit. Very positive interaction.",
      status: "completed",
      duration: "30 min"
    },
    {
      _id: "3",
      scheduleDate: "2024-06-08T09:15:00Z",
      interviewType: "System Design",
      message: "Solid understanding of scalable architectures and database design principles.",
      status: "completed",
      duration: "60 min"
    }
  ];

  useEffect(() => {
    // Replace this with your actual API call
    setPastInterviews(mockData);
    
    // const fetchPastInterviews = async () => {
    //   try {
    //     const res = await axios.get("http://localhost:5000/user/pastinterview");
    //     setPastInterviews(res.data);
    //   } catch (err) {
    //     console.error("Failed to fetch past interviews:", err);
    //   }
    // };
    // fetchPastInterviews();
  }, []);

  const getInterviewIcon = (type) => {
    if (type.toLowerCase().includes('technical')) return <TrendingUp className="w-5 h-5" />;
    if (type.toLowerCase().includes('behavioral')) return <User className="w-5 h-5" />;
    return <MessageSquare className="w-5 h-5" />;
  };

  const getTypeColor = (type) => {
    if (type.toLowerCase().includes('technical')) return 'from-blue-500 to-purple-600';
    if (type.toLowerCase().includes('behavioral')) return 'from-green-500 to-teal-600';
    return 'from-orange-500 to-red-600';
  };

  const filteredInterviews = pastInterviews.filter(item => {
    const matchesSearch = item.interviewType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (item.message && item.message.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesFilter = filterType === "all" || item.interviewType.toLowerCase().includes(filterType.toLowerCase());
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header Section */}
      <div className="bg-gray-900/50 backdrop-blur-sm border-b border-gray-700/50 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Interview Dashboard
              </h1>
              <p className="text-gray-400 mt-1">Track and review your interview history</p>
            </div>
            
            {/* Stats Cards */}
            <div className="flex gap-4">
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-700/50">
                <div className="text-sm text-gray-400">Total</div>
                <div className="text-2xl font-bold text-blue-400">{pastInterviews.length}</div>
              </div>
              <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-gray-700/50">
                <div className="text-sm text-gray-400">This Month</div>
                <div className="text-2xl font-bold text-green-400">
                  {pastInterviews.filter(item => 
                    new Date(item.scheduleDate).getMonth() === new Date().getMonth()
                  ).length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search interviews..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg pl-10 pr-4 py-3 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-lg pl-10 pr-8 py-3 text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all appearance-none cursor-pointer"
            >
              <option value="all">All Types</option>
              <option value="technical">Technical</option>
              <option value="behavioral">Behavioral</option>
              <option value="system">System Design</option>
            </select>
          </div>
        </div>

        {/* Interview Cards */}
        {filteredInterviews.length === 0 ? (
          <div className="text-center py-16">
            <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-xl text-gray-400 mb-2">
              {searchTerm || filterType !== "all" ? "No interviews match your criteria" : "No past interviews found"}
            </p>
            <p className="text-gray-500">
              {searchTerm || filterType !== "all" ? "Try adjusting your search or filter" : "Your interview history will appear here"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredInterviews.map((item, index) => (
              <div
                key={item._id || index}
                className="group bg-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:bg-gray-800/50 hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10"
              >
                {/* Card Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${getTypeColor(item.interviewType)} bg-opacity-20`}>
                    <div className="text-white">
                      {getInterviewIcon(item.interviewType)}
                    </div>
                  </div>
                  
                  <button className="opacity-0 group-hover:opacity-100 transition-opacity p-2 hover:bg-gray-700/50 rounded-lg">
                    <MoreVertical className="w-4 h-4 text-gray-400" />
                  </button>
                </div>

                {/* Date and Time */}
                <div className="flex items-center gap-4 mb-3 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {new Date(item.scheduleDate).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {new Date(item.scheduleDate).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                </div>

                {/* Interview Type */}
                <h3 className={`text-xl font-semibold mb-3 bg-gradient-to-r ${getTypeColor(item.interviewType)} bg-clip-text text-transparent`}>
                  {item.interviewType}
                </h3>

                {/* Duration Badge */}
                {item.duration && (
                  <div className="inline-flex items-center gap-1 px-3 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full mb-3">
                    <Clock className="w-3 h-3" />
                    {item.duration}
                  </div>
                )}

                {/* Message */}
                <p className="text-gray-300 text-sm leading-relaxed line-clamp-3">
                  {item.message || "No additional notes provided for this interview session."}
                </p>

                {/* Status Indicator */}
                <div className="mt-4 pt-4 border-t border-gray-700/50">
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-300 text-xs rounded-full">
                      <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                      Completed
                    </span>
                    <button className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors">
                      View Details →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PastInterview;