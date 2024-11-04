import { useState } from 'react';
import { AttendanceRecord } from '../types/attendance';

const formatDate = (date: Date): string => {
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).replace(/\//g, '/');
};

const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const useAttendance = () => {
  const [records, setRecords] = useState<AttendanceRecord[]>([
    { date: '2024/03/19', clockIn: '09:00', clockOut: '18:00', status: '承認済', comment: '通常業務' },
    { date: '2024/03/18', clockIn: '09:15', clockOut: '18:30', status: '承認済', comment: 'プロジェクトミーティング' },
    { date: '2024/03/15', clockIn: '08:45', clockOut: '17:30', status: '承認済', comment: 'システム開発' },
    { date: '2024/03/14', clockIn: '09:00', clockOut: '19:00', status: '承認済', comment: 'デバッグ作業' },
    { date: '2024/03/13', clockIn: '09:30', clockOut: '18:15', status: '承認済', comment: 'コードレビュー' },
    { date: '2024/03/12', clockIn: '09:00', clockOut: '18:00', status: '承認済', comment: '定例MTG' },
    { date: '2024/03/11', clockIn: '09:15', clockOut: '18:45', status: '承認済', comment: 'テスト実施' },
    { date: '2024/03/08', clockIn: '08:30', clockOut: '17:30', status: '承認済', comment: 'リリース作業' },
    { date: '2024/03/07', clockIn: '09:00', clockOut: '18:30', status: '承認済', comment: '通常業務' },
    { date: '2024/03/06', clockIn: '09:45', clockOut: '19:15', status: '承認済', comment: '障害対応' },
  ]);

  const [currentStatus, setCurrentStatus] = useState<'in' | 'out' | null>(null);

  const clockIn = (comment?: string) => {
    const now = new Date();
    const today = formatDate(now);
    const time = formatTime(now);

    setRecords(prev => {
      const existingRecord = prev.find(record => record.date === today);
      if (existingRecord) {
        return prev.map(record =>
          record.date === today
            ? { ...record, clockIn: time, status: '承認待ち', comment }
            : record
        );
      }
      return [
        {
          date: today,
          clockIn: time,
          clockOut: null,
          status: '承認待ち',
          comment,
        },
        ...prev,
      ];
    });

    setCurrentStatus('in');
    return time;
  };

  const clockOut = (comment?: string) => {
    const now = new Date();
    const today = formatDate(now);
    const time = formatTime(now);

    setRecords(prev =>
      prev.map(record =>
        record.date === today
          ? { ...record, clockOut: time, status: '承認待ち', comment }
          : record
      )
    );

    setCurrentStatus('out');
    return time;
  };

  return {
    records,
    clockIn,
    clockOut,
    currentStatus,
  };
};