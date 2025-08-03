import React, { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, Users, Award, Brain, BarChart3, Calendar, ChevronRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Tooltip } from 'recharts';

const ModernDashboard = () => {
  const [feedbackData, setFeedbackData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeedbackData();
  }, []);

  const fetchFeedbackData = async () => {
    try {
      setLoading(true);
      const mockData = [
        {
          _id: '1',
          date: new Date().toISOString(),
          questions: ['What is your experience?', 'Tell me about a challenge', 'Where do you see yourself?'],
          feedback: {
            score: 1,
            strengths: 'Excellent communication skills, strong technical background, and great problem-solving approach.',
            weaknesses: 'Could provide more specific examples and improve body language confidence.',
            improvementTips: 'Practice the STAR method for behavioral questions and work on maintaining eye contact.',
            metrics: { communication: 9, confidence: 7, fluency: 8, technical: 8.5, problemSolving: 8, leadership: 6 }
          }
        },
        {
          _id: '2',
          date: new Date(Date.now() - 86400000).toISOString(),
          questions: ['Describe your workflow', 'Handle difficult customers', 'Team collaboration'],
          feedback: {
            score: 7.2,
            strengths: 'Good technical knowledge and willingness to learn.',
            weaknesses: 'Needs to work on confidence and providing concrete examples.',
            improvementTips: 'Prepare more stories from past experiences and practice speaking with confidence.',
            metrics: { communication: 7, confidence: 6, fluency: 7, technical: 8, problemSolving: 7, leadership: 6 }
          }
        },
        {
          _id: '3',
          date: new Date(Date.now() - 172800000).toISOString(),
          questions: ['Leadership experience', 'Conflict resolution', 'Future goals'],
          feedback: {
            score: 9.1,
            strengths: 'Outstanding leadership qualities and excellent communication.',
            weaknesses: 'Minor improvements in technical depth could be beneficial.',
            improvementTips: 'Continue developing technical skills while maintaining strong soft skills.',
            metrics: { communication: 9, confidence: 9, fluency: 9, technical: 7, problemSolving: 9, leadership: 9 }
          }
        },
        {
          _id: '4',
          date: new Date(Date.now() - 259200000).toISOString(),
          questions: ['Project management', 'Team dynamics', 'Problem solving'],
          feedback: {
            score: 6.8,
            strengths: 'Good analytical skills and team collaboration.',
            weaknesses: 'Needs more confidence in presentation and leadership scenarios.',
            improvementTips: 'Practice public speaking and take on more leadership roles.',
            metrics: { communication: 6, confidence: 5, fluency: 7, technical: 7, problemSolving: 8, leadership: 5 }
          }
        },
        {
          _id: '3',
          date: new Date(Date.now() - 345600000).toISOString(),
          questions: ['Technical challenges', 'Innovation', 'Future vision'],
          feedback: {
            score: 7.8,
            strengths: 'Strong technical foundation and innovative thinking.',
            weaknesses: 'Could improve communication clarity.',
            improvementTips: 'Work on explaining complex concepts in simple terms.',
            metrics: { communication: 6, confidence: 8, fluency: 7, technical: 9, problemSolving: 8, leadership: 7 }
          }
        },
        {
          _id: '6',
          date: new Date(Date.now() - 432000000).toISOString(),
          questions: ['Time you solved a complex issue', 'How do you manage deadlines?', 'Team conflict resolution'],
          feedback: {
            score: 8.9,
            strengths: 'Great problem-solving under pressure, excellent time management.',
            weaknesses: 'Needs slight improvement in expressing technical decisions clearly.',
            improvementTips: 'Use diagrams and structured explanations during technical discussions.',
            metrics: { communication: 8, confidence: 8, fluency: 8, technical: 8, problemSolving: 9, leadership: 8 }
          }
        },
        {
          _id: '7',
          date: new Date(Date.now() - 518400000).toISOString(),
          questions: ['Your biggest achievement?', 'Explain a technical project', 'What motivates you?'],
          feedback: {
            score: 7.5,
            strengths: 'Good presentation skills and motivated attitude.',
            weaknesses: 'Needs to provide more measurable results in answers.',
            improvementTips: 'Use data-driven examples to strengthen responses.',
            metrics: { communication: 7, confidence: 7, fluency: 7, technical: 7, problemSolving: 8, leadership: 6 }
          }
        },
        {
          _id: '8',
          date: new Date(Date.now() - 604800000).toISOString(),
          questions: ['How do you handle criticism?', 'Example of leadership', 'Describe an innovation you made'],
          feedback: {
            score: 3,
            strengths: 'Open to feedback and eager to improve.',
            weaknesses: 'Needs to show more assertiveness during discussions.',
            improvementTips: 'Practice speaking with authority while maintaining humility.',
            metrics: { communication: 6, confidence: 5, fluency: 6, technical: 7, problemSolving: 7, leadership: 5 }
          }
        },
        {
          _id: '9',
          date: new Date(Date.now() - 691200000).toISOString(),
          questions: ['Why should we hire you?', 'Describe a failed project', 'What did you learn from failure?'],
          feedback: {
            score: 2,
            strengths: 'Self-awareness and learning from failures effectively.',
            weaknesses: 'Could use more technical depth in some answers.',
            improvementTips: 'Deep dive into technical case studies to enrich examples.',
            metrics: { communication: 8, confidence: 7, fluency: 8, technical: 7, problemSolving: 8, leadership: 7 }
          }
        },
        {
          _id: '10',
          date: new Date(Date.now() - 777600000).toISOString(),
          questions: ['Explain a situation where you led a team', 'How do you handle stress?', 'Your career vision'],
          feedback: {
            score: 9.3,
            strengths: 'Exceptional leadership under stress and clear long-term vision.',
            weaknesses: 'Slightly over-detailed in some answers.',
            improvementTips: 'Be concise while retaining important details.',
            metrics: { communication: 9, confidence: 9, fluency: 9, technical: 8, problemSolving: 9, leadership: 10 }
          }
        },
        
      ];
      
      
      await new Promise(resolve => setTimeout(resolve, 800));
      setFeedbackData(mockData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = () => {
    if (!feedbackData.length) return {
      totalInterviews: 0,
      avgScore: 0,
      totalQuestions: 0,
      improvement: 0,
    };
    
    const totalInterviews = feedbackData.length;
    const avgScore = (feedbackData.reduce((sum, item) => sum + item.feedback.score, 0) / totalInterviews).toFixed(1);
    const totalQuestions = feedbackData.reduce((sum, item) => sum + item.questions.length, 0);
    const recentScores = feedbackData.slice(-3).map(item => item.feedback.score);
    const improvement = recentScores.length > 1 ?
      ((recentScores[recentScores.length - 1] - recentScores[0]) / recentScores[0] * 100).toFixed(1) : 12.5;
    
    return { totalInterviews, avgScore, totalQuestions, improvement };
  };

  const stats = calculateStats();

  // Chart data with proper structure
  const trendData = feedbackData.map((item, index) => ({
    interview: `Interview ${index + 1}`,
    score: parseFloat(item.feedback.score.toFixed(1)),
  }));

  const radarData = [
    { metric: 'Communication', value: feedbackData[0]?.feedback.metrics?.communication || 0 },
    { metric: 'Confidence', value: feedbackData[0]?.feedback.metrics?.confidence || 0 },
    { metric: 'Fluency', value: feedbackData[0]?.feedback.metrics?.fluency || 0 },
    { metric: 'Technical', value: feedbackData[0]?.feedback.metrics?.technical || 0 },
    { metric: 'Problem Solving', value: feedbackData[0]?.feedback.metrics?.problemSolving || 0 },
    { metric: 'Leadership', value: feedbackData[0]?.feedback.metrics?.leadership || 0 },
  ];

  const skillsData = [
    { name: 'Technical', value: 35 },
    { name: 'Communication', value: 25 },
    { name: 'Problem Solving', value: 20 },
    { name: 'Leadership', value: 12 },
    { name: 'Creativity', value: 8 },
  ];

  // Monochrome colors
  const COLORS = ['#FFB400', '#FF3CAC', '#6EE7B7', '#3B82F6', 'green'];


  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
          <p className="text-zinc-400 font-medium">Loading your analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-zinc-900 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white">Interview Analytics</h1>
              <p className="text-zinc-400 mt-2">Track your progress and improve your interview skills</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">{stats.avgScore}/10</div>
              <div className="text-sm text-zinc-500">Average Score</div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <div className="bg-zinc-950 rounded-xl p-6 border border-zinc-800 hover:border-zinc-700 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Users className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stats.totalInterviews}</div>
                  <div className="text-sm text-zinc-400">Total Interviews</div>
                </div>
              </div>
              <div className="flex items-center text-white text-sm font-medium">
                <TrendingUp className="w-4 h-4  mr-1 text-green-600" />
                12.5%
              </div>
            </div>
          </div>

          <div className="bg-zinc-950 rounded-xl p-6 border border-zinc-800 hover:border-zinc-700 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-orange-600 rounded-lg">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stats.avgScore}/10</div>
                  <div className="text-sm text-zinc-400">Average Score</div>
                </div>
              </div>
              <div className="flex items-center text-white text-sm font-medium">
                <TrendingUp className="w-4 h-4 mr-1  text-green-600"/>
                8.2%
              </div>
            </div>
          </div>

          <div className="bg-zinc-950 rounded-xl p-6 border border-zinc-800 hover:border-zinc-700 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-green-600 rounded-lg">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{stats.totalQuestions}</div>
                  <div className="text-sm text-zinc-400">Questions Answered</div>
                </div>
              </div>
              <div className="flex items-center text-zinc-400 text-sm font-medium">
                <TrendingDown className="w-4 h-4 mr-1   text-red-600" />
                2.1%
              </div>
            </div>
          </div>

          <div className="bg-zinc-950 rounded-xl p-6 border border-zinc-800 hover:border-zinc-700 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-yellow-400 rounded-lg">
                  <BarChart3 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{Math.abs(stats.improvement)}%</div>
                  <div className="text-sm text-zinc-400">Improvement</div>
                </div>
              </div>
              <div className="flex items-center text-white text-sm font-medium">
                <TrendingUp className="w-4 h-4 mr-1   text-red-600" />
                {stats.improvement}%
              </div>
            </div>
          </div>
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Score Trend */}
          <div className="lg:col-span-2 bg-zinc-950 rounded-xl p-6 border border-zinc-800">
            <h3 className="text-lg font-semibold text-white mb-6">Score Progression</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 50, right: 30, left: 20, bottom: 10 }}>
                  <XAxis 
                    dataKey="interview" 
                    stroke="#9ca3af" 
                    fontSize={12}
                    tickLine={true}
                    axisLine={true}
                  />
                  <YAxis 
                    stroke="#9ca3af" 
                    fontSize={12} 
                    domain={[0, 10]}
                    tickLine={false}
                    axisLine={true}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1f2937', 
                      border: '1px solid #374151', 
                      borderRadius: '8px',
                      padding:"0 2rem",
                      color: '#ffffff'
                    }}
                    labelStyle={{ color: '#ffffff' }}
                  />
                  <Line 
                    type="monotoneX" 
                    dataKey="score" 
                    stroke="#ffffff" 
                    strokeWidth={2} 
                    dot={{ fill: '#ffffff', strokeWidth: 1, r: 5 }}
                    activeDot={{ r: 7, fill: '#d1d5db', stroke: '#ffffff', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Skills Distribution */}
          <div className="bg-zinc-950 rounded-xl p-6 border border-zinc-800">
            <h3 className="text-lg font-semibold text-white mb-6">Skills Assessment</h3>
            <div className="h-64 flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={skillsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {skillsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', // slate-800 style (dark bluish)
    border: '1px solid #334155', // slate-700 border
    borderRadius: '8px',
    color: '#F1F5F9', // light slate-50 text
    padding: '0.5rem 1rem',
    fontSize: '14px',
    fontWeight: '500',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="mt-4 space-y-2">
              {skillsData.map((skill, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="text-zinc-300">{skill.name}</span>
                  </div>
                  <span className="text-zinc-400">{skill.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Performance Overview and Latest Feedback */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Radar Chart */}
          <div className="bg-zinc-950 rounded-xl p-6 border border-zinc-800">
            <h3 className="text-lg font-semibold text-white mb-6">Performance Overview</h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={radarData} margin={{ top: 20, right: 30, bottom: 20, left: 30 }}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis 
                    dataKey="metric" 
                    tick={{ fill: '#9ca3af', fontSize: 12 }}
                    className="text-xs"
                  />
                  <PolarRadiusAxis 
                    angle={90} 
                    domain={[0, 10]} 
                    tick={{ fill: '#6b7280', fontSize: 10 }} 
                    tickCount={6}
                    tickLine={false}
                  />
                  <Radar 
                    name="Performance" 
                    dataKey="value" 
                    stroke="green" 
                    fill="green" 
                    fillOpacity={0.1} 
                    strokeWidth={2} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'white', 
                      border: '1px solid #374151', 
                      borderRadius: '8px',
                      color: 'black',
                      padding:"0 2rem",
                      fontSize:"14px",
                      fontWeight:"500",
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Latest Feedback */}
          <div className="bg-zinc-950 rounded-xl p-6 border border-zinc-800">
            <h3 className="text-lg font-semibold text-white mb-6">Latest Feedback</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-3xl font-bold text-white">{feedbackData[0]?.feedback.score || 0}/10</div>
                <div className={`px-3 py-1 rounded-full text-sm font-medium border ${
                  (feedbackData[0]?.feedback.score || 0) >= 8 ? 'border-white text-white' :
                  (feedbackData[0]?.feedback.score || 0) >= 6 ? 'border-zinc-400 text-zinc-400' :
                  (feedbackData[0]?.feedback.score || 0) >= 4 ? 'border-zinc-500 text-zinc-500' : 'border-zinc-600 text-zinc-600'
                }`}>
                  {(feedbackData[0]?.feedback.score || 0) >= 8 ? "Excellent" :
                   (feedbackData[0]?.feedback.score || 0) >= 6 ? "Good" :
                   (feedbackData[0]?.feedback.score || 0) >= 4 ? "Average" : "Needs Work"}
                </div>
              </div>
              <div className="w-full bg-zinc-700 rounded-full h-2">
                <div 
                  className="bg-white h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(feedbackData[0]?.feedback.score || 0) * 10}%` }}
                ></div>
              </div>
              <div className="text-zinc-300 text-sm leading-relaxed">
                {feedbackData[0]?.feedback.strengths || "Strong technical knowledge and clear communication skills."}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Interviews */}
        <div className="bg-zinc-900 rounded-xl p-6 border border-zinc-800">
          <h3 className="text-lg font-semibold text-white mb-6">Recent Interview Sessions</h3>
          <div className="space-y-4">
            {feedbackData.slice(0, 5).map((interview, index) => (
              <div key={interview._id || index} className="flex items-center justify-between p-4 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="p-2 bg-zinc-700 rounded-lg">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-white">
                      {new Date(interview.date).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-zinc-400">
                      {interview.questions.length} questions answered
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">
                      {interview.feedback.score}/10
                    </div>
                    <div className="text-xs text-zinc-500">Score</div>
                  </div>
                  <div className="px-2 py-1 rounded-full text-xs font-medium bg-zinc-700 text-zinc-300 border border-zinc-600">
                    Completed
                  </div>
                  <ChevronRight className="w-5 h-5 text-zinc-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernDashboard;