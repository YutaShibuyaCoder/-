export const calculateWorkHours = (clockIn: string, clockOut: string): number => {
  const [inHours, inMinutes] = clockIn.split(':').map(Number);
  const [outHours, outMinutes] = clockOut.split(':').map(Number);

  const totalMinutes = (outHours * 60 + outMinutes) - (inHours * 60 + inMinutes);
  return totalMinutes / 60;
};

export const formatDuration = (hours: number): string => {
  const wholeHours = Math.floor(hours);
  const minutes = Math.round((hours - wholeHours) * 60);
  return `${wholeHours}時間${minutes}分`;
};

export const getMonthRecords = (records: Array<{ date: string }>, selectedDate: Date) => {
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth() + 1;

  return records.filter(record => {
    const [recordYear, recordMonth] = record.date.split('/').map(Number);
    return recordYear === year && recordMonth === month;
  });
};

export const getAvailableMonths = (records: Array<{ date: string }>) => {
  const months = new Set<string>();
  const result = [];

  records.forEach(record => {
    const [year, month] = record.date.split('/').map(Number);
    const key = `${year}-${month}`;
    
    if (!months.has(key)) {
      months.add(key);
      result.push({
        year,
        month,
        label: new Date(year, month - 1).toLocaleDateString('ja-JP', {
          year: 'numeric',
          month: 'long',
        }),
      });
    }
  });

  return result.sort((a, b) => {
    if (a.year !== b.year) return b.year - a.year;
    return b.month - a.month;
  });
};