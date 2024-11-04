export type AttendanceRecord = {
  date: string;
  clockIn: string | null;
  clockOut: string | null;
  status: '承認済' | '承認待ち' | '未承認';
  comment?: string;
};