import React from 'react';
import { Calendar } from 'lucide-react';
import { AttendanceRecord } from '../types/attendance';
import { calculateWorkHours, formatDuration } from '../utils/timeCalculations';

type AttendanceHistoryProps = {
  records: AttendanceRecord[];
  onViewDetail?: () => void;
};

const AttendanceHistory: React.FC<AttendanceHistoryProps> = ({ records, onViewDetail }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">勤怠履歴</h2>
        <div className="flex items-center gap-4">
          <Calendar className="h-6 w-6 text-gray-400" />
          {onViewDetail && (
            <button
              onClick={onViewDetail}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 rounded-lg hover:bg-indigo-100 transition-colors"
            >
              詳細を見る
            </button>
          )}
        </div>
      </div>

      <div className="overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                日付
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                出勤
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                退勤
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                稼働時間
              </th>
              <th className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                状態
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {records.slice(0, 5).map((record, index) => {
              const workHours = record.clockIn && record.clockOut
                ? calculateWorkHours(record.clockIn, record.clockOut)
                : 0;

              return (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.date}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.clockIn || '-'}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                    {record.clockOut || '-'}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-900">
                    {workHours > 0 ? formatDuration(workHours) : '-'}
                  </td>
                  <td className="px-3 py-4 whitespace-nowrap">
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
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AttendanceHistory;