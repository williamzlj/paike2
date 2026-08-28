import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Course, TimeSlot, Classroom, ColorConfig, Filters, DayType, Grade, Subject, ALL_DAYS, ALL_GRADES, WEEKDAY_DAYS, WEEKEND_DAYS, ELEMENTARY_GRADES, SECONDARY_GRADES } from '../types';
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
  titleFontSize: number;
  subtitleFontSize: number;
  dayHeaderFontSize: number;
  headerFontSize: number;
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
  titleFontSize: 28,
  subtitleFontSize: 20,
  dayHeaderFontSize: 20,
  headerFontSize: 16,
};

interface ScheduleStore {
  title: string;
  subtitle: string;
  notes: string;
  backendNotes: string;
  date: string;
  timeSlots: TimeSlot[];
  classrooms: Classroom[];
  courses: Course[];
  subjects: string[];
  colorConfig: ColorConfig;
  filters: Filters;
  hidePlaceholders: boolean;
  showCustomCourses: boolean;
  dimFilteredCourses: boolean;
  verticalLayout: boolean;
  showWeekdays: boolean;
  showElementary: boolean;
  showNotes: boolean;
  hiddenSlotsByDay: Record<DayType, string[]>;
  customSlotTimes: Record<DayType, Record<string, { startTime: string; endTime: string }>>;
  customSlotColors: Record<DayType, Record<string, { bgColor?: string; textColor?: string }>>;
  tableSettings: TableSettings;
  editingCourse: Course | null;

  setTitle: (title: string) => void;
  setSubtitle: (subtitle: string) => void;
  setNotes: (notes: string) => void;
  setBackendNotes: (backendNotes: string) => void;
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
  setCourseCustomBgColor: (dayType: DayType, timeSlotId: string, classroomId: string, color: string) => void;
  setCourseCustomTextColor: (dayType: DayType, timeSlotId: string, classroomId: string, color: string) => void;
  clearCourseCustomColors: (dayType: DayType, timeSlotId: string, classroomId: string) => void;
  setEditingCourse: (course: Course | null) => void;
  setGradeColor: (grade: Grade, color: string) => void;
  setSubjectColor: (subject: Subject, color: string) => void;
  setDayHeaderColor: (day: DayType, color: string) => void;
  setDayName: (day: DayType, name: string) => void;
  addSubject: (subject: string) => void;
  removeSubject: (subject: string) => void;
  toggleHidePlaceholders: () => void;
  toggleShowCustomCourses: () => void;
  toggleDimFilteredCourses: () => void;
  toggleVerticalLayout: () => void;
  toggleShowWeekdays: () => void;
  toggleShowElementary: () => void;
  toggleShowNotes: () => void;
  toggleSlotVisibility: (day: DayType, slotId: string) => void;
  setDayHiddenSlots: (day: DayType, slotIds: string[]) => void;
  setSlotCustomTime: (day: DayType, slotId: string, startTime: string, endTime: string) => void;
  clearSlotCustomTime: (day: DayType, slotId: string) => void;
  setSlotCustomColor: (day: DayType, slotId: string, bgColor?: string, textColor?: string) => void;
  clearSlotCustomColor: (day: DayType, slotId: string) => void;
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
      notes: '',
      backendNotes: '',
      date: new Date().toISOString().split('T')[0],
      timeSlots: defaultTimeSlots,
      classrooms: defaultClassrooms,
      courses: [],
      subjects: defaultSubjects,
      colorConfig: defaultColorConfig,
      filters: defaultFilters,
      hidePlaceholders: false,
      showCustomCourses: true,
      dimFilteredCourses: false,
      verticalLayout: false,
      showWeekdays: false,
      showElementary: false,
      showNotes: true,
      hiddenSlotsByDay: { '周一': [], '周二': [], '周三': [], '周四': [], '周五': [], '周六': [], '周日': [] },
      customSlotTimes: { '周一': {}, '周二': {}, '周三': {}, '周四': {}, '周五': {}, '周六': {}, '周日': {} },
      customSlotColors: { '周一': {}, '周二': {}, '周三': {}, '周四': {}, '周五': {}, '周六': {}, '周日': {} },
      tableSettings: defaultTableSettings,
      editingCourse: null,

      setTitle: (title) => set({ title }),
      setSubtitle: (subtitle) => set({ subtitle }),
      setNotes: (notes) => set({ notes }),
      setBackendNotes: (backendNotes) => set({ backendNotes }),
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

      setCourseCustomBgColor: (dayType, timeSlotId, classroomId, color) => set((state) => ({
        courses: state.courses.map((c) =>
          c.dayType === dayType && c.timeSlotId === timeSlotId && c.classroomId === classroomId
            ? { ...c, customBgColor: color }
            : c
        ),
      })),

      setCourseCustomTextColor: (dayType, timeSlotId, classroomId, color) => set((state) => ({
        courses: state.courses.map((c) =>
          c.dayType === dayType && c.timeSlotId === timeSlotId && c.classroomId === classroomId
            ? { ...c, customTextColor: color }
            : c
        ),
      })),

      clearCourseCustomColors: (dayType, timeSlotId, classroomId) => set((state) => ({
        courses: state.courses.map((c) =>
          c.dayType === dayType && c.timeSlotId === timeSlotId && c.classroomId === classroomId
            ? { ...c, customBgColor: undefined, customTextColor: undefined }
            : c
        ),
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

      toggleShowCustomCourses: () => set((state) => ({ showCustomCourses: !state.showCustomCourses })),

      toggleDimFilteredCourses: () => set((state) => ({ dimFilteredCourses: !state.dimFilteredCourses })),

      toggleVerticalLayout: () => set((state) => ({ verticalLayout: !state.verticalLayout })),

      toggleShowWeekdays: () => set((state) => {
        const newShowWeekdays = !state.showWeekdays;
        let days = state.filters.days;
        if (!newShowWeekdays) {
          days = days.filter((d) => !WEEKDAY_DAYS.includes(d));
        }
        return { showWeekdays: newShowWeekdays, filters: { ...state.filters, days } };
      }),

      toggleShowElementary: () => set((state) => {
        const newShowElementary = !state.showElementary;
        let grades = state.filters.grades;
        if (!newShowElementary) {
          grades = grades.filter((g) => !ELEMENTARY_GRADES.includes(g));
        }
        return { showElementary: newShowElementary, filters: { ...state.filters, grades } };
      }),

      toggleShowNotes: () => set((state) => ({ showNotes: !state.showNotes })),

      toggleSlotVisibility: (day, slotId) => set((state) => {
        const current = state.hiddenSlotsByDay[day] || [];
        const isHidden = current.includes(slotId);
        return {
          hiddenSlotsByDay: {
            ...state.hiddenSlotsByDay,
            [day]: isHidden ? current.filter(id => id !== slotId) : [...current, slotId],
          },
        };
      }),

      setDayHiddenSlots: (day, slotIds) => set((state) => ({
        hiddenSlotsByDay: {
          ...state.hiddenSlotsByDay,
          [day]: slotIds,
        },
      })),

      setSlotCustomTime: (day, slotId, startTime, endTime) => set((state) => ({
        customSlotTimes: {
          ...state.customSlotTimes,
          [day]: {
            ...state.customSlotTimes[day],
            [slotId]: { startTime, endTime },
          },
        },
      })),

      clearSlotCustomTime: (day, slotId) => set((state) => {
        const dayTimes = { ...state.customSlotTimes[day] };
        delete dayTimes[slotId];
        return {
          customSlotTimes: {
            ...state.customSlotTimes,
            [day]: dayTimes,
          },
        };
      }),

      setSlotCustomColor: (day, slotId, bgColor, textColor) => set((state) => ({
        customSlotColors: {
          ...state.customSlotColors,
          [day]: {
            ...state.customSlotColors[day],
            [slotId]: { bgColor, textColor },
          },
        },
      })),

      clearSlotCustomColor: (day, slotId) => set((state) => {
        const dayColors = { ...state.customSlotColors[day] };
        delete dayColors[slotId];
        return {
          customSlotColors: {
            ...state.customSlotColors,
            [day]: dayColors,
          },
        };
      }),

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

      selectAllDays: () => set((state) => ({ filters: { ...state.filters, days: state.showWeekdays ? [...ALL_DAYS] : [...WEEKEND_DAYS] } })),
      selectAllGrades: () => set((state) => ({ filters: { ...state.filters, grades: state.showElementary ? [...ALL_GRADES] : [...SECONDARY_GRADES] } })),
      selectAllSubjects: () => set((state) => ({ filters: { ...state.filters, subjects: [...state.subjects] } })),

      clearDaysFilter: () => set((state) => ({ filters: { ...state.filters, days: [] } })),
      clearGradesFilter: () => set((state) => ({ filters: { ...state.filters, grades: [] } })),
      clearSubjectsFilter: () => set((state) => ({ filters: { ...state.filters, subjects: [] } })),

      resetFilters: () => set((state) => ({
        filters: {
          days: state.showWeekdays ? [...ALL_DAYS] : [...WEEKEND_DAYS],
          grades: state.showElementary ? [...ALL_GRADES] : [...SECONDARY_GRADES],
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
            notes: state.notes,
            backendNotes: state.backendNotes,
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
              customBgColor: course.customBgColor || undefined,
              customTextColor: course.customTextColor || undefined,
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
            showCustomCourses: state.showCustomCourses,
            dimFilteredCourses: state.dimFilteredCourses,
            verticalLayout: state.verticalLayout,
            showWeekdays: state.showWeekdays,
            showElementary: state.showElementary,
            showNotes: state.showNotes,
            hiddenSlotsByDay: { ...state.hiddenSlotsByDay },
            customSlotTimes: JSON.parse(JSON.stringify(state.customSlotTimes)),
            customSlotColors: JSON.parse(JSON.stringify(state.customSlotColors)),
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
              notes: data.notes || '',
              backendNotes: data.backendNotes || '',
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
                customBgColor: course.customBgColor || undefined,
                customTextColor: course.customTextColor || undefined,
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
              showCustomCourses: data.showCustomCourses ?? true,
              dimFilteredCourses: data.dimFilteredCourses ?? false,
              verticalLayout: data.verticalLayout ?? false,
              showWeekdays: data.showWeekdays ?? false,
              showElementary: data.showElementary ?? false,
              showNotes: data.showNotes ?? true,
              hiddenSlotsByDay: data.hiddenSlotsByDay || { '周一': [], '周二': [], '周三': [], '周四': [], '周五': [], '周六': [], '周日': [] },
              customSlotTimes: data.customSlotTimes || { '周一': {}, '周二': {}, '周三': {}, '周四': {}, '周五': {}, '周六': {}, '周日': {} },
              customSlotColors: data.customSlotColors || { '周一': {}, '周二': {}, '周三': {}, '周四': {}, '周五': {}, '周六': {}, '周日': {} },
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
        merged.notes = persistedState.notes || currentState.notes;
        
        merged.colorConfig = {
          ...currentState.colorConfig,
          ...persistedState.colorConfig,
          gradeColors: {
            ...currentState.colorConfig.gradeColors,
            ...(persistedState.colorConfig?.gradeColors || {}),
          },
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
