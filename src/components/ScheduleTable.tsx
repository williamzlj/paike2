import { useRef } from 'react';
import { DayType, ALL_DAYS } from '../types';
import { useScheduleStore } from '../store/scheduleStore';
import CourseCell from './CourseCell';

const ScheduleTable = () => {
  const { timeSlots, classrooms, filters, colorConfig, tableSettings } = useScheduleStore();
  const tableRef = useRef<HTMLDivElement>(null);

  const dayHeaderColors = colorConfig?.dayHeaderColors || {
    '周五': '#f97316',
    '周六': '#eab308',
    '周日': '#ef4444',
  };

  const dayNames = colorConfig?.dayNames || {
    '周五': '周五',
    '周六': '周六',
    '周日': '周日',
  };

  const visibleDays = ALL_DAYS.filter((day: DayType) => filters.days.includes(day));

  const isCardMode = tableSettings.cellGap > 0;
  const cardRadius = Math.max(tableSettings.cellGap, 8);

  if (visibleDays.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <p>请在筛选器中选择至少一个日期</p>
      </div>
    );
  }

  return (
    <div className="p-6 overflow-x-auto" ref={tableRef}>
      <div className="flex justify-center min-w-max" style={{ gap: `${tableSettings.tableGap}px` }}>
        {visibleDays.map((day: DayType) => (
          <div key={day} className="flex-shrink-0">
            {isCardMode ? (
              <div 
                className="rounded-2xl shadow-md overflow-hidden bg-white"
                style={{ border: `1px solid ${dayHeaderColors[day]}` }}
              >
                <div className="px-6 py-3" style={{ backgroundColor: dayHeaderColors[day] }}>
                  <h2 className="text-xl font-bold text-white text-center">{dayNames[day]}排课</h2>
                </div>
                
                <table style={{ borderSpacing: `${tableSettings.cellGap}px`, borderCollapse: 'separate', marginTop: `${tableSettings.cellGap}px`, marginLeft: `${tableSettings.cellGap}px`, marginRight: `${tableSettings.cellGap}px`, marginBottom: `${tableSettings.cellGap}px` }}>
                  <thead>
                    <tr>
                      <th 
                        className="px-4 py-3 text-white font-semibold text-center"
                        style={{ 
                          width: `${tableSettings.cellWidth}px`,
                          height: `${tableSettings.cellHeight}px`,
                          backgroundColor: dayHeaderColors[day],
                          borderRadius: `${cardRadius}px`,
                        }}
                      >
                        时间
                      </th>
                      {classrooms.map((classroom) => (
                        <th
                          key={classroom.id}
                          className="px-4 py-3 text-white font-semibold text-center"
                          style={{ 
                            width: `${tableSettings.cellWidth}px`,
                            height: `${tableSettings.cellHeight}px`,
                            backgroundColor: dayHeaderColors[day],
                            borderRadius: `${cardRadius}px`,
                          }}
                        >
                          {classroom.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                      {timeSlots.filter(slot => !slot.hidden).map((slot) => {
                        const rowHeight = slot.isBreak 
                          ? (slot.breakHeight || Math.round(tableSettings.cellHeight * 0.4))
                          : tableSettings.cellHeight;
                        
                        return (
                          <tr key={slot.id}>
                            <td 
                              className={`px-4 ${slot.isBreak ? '' : 'py-3'} font-medium text-center ${
                                slot.isBreak ? 'text-gray-500' : 'text-gray-600'
                              }`}
                              style={{ 
                                fontSize: `${tableSettings.timeFontSize}px`,
                                height: `${rowHeight}px`,
                                backgroundColor: '#e5e7eb',
                                borderRadius: `${cardRadius}px`,
                              }}
                            >
                              {slot.startTime} - {slot.endTime}
                            </td>
                            {classrooms.map((classroom) => (
                              <CourseCell
                                key={`${slot.id}-${classroom.id}`}
                                dayType={day}
                                timeSlotId={slot.id}
                                classroomId={classroom.id}
                                customHeight={rowHeight}
                              />
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
              </div>
            ) : (
              <>
                <div 
                  className="rounded-t-lg px-6 py-3"
                  style={{ backgroundColor: dayHeaderColors[day] }}
                >
                  <h2 className="text-xl font-bold text-white text-center">{dayNames[day]}排课</h2>
                </div>
                
                <div 
                  className="bg-white rounded-b-lg overflow-hidden shadow-lg"
                  style={{ 
                    borderWidth: `${tableSettings.borderWidth}px`,
                    borderColor: tableSettings.borderColor,
                    borderTopWidth: '0',
                  }}
                >
                  <table className="border-collapse">
                    <thead>
                      <tr>
                        <th 
                          className="px-4 py-3 text-white font-semibold text-center"
                          style={{ 
                            width: `${tableSettings.cellWidth}px`,
                            backgroundColor: dayHeaderColors[day],
                            borderRight: `${tableSettings.borderWidth}px solid ${tableSettings.borderColor}`,
                            borderBottom: `${tableSettings.borderWidth}px solid ${tableSettings.borderColor}`,
                          }}
                        >
                          时间
                        </th>
                        {classrooms.map((classroom) => (
                          <th
                            key={classroom.id}
                            className="px-4 py-3 text-white font-semibold text-center"
                            style={{ 
                              width: `${tableSettings.cellWidth}px`,
                              backgroundColor: dayHeaderColors[day],
                              borderRight: `${tableSettings.borderWidth}px solid ${tableSettings.borderColor}`,
                              borderBottom: `${tableSettings.borderWidth}px solid ${tableSettings.borderColor}`,
                            }}
                          >
                            {classroom.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {timeSlots.filter(slot => !slot.hidden).map((slot) => {
                        const rowHeight = slot.isBreak 
                          ? (slot.breakHeight || Math.round(tableSettings.cellHeight * 0.25))
                          : tableSettings.cellHeight;
                        
                        return (
                          <tr 
                            key={slot.id}
                            className={slot.isBreak ? 'bg-gray-200' : 'hover:bg-gray-50'}
                          >
                            <td 
                              className={`px-4 ${slot.isBreak ? 'py-0' : 'py-3'} font-medium text-center ${
                                slot.isBreak ? 'text-gray-500 bg-gray-200' : 'text-gray-600 bg-gray-50'
                              }`}
                              style={{ 
                                fontSize: `${tableSettings.timeFontSize}px`,
                                height: `${rowHeight}px`,
                                minHeight: `${rowHeight}px`,
                                maxHeight: `${rowHeight}px`,
                                overflow: 'hidden',
                                borderRight: `${tableSettings.borderWidth}px solid ${tableSettings.borderColor}`,
                                borderBottom: `${tableSettings.borderWidth}px solid ${tableSettings.borderColor}`,
                              }}
                            >
                              {slot.startTime} - {slot.endTime}
                            </td>
                            {classrooms.map((classroom) => (
                              <CourseCell
                                key={`${slot.id}-${classroom.id}`}
                                dayType={day}
                                timeSlotId={slot.id}
                                classroomId={classroom.id}
                                customHeight={rowHeight}
                              />
                            ))}
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleTable;