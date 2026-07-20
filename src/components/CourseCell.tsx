import { useState } from 'react';
import { Course, DayType, Grade, Subject } from '../types';
import { useScheduleStore } from '../store/scheduleStore';
import EditDialog from './EditDialog';
import { generateId, isCourseVisible } from '../utils/helpers';

interface CourseCellProps {
  dayType: DayType;
  timeSlotId: string;
  classroomId: string;
  customHeight?: number;
}

const CourseCell = ({ dayType, timeSlotId, classroomId, customHeight }: CourseCellProps) => {
  const { courses, colorConfig, filters, updateCourse, clearCourse, hidePlaceholders, timeSlots, tableSettings } = useScheduleStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const timeSlot = timeSlots.find((t) => t.id === timeSlotId);
  
  const course = courses.find(
    (c) => c.dayType === dayType && c.timeSlotId === timeSlotId && c.classroomId === classroomId
  );

  const handleCellClick = () => {
    setIsDialogOpen(true);
  };

  const handleSave = (grade: Grade | null, subject: Subject | null, customText: string, entryType: 'course' | 'custom') => {
    const newCourse: Course = {
      id: course?.id || generateId(),
      dayType,
      timeSlotId,
      classroomId,
      entryType,
      grade,
      subject,
      customText: entryType === 'custom' ? customText : undefined,
    };
    updateCourse(newCourse);
    setIsDialogOpen(false);
  };

  const handleClear = () => {
    clearCourse(dayType, timeSlotId, classroomId);
    setIsDialogOpen(false);
  };

  const isVisible = course && course.entryType === 'course' 
    ? isCourseVisible(course.grade, course.subject, filters.grades, filters.subjects) 
    : true;

  const isBreakTime = timeSlot?.isBreak;
  const isCardMode = tableSettings.cellGap > 0;
  const borderRadius = isCardMode ? `${Math.max(tableSettings.cellGap, 8)}px` : undefined;

  const cardBaseStyle = {
    width: `${tableSettings.cellWidth}px`,
    height: customHeight ? `${customHeight}px` : `${tableSettings.cellHeight}px`,
    ...(borderRadius ? { borderRadius } : {}),
  } as React.CSSProperties;

  const tableBaseStyle = {
    width: `${tableSettings.cellWidth}px`,
    height: customHeight ? `${customHeight}px` : `${tableSettings.cellHeight}px`,
    minHeight: customHeight ? `${customHeight}px` : `${tableSettings.cellHeight}px`,
    maxHeight: customHeight ? `${customHeight}px` : `${tableSettings.cellHeight}px`,
    borderRight: `${tableSettings.borderWidth}px solid ${tableSettings.borderColor}`,
    borderBottom: `${tableSettings.borderWidth}px solid ${tableSettings.borderColor}`,
  } as React.CSSProperties;

  if (isBreakTime) {
    if (isCardMode) {
      return (
        <td 
          className="p-0"
          style={{ ...cardBaseStyle, backgroundColor: '#e5e7eb' }}
        >
          <div className="flex items-center justify-center h-full text-gray-500 font-medium whitespace-nowrap overflow-hidden text-ellipsis" style={{ fontSize: `${tableSettings.breakFontSize}px` }}>
            {timeSlot?.breakLabel || '课间休息'}
          </div>
        </td>
      );
    }
    return (
      <td 
        className="p-0"
        style={{ ...tableBaseStyle, backgroundColor: '#e5e7eb' }}
      >
        <div className="flex items-center justify-center h-full text-gray-500 font-medium whitespace-nowrap overflow-hidden text-ellipsis" style={{ fontSize: `${tableSettings.breakFontSize}px` }}>
          {timeSlot?.breakLabel || '课间休息'}
        </div>
      </td>
    );
  }

  if (!isVisible && course && course.entryType === 'course') {
    if (isCardMode) {
      return (
        <td
          onClick={handleCellClick}
          className="cursor-pointer transition-all duration-200"
          style={{ ...cardBaseStyle, backgroundColor: '#e5e7eb' }}
        />
      );
    }
    return (
      <td
        onClick={handleCellClick}
        className="p-0 cursor-pointer transition-all duration-200"
        style={{ ...tableBaseStyle, backgroundColor: '#e5e7eb' }}
      />
    );
  }

  let cellContent: React.ReactNode;
  let cellBackgroundColor = '#e5e7eb';
  let cellTextColor = '#999';

  if (course) {
    if (course.entryType === 'course' && course.grade && course.subject) {
      cellBackgroundColor = colorConfig.gradeColors[course.grade];
      cellTextColor = colorConfig.subjectColors[course.subject] || '#666';
      cellContent = (
        <div className="font-bold leading-tight" style={{ fontSize: `${tableSettings.contentFontSize}px` }}>
          {course.grade}{course.subject}
        </div>
      );
    } else if (course.entryType === 'custom' && course.customText) {
      cellBackgroundColor = '#f0f4ff';
      cellTextColor = '#4a5568';
      cellContent = (
        <div className="font-medium leading-tight" style={{ fontSize: `${tableSettings.contentFontSize}px` }}>
          {course.customText}
        </div>
      );
    }
  } else if (!hidePlaceholders) {
    cellContent = <div className="text-gray-400" style={{ fontSize: `${tableSettings.contentFontSize}px` }}>点击添加</div>;
  }

  if (isCardMode) {
    return (
      <>
        <td
          onClick={handleCellClick}
          className="cursor-pointer transition-all duration-200 overflow-hidden"
          style={{ ...cardBaseStyle, backgroundColor: cellBackgroundColor }}
        >
          <div className="flex items-center justify-center h-full text-center px-1" style={{ color: cellTextColor }}>
            {cellContent}
          </div>
        </td>

        <EditDialog
          isOpen={isDialogOpen}
          onClose={() => setIsDialogOpen(false)}
          onSave={handleSave}
          onClear={handleClear}
          initialGrade={course?.grade || null}
          initialSubject={course?.subject || null}
          initialCustomText={course?.customText || ''}
          initialEntryType={course?.entryType || 'course'}
        />
      </>
    );
  }

  return (
    <>
      <td
        onClick={handleCellClick}
        className="p-0 cursor-pointer transition-all duration-200 overflow-hidden"
        style={{ ...tableBaseStyle, backgroundColor: cellBackgroundColor }}
      >
        <div className="flex items-center justify-center h-full text-center px-1" style={{ color: cellTextColor }}>
          {cellContent}
        </div>
      </td>

      <EditDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSave}
        onClear={handleClear}
        initialGrade={course?.grade || null}
        initialSubject={course?.subject || null}
        initialCustomText={course?.customText || ''}
        initialEntryType={course?.entryType || 'course'}
      />
    </>
  );
};

export default CourseCell;