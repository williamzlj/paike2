export type Grade = '初一' | '初二' | '初三' | '高一' | '高二' | '高三';
export type Subject = string;
export type DayType = '周五' | '周六' | '周日';

export interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isBreak?: boolean;
  breakLabel?: string;
  breakHeight?: number;
  hidden?: boolean;
}

export interface Classroom {
  id: string;
  name: string;
}

export type EntryType = 'course' | 'custom';

export interface Course {
  id: string;
  dayType: DayType;
  timeSlotId: string;
  classroomId: string;
  entryType: EntryType;
  grade: Grade | null;
  subject: Subject | null;
  customText?: string;
}

export interface ColorConfig {
  gradeColors: Record<Grade, string>;
  subjectColors: Record<string, string>;
  dayHeaderColors: Record<DayType, string>;
  dayNames: Record<DayType, string>;
}

export interface Filters {
  days: DayType[];
  grades: Grade[];
  subjects: Subject[];
}

export const ALL_DAYS: DayType[] = ['周五', '周六', '周日'];
export const ALL_GRADES: Grade[] = ['初一', '初二', '初三', '高一', '高二', '高三'];
export const DEFAULT_SUBJECTS: Subject[] = ['数学', '物理', '化学'];
