import { X, Check, Palette, Type, Eraser } from 'lucide-react';

interface ColorPickerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  currentBgColor?: string;
  currentTextColor?: string;
  onBgColorChange: (color: string) => void;
  onTextColorChange: (color: string) => void;
  onClear: () => void;
}

const PRESET_TEXT_COLORS = [
  '#000000', '#333333', '#666666', '#999999',
  '#ffffff', '#dc2626', '#ea580c', '#d97706',
  '#16a34a', '#2563eb', '#7c3aed', '#db2777',
];

const PRESET_BG_COLORS = [
  '#ffffff', '#f3f4f6', '#e5e7eb', '#fef3c7',
  '#fee2e2', '#dbeafe', '#d1fae5', '#ede9fe',
  '#fce7f3', '#fff7ed', '#ecfccb', '#cffafe',
];

const ColorPickerDialog = ({
  isOpen,
  onClose,
  currentBgColor,
  currentTextColor,
  onBgColorChange,
  onTextColorChange,
  onClear,
}: ColorPickerDialogProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="bg-gradient-to-r from-purple-400 to-pink-400 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">单元格样式</h2>
          <button onClick={onClose} className="text-white hover:bg-white/20 rounded-lg p-1 transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          {/* 文字颜色 */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Type size={16} />
              文字颜色
            </label>
            <div className="grid grid-cols-6 gap-2 mb-3">
              {PRESET_TEXT_COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => onTextColorChange(color)}
                  className={`w-8 h-8 rounded-lg border-2 transition-all hover:scale-110 ${
                    currentTextColor === color ? 'border-purple-500 ring-2 ring-purple-200' : 'border-gray-200'
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={currentTextColor || '#333333'}
                onChange={(e) => onTextColorChange(e.target.value)}
                className="w-10 h-8 rounded cursor-pointer border border-gray-300"
              />
              <span className="text-sm text-gray-500">自定义颜色</span>
            </div>
          </div>

          {/* 背景颜色 */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
              <Palette size={16} />
              背景颜色
            </label>
            <div className="grid grid-cols-6 gap-2 mb-3">
              {PRESET_BG_COLORS.map((color) => (
                <button
                  key={color}
                  onClick={() => onBgColorChange(color)}
                  className={`w-8 h-8 rounded-lg border-2 transition-all hover:scale-110 ${
                    currentBgColor === color ? 'border-purple-500 ring-2 ring-purple-200' : 'border-gray-200'
                  }`}
                  style={{ backgroundColor: color }}
                  title={color}
                />
              ))}
            </div>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={currentBgColor || '#ffffff'}
                onChange={(e) => onBgColorChange(e.target.value)}
                className="w-10 h-8 rounded cursor-pointer border border-gray-300"
              />
              <span className="text-sm text-gray-500">自定义颜色</span>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 bg-gray-50 flex items-center justify-between">
          <button
            onClick={() => { onClear(); onClose(); }}
            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors flex items-center gap-1"
          >
            <Eraser size={16} />
            清除格式
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
            >
              取消
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg font-medium hover:bg-purple-600 transition-colors flex items-center gap-1"
            >
              <Check size={16} />
              完成
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ColorPickerDialog;
