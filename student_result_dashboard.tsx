import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from 'recharts';
import { GraduationCap, Users, Award, TrendingUp, Filter } from 'lucide-react';

const StudentResultDashboard = () => {
  // Sample student data
  const [studentData] = useState([
    { id: 1, name: "Aman", class: "10A", term: "Term 1", math: 92, science: 88, english: 85, history: 79, geography: 83 },
    { id: 2, name: "Raman", class: "10A", term: "Term 1", math: 78, science: 82, english: 90, history: 85, geography: 77 },
    { id: 3, name: "Ankit", class: "10A", term: "Term 1", math: 85, science: 91, english: 87, history: 88, geography: 92 },
    { id: 4, name: "Anuj", class: "10B", term: "Term 1", math: 73, science: 76, english: 82, history: 74, geography: 78 },
    { id: 5, name: "Sawgata", class: "10B", term: "Term 1", math: 89, science: 94, english: 91, history: 86, geography: 88 },
    { id: 6, name: "Ranjan", class: "10A", term: "Term 2", math: 95, science: 89, english: 88, history: 92, geography: 87 },
    { id: 7, name: "Geeta", class: "10B", term: "Term 2", math: 81, science: 85, english: 93, history: 89, geography: 84 },
    { id: 8, name: "Hitesh", class: "10A", term: "Term 2", math: 76, science: 79, english: 84, history: 77, geography: 81 },
    { id: 9, name: "Astha", class: "10B", term: "Term 2", math: 93, science: 96, english: 89, history: 91, geography: 94 },
    { id: 10, name: "Rinki", class: "10A", term: "Term 2", math: 87, science: 83, english: 86, history: 82, geography: 85 }
  ]);

  const [selectedClass, setSelectedClass] = useState("All");
  const [selectedTerm, setSelectedTerm] = useState("All");

  // Calculate grades based on marks
  const getGrade = (marks) => {
    if (marks >= 90) return 'A+';
    if (marks >= 85) return 'A';
    if (marks >= 80) return 'B+';
    if (marks >= 75) return 'B';
    if (marks >= 70) return 'C+';
    if (marks >= 65) return 'C';
    if (marks >= 60) return 'D';
    return 'F';
  };

  // Filter data based on selected filters
  const filteredData = useMemo(() => {
    return studentData.filter(student => {
      const classMatch = selectedClass === "All" || student.class === selectedClass;
      const termMatch = selectedTerm === "All" || student.term === selectedTerm;
      return classMatch && termMatch;
    });
  }, [studentData, selectedClass, selectedTerm]);

  // Calculate subject-wise averages
  const subjectAverages = useMemo(() => {
    const subjects = ['math', 'science', 'english', 'history', 'geography'];
    return subjects.map(subject => {
      const total = filteredData.reduce((sum, student) => sum + student[subject], 0);
      const average = filteredData.length > 0 ? total / filteredData.length : 0;
      return {
        subject: subject.charAt(0).toUpperCase() + subject.slice(1),
        average: Math.round(average * 100) / 100,
        grade: getGrade(average)
      };
    });
  }, [filteredData]);

  // Calculate grade distribution
  const gradeDistribution = useMemo(() => {
    const grades = {};
    const subjects = ['math', 'science', 'english', 'history', 'geography'];
    
    filteredData.forEach(student => {
      subjects.forEach(subject => {
        const grade = getGrade(student[subject]);
        grades[grade] = (grades[grade] || 0) + 1;
      });
    });

    return Object.entries(grades).map(([grade, count]) => ({
      grade,
      count,
      percentage: Math.round((count / (filteredData.length * subjects.length)) * 100)
    }));
  }, [filteredData]);

  // Calculate top performers
  const topPerformers = useMemo(() => {
    return filteredData
      .map(student => {
        const subjects = ['math', 'science', 'english', 'history', 'geography'];
        const total = subjects.reduce((sum, subject) => sum + student[subject], 0);
        const average = total / subjects.length;
        return {
          ...student,
          average: Math.round(average * 100) / 100,
          grade: getGrade(average)
        };
      })
      .sort((a, b) => b.average - a.average)
      .slice(0, 5);
  }, [filteredData]);

  const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7c7c', '#8dd1e1', '#d084d0'];

  const uniqueClasses = [...new Set(studentData.map(s => s.class))];
  const uniqueTerms = [...new Set(studentData.map(s => s.term))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <GraduationCap className="h-8 w-8 text-indigo-600" />
            <h1 className="text-3xl font-bold text-gray-800">Student Result Visualization Dashboard</h1>
          </div>
          
          {/* Filters */}
          <div className="flex gap-4 items-center">
            <Filter className="h-5 w-5 text-gray-600" />
            <select 
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Classes</option>
              {uniqueClasses.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
            
            <select 
              value={selectedTerm}
              onChange={(e) => setSelectedTerm(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500"
            >
              <option value="All">All Terms</option>
              {uniqueTerms.map(term => (
                <option key={term} value={term}>{term}</option>
              ))}
            </select>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-indigo-600">{filteredData.length}</p>
              </div>
              <Users className="h-8 w-8 text-indigo-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Score</p>
                <p className="text-2xl font-bold text-green-600">
                  {Math.round(subjectAverages.reduce((sum, s) => sum + s.average, 0) / subjectAverages.length)}%
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Top Grade</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {gradeDistribution.length > 0 ? gradeDistribution.sort((a, b) => b.count - a.count)[0]?.grade : 'N/A'}
                </p>
              </div>
              <Award className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Classes</p>
                <p className="text-2xl font-bold text-purple-600">{selectedClass === "All" ? uniqueClasses.length : 1}</p>
              </div>
              <GraduationCap className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Charts Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Subject-wise Bar Chart */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Subject-wise Average Scores</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={subjectAverages}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="subject" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Legend />
                <Bar dataKey="average" fill="#4f46e5" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          
          {/* Grade Distribution Pie Chart */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Grade Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={gradeDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({grade, percentage}) => `${grade}: ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {gradeDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Charts Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Top Performers */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Top Performers</h2>
            <div className="space-y-3">
              {topPerformers.map((student, index) => (
                <div key={student.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-400' : 'bg-blue-500'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{student.name}</p>
                      <p className="text-sm text-gray-600">{student.class} - {student.term}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-lg text-indigo-600">{student.average}%</p>
                    <p className="text-sm text-gray-600">Grade {student.grade}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Subject Performance Trends */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Subject Performance Overview</h2>
            <div className="space-y-4">
              {subjectAverages.map((subject, index) => (
                <div key={subject.subject} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full" style={{backgroundColor: COLORS[index % COLORS.length]}}></div>
                    <span className="font-medium text-gray-700">{subject.subject}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-indigo-600 h-2 rounded-full" 
                        style={{width: `${subject.average}%`}}
                      ></div>
                    </div>
                    <span className="font-bold text-indigo-600 w-12">{subject.average}%</span>
                    <span className="font-semibold text-gray-600 w-8">{subject.grade}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-white rounded-lg shadow-lg p-4 text-center">
          <p className="text-gray-600">
            Data Analysis Dashboard - Showing results for {filteredData.length} students 
            {selectedClass !== "All" && ` in ${selectedClass}`}
            {selectedTerm !== "All" && ` during ${selectedTerm}`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default StudentResultDashboard;