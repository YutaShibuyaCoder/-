import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import TimeCard from './components/TimeCard';
import AttendanceHistory from './components/AttendanceHistory';
import AttendanceDetail from './components/AttendanceDetail';
import AdminPage from './components/AdminPage';
import { useAttendance } from './hooks/useAttendance';

const App: React.FC = () => {
  const attendance = useAttendance();
  const [showDetail, setShowDetail] = useState(false);
  const [currentView, setCurrentView] = useState<'timecard' | 'history' | 'admin'>('timecard');

  const currentMonth = new Date().toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long'
  });

  const handleViewChange = (view: 'timecard' | 'history' | 'admin') => {
    setCurrentView(view);
    if (view !== 'history') setShowDetail(false);
  };

  const handleViewDetail = () => {
    setShowDetail(true);
    setCurrentView('history');
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar onViewChange={handleViewChange} currentView={currentView} />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              {currentView === 'admin' ? '管理者ページ' : '勤怠管理システム'}
            </h1>
            {currentView !== 'admin' && <p className="text-gray-600">{currentMonth}</p>}
          </header>
          
          {currentView === 'admin' ? (
            <AdminPage />
          ) : currentView === 'timecard' ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <TimeCard 
                onClockIn={attendance.clockIn} 
                onClockOut={attendance.clockOut}
                currentStatus={attendance.currentStatus}
              />
              <AttendanceHistory 
                records={attendance.records} 
                onViewDetail={handleViewDetail}
              />
            </div>
          ) : (
            <AttendanceDetail
              records={attendance.records}
              onClose={() => {
                setShowDetail(false);
                setCurrentView('timecard');
              }}
            />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;