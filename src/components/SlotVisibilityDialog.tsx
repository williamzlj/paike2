import { useState, useMemo } from 'react';
import { Eye, EyeOff, RotateCcw, X, Zap } from 'lucide-react';
import { useScheduleStore } from '../store/scheduleStore';
import { DayType } from '../types';

interface SlotVisibilityDialogProps {
  isOpen: boolean;
  onClose: () => void;
  day: DayType;
  dayName: string;
}

const SlotVisibilityDialog = ({ isOpen, onClose, day, dayName }: SlotVisibilityDialogProps) => {
  const { timeSlots, courses, classrooms, hiddenSlotsByDay, toggleSlotVisibility, setDayHiddenSlots } = useScheduleStore();
  const hiddenSlots = hiddenSlotsByDay[day] || [];

  // 检查某个时段在当天是否有课程
  const hasCourseOnDay = (slotId: string): boolean => {
    return courses.some(
      (c) => c.dayType === day && c.timeSlotId === slotId
    );
  };

  // 一键隐藏当天无课程的时段
  const handleHideEmpty = () => {
    const emptySlotIds = timeSlots
      .filter(slot => !slot.hidden && !hasCourseOnDay(slot.id))
      .map(slot => slot.id);
    setDayHiddenSlots(day, emptySlotIds);
  };

  // 重置：恢复当天所有时段显示
  const handleReset = () => {
    setDayHiddenSlots(day, []);
  };

  if (!isOpen) return null;

  const visibleSlots = timeSlots.filter(slot => !slot.hidden);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[80vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 头部 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-800">{dayName} - 时段显示设置</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* 快捷操作 */}
        <div className="flex gap-2 px-6 py-3 border-b border-gray-100">
          <button
            onClick={handleHideEmpty}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-orange-600 hover:text-orange-800 hover:bg-orange-50 rounded-lg transition-colors border border-orange-200"
            title="隐藏当天没有排课的时段"
          >
            <Zap size={14} />
            隐藏空时段
          </button>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors border border-blue-200"
            title="恢复当天所有时段显示"
          >
            <RotateCcw size={14} />
            全部显示
          </button>
        </div>

        {/* 时段列表 */}
        <div className="flex-1 overflow-y-auto px-6 py-3">
          {visibleSlots.length === 0 ? (
            <p className="text-center text-gray-400 py-8">没有可设置的时段</p>
          ) : (
            <div className="space-y-1">
              {visibleSlots.map((slot) => {
                const isHidden = hiddenSlots.includes(slot.id);
                const hasCourse = hasCourseOnDay(slot.id);
                return (
                  <div
                    key={slot.id}
                    className={`flex items-center justify-between px-3 py-2 rounded-lg transition-colors ${
                      isHidden ? 'bg-gray-100 opacity-60' : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-700">
                        {slot.startTime} - {slot.endTime}
                      </span>
                      {slot.isBreak && (
                        <span className="text-xs px-1.5 py-0.5 bg-gray-200 text-gray-500 rounded">
                          {slot.breakLabel || '休息'}
                        </span>
                      )}
                      {hasCourse && (
                        <span className="text-xs px-1.5 py-0.5 bg-green-100 text-green-600 rounded">
                          有课
                        </span>
                      )}
                    </div>
                    <button
                      onClick={() => toggleSlotVisibility(day, slot.id)}
                      className={`flex items-center gap-1 px-2 py-1 text-xs rounded transition-colors ${
                        isHidden
                          ? 'text-gray-400 hover:bg-gray-200'
                          : 'text-green-600 hover:bg-green-50'
                      }`}
                    >
                      {isHidden ? <EyeOff size={14} /> : <Eye size={14} />}
                      {isHidden ? '已隐藏' : '显示中'}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* 底部 */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
          >
            取消
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
          >
            完成
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlotVisibilityDialog;
