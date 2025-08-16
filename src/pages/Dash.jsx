import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Users, Award, Brain, BarChart3, Calendar, ChevronRight, AlertCircle, Clock, Target, BookOpen } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip, BarChart, Bar, AreaChart, Area } from 'recharts';

const ReactInterviewDashboard = () => {
  const [interviewData, setInterviewData] = useState(null);
  const [allInterviews, setAllInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInterviewData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const response = await fetch('https://mockpro-backend.onrender.com/api/vapi/all-feedback');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched data:', data);
        
        if (data && Array.isArray(data) && data.length > 0) {
          setAllInterviews(data);
          // Use the most recent interview (first one in array)
          setInterviewData(data[0]);
        } else {
          throw new Error('No interview data available');
        }
        
      } catch (error) {
        console.error('Error fetching interview data:', error);
        setError(error.message);
        
        // No fallback data - let the error state handle it
        setInterviewData(null);
        setAllInterviews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInterviewData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center space-y-6">
          <div className="relative">
            <div className="w-16 h-16 border-4 border-blue-500/30 rounded-full"></div>
            <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin absolute top-0"></div>
          </div>
          <div className="text-center">
            <p className="text-zinc-200 font-semibold text-lg">Loading Interview Data</p>
            <p className="text-zinc-400 text-sm mt-1">Fetching from server...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error && !interviewData) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-white mb-2">Failed to Load Data</h2>
          <p className="text-zinc-400 mb-4">Error: {error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!interviewData) return null;

  // Calculate derived metrics from actual API data
  const totalQuestions = interviewData.questions ? interviewData.questions.length : 0;
  const avgAnswerLength = interviewData.answers && interviewData.answers.length > 0 
    ? Math.round(interviewData.answers.reduce((sum, answer) => sum + (answer?.length || 0), 0) / interviewData.answers.length)
    : 0;
  const completionRate = totalQuestions > 0 ? 100 : 0;
  
  // Create radar data from actual metrics
  const radarData = [
    { metric: 'Communication', value: interviewData.feedback?.metrics?.communication || 0, max: 10 },
    { metric: 'Confidence', value: interviewData.feedback?.metrics?.confidence || 0, max: 10 },
    { metric: 'Fluency', value: interviewData.feedback?.metrics?.fluency || 0, max: 10 }
  ];

  // Create question analysis from actual data
  const questionAnalysis = interviewData.questions ? interviewData.questions.map((question, index) => {
    const answer = interviewData.answers?.[index] || '';
    return {
      id: index + 1,
      question: question,
      answer: answer,
      answerLength: answer.length,
      relevance: Math.min(10, Math.max(1, Math.round(answer.length / 20))), // Estimate based on length
      completeness: Math.min(10, Math.round(answer.length / 15))
    };
  }) : [];

  // Score trend data from all interviews
  const scoreTrendData = allInterviews.map((interview, index) => ({
    session: `Session ${index + 1}`,
    score: interview.feedback?.score || 0,
    date: new Date(interview.date).toLocaleDateString()
  })).slice(0, 5);

  // Performance comparison data using actual metrics
  const performanceData = [
    { category: 'Communication', current: interviewData.feedback?.metrics?.communication || 0, expected: 7 },
    { category: 'Confidence', current: interviewData.feedback?.metrics?.confidence || 0, expected: 6 },
    { category: 'Fluency', current: interviewData.feedback?.metrics?.fluency || 0, expected: 7 }
  ];

  // Answer quality distribution
  const answerQualityData = questionAnalysis.map((q, index) => ({
    question: `Q${index + 1}`,
    length: Math.min(100, q.answerLength), // Cap at 100 for better visualization
    relevance: q.relevance,
    completeness: q.completeness
  }));

  const COLORS = {
    primary: '#3b82f6',
    secondary: '#8b5cf6',
    success: '#10b981',
    warning: '#f59e0b',
    danger: '#ef4444',
    info: '#06b6d4'
  };

  const overallScore = interviewData.feedback?.score || 0;

  return (
    <div className="min-h-screen bg-black">
      {/* Enhanced Header */}
      <div className="bg-zinc-900 border-b border-zinc-700/50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-zinc-300 bg-clip-text text-transparent">
                    Interview Analytics Dashboard
                  </h1>
                  <p className="text-zinc-400">Live data from API - Comprehensive performance analysis</p>
                </div>
              </div>
            </div>
            <div className="text-right space-y-1">
              <div className={`text-3xl font-bold ${overallScore >=7 ? 'text-green-400' : overallScore <= 6 && overallScore >= 3 ? 'text-yellow-400' : 'text-red-400'}`}>
                {overallScore}/10
              </div>
              <div className="text-sm text-zinc-500">Overall Performance</div>
              <div className={`px-3 py-1 border rounded-full text-xs ${
                overallScore >= 7 ? 'bg-green-950 border-green-800 text-green-300' :
                overallScore <= 6 && overallScore >=4 ? 'bg-yellow-950 border-yellow-800 text-yellow-300' :
                'bg-red-950 border-red-800 text-red-300'
              }`}>
                {overallScore <= 3 ? 'Poor' : overallScore <= 6 ? 'Average' : 'Excellent'}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* API Status Indicator */}
        <div className="bg-gradient-to-r from-green-950/50 to-blue-950/50 border border-green-800/50 rounded-xl p-4">
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-300 text-sm font-medium">Live Data Connected</span>
            <span className="text-zinc-400 text-sm">• Last updated: {new Date().toLocaleTimeString()}</span>
            {error && <span className="text-yellow-400 text-sm">• Fallback mode active</span>}
          </div>
        </div>

        {/* Dynamic Alert Based on Score */}
        {overallScore < 5 && (
          <div className="bg-gradient-to-r from-red-950/50 to-orange-950/50 border border-red-800/50 rounded-xl p-6 backdrop-blur-sm">
            <div className="flex items-start space-x-4">
              <AlertCircle className="w-8 h-8 text-red-400 mt-1" />
              <div className="flex-1">
                <h3 className="text-red-200 font-semibold text-lg mb-2">Critical Performance Alert</h3>
                <p className="text-red-300 mb-3">
                  Your interview performance indicates significant gaps in fundamental knowledge. 
                  Immediate focused study is recommended before attempting similar interviews.
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <span className="flex items-center space-x-1 text-red-400">
                    <Target className="w-4 h-4" />
                    <span>Score: {overallScore}/10</span>
                  </span>
                  <span className="flex items-center space-x-1 text-orange-400">
                    <Clock className="w-4 h-4" />
                    <span>Priority: High</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="group bg-zinc-900 rounded-xl p-6 border border-zinc-800 hover:border-zinc-600 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg group-hover:scale-110 transition-transform">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{totalQuestions}</div>
                  <div className="text-sm text-zinc-400">Questions Answered</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-green-400">{completionRate}%</div>
                <div className="text-xs text-zinc-500">Completion</div>
              </div>
            </div>
          </div>

          <div className="group bg-zinc-900 rounded-xl p-6 border border-zinc-800 hover:border-zinc-600 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-3 rounded-lg group-hover:scale-110 transition-transform ${
                  overallScore <= 3 ? 'bg-green-600' : overallScore <= 6 ? 'bg-yellow-600' : 'bg-red-600'
                }`}>
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className={`text-2xl font-bold ${
                    overallScore <= 3 ? 'text-green-400' : overallScore <= 6 ? 'text-yellow-400' : 'text-red-400'
                  }`}>
                    {overallScore}/10
                  </div>
                  <div className="text-sm text-zinc-400">Overall Score</div>
                </div>
              </div>
              <div className="text-right">
                <div className={`flex items-center text-sm ${
                  overallScore <= 3 ? 'text-green-400' : overallScore <= 6 ? 'text-yellow-400' : 'text-red-400'
                }`}>
                  {overallScore <= 3 ? <TrendingDown className="w-4 h-4 mr-1" /> : overallScore <= 6 ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingUp className="w-4 h-4 mr-1" />}
                  {overallScore <= 3 ? 'Poor' : overallScore <= 6 ? 'Average' : 'Excellent'}
                </div>
              </div>
            </div>
          </div>

          <div className="group bg-zinc-900 rounded-xl p-6 border border-zinc-800 hover:border-zinc-600 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-purple-600 rounded-lg group-hover:scale-110 transition-transform">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{avgAnswerLength}</div>
                  <div className="text-sm text-zinc-400">Avg Answer Length</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-orange-400">Chars</div>
                <div className="text-xs text-zinc-500">{avgAnswerLength < 50 ? 'Too Brief' : 'Good'}</div>
              </div>
            </div>
          </div>

          <div className="group bg-gradient-to-br from-zinc-900 to-zinc-950 rounded-xl p-6 border border-zinc-800 hover:border-zinc-600 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-3 bg-gradient-to-br from-yellow-600 to-yellow-700 rounded-lg group-hover:scale-110 transition-transform">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-yellow-400">
                    {((interviewData.feedback?.metrics?.communication || 0) + (interviewData.feedback?.metrics?.confidence || 0) + (interviewData.feedback?.metrics?.fluency || 0) / 3).toFixed(1)}
                  </div>
                  <div className="text-sm text-zinc-400">Avg Skill Score</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-red-400">
                  {overallScore <= 3 ? 'Critical' : overallScore <= 6 ? 'Intermediate' : 'Advanced'}
                </div>
                <div className="text-xs text-zinc-500">Level</div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Score Trend (Enhanced) */}
          <div className="lg:col-span-2 bg-gradient-to-br from-zinc-950 to-slate-950 rounded-xl p-6 border border-zinc-800">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Performance Analysis</h3>
              <div className="flex items-center space-x-2 text-sm text-zinc-400">
                <Calendar className="w-4 h-4" />
                <span>{new Date(interviewData.date).toLocaleDateString()}</span>
              </div>
            </div>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <defs>
                    <linearGradient id="currentGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.danger} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={COLORS.danger} stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="expectedGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor={COLORS.success} stopOpacity={0.3}/>
                      <stop offset="95%" stopColor={COLORS.success} stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="category" 
                    stroke="#9ca3af" 
                    fontSize={12}
                    tick={{ fill: '#9ca3af' }}
                  />
                  <YAxis 
                    stroke="#9ca3af" 
                    fontSize={12} 
                    domain={[0, 10]}
                    tick={{ fill: '#9ca3af' }}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151', 
                      borderRadius: '8px',
                      color: '#ffffff'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="expected" 
                    stroke={COLORS.success}
                    fill="url(#expectedGradient)"
                    strokeWidth={2}
                    name="Expected Level"
                  />
                  <Area 
                    type="monotone" 
                    dataKey="current" 
                    stroke={COLORS.danger}
                    fill="url(#currentGradient)"
                    strokeWidth={2}
                    name="Current Level"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Enhanced Radar Chart */}
          <div className="bg-gradient-to-br from-zinc-950 to-slate-950 rounded-xl p-6 border border-zinc-800">
            <h3 className="text-lg font-semibold text-white mb-6">Skills Assessment</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis 
                    dataKey="metric" 
                    tick={{ fill: '#9ca3af', fontSize: 11 }}
                  />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 10]} 
                    tick={{ fill: '#6b7280', fontSize: 10 }} 
                    tickCount={6}
                    tickLine={false}
                  />
                  <Radar 
                    name="Current" 
                    dataKey="value" 
                    stroke={COLORS.danger} 
                    fill={COLORS.danger} 
                    fillOpacity={0.2} 
                    strokeWidth={2} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151', 
                      borderRadius: '8px',
                      color: '#ffffff'
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Answer Quality Analysis */}
        {questionAnalysis.length > 0 && (
          <div className="bg-gradient-to-br from-zinc-950 to-slate-950 rounded-xl p-6 border border-zinc-800">
            <h3 className="text-lg font-semibold text-white mb-6">Answer Quality Breakdown</h3>
            <div className="h-64 mb-6">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={answerQualityData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <XAxis 
                    dataKey="question" 
                    stroke="#9ca3af" 
                    fontSize={12}
                  />
                  <YAxis 
                    stroke="#9ca3af" 
                    fontSize={12}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151', 
                      borderRadius: '8px',
                      color: '#ffffff'
                    }}
                  />
                  <Bar dataKey="length" fill={COLORS.info} name="Answer Length" />
                  <Bar dataKey="relevance" fill={COLORS.warning} name="Relevance Score" />
                  <Bar dataKey="completeness" fill={COLORS.success} name="Completeness" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Detailed Question Analysis */}
        {questionAnalysis.length > 0 && (
          <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
            <h3 className="text-lg font-semibold text-white mb-6">Question-by-Question Analysis</h3>
            <div className="space-y-6">
              {questionAnalysis.map((item, index) => (
                <div key={index} className="bg-zinc-800 rounded-xl p-6 border border-zinc-700 hover:border-zinc-600 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="px-3 py-1 bg-blue-600 rounded-full text-white text-xs font-medium">
                          Q{item.id}
                        </div>
                        <h4 className="text-white font-medium">{item.question}</h4>
                      </div>
                      <div className="bg-zinc-900 rounded-lg p-4 mb-4">
                        <p className="text-zinc-300 text-sm italic">"{item.answer}"</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-400">Answer Length</span>
                        <span className="text-white font-medium">{item.answerLength} chars</span>
                      </div>
                      <div className="w-full bg-zinc-700 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${Math.min(100, (item.answerLength / 100) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-400">Relevance</span>
                        <span className="text-white font-medium">{item.relevance}/10</span>
                      </div>
                      <div className="w-full bg-zinc-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            item.relevance <= 3 ? 'bg-red-500' : 
                            item.relevance <= 6 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${item.relevance * 10}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-zinc-400">Completeness</span>
                        <span className="text-white font-medium">{item.completeness}/10</span>
                      </div>
                      <div className="w-full bg-zinc-700 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-500 ${
                            item.completeness <= 3 ? 'bg-red-500' : 
                            item.completeness <= 6 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${item.completeness * 10}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Enhanced Feedback Section - REMOVED */}
        {/* Enhanced Roadmap Section - REMOVED */}
        {/* Session Summary Section - REMOVED */}
      </div>
    </div>
  );
};

export default ReactInterviewDashboard;