import { useState } from 'react';
import { FileText } from 'lucide-react';
import { useScheduleStore } from '../store/scheduleStore';
import NoteEditor from './NoteEditor';

const NotePanel = () => {
  const { notes, setNotes, classrooms, tableSettings, hidePlaceholders } = useScheduleStore();
  const [isEditing, setIsEditing] = useState(false);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleSave = (content: string) => {
    setNotes(content);
    setIsEditing(false);
  };

  const handleClose = () => {
    setIsEditing(false);
  };

  const hasContent = notes && notes.replace(/<[^>]*>/g, '').trim().length > 0;

  const numColumns = 1 + classrooms.length;
  let panelWidth = numColumns * tableSettings.cellWidth;
  if (tableSettings.cellGap > 0) {
    panelWidth += tableSettings.cellGap * 2 + 50;
  } else {
    panelWidth += (numColumns + 2) * tableSettings.borderWidth+20;
  }

  return (
    <>
      <div 
        className="mx-auto mb-6 bg-amber-50 border border-amber-200 rounded-lg p-4 cursor-pointer hover:bg-amber-100 transition-colors"
        style={{ maxWidth: `${panelWidth}px` }}
        onDoubleClick={handleDoubleClick}
      >
        <div className="flex items-center gap-2 mb-2">
          <FileText size={18} className="text-amber-600" />
          <span className="font-semibold text-amber-700">备注说明</span>
          {!hidePlaceholders && <span className="text-xs text-amber-500 ml-auto">双击编辑</span>}
        </div>
        {hasContent ? (
          <div 
            className="text-gray-700 leading-relaxed"
            style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}
            dangerouslySetInnerHTML={{ __html: notes }}
          />
        ) : (
          <p className="text-gray-400 italic">双击此处添加排课备注说明...</p>
        )}
      </div>

      {isEditing && (
        <NoteEditor 
          initialContent={notes} 
          onSave={handleSave} 
          onClose={handleClose} 
        />
      )}
    </>
  );
};

export default NotePanel;
