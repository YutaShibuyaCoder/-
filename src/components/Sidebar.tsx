import React from 'react';
import { Home, Clock, Calendar, Settings, LogOut, Users } from 'lucide-react';

type SidebarProps = {
  onViewChange: (view: 'timecard' | 'history' | 'admin') => void;
  currentView: string;
};

const Sidebar: React.FC<SidebarProps> = ({ onViewChange, currentView }) => {
  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="h-16 flex items-center px-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">勤怠管理</h1>
      </div>
      
      <nav className="p-4">
        <ul className="space-y-2">
          <li>
            <button
              onClick={() => onViewChange('timecard')}
              className={`flex items-center px-4 py-2 text-gray-700 rounded-lg w-full ${
                currentView === 'timecard' ? 'bg-gray-100' : 'hover:bg-gray-100'
              }`}
            >
              <Clock className="h-5 w-5 mr-3" />
              打刻
            </button>
          </li>
          <li>
            <button
              onClick={() => onViewChange('history')}
              className={`flex items-center px-4 py-2 text-gray-700 rounded-lg w-full ${
                currentView === 'history' ? 'bg-gray-100' : 'hover:bg-gray-100'
              }`}
            >
              <Calendar className="h-5 w-5 mr-3" />
              勤怠履歴
            </button>
          </li>
          <li>
            <button className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full">
              <Settings className="h-5 w-5 mr-3" />
              設定
            </button>
          </li>
        </ul>
      </nav>

      <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
        <button 
          onClick={() => onViewChange('admin')}
          className={`flex items-center px-4 py-2 text-gray-700 rounded-lg w-full mb-2 ${
            currentView === 'admin' ? 'bg-gray-100' : 'hover:bg-gray-100'
          }`}
        >
          <Users className="h-5 w-5 mr-3" />
          管理者ページへ
        </button>
        <button className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg w-full">
          <LogOut className="h-5 w-5 mr-3" />
          ログアウト
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;