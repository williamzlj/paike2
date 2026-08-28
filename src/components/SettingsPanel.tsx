import { Plus, Minus, Pencil, Check, X, Coffee, Palette, Settings2, Eye, EyeOff, FileText } from 'lucide-react';
import { useState, useRef } from 'react';
import { useScheduleStore } from '../store/scheduleStore';
import { TimeSlot, Classroom, DayType, ALL_DAYS, ALL_GRADES, SECONDARY_GRADES } from '../types';
import { generateId } from '../utils/helpers';

const TableStyleSettings = () => {
  const { tableSettings, setTableSettings } = useScheduleStore();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <Settings2 size={18} />
        表格样式
      </h3>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600 w-24">单元格宽度:</label>
          <input
            type="range"
            min="80"
            max="200"
            value={tableSettings.cellWidth}
            onChange={(e) => setTableSettings({ cellWidth: Number(e.target.value) })}
            className="flex-1"
          />
          <span className="text-sm text-gray-500 w-16">{tableSettings.cellWidth}px</span>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600 w-24">单元格高度:</label>
          <input
            type="range"
            min="12"
            max="150"
            value={tableSettings.cellHeight}
            onChange={(e) => setTableSettings({ cellHeight: Number(e.target.value) })}
            className="flex-1"
          />
          <span className="text-sm text-gray-500 w-16">{tableSettings.cellHeight}px</span>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600 w-24">边框粗细:</label>
          <input
            type="range"
            min="0"
            max="5"
            value={tableSettings.borderWidth}
            onChange={(e) => setTableSettings({ borderWidth: Number(e.target.value) })}
            className="flex-1"
          />
          <span className="text-sm text-gray-500 w-16">{tableSettings.borderWidth}px</span>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600 w-24">边框颜色:</label>
          <input
            type="color"
            value={tableSettings.borderColor}
            onChange={(e) => setTableSettings({ borderColor: e.target.value })}
            className="w-12 h-8 rounded cursor-pointer border border-gray-300"
          />
          <span className="text-sm text-gray-500">{tableSettings.borderColor}</span>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600 w-24">表格间距:</label>
          <input
            type="range"
            min="0"
            max="60"
            value={tableSettings.tableGap}
            onChange={(e) => setTableSettings({ tableGap: Number(e.target.value) })}
            className="flex-1"
          />
          <span className="text-sm text-gray-500 w-16">{tableSettings.tableGap}px</span>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600 w-24">单元格间距:</label>
          <input
            type="range"
            min="0"
            max="16"
            value={tableSettings.cellGap}
            onChange={(e) => setTableSettings({ cellGap: Number(e.target.value) })}
            className="flex-1"
          />
          <span className="text-sm text-gray-500 w-16">{tableSettings.cellGap}px</span>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600 w-24">时间字体:</label>
          <input
            type="range"
            min="10"
            max="24"
            value={tableSettings.timeFontSize}
            onChange={(e) => setTableSettings({ timeFontSize: Number(e.target.value) })}
            className="flex-1"
          />
          <span className="text-sm text-gray-500 w-16">{tableSettings.timeFontSize}px</span>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600 w-24">内容字体:</label>
          <input
            type="range"
            min="10"
            max="24"
            value={tableSettings.contentFontSize}
            onChange={(e) => setTableSettings({ contentFontSize: Number(e.target.value) })}
            className="flex-1"
          />
          <span className="text-sm text-gray-500 w-16">{tableSettings.contentFontSize}px</span>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600 w-24">休息字体:</label>
          <input
            type="range"
            min="6"
            max="20"
            value={tableSettings.breakFontSize}
            onChange={(e) => setTableSettings({ breakFontSize: Number(e.target.value) })}
            className="flex-1"
          />
          <span className="text-sm text-gray-500 w-16">{tableSettings.breakFontSize}px</span>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600 w-24">主标题字体:</label>
          <input
            type="range"
            min="16"
            max="48"
            value={tableSettings.titleFontSize}
            onChange={(e) => setTableSettings({ titleFontSize: Number(e.target.value) })}
            className="flex-1"
          />
          <span className="text-sm text-gray-500 w-16">{tableSettings.titleFontSize}px</span>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600 w-24">小标题字体:</label>
          <input
            type="range"
            min="12"
            max="32"
            value={tableSettings.subtitleFontSize}
            onChange={(e) => setTableSettings({ subtitleFontSize: Number(e.target.value) })}
            className="flex-1"
          />
          <span className="text-sm text-gray-500 w-16">{tableSettings.subtitleFontSize}px</span>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600 w-24">日期标题字体:</label>
          <input
            type="range"
            min="12"
            max="32"
            value={tableSettings.dayHeaderFontSize}
            onChange={(e) => setTableSettings({ dayHeaderFontSize: Number(e.target.value) })}
            className="flex-1"
          />
          <span className="text-sm text-gray-500 w-16">{tableSettings.dayHeaderFontSize}px</span>
        </div>

        <div className="flex items-center gap-3">
          <label className="text-sm text-gray-600 w-24">表头字体:</label>
          <input
            type="range"
            min="10"
            max="24"
            value={tableSettings.headerFontSize}
            onChange={(e) => setTableSettings({ headerFontSize: Number(e.target.value) })}
            className="flex-1"
          />
          <span className="text-sm text-gray-500 w-16">{tableSettings.headerFontSize}px</span>
        </div>
      </div>
    </div>
  );
};

const TimeSlotManager = () => {
  const { timeSlots, addTimeSlot, removeTimeSlot, updateTimeSlot, toggleTimeSlotBreak, toggleTimeSlotHidden, reorderTimeSlots } = useScheduleStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newStart, setNewStart] = useState('08:00');
  const [newEnd, setNewEnd] = useState('09:00');
  const [editStart, setEditStart] = useState('');
  const [editEnd, setEditEnd] = useState('');
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);

  const handleAdd = () => {
    const newSlot: TimeSlot = {
      id: generateId(),
      startTime: newStart,
      endTime: newEnd,
    };
    addTimeSlot(newSlot);
    setNewStart('08:00');
    setNewEnd('09:00');
    setIsAdding(false);
  };

  const handleStartEdit = (slot: TimeSlot) => {
    setEditingId(slot.id);
    setEditStart(slot.startTime);
    setEditEnd(slot.endTime);
  };

  const handleSaveEdit = (slot: TimeSlot) => {
    updateTimeSlot({ ...slot, startTime: editStart, endTime: editEnd });
    setEditingId(null);
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    setDragOverIndex(index);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleDrop = (targetIndex: number) => {
    if (draggedIndex === null || draggedIndex === targetIndex) return;
    
    const newSlots = [...timeSlots];
    const [draggedItem] = newSlots.splice(draggedIndex, 1);
    newSlots.splice(targetIndex, 0, draggedItem);
    reorderTimeSlots(newSlots);
    setDraggedIndex(null);
    setDragOverIndex(null);
  };

  const handleUpdateBreakLabel = (slot: TimeSlot, label: string) => {
    updateTimeSlot({ ...slot, breakLabel: label || '课间休息' });
  };

  const handleUpdateBreakHeight = (slot: TimeSlot, height: number) => {
    updateTimeSlot({ ...slot, breakHeight: height });
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center justify-between">
        <span>时间段管理</span>
        <span className="text-xs text-gray-500 font-normal">拖动右侧图标可排序</span>
      </h3>
      
      <div className="space-y-2">
        {timeSlots.map((slot, index) => (
          <div
            key={slot.id}
            className={`p-2 rounded transition-all ${
              slot.isBreak ? 'bg-gray-200' : ''
            } ${
              slot.hidden ? 'bg-yellow-50 border border-yellow-200' : ''
            } ${dragOverIndex === index ? 'border-2 border-dashed border-blue-400' : ''} ${
              draggedIndex === index ? 'opacity-50' : ''
            }`}
            draggable={editingId !== slot.id && !slot.hidden}
            onDragStart={() => handleDragStart(index)}
            onDragOver={(e) => handleDragOver(e, index)}
            onDragEnd={handleDragEnd}
            onDrop={() => handleDrop(index)}
          >
            {editingId === slot.id ? (
              <div className="flex items-center gap-2 flex-wrap">
                <input
                  type="time"
                  value={editStart}
                  onChange={(e) => setEditStart(e.target.value)}
                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                />
                <span className="text-gray-500">-</span>
                <input
                  type="time"
                  value={editEnd}
                  onChange={(e) => setEditEnd(e.target.value)}
                  className="px-2 py-1 border border-gray-300 rounded text-sm"
                />
                <button
                  onClick={() => handleSaveEdit(slot)}
                  className="p-1 text-green-600 hover:bg-green-100 rounded"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2">
                  <span className="cursor-move text-gray-400 hover:text-gray-600">⋮⋮</span>
                  <span className={`flex-1 text-sm ${slot.isBreak ? 'text-gray-500' : 'text-gray-700'} ${slot.hidden ? 'opacity-50 line-through' : ''}`}>
                    {slot.startTime} - {slot.endTime}
                    {slot.hidden && <span className="ml-1 text-xs text-gray-400">(已隐藏)</span>}
                  </span>
                  <button
                    onClick={() => toggleTimeSlotHidden(slot.id)}
                    className={`p-1 rounded transition-colors ${
                      slot.hidden 
                        ? 'bg-yellow-100 text-yellow-600' 
                        : 'text-gray-500 hover:bg-gray-100'
                    }`}
                    title={slot.hidden ? '显示' : '隐藏'}
                  >
                    {slot.hidden ? <Eye size={16} /> : <EyeOff size={16} />}
                  </button>
                  <button
                    onClick={() => toggleTimeSlotBreak(slot.id)}
                    className={`p-1 rounded transition-colors ${
                      slot.isBreak 
                        ? 'bg-gray-300 text-gray-600' 
                        : 'text-amber-600 hover:bg-amber-100'
                    }`}
                    title={slot.isBreak ? '取消休息' : '设为休息时间'}
                  >
                    <Coffee size={16} />
                  </button>
                  <button
                    onClick={() => handleStartEdit(slot)}
                    className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                  >
                    <Pencil size={14} />
                  </button>
                  <button
                    onClick={() => removeTimeSlot(slot.id)}
                    className="p-1 text-red-600 hover:bg-red-100 rounded"
                  >
                    <Minus size={14} />
                  </button>
                </div>
                
                {slot.isBreak && (
                  <div className="mt-2 ml-6 flex flex-wrap items-center gap-3">
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-gray-500">文字:</label>
                      <input
                        type="text"
                        value={slot.breakLabel || '课间休息'}
                        onChange={(e) => handleUpdateBreakLabel(slot, e.target.value)}
                        className="px-2 py-1 border border-gray-300 rounded text-xs w-24"
                        placeholder="课间休息"
                      />
                    </div>
                    <div className="flex items-center gap-2">
                      <label className="text-xs text-gray-500">高度:</label>
                      <input
                        type="number"
                        min="3"
                        max="200"
                        value={slot.breakHeight || 20}
                        onChange={(e) => {
                          const val = Math.max(3, Math.min(200, Number(e.target.value)));
                          handleUpdateBreakHeight(slot, val);
                        }}
                        className="w-16 px-2 py-1 border border-gray-300 rounded text-xs text-center"
                      />
                      <span className="text-xs text-gray-400">px</span>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {isAdding ? (
        <div className="mt-3 flex items-center gap-2">
          <input
            type="time"
            value={newStart}
            onChange={(e) => setNewStart(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded text-sm"
          />
          <span className="text-gray-500">-</span>
          <input
            type="time"
            value={newEnd}
            onChange={(e) => setNewEnd(e.target.value)}
            className="px-2 py-1 border border-gray-300 rounded text-sm"
          />
          <button
            onClick={handleAdd}
            className="p-1 text-green-600 hover:bg-green-100 rounded"
          >
            <Check size={16} />
          </button>
          <button
            onClick={() => setIsAdding(false)}
            className="p-1 text-gray-600 hover:bg-gray-100 rounded"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="mt-3 flex items-center gap-1 text-amber-600 hover:text-amber-700 text-sm font-medium"
        >
          <Plus size={14} />
          添加时间段
        </button>
      )}
    </div>
  );
};

const ClassroomManager = () => {
  const { classrooms, addClassroom, removeClassroom, updateClassroom } = useScheduleStore();
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [newName, setNewName] = useState('');
  const [editName, setEditName] = useState('');

  const handleAdd = () => {
    if (newName.trim()) {
      const newClassroom: Classroom = {
        id: generateId(),
        name: newName.trim(),
      };
      addClassroom(newClassroom);
      setNewName('');
      setIsAdding(false);
    }
  };

  const handleStartEdit = (classroom: Classroom) => {
    setEditingId(classroom.id);
    setEditName(classroom.name);
  };

  const handleSaveEdit = (classroom: Classroom) => {
    if (editName.trim()) {
      updateClassroom({ ...classroom, name: editName.trim() });
      setEditingId(null);
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">教室管理</h3>
      
      <div className="space-y-2">
        {classrooms.map((classroom) => (
          <div key={classroom.id} className="flex items-center gap-2">
            {editingId === classroom.id ? (
              <div className="flex items-center gap-2 flex-1">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                />
                <button
                  onClick={() => handleSaveEdit(classroom)}
                  className="p-1 text-green-600 hover:bg-green-100 rounded"
                >
                  <Check size={16} />
                </button>
                <button
                  onClick={() => setEditingId(null)}
                  className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <>
                <span className="flex-1 text-gray-700">{classroom.name}</span>
                <button
                  onClick={() => handleStartEdit(classroom)}
                  className="p-1 text-blue-600 hover:bg-blue-100 rounded"
                >
                  <Pencil size={14} />
                </button>
                <button
                  onClick={() => removeClassroom(classroom.id)}
                  className="p-1 text-red-600 hover:bg-red-100 rounded"
                >
                  <Minus size={14} />
                </button>
              </>
            )}
          </div>
        ))}
      </div>

      {isAdding ? (
        <div className="mt-3 flex items-center gap-2">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="输入教室名称"
            className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
            autoFocus
          />
          <button
            onClick={handleAdd}
            className="p-1 text-green-600 hover:bg-green-100 rounded"
          >
            <Check size={16} />
          </button>
          <button
            onClick={() => setIsAdding(false)}
            className="p-1 text-gray-600 hover:bg-gray-100 rounded"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsAdding(true)}
          className="mt-3 flex items-center gap-1 text-amber-600 hover:text-amber-700 text-sm font-medium"
        >
          <Plus size={14} />
          添加教室
        </button>
      )}
    </div>
  );
};

const SubjectManager = () => {
  const { subjects, addSubject, removeSubject, colorConfig, setSubjectColor } = useScheduleStore();
  const [newSubject, setNewSubject] = useState('');

  const handleAdd = () => {
    if (newSubject.trim() && !subjects.includes(newSubject.trim())) {
      addSubject(newSubject.trim());
      setNewSubject('');
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">科目管理</h3>
      
      <div className="space-y-2">
        {subjects.map((subject) => (
          <div key={subject} className="flex items-center gap-2">
            <span className="flex-1 text-gray-700">{subject}</span>
            <input
              type="color"
              value={colorConfig.subjectColors[subject] || '#333333'}
              onChange={(e) => setSubjectColor(subject, e.target.value)}
              className="w-8 h-8 rounded cursor-pointer border border-gray-300"
              title="修改颜色"
            />
            <button
              onClick={() => removeSubject(subject)}
              className="p-1 text-red-600 hover:bg-red-100 rounded"
              title="删除科目"
            >
              <Minus size={14} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center gap-2">
        <input
          type="text"
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
          placeholder="输入新科目名称"
          className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
        />
        <button
          onClick={handleAdd}
          disabled={!newSubject.trim()}
          className="p-1 text-green-600 hover:bg-green-100 rounded disabled:opacity-50"
        >
          <Plus size={14} />
        </button>
      </div>
    </div>
  );
};

const ColorSettings = () => {
  const { colorConfig, setGradeColor, setDayHeaderColor, setDayName, showElementary } = useScheduleStore();
  const visibleGrades = showElementary ? ALL_GRADES : SECONDARY_GRADES;

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">颜色设置</h3>
      
      <div className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">日期名称</h4>
          <div className="grid grid-cols-3 gap-2">
            {ALL_DAYS.map((day: DayType) => (
              <div key={day} className="flex items-center gap-1">
                <span className="text-xs text-gray-400">{day}:</span>
                <input
                  type="text"
                  value={colorConfig.dayNames[day]}
                  onChange={(e) => setDayName(day, e.target.value)}
                  className="w-16 px-2 py-1 border border-gray-300 rounded text-sm"
                  placeholder={day}
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2 flex items-center gap-2">
            <Palette size={14} />
            日期标题颜色
          </h4>
          <div className="grid grid-cols-3 gap-2">
            {ALL_DAYS.map((day: DayType) => (
              <div key={day} className="flex items-center gap-2">
                <span className="text-sm text-gray-700 flex-1">{colorConfig.dayNames[day]}</span>
                <input
                  type="color"
                  value={colorConfig.dayHeaderColors[day]}
                  onChange={(e) => setDayHeaderColor(day, e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border border-gray-300"
                />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-medium text-gray-600 mb-2">年级背景色</h4>
          <div className="grid grid-cols-2 gap-2">
            {visibleGrades.map((grade) => (
              <div key={grade} className="flex items-center gap-2">
                <span className="text-sm text-gray-700 flex-1">{grade}</span>
                <input
                  type="color"
                  value={colorConfig.gradeColors[grade]}
                  onChange={(e) => setGradeColor(grade, e.target.value)}
                  className="w-8 h-8 rounded cursor-pointer border border-gray-300"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const BackendNotesSettings = () => {
  const { backendNotes, setBackendNotes } = useScheduleStore();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <FileText size={18} />
        后台备注
        <span className="text-xs text-gray-400 font-normal">（仅在设置中显示，不导出）</span>
      </h3>
      
      <textarea
        value={backendNotes}
        onChange={(e) => setBackendNotes(e.target.value)}
        placeholder="在此处添加仅供内部查看的备注信息，不会显示在排课表中..."
        className="w-full h-32 px-3 py-2 border border-gray-300 rounded-lg text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      <div className="mt-2 text-xs text-gray-400">
        {backendNotes.length} 字符
      </div>
    </div>
  );
};

const GeneralSettings = () => {
  const { showWeekdays, toggleShowWeekdays, showElementary, toggleShowElementary, showNotes, toggleShowNotes } = useScheduleStore();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
        <Settings2 size={18} />
        通用设置
      </h3>

      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-700">显示周一到周四排课</span>
            <p className="text-xs text-gray-400 mt-0.5">正常情况下不需要开启</p>
          </div>
          <button
            onClick={toggleShowWeekdays}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              showWeekdays ? 'bg-amber-500' : 'bg-gray-300'
            }`}
            title={showWeekdays ? '点击关闭' : '点击开启'}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                showWeekdays ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-700">显示小学年级</span>
            <p className="text-xs text-gray-400 mt-0.5">正常情况下不需要开启</p>
          </div>
          <button
            onClick={toggleShowElementary}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              showElementary ? 'bg-amber-500' : 'bg-gray-300'
            }`}
            title={showElementary ? '点击关闭' : '点击开启'}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                showElementary ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <div>
            <span className="text-sm text-gray-700">显示备注说明</span>
            <p className="text-xs text-gray-400 mt-0.5">关闭后截图不包含备注</p>
          </div>
          <button
            onClick={toggleShowNotes}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              showNotes ? 'bg-amber-500' : 'bg-gray-300'
            }`}
            title={showNotes ? '点击关闭' : '点击开启'}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                showNotes ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

interface SettingsPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsPanel = ({ isOpen, onClose }: SettingsPanelProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end" onClick={onClose}>
      <div className="w-full max-w-md bg-gray-50 h-full overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-gray-800">设置</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <GeneralSettings />
          <TableStyleSettings />
          <TimeSlotManager />
          <ClassroomManager />
          <SubjectManager />
          <ColorSettings />
          <BackendNotesSettings />
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
