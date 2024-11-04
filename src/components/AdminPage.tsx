import React, { useState } from 'react';
import { Users, Clock, AlertCircle, CheckCircle, Plus } from 'lucide-react';
import AddEmployeeModal from './AddEmployeeModal';
import EmployeeList from './EmployeeList';

type AdminView = 'dashboard' | 'employees';

const AdminPage: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState(() => {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
  });
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentView, setCurrentView] = useState<AdminView>('dashboard');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <h2 className="text-2xl font-bold text-gray-900">管理者ダッシュボード</h2>
          <div className="border-l border-gray-200 h-8 mx-2" />
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentView('dashboard')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentView === 'dashboard'
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              ダッシュボード
            </button>
            <button
              onClick={() => setCurrentView('employees')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentView === 'employees'
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              従業員一覧
            </button>
          </div>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-5 w-5 mr-2" />
          従業員を追加
        </button>
      </div>

      {currentView === 'dashboard' ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Users className="h-5 w-5 text-blue-500 mr-2" />
                  <h3 className="text-sm font-medium text-gray-900">総従業員数</h3>
                </div>
                <span className="text-2xl font-bold text-gray-900">42</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-green-500 mr-2" />
                  <h3 className="text-sm font-medium text-gray-900">本日の出勤者数</h3>
                </div>
                <span className="text-2xl font-bold text-gray-900">38</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <AlertCircle className="h-5 w-5 text-yellow-500 mr-2" />
                  <h3 className="text-sm font-medium text-gray-900">承認待ち</h3>
                </div>
                <span className="text-2xl font-bold text-gray-900">5</span>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-indigo-500 mr-2" />
                  <h3 className="text-sm font-medium text-gray-900">今月の承認済み</h3>
                </div>
                <span className="text-2xl font-bold text-gray-900">156</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-medium text-gray-900">承認待ち勤怠一覧</h2>
                <select
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(e.target.value)}
                  className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="2024-03">2024年3月</option>
                  <option value="2024-02">2024年2月</option>
                  <option value="2024-01">2024年1月</option>
                </select>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">社員名</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">日付</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">出勤</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">退勤</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">稼働時間</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">備考</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">操作</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {[
                    { name: '山田太郎', date: '2024/03/19', clockIn: '09:00', clockOut: '18:00', duration: '9時間', comment: '通常業務' },
                    { name: '鈴木花子', date: '2024/03/19', clockIn: '09:15', clockOut: '18:30', duration: '9時間15分', comment: 'プロジェクトMTG' },
                    { name: '佐藤次郎', date: '2024/03/19', clockIn: '08:45', clockOut: '17:30', duration: '8時間45分', comment: 'システム開発' },
                  ].map((record, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.name}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.date}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.clockIn}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.clockOut}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.duration}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{record.comment}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button className="text-indigo-600 hover:text-indigo-900 mr-3">承認</button>
                        <button className="text-red-600 hover:text-red-900">却下</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <EmployeeList />
      )}

      <AddEmployeeModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSubmit={(data) => {
          console.log('New employee data:', data);
          setShowAddModal(false);
        }}
      />
    </div>
  );
};

export default AdminPage;