import { Grade, Subject } from '../types';
import { useScheduleStore } from '../store/scheduleStore';

export const getGradeColor = (grade: Grade | null): string => {
  if (!grade) return 'transparent';
  return useScheduleStore.getState().colorConfig.gradeColors[grade];
};

export const getSubjectColor = (subject: Subject | null): string => {
  if (!subject) return '#666';
  return useScheduleStore.getState().colorConfig.subjectColors[subject] || '#666';
};

export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const formatTimeRange = (startTime: string, endTime: string): string => {
  return `${startTime}-${endTime}`;
};

export const isCourseVisible = (
  grade: Grade | null,
  subject: Subject | null,
  gradeFilter: Grade[],
  subjectFilter: Subject[]
): boolean => {
  if (!grade || !subject) return true;
  return gradeFilter.includes(grade) && subjectFilter.includes(subject);
};
