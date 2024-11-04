import React, { useState } from 'react';
import { Clock } from 'lucide-react';

type TimeCardProps = {
  onClockIn: (comment?: string) => string;
  onClockOut: (comment?: string) => string;
  currentStatus: 'in' | 'out' | null;
};

const TimeCard: React.FC<TimeCardProps> = ({ onClockIn, onClockOut, currentStatus }) => {
  const [time, setTime] = useState(new Date());
  const [comment, setComment] = useState('');

  React.useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const handleClockIn = () => {
    onClockIn(comment);
    setComment('');
  };

  const handleClockOut = () => {
    onClockOut(comment);
    setComment('');
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">打刻</h2>
        <Clock className="h-6 w-6 text-gray-400" />
      </div>
      
      <div className="text-center mb-8">
        <div className="text-4xl font-bold text-gray-900 mb-2">
          {formatTime(time)}
        </div>
        <div className="text-gray-500">
          {time.toLocaleDateString('ja-JP', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long',
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={handleClockIn}
          disabled={currentStatus === 'in'}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
            currentStatus === 'in'
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-indigo-600 text-white hover:bg-indigo-700'
          }`}
        >
          出勤
        </button>
        <button 
          onClick={handleClockOut}
          disabled={currentStatus === 'out' || currentStatus === null}
          className={`flex-1 py-3 px-4 rounded-lg font-medium transition-colors ${
            currentStatus === 'out' || currentStatus === null
              ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          退勤
        </button>
      </div>

      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          業務内容・備考
        </label>
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          rows={3}
          placeholder="業務内容や備考を入力してください"
        />
      </div>
    </div>
  );
};

export default TimeCard;