import { useRef, useState } from 'react';
import { DayType, ALL_DAYS } from '../types';
import { useScheduleStore } from '../store/scheduleStore';
import CourseCell from './CourseCell';
import SlotVisibilityDialog from './SlotVisibilityDialog';
import SlotTimeEditDialog from './SlotTimeEditDialog';

const ScheduleTable = () => {
  const { timeSlots, classrooms, filters, colorConfig, tableSettings, verticalLayout, hiddenSlotsByDay, customSlotTimes, customSlotColors } = useScheduleStore();
  const tableRef = useRef<HTMLDivElement>(null);

  // 右键菜单状态
  const [slotDialogDay, setSlotDialogDay] = useState<DayType | null>(null);
  // 时间单元格编辑状态
  const [editingSlot, setEditingSlot] = useState<{ day: DayType; slotId: string } | null>(null);

  const dayHeaderColors = colorConfig?.dayHeaderColors || {
    '周五': '#cdb518',//f97316
    '周六': '#049904',//#eab308
    '周日': '#115edd',//ef4444
  };

  const dayNames = colorConfig?.dayNames || {
    '周五': '周五',
    '周六': '周六',
    '周日': '周日',
  };

  const visibleDays = ALL_DAYS.filter((day: DayType) => filters.days.includes(day));

  const isCardMode = tableSettings.cellGap > 0;
  const cardRadius = Math.max(tableSettings.cellGap, 8);

  // 右键"时间"表头
  const handleTimeHeaderContextMenu = (e: React.MouseEvent, day: DayType) => {
    e.preventDefault();
    e.stopPropagation();
    setSlotDialogDay(day);
  };

  // 右键时间单元格
  const handleTimeCellContextMenu = (e: React.MouseEvent, day: DayType, slotId: string) => {
    e.preventDefault();
    e.stopPropagation();
    setEditingSlot({ day, slotId });
  };

  // 获取某天某时段的显示时间
  const getDisplayTime = (day: DayType, slot: { id: string; startTime: string; endTime: string }) => {
    const custom = customSlotTimes[day]?.[slot.id];
    return custom ? { startTime: custom.startTime, endTime: custom.endTime } : { startTime: slot.startTime, endTime: slot.endTime };
  };

  // 获取某天某时段的自定义颜色
  const getCustomColor = (day: DayType, slotId: string) => {
    return customSlotColors[day]?.[slotId];
  };

  if (visibleDays.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <p>请在筛选器中选择至少一个日期</p>
      </div>
    );
  }

  return (
    <div className="p-6 overflow-x-auto" ref={tableRef}>
      <div className={`flex justify-center min-w-max ${verticalLayout ? 'flex-col' : ''}`} style={{ gap: `${tableSettings.tableGap}px` }}>
        {visibleDays.map((day: DayType) => {
          const dayHiddenSlots = hiddenSlotsByDay[day] || [];
          // 过滤：全局隐藏 + 当天单独隐藏
          const visibleSlots = timeSlots.filter(slot => !slot.hidden && !dayHiddenSlots.includes(slot.id));

          return (
            <div key={day} className={verticalLayout ? 'w-full' : 'flex-shrink-0'}>
              {isCardMode ? (
                <div 
                  className="rounded-2xl shadow-md overflow-hidden bg-white"
                  style={{ border: `1px solid ${dayHeaderColors[day]}` }}
                >
                  <div className="px-6 py-3" style={{ backgroundColor: dayHeaderColors[day] }}>
                    <h2 className="font-bold text-white text-center" style={{ fontSize: `${tableSettings.dayHeaderFontSize}px` }}>{dayNames[day]}排课</h2>
                  </div>
                  
                  <table style={{ borderSpacing: `${tableSettings.cellGap}px`, borderCollapse: 'separate', marginTop: `${tableSettings.cellGap}px`, marginLeft: `${tableSettings.cellGap}px`, marginRight: `${tableSettings.cellGap}px`, marginBottom: `${tableSettings.cellGap}px` }}>
                    <thead>
                      <tr>
                        <th
                          className="px-4 py-3 text-white font-semibold text-center cursor-context-menu select-none"
                          style={{
                            width: `${tableSettings.cellWidth}px`,
                            height: `${tableSettings.cellHeight}px`,
                            backgroundColor: dayHeaderColors[day],
                            borderRadius: `${cardRadius}px`,
                            fontSize: `${tableSettings.headerFontSize}px`,
                          }}
                          onContextMenu={(e) => handleTimeHeaderContextMenu(e, day)}
                          title="右键点击可设置时段显示/隐藏"
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
                              fontSize: `${tableSettings.headerFontSize}px`,
                            }}
                          >
                            {classroom.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {visibleSlots.map((slot) => {
                        const rowHeight = slot.isBreak 
                          ? (slot.breakHeight || Math.round(tableSettings.cellHeight * 0.4))
                          : tableSettings.cellHeight;
                        const displayTime = getDisplayTime(day, slot);
                        const customColor = getCustomColor(day, slot.id);
                        
                        return (
                          <tr key={slot.id}>
                            <td 
                              className={`px-4 ${slot.isBreak ? '' : 'py-0.5'} font-medium text-center cursor-context-menu select-none ${
                                customColor?.textColor ? '' : (slot.isBreak ? 'text-gray-500' : 'text-gray-600')
                              }`}
                              style={{ 
                                fontSize: `${tableSettings.timeFontSize}px`,
                                height: `${rowHeight}px`,
                                backgroundColor: customColor?.bgColor || '#e5e7eb',
                                color: customColor?.textColor,
                                borderRadius: `${cardRadius}px`,
                              }}
                              onContextMenu={(e) => handleTimeCellContextMenu(e, day, slot.id)}
                              title="右键点击可修改时间和颜色"
                            >
                              {displayTime.startTime} - {displayTime.endTime}
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
                  <h2 className="font-bold text-white text-center" style={{ fontSize: `${tableSettings.dayHeaderFontSize}px` }}>{dayNames[day]}排课</h2>
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
                          className="px-4 py-3 text-white font-semibold text-center cursor-context-menu select-none"
                          style={{
                            width: `${tableSettings.cellWidth}px`,
                            backgroundColor: dayHeaderColors[day],
                            borderRight: `${tableSettings.borderWidth}px solid ${tableSettings.borderColor}`,
                            borderBottom: `${tableSettings.borderWidth}px solid ${tableSettings.borderColor}`,
                            fontSize: `${tableSettings.headerFontSize}px`,
                          }}
                          onContextMenu={(e) => handleTimeHeaderContextMenu(e, day)}
                          title="右键点击可设置时段显示/隐藏"
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
                              fontSize: `${tableSettings.headerFontSize}px`,
                            }}
                          >
                            {classroom.name}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {visibleSlots.map((slot) => {
                        const rowHeight = slot.isBreak 
                          ? (slot.breakHeight || Math.round(tableSettings.cellHeight * 0.25))
                          : tableSettings.cellHeight;
                        const displayTime = getDisplayTime(day, slot);
                        const customColor = getCustomColor(day, slot.id);
                        
                        return (
                          <tr 
                            key={slot.id}
                            className={slot.isBreak ? 'bg-gray-200' : 'hover:bg-gray-50'}
                          >
                            <td 
                              className={`px-4 ${slot.isBreak ? 'py-0' : 'py-0.5'} font-medium text-center cursor-context-menu select-none ${
                                customColor?.textColor ? '' : (slot.isBreak ? 'text-gray-500 bg-gray-200' : 'text-gray-600 bg-gray-50')
                              }`}
                              style={{ 
                                fontSize: `${tableSettings.timeFontSize}px`,
                                height: `${rowHeight}px`,
                                minHeight: `${rowHeight}px`,
                                maxHeight: `${rowHeight}px`,
                                overflow: 'hidden',
                                backgroundColor: customColor?.bgColor,
                                color: customColor?.textColor,
                                borderRight: `${tableSettings.borderWidth}px solid ${tableSettings.borderColor}`,
                                borderBottom: `${tableSettings.borderWidth}px solid ${tableSettings.borderColor}`,
                              }}
                              onContextMenu={(e) => handleTimeCellContextMenu(e, day, slot.id)}
                              title="右键点击可修改时间和颜色"
                            >
                              {displayTime.startTime} - {displayTime.endTime}
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
          );
        })}
      </div>

      {slotDialogDay && (
        <SlotVisibilityDialog
          isOpen={true}
          onClose={() => setSlotDialogDay(null)}
          day={slotDialogDay}
          dayName={dayNames[slotDialogDay]}
        />
      )}

      {editingSlot && (() => {
        const slot = timeSlots.find(s => s.id === editingSlot.slotId);
        if (!slot) return null;
        return (
          <SlotTimeEditDialog
            isOpen={true}
            onClose={() => setEditingSlot(null)}
            day={editingSlot.day}
            slotId={editingSlot.slotId}
            defaultStartTime={slot.startTime}
            defaultEndTime={slot.endTime}
          />
        );
      })()}
    </div>
  );
};

export default ScheduleTable;
