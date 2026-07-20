import { useState } from 'react';
import { Pencil, Save } from 'lucide-react';
import { useScheduleStore } from '../store/scheduleStore';

const Header = () => {
  const { title, subtitle, setTitle, setSubtitle, hidePlaceholders } = useScheduleStore();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [isEditingSubtitle, setIsEditingSubtitle] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedSubtitle, setEditedSubtitle] = useState(subtitle);

  const handleSaveTitle = () => {
    setTitle(editedTitle);
    setIsEditingTitle(false);
  };

  const handleSaveSubtitle = () => {
    setSubtitle(editedSubtitle);
    setIsEditingSubtitle(false);
  };

  return (
    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-200 px-6 py-4">
      <div className="flex flex-col items-center gap-2">
        <div className="text-center w-full">
          {isEditingTitle ? (
            <div className="flex items-center justify-center gap-2">
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value)}
                className="text-2xl md:text-3xl font-bold text-gray-800 bg-white border border-amber-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400 max-w-lg"
                autoFocus
              />
              <button
                onClick={handleSaveTitle}
                className="p-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
              >
                <Save size={20} />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-3">
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {title}
              </h1>
              {!hidePlaceholders && (
                <button
                  onClick={() => {
                    setEditedTitle(title);
                    setIsEditingTitle(true);
                  }}
                  className="p-2 text-amber-600 hover:bg-amber-100 rounded-lg transition-colors"
                >
                  <Pencil size={18} />
                </button>
              )}
            </div>
          )}
        </div>
        <div className="text-center w-full">
          {isEditingSubtitle ? (
            <div className="flex items-center justify-center gap-2">
              <input
                type="text"
                value={editedSubtitle}
                onChange={(e) => setEditedSubtitle(e.target.value)}
                placeholder="输入小标题..."
                className="text-xl text-gray-600 bg-white border border-amber-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-amber-400 max-w-md w-64"
                autoFocus
              />
              <button
                onClick={handleSaveSubtitle}
                className="p-1 bg-amber-500 text-white rounded hover:bg-amber-600 transition-colors"
              >
                <Save size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2">
              {subtitle ? (
                <span className="text-xl text-gray-500">{subtitle}</span>
              ) : (
                !hidePlaceholders && <span className="text-xl text-gray-400 italic">点击添加小标题</span>
              )}
              {!hidePlaceholders && (
                <button
                  onClick={() => {
                    setEditedSubtitle(subtitle);
                    setIsEditingSubtitle(true);
                  }}
                  className="p-1 text-amber-600 hover:bg-amber-100 rounded transition-colors"
                >
                  <Pencil size={14} />
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;