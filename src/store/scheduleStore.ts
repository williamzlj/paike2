import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Course, TimeSlot, Classroom, ColorConfig, Filters, DayType, Grade, Subject, ALL_DAYS, ALL_GRADES } from '../types';
import { defaultTimeSlots, defaultClassrooms, defaultColorConfig, defaultFilters, defaultTitle, defaultSubjects } from '../data/defaultData';

export interface TableSettings {
  cellWidth: number;
  cellHeight: number;
  borderWidth: number;
  borderColor: string;
  tableGap: number;
  cellGap: number;
  timeFontSize: number;
  contentFontSize: number;
  breakFontSize: number;
}

export const defaultTableSettings: TableSettings = {
  cellWidth: 120,
  cellHeight: 80,
  borderWidth: 1,
  borderColor: '#d1d5db',
  tableGap: 24,
  cellGap: 0,
  timeFontSize: 14,
  contentFontSize: 14,
  breakFontSize: 10,
};

interface ScheduleStore {
  title: string;
  subtitle: string;
  date: string;
  timeSlots: TimeSlot[];
  classrooms: Classroom[];
  courses: Course[];
  subjects: string[];
  colorConfig: ColorConfig;
  filters: Filters;
  hidePlaceholders: boolean;
  tableSettings: TableSettings;
  editingCourse: Course | null;

  setTitle: (title: string) => void;
  setSubtitle: (subtitle: string) => void;
  setDate: (date: string) => void;
  addTimeSlot: (slot: TimeSlot) => void;
  removeTimeSlot: (id: string) => void;
  updateTimeSlot: (slot: TimeSlot) => void;
  toggleTimeSlotBreak: (id: string) => void;
  toggleTimeSlotHidden: (id: string) => void;
  reorderTimeSlots: (newOrder: TimeSlot[]) => void;
  addClassroom: (classroom: Classroom) => void;
  removeClassroom: (id: string) => void;
  updateClassroom: (classroom: Classroom) => void;
  updateCourse: (course: Course) => void;
  clearCourse: (dayType: DayType, timeSlotId: string, classroomId: string) => void;
  setEditingCourse: (course: Course | null) => void;
  setGradeColor: (grade: Grade, color: string) => void;
  setSubjectColor: (subject: Subject, color: string) => void;
  setDayHeaderColor: (day: DayType, color: string) => void;
  setDayName: (day: DayType, name: string) => void;
  addSubject: (subject: string) => void;
  removeSubject: (subject: string) => void;
  toggleHidePlaceholders: () => void;
  toggleDayFilter: (day: DayType) => void;
  toggleGradeFilter: (grade: Grade) => void;
  toggleSubjectFilter: (subject: Subject) => void;
  selectAllDays: () => void;
  selectAllGrades: () => void;
  selectAllSubjects: () => void;
  clearDaysFilter: () => void;
  clearGradesFilter: () => void;
  clearSubjectsFilter: () => void;
  resetFilters: () => void;
  setTableSettings: (settings: Partial<TableSettings>) => void;
  exportSettings: () => string;
  importSettings: (jsonString: string) => void;
}

export const useScheduleStore = create<ScheduleStore>()(
  persist(
    (set, get) => ({
      title: defaultTitle,
      subtitle: '',
      date: new Date().toISOString().split('T')[0],
      timeSlots: defaultTimeSlots,
      classrooms: defaultClassrooms,
      courses: [],
      subjects: defaultSubjects,
      colorConfig: defaultColorConfig,
      filters: defaultFilters,
      hidePlaceholders: false,
      tableSettings: defaultTableSettings,
      editingCourse: null,

      setTitle: (title) => set({ title }),
      setSubtitle: (subtitle) => set({ subtitle }),
      setDate: (date) => set({ date }),

      addTimeSlot: (slot) => set((state) => ({ timeSlots: [...state.timeSlots, slot] })),
      removeTimeSlot: (id) => set((state) => ({
        timeSlots: state.timeSlots.filter((s) => s.id !== id),
        courses: state.courses.filter((c) => c.timeSlotId !== id),
      })),
      updateTimeSlot: (slot) => set((state) => ({
        timeSlots: state.timeSlots.map((s) => (s.id === slot.id ? slot : s)),
      })),
      toggleTimeSlotBreak: (id) => set((state) => ({
        timeSlots: state.timeSlots.map((s) =>
          s.id === id ? { ...s, isBreak: !s.isBreak, breakLabel: s.id === id && !s.isBreak ? '课间休息' : s.breakLabel, breakHeight: s.id === id && !s.isBreak ? Math.round(state.tableSettings.cellHeight * 0.25) : s.breakHeight } : s
        ),
      })),
      toggleTimeSlotHidden: (id) => set((state) => ({
        timeSlots: state.timeSlots.map((s) =>
          s.id === id ? { ...s, hidden: !s.hidden } : s
        ),
      })),
      reorderTimeSlots: (newOrder) => set({ timeSlots: newOrder }),

      addClassroom: (classroom) => set((state) => ({ classrooms: [...state.classrooms, classroom] })),
      removeClassroom: (id) => set((state) => ({
        classrooms: state.classrooms.filter((c) => c.id !== id),
        courses: state.courses.filter((c) => c.classroomId !== id),
      })),
      updateClassroom: (classroom) => set((state) => ({
        classrooms: state.classrooms.map((c) => (c.id === classroom.id ? classroom : c)),
      })),

      updateCourse: (course) => set((state) => {
        const existingIndex = state.courses.findIndex(
          (c) => c.dayType === course.dayType && c.timeSlotId === course.timeSlotId && c.classroomId === course.classroomId
        );
        if (existingIndex >= 0) {
          const newCourses = [...state.courses];
          newCourses[existingIndex] = course;
          return { courses: newCourses, editingCourse: null };
        }
        return { courses: [...state.courses, course], editingCourse: null };
      }),

      clearCourse: (dayType, timeSlotId, classroomId) => set((state) => ({
        courses: state.courses.filter(
          (c) => !(c.dayType === dayType && c.timeSlotId === timeSlotId && c.classroomId === classroomId)
        ),
        editingCourse: null,
      })),

      setEditingCourse: (course) => set({ editingCourse: course }),

      setGradeColor: (grade, color) => set((state) => ({
        colorConfig: {
          ...state.colorConfig,
          gradeColors: { ...state.colorConfig.gradeColors, [grade]: color },
        },
      })),

      setSubjectColor: (subject, color) => set((state) => ({
        colorConfig: {
          ...state.colorConfig,
          subjectColors: { ...state.colorConfig.subjectColors, [subject]: color },
        },
      })),

      setDayHeaderColor: (day, color) => set((state) => ({
        colorConfig: {
          ...state.colorConfig,
          dayHeaderColors: { ...state.colorConfig.dayHeaderColors, [day]: color },
        },
      })),

      setDayName: (day, name) => set((state) => ({
        colorConfig: {
          ...state.colorConfig,
          dayNames: { ...state.colorConfig.dayNames, [day]: name },
        },
      })),

      addSubject: (subject) => set((state) => ({
        subjects: [...state.subjects, subject],
        filters: { ...state.filters, subjects: [...state.filters.subjects, subject] },
        colorConfig: {
          ...state.colorConfig,
          subjectColors: { ...state.colorConfig.subjectColors, [subject]: '#333333' },
        },
      })),

      removeSubject: (subject) => set((state) => ({
        subjects: state.subjects.filter((s) => s !== subject),
        filters: { ...state.filters, subjects: state.filters.subjects.filter((s) => s !== subject) },
        colorConfig: {
          ...state.colorConfig,
          subjectColors: { ...state.colorConfig.subjectColors },
        },
      })),

      toggleHidePlaceholders: () => set((state) => ({ hidePlaceholders: !state.hidePlaceholders })),

      toggleDayFilter: (day) => set((state) => {
        const days = state.filters.days.includes(day)
          ? state.filters.days.filter((d) => d !== day)
          : [...state.filters.days, day];
        return { filters: { ...state.filters, days } };
      }),

      toggleGradeFilter: (grade) => set((state) => {
        const grades = state.filters.grades.includes(grade)
          ? state.filters.grades.filter((g) => g !== grade)
          : [...state.filters.grades, grade];
        return { filters: { ...state.filters, grades } };
      }),

      toggleSubjectFilter: (subject) => set((state) => {
        const subjects = state.filters.subjects.includes(subject)
          ? state.filters.subjects.filter((s) => s !== subject)
          : [...state.filters.subjects, subject];
        return { filters: { ...state.filters, subjects } };
      }),

      selectAllDays: () => set((state) => ({ filters: { ...state.filters, days: [...ALL_DAYS] } })),
      selectAllGrades: () => set((state) => ({ filters: { ...state.filters, grades: [...ALL_GRADES] } })),
      selectAllSubjects: () => set((state) => ({ filters: { ...state.filters, subjects: [...state.subjects] } })),

      clearDaysFilter: () => set((state) => ({ filters: { ...state.filters, days: [] } })),
      clearGradesFilter: () => set((state) => ({ filters: { ...state.filters, grades: [] } })),
      clearSubjectsFilter: () => set((state) => ({ filters: { ...state.filters, subjects: [] } })),

      resetFilters: () => set((state) => ({
        filters: {
          days: [...ALL_DAYS],
          grades: [...ALL_GRADES],
          subjects: [...state.subjects],
        },
      })),

      setTableSettings: (settings) => set((state) => ({
        tableSettings: { ...state.tableSettings, ...settings },
      })),

      exportSettings: () => {
        const state = get();
        const exportData = {
          version: '1.0',
          exportTime: new Date().toISOString(),
          data: {
            title: state.title,
            subtitle: state.subtitle,
            date: state.date,
            timeSlots: state.timeSlots.map(slot => ({
              id: slot.id,
              startTime: slot.startTime,
              endTime: slot.endTime,
              isBreak: slot.isBreak || false,
              breakLabel: slot.breakLabel || '',
              breakHeight: slot.breakHeight || 20,
              hidden: slot.hidden || false,
            })),
            classrooms: state.classrooms.map(c => ({ id: c.id, name: c.name })),
            courses: state.courses.map(course => ({
              id: course.id,
              dayType: course.dayType,
              timeSlotId: course.timeSlotId,
              classroomId: course.classroomId,
              entryType: course.entryType,
              grade: course.grade,
              subject: course.subject,
              customText: course.customText || '',
            })),
            subjects: [...state.subjects],
            colorConfig: {
              gradeColors: { ...defaultColorConfig.gradeColors, ...state.colorConfig.gradeColors },
              subjectColors: { ...state.colorConfig.subjectColors },
              dayHeaderColors: { ...defaultColorConfig.dayHeaderColors, ...state.colorConfig.dayHeaderColors },
              dayNames: { ...defaultColorConfig.dayNames, ...state.colorConfig.dayNames },
            },
            tableSettings: { ...defaultTableSettings, ...state.tableSettings },
            hidePlaceholders: state.hidePlaceholders,
            filters: {
              days: [...state.filters.days],
              grades: [...state.filters.grades],
              subjects: [...state.filters.subjects],
            },
          },
        };
        return JSON.stringify(exportData, null, 2);
      },

      importSettings: (jsonString) => {
        try {
          const parsed = JSON.parse(jsonString);
          if (parsed.data) {
            const data = parsed.data;
            set({
              title: data.title || defaultTitle,
              subtitle: data.subtitle || '',
              date: data.date || new Date().toISOString().split('T')[0],
              timeSlots: (data.timeSlots || defaultTimeSlots).map(slot => ({
                id: slot.id,
                startTime: slot.startTime,
                endTime: slot.endTime,
                isBreak: slot.isBreak || false,
                breakLabel: slot.breakLabel || '',
                breakHeight: slot.breakHeight || 20,
                hidden: slot.hidden || false,
              })),
              classrooms: (data.classrooms || defaultClassrooms).map(c => ({ id: c.id, name: c.name })),
              courses: (data.courses || []).map(course => ({
                id: course.id,
                dayType: course.dayType,
                timeSlotId: course.timeSlotId,
                classroomId: course.classroomId,
                entryType: course.entryType,
                grade: course.grade,
                subject: course.subject,
                customText: course.customText || '',
              })),
              subjects: data.subjects || defaultSubjects,
              colorConfig: {
                gradeColors: { ...defaultColorConfig.gradeColors, ...(data.colorConfig?.gradeColors || {}) },
                subjectColors: { ...(data.colorConfig?.subjectColors || {}) },
                dayHeaderColors: { ...defaultColorConfig.dayHeaderColors, ...(data.colorConfig?.dayHeaderColors || {}) },
                dayNames: { ...defaultColorConfig.dayNames, ...(data.colorConfig?.dayNames || {}) },
              },
              tableSettings: { ...defaultTableSettings, ...(data.tableSettings || {}) },
              hidePlaceholders: data.hidePlaceholders ?? false,
              filters: {
                days: (data.filters?.days || defaultFilters.days),
                grades: (data.filters?.grades || defaultFilters.grades),
                subjects: (data.filters?.subjects || defaultFilters.subjects),
              },
            });
          }
        } catch (error) {
          console.error('导入设置失败:', error);
          alert('导入设置失败，请检查文件格式');
        }
      },
    }),
    {
      name: 'schedule-storage',
      merge: (persistedState: any, currentState) => {
        const merged = { ...currentState, ...persistedState };
        
        merged.subtitle = persistedState.subtitle || currentState.subtitle;
        
        merged.colorConfig = {
          ...currentState.colorConfig,
          ...persistedState.colorConfig,
          dayHeaderColors: {
            ...currentState.colorConfig.dayHeaderColors,
            ...(persistedState.colorConfig?.dayHeaderColors || {}),
          },
          dayNames: {
            ...currentState.colorConfig.dayNames,
            ...(persistedState.colorConfig?.dayNames || {}),
          },
        };
        
        merged.tableSettings = {
          ...currentState.tableSettings,
          ...(persistedState.tableSettings || {}),
        };
        
        merged.subjects = persistedState.subjects || currentState.subjects;
        
        return merged;
      },
    }
  )
);
