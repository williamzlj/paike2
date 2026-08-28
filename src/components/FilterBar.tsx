import { RotateCw, Eye, EyeOff, Settings, Download, Upload, Image, FileSpreadsheet, Tag, Palette } from 'lucide-react';
import { useState, useRef } from 'react';
import { DayType, Grade, Subject, ALL_DAYS, ALL_GRADES, WEEKEND_DAYS, SECONDARY_GRADES } from '../types';
import { useScheduleStore } from '../store/scheduleStore';
import { exportAsImage, exportAsExcel, exportSettingsToFile, importSettingsFromFile } from '../utils/exportUtils';
import SettingsPanel from './SettingsPanel';

const FilterBar = () => {
  const { 
    filters, 
    subjects,
    title,
    hidePlaceholders,
    showCustomCourses,
    dimFilteredCourses,
    verticalLayout,
    showWeekdays,
    showElementary,
    toggleDayFilter,
    toggleGradeFilter, 
    toggleSubjectFilter, 
    selectAllDays,
    selectAllGrades,
    selectAllSubjects,
    clearDaysFilter,
    clearGradesFilter,
    clearSubjectsFilter,
    resetFilters,
    toggleHidePlaceholders,
    toggleShowCustomCourses,
    toggleDimFilteredCourses,
    toggleVerticalLayout
  } = useScheduleStore();
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const availableDays = showWeekdays ? ALL_DAYS : WEEKEND_DAYS;
  const isAllDaysSelected = availableDays.every((day) => filters.days.includes(day));
  const availableGrades = showElementary ? ALL_GRADES : SECONDARY_GRADES;
  const isAllGradesSelected = availableGrades.every((grade) => filters.grades.includes(grade));
  const isAllSubjectsSelected = filters.subjects.length === subjects.length && subjects.length > 0;

  const handleExportImage = () => {
    exportAsImage('schedule-export-area', `${title}_${new Date().toISOString().split('T')[0]}.png`);
  };

  const handleExportExcel = () => {
    exportAsExcel();
  };

  const handleExportSettings = () => {
    exportSettingsToFile();
  };

  const handleImportSettings = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        await importSettingsFromFile(file);
        alert('导入设置成功！');
      } catch (error) {
        alert('导入设置失败，请检查文件格式');
      }
      e.target.value = '';
    }
  };

  return (
    <>
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-700">日期:</span>
            <div className="flex gap-1">
              {availableDays.map((day: DayType) => (
                <button
                  key={day}
                  onClick={() => toggleDayFilter(day)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    filters.days.includes(day)
                      ? 'bg-amber-500 text-white'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {day}
                </button>
              ))}
            </div>
            {isAllDaysSelected ? (
              <button
                onClick={clearDaysFilter}
                className="text-xs text-red-500 hover:text-red-600 underline"
              >
                取消全选
              </button>
            ) : (
              <button
                onClick={selectAllDays}
                className="text-xs text-amber-600 hover:text-amber-700 underline"
              >
                全选
              </button>
            )}
          </div>

          <div className="h-6 w-px bg-gray-300 hidden md:block" />

          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-700">年级:</span>
            <div className="flex flex-wrap gap-1">
              {availableGrades.map((grade: Grade) => (
                <button
                  key={grade}
                  onClick={() => toggleGradeFilter(grade)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    filters.grades.includes(grade)
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {grade}
                </button>
              ))}
            </div>
            {isAllGradesSelected ? (
              <button
                onClick={clearGradesFilter}
                className="text-xs text-red-500 hover:text-red-600 underline"
              >
                取消全选
              </button>
            ) : (
              <button
                onClick={selectAllGrades}
                className="text-xs text-green-600 hover:text-green-700 underline"
              >
                全选
              </button>
            )}
          </div>

          <div className="h-6 w-px bg-gray-300 hidden md:block" />

          <div className="flex items-center gap-1">
            <span className="text-sm font-semibold text-gray-700">科目:</span>
            <div className="flex gap-1 flex-wrap">
              {subjects.map((subject: Subject) => (
                <button
                  key={subject}
                  onClick={() => toggleSubjectFilter(subject)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    filters.subjects.includes(subject)
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>
            {isAllSubjectsSelected ? (
              <button
                onClick={clearSubjectsFilter}
                className="text-xs text-red-500 hover:text-red-600 underline"
              >
                取消全选
              </button>
            ) : (
              <button
                onClick={selectAllSubjects}
                className="text-xs text-blue-600 hover:text-blue-700 underline"
              >
                全选
              </button>
            )}

            <button
              onClick={resetFilters}
              className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <RotateCw size={14} />
              
            </button>
          </div>

          <div className="ml-auto flex items-center gap-1">
            <button
              onClick={handleExportImage}
              className="flex items-center gap-1 px-2 py-1 text-sm text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded-lg transition-colors"
              title="导出图片"
            >
              <Image size={16} />
              <span className="hidden sm:inline">图片</span>
            </button>
            <button
              onClick={handleExportExcel}
              className="flex items-center gap-1 px-2 py-1 text-sm text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
              title="导出Excel"
            >
              <FileSpreadsheet size={16} />
              <span className="hidden sm:inline">Excel</span>
            </button>
            <button
              onClick={handleExportSettings}
              className="flex items-center gap-1 px-2 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
              title="导出设置"
            >
              <Download size={16} />
              <span className="hidden sm:inline">导出</span>
            </button>
            <button
              onClick={handleImportSettings}
              className="flex items-center gap-1 px-2 py-1 text-sm text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
              title="导入设置"
            >
              <Upload size={16} />
              <span className="hidden sm:inline">导入</span>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept=".json"
              className="hidden"
            />
            <div className="h-6 w-px bg-gray-300 hidden md:block" />
            <button
              onClick={toggleHidePlaceholders}
              className={`flex items-center gap-1 px-3 py-1 text-sm rounded-lg transition-colors ${
                hidePlaceholders 
                  ? 'bg-gray-600 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title={hidePlaceholders ? '显示"点击添加"提示' : '隐藏"点击添加"提示'}
            >
              {hidePlaceholders ? <EyeOff size={16} /> : <Eye size={16} />}
            显示提示文字</button>
            <button
              onClick={toggleShowCustomCourses}
              className={`flex items-center gap-1 px-3 py-1 text-sm rounded-lg transition-colors ${
                showCustomCourses 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title={showCustomCourses ? '隐藏自定义课程' : '显示自定义课程'}
            >
              <Tag size={14} />
              <span className="hidden sm:inline">显示自定义课程</span>
            </button>
            <button
              onClick={toggleDimFilteredCourses}
              className={`flex items-center gap-1 px-3 py-1 text-sm rounded-lg transition-colors ${
                dimFilteredCourses 
                  ? 'bg-purple-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title={dimFilteredCourses ? '隐藏筛选课程' : '筛选课程深灰色显示'}
            >
              <Palette size={14} />
              <span className="hidden sm:inline">深灰显示非筛选课程</span>
            </button>
            <button
              onClick={toggleVerticalLayout}
              className={`flex items-center gap-1 px-3 py-1 text-sm rounded-lg transition-colors ${
                verticalLayout 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title={verticalLayout ? '切换为横向排列' : '切换为纵向排列'}
            >
              <span className="text-base leading-none">{verticalLayout ? '⬇' : '⬅'}</span>
              <span className="hidden sm:inline">{verticalLayout ? '竖排' : '横排'}</span>
            </button>
            
            <button
              onClick={() => setIsSettingsOpen(true)}
              className="flex items-center gap-1 px-3 py-1 text-sm bg-amber-500 text-white hover:bg-amber-600 rounded-lg transition-colors"
            >
              <Settings size={14} />
              设置
            </button>
          </div>
        </div>
      </div>
      
      <SettingsPanel isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </>
  );
};

export default FilterBar;
