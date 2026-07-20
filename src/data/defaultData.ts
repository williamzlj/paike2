import { TimeSlot, Classroom, ColorConfig, Filters, ALL_DAYS, ALL_GRADES, DEFAULT_SUBJECTS } from '../types';

export const defaultTimeSlots: TimeSlot[] = [
  { id: '1', startTime: '08:00', endTime: '09:50' },
  { id: '2', startTime: '10:10', endTime: '12:00' },
  { id: '3', startTime: '13:30', endTime: '15:20' },
  { id: '4', startTime: '15:40', endTime: '17:30' },
  { id: '5', startTime: '18:40', endTime: '20:30' },
];

export const defaultClassrooms: Classroom[] = [
  { id: '1', name: '教室1' },
  { id: '2', name: '教室2' },
  { id: '3', name: '教室3' },
];

export const defaultColorConfig: ColorConfig = {
  gradeColors: {
    '初一': '#E8F5E9',
    '初二': '#E3F2FD',
    '初三': '#FFF3E0',
    '高一': '#F3E5F5',
    '高二': '#FFF9C4',
    '高三': '#FFEBEE',
  },
  subjectColors: {
    '数学': '#1565C0',
    '物理': '#2E7D32',
    '化学': '#C62828',
  },
  dayHeaderColors: {
    '周五': '#f97316',
    '周六': '#eab308',
    '周日': '#ef4444',
  },
  dayNames: {
    '周五': '周五',
    '周六': '周六',
    '周日': '周日',
  },
};

export const defaultFilters: Filters = {
  days: [...ALL_DAYS],
  grades: [...ALL_GRADES],
  subjects: [...DEFAULT_SUBJECTS],
};

export const defaultTitle = '2026年 秋季学期 上课时间安排';

export const defaultSubjects: string[] = [...DEFAULT_SUBJECTS];
