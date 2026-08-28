import { useState } from 'react';
import { X, RotateCcw } from 'lucide-react';
import { useScheduleStore } from '../store/scheduleStore';
import { DayType } from '../types';

interface SlotTimeEditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  day: DayType;
  slotId: string;
  defaultStartTime: string;
  defaultEndTime: string;
}

const PRESET_BG_COLORS = [
  '#e5e7eb', '#f3f4f6', '#fef3c7', '#fee2e2',
  '#dbeafe', '#d1fae5', '#fce7f3', '#e0e7ff',
  '#fff7ed', '#f0fdf4', '#faf5ff', '#f1f5f9',
];

const PRESET_TEXT_COLORS = [
  '#374151', '#6b7280', '#1f2937', '#991b1b',
  '#1e40af', '#065f46', '#9d174d', '#5b21b6',
  '#9a3412', '#166534', '#6b21a8', '#0f172a',
];

const SlotTimeEditDialog = ({
  isOpen,
  onClose,
  day,
  slotId,
  defaultStartTime,
  defaultEndTime,
}: SlotTimeEditDialogProps) => {
  const { customSlotTimes, customSlotColors, setSlotCustomTime, clearSlotCustomTime, setSlotCustomColor, clearSlotCustomColor } = useScheduleStore();

  const existingTime = customSlotTimes[day]?.[slotId];
  const existingColor = customSlotColors[day]?.[slotId];

  const [startTime, setStartTime] = useState(existingTime?.startTime || defaultStartTime);
  const [endTime, setEndTime] = useState(existingTime?.endTime || defaultEndTime);
  const [bgColor, setBgColor] = useState(existingColor?.bgColor || '');
  const [textColor, setTextColor] = useState(existingColor?.textColor || '');

  if (!isOpen) return null;

  const hasCustomTime = !!existingTime;
  const hasCustomColor = !!existingColor && (!!existingColor.bgColor || !!existingColor.textColor);

  const handleSave = () => {
    // 保存时间
    if (startTime !== defaultStartTime || endTime !== defaultEndTime) {
      setSlotCustomTime(day, slotId, startTime, endTime);
    } else if (hasCustomTime) {
      clearSlotCustomTime(day, slotId);
    }

    // 保存颜色
    if (bgColor || textColor) {
      setSlotCustomColor(day, slotId, bgColor || undefined, textColor || undefined);
    } else if (hasCustomColor) {
      clearSlotCustomColor(day, slotId);
    }

    onClose();
  };

  const handleClearAll = () => {
    if (hasCustomTime) clearSlotCustomTime(day, slotId);
    if (hasCustomColor) clearSlotCustomColor(day, slotId);
    setStartTime(defaultStartTime);
    setEndTime(defaultEndTime);
    setBgColor('');
    setTextColor('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-sm flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 头部 */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-800">时间单元格设置</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-4 space-y-4">
          {/* 默认时间显示 */}
          <div className="text-sm text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
            默认时间：{defaultStartTime} - {defaultEndTime}
            {hasCustomTime && (
              <span className="ml-2 text-xs text-orange-500">（已自定义）</span>
            )}
          </div>

          {/* 时间编辑 */}
          <div className="flex items-center gap-3">
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-1">开始时间</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <span className="text-gray-400 mt-5">-</span>
            <div className="flex-1">
              <label className="block text-xs text-gray-500 mb-1">结束时间</label>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* 分隔线 */}
          <div className="border-t border-gray-100 pt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">背景颜色</p>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {PRESET_BG_COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => setBgColor(bgColor === color ? '' : color)}
                  className={`w-7 h-7 rounded-lg border-2 transition-all ${
                    bgColor === color ? 'border-blue-500 scale-110' : 'border-gray-200'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={bgColor || '#e5e7eb'}
                onChange={(e) => setBgColor(e.target.value)}
                className="w-8 h-8 rounded cursor-pointer border border-gray-300"
              />
              <input
                type="text"
                value={bgColor}
                onChange={(e) => setBgColor(e.target.value)}
                placeholder="自定义或留空"
                className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {bgColor && (
                <button
                  onClick={() => setBgColor('')}
                  className="text-xs text-gray-400 hover:text-red-500"
                >
                  清除
                </button>
              )}
            </div>
          </div>

          {/* 文字颜色 */}
          <div className="border-t border-gray-100 pt-4">
            <p className="text-sm font-medium text-gray-700 mb-2">文字颜色</p>
            <div className="flex flex-wrap gap-1.5 mb-2">
              {PRESET_TEXT_COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => setTextColor(textColor === color ? '' : color)}
                  className={`w-7 h-7 rounded-lg border-2 transition-all ${
                    textColor === color ? 'border-blue-500 scale-110' : 'border-gray-200'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={textColor || '#374151'}
                onChange={(e) => setTextColor(e.target.value)}
                className="w-8 h-8 rounded cursor-pointer border border-gray-300"
              />
              <input
                type="text"
                value={textColor}
                onChange={(e) => setTextColor(e.target.value)}
                placeholder="自定义或留空"
                className="flex-1 px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              {textColor && (
                <button
                  onClick={() => setTextColor('')}
                  className="text-xs text-gray-400 hover:text-red-500"
                >
                  清除
                </button>
              )}
            </div>
          </div>
        </div>

        {/* 底部 */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-between gap-2">
          <button
            onClick={handleClearAll}
            className="flex items-center gap-1 px-3 py-2 text-sm text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors"
          >
            <RotateCcw size={14} />
            清除设置
          </button>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              取消
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
            >
              完成
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlotTimeEditDialog;
