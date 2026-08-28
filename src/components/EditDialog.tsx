import { useState, Fragment } from 'react';
import { X, Check } from 'lucide-react';
import { Grade, Subject, ELEMENTARY_GRADES, JUNIOR_GRADES, SENIOR_GRADES } from '../types';
import { useScheduleStore } from '../store/scheduleStore';

interface EditDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (grade: Grade | null, subject: Subject | null, customText: string, entryType: 'course' | 'custom') => void;
  onClear: () => void;
  initialGrade?: Grade | null;
  initialSubject?: Subject | null;
  initialCustomText?: string;
  initialEntryType?: 'course' | 'custom';
}

const EditDialog = ({
  isOpen,
  onClose,
  onSave,
  onClear,
  initialGrade,
  initialSubject,
  initialCustomText = '',
  initialEntryType = 'course',
}: EditDialogProps) => {
  const [entryType, setEntryType] = useState<'course' | 'custom'>(initialEntryType);
  const [selectedGrade, setSelectedGrade] = useState<Grade | null>(initialGrade || null);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(initialSubject || null);
  const [customText, setCustomText] = useState(initialCustomText);

  const subjects = useScheduleStore((state) => state.subjects);
  const showElementary = useScheduleStore((state) => state.showElementary);

  if (!isOpen) return null;

  const visibleGradeGroups = showElementary
    ? [ELEMENTARY_GRADES, JUNIOR_GRADES, SENIOR_GRADES]
    : [JUNIOR_GRADES, SENIOR_GRADES];

  const handleSave = () => {
    if (entryType === 'course' && selectedGrade && selectedSubject) {
      onSave(selectedGrade, selectedSubject, '', 'course');
    } else if (entryType === 'custom' && customText.trim()) {
      onSave(null, null, customText.trim(), 'custom');
    }
    resetAndClose();
  };

  const handleClear = () => {
    onClear();
    resetAndClose();
  };

  const resetAndClose = () => {
    setEntryType('course');
    setSelectedGrade(null);
    setSelectedSubject(null);
    setCustomText('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden">
        <div className="bg-gradient-to-r from-amber-400 to-orange-400 px-6 py-4">
          <h2 className="text-xl font-bold text-white">编辑课程</h2>
        </div>

        <div className="p-6 space-y-4">
          <div className="flex gap-2">
            <button
              onClick={() => setEntryType('course')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                entryType === 'course'
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              课程
            </button>
            <button
              onClick={() => setEntryType('custom')}
              className={`flex-1 py-2 px-4 rounded-lg font-medium transition-all ${
                entryType === 'custom'
                  ? 'bg-blue-500 text-white shadow-md'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              自定义
            </button>
          </div>

          {entryType === 'course' ? (
            <>
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">选择年级</label>
                <div className="grid grid-cols-3 gap-2">
                  {visibleGradeGroups.map((group, groupIndex) => (
                    <Fragment key={groupIndex}>
                      {groupIndex > 0 && (
                        <div className="col-span-full h-px bg-gray-200 my-1" />
                      )}
                      {group.map((grade) => (
                        <button
                          key={grade}
                          onClick={() => setSelectedGrade(selectedGrade === grade ? null : grade)}
                          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                            selectedGrade === grade
                              ? 'bg-green-500 text-white shadow-md'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {grade}
                        </button>
                      ))}
                    </Fragment>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">选择科目</label>
                <div className="grid grid-cols-3 gap-2">
                  {subjects.map((subject) => (
                    <button
                      key={subject}
                      onClick={() => setSelectedSubject(selectedSubject === subject ? null : subject)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedSubject === subject
                          ? 'bg-blue-500 text-white shadow-md'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {subject}
                    </button>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">输入说明文字（如：休息、答疑等）</label>
              <input
                type="text"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                placeholder="例如：休息 / 答疑 / 自习"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-gray-50 flex items-center justify-between">
          <button
            onClick={handleClear}
            className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-medium transition-colors flex items-center gap-1"
          >
            <X size={16} />
            清除
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={resetAndClose}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg font-medium transition-colors"
            >
              取消
            </button>
            <button
              onClick={handleSave}
              disabled={
                (entryType === 'course' && (!selectedGrade || !selectedSubject)) ||
                (entryType === 'custom' && !customText.trim())
              }
              className="px-4 py-2 bg-amber-500 text-white rounded-lg font-medium hover:bg-amber-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-1"
            >
              <Check size={16} />
              确定
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditDialog;
