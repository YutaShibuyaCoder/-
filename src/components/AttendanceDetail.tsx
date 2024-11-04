import React, { useState } from 'react';
import { Clock, Calendar, AlertCircle } from 'lucide-react';
import { AttendanceRecord } from '../types/attendance';
import { calculateWorkHours, formatDuration, getMonthRecords, getAvailableMonths } from '../utils/timeCalculations';

type AttendanceDetailProps = {
  records: AttendanceRecord[];
  onClose: () => void;
};

const AttendanceDetail: React.FC<AttendanceDetailProps> = ({ records, onClose }) => {
  const [selectedDate, setSelectedDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth());
  });

  const availableMonths = getAvailableMonths(records);
  const monthRecords = getMonthRecords(records, selectedDate);
  
  const totalWorkHours = monthRecords.reduce((total, record) => {
    if (record.clockIn && record.clockOut) {
      return total + calculateWorkHours(record.clockIn, record.clockOut);
    }
    return total;
  }, 0);

  const averageWorkHours = monthRecords.length > 0 
    ? totalWorkHours / monthRecords.length 
    : 0;

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const [year, month] = event.target.value.split('-').map(Number);
    setSelectedDate(new Date(year, month - 1));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">勤怠詳細</h2>
          <div className="mt-2">
            <select
              value={`${selectedDate.getFullYear()}-${selectedDate.getMonth() + 1}`}
              onChange={handleMonthChange}
              className="block w-48 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 text-sm"
            >
              {availableMonths.map(({ year, month, label }) => (
                <option key={`${year}-${month}`} value={`${year}-${month}`}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          ✕
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <Clock className="h-5 w-5" />
            <span>稼働時間</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatDuration(totalWorkHours)}</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <Calendar className="h-5 w-5" />
            <span>稼働日数</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{monthRecords.length}日</p>
        </div>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-2 text-gray-600 mb-2">
            <AlertCircle className="h-5 w-5" />
            <span>平均稼働</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{formatDuration(averageWorkHours)}</p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">日付</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">出勤</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">退勤</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">稼働時間</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">状態</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">備考</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {monthRecords.map((record, index) => {
              const workHours = record.clockIn && record.clockOut
                ? calculateWorkHours(record.clockIn, record.clockOut)
                : 0;

              return (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.clockIn || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{record.clockOut || '-'}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{formatDuration(workHours)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      record.status === '承認済'
                        ? 'bg-green-100 text-green-800'
                        : record.status === '承認待ち'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {record.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{record.comment || '-'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceDetail;