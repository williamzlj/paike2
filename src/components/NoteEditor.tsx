import { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import { TextStyle } from '@tiptap/extension-text-style';
import Color from '@tiptap/extension-color';
import {
  Bold, Italic, Underline as UnderlineIcon,
  List, ListOrdered, AlignLeft, AlignCenter, AlignRight,
  X, Type,
} from 'lucide-react';

interface NoteEditorProps {
  initialContent: string;
  onSave: (content: string) => void;
  onClose: () => void;
}

const colors = [
  '#000000', '#374151', '#6b7280', '#ef4444', '#f97316',
  '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899',
];

const NoteEditor = ({ initialContent, onSave, onClose }: NoteEditorProps) => {
  const [showColorPicker, setShowColorPicker] = useState(false);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: false }),
      Underline,
      TextAlign.configure({ types: ['paragraph', 'list_item'] }),
      TextStyle,
      Color,
    ],
    content: initialContent,
    editorProps: {
      attributes: {
        class: 'px-6 py-4 min-h-[300px] focus:outline-none text-gray-700',
        style: 'line-height: 1.8;',
      },
    },
  });

  if (!editor) return null;

  const ToolBtn = ({ active, onMouseDown, children, title }: {
    active: boolean;
    onMouseDown: (e: React.MouseEvent) => void;
    children: React.ReactNode;
    title: string;
  }) => (
    <button
      onMouseDown={onMouseDown}
      className={`p-2 rounded transition-colors ${active ? 'bg-amber-200 text-amber-800' : 'hover:bg-gray-200 text-gray-700'}`}
      title={title}
    >
      {children}
    </button>
  );

  const handleSave = () => {
    onSave(editor.getHTML());
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl mx-4 max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">编辑排课备注</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-1 px-4 py-2 border-b border-gray-200 bg-gray-50">
          <ToolBtn active={editor.isActive('bold')} onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleBold().run(); }} title="加粗">
            <Bold size={18} />
          </ToolBtn>
          <ToolBtn active={editor.isActive('italic')} onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleItalic().run(); }} title="斜体">
            <Italic size={18} />
          </ToolBtn>
          <ToolBtn active={editor.isActive('underline')} onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleUnderline().run(); }} title="下划线">
            <UnderlineIcon size={18} />
          </ToolBtn>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          <ToolBtn active={editor.isActive('bulletList')} onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleBulletList().run(); }} title="无序列表">
            <List size={18} />
          </ToolBtn>
          <ToolBtn active={editor.isActive('orderedList')} onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().toggleOrderedList().run(); }} title="有序列表">
            <ListOrdered size={18} />
          </ToolBtn>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          <ToolBtn active={editor.isActive({ textAlign: 'left' })} onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().setTextAlign('left').run(); }} title="左对齐">
            <AlignLeft size={18} />
          </ToolBtn>
          <ToolBtn active={editor.isActive({ textAlign: 'center' })} onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().setTextAlign('center').run(); }} title="居中">
            <AlignCenter size={18} />
          </ToolBtn>
          <ToolBtn active={editor.isActive({ textAlign: 'right' })} onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().setTextAlign('right').run(); }} title="右对齐">
            <AlignRight size={18} />
          </ToolBtn>

          <div className="w-px h-6 bg-gray-300 mx-1" />

          <div className="relative">
            <button onClick={() => setShowColorPicker(!showColorPicker)} className="p-2 hover:bg-gray-200 rounded transition-colors flex items-center gap-1 text-gray-700" title="文字颜色">
              <Type size={18} />
            </button>
            {showColorPicker && (
              <div className="absolute top-full left-0 mt-1 p-2 bg-white rounded-lg shadow-lg border border-gray-200 grid grid-cols-5 gap-1 z-10">
                {colors.map((color) => (
                  <button
                    key={color}
                    onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().setColor(color).run(); setShowColorPicker(false); }}
                    className="w-6 h-6 rounded border border-gray-300 hover:scale-110 transition-transform"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            )}
          </div>

          <ToolBtn active={false} onMouseDown={(e) => { e.preventDefault(); editor.chain().focus().unsetAllMarks().clearNodes().run(); }} title="清除格式">
            <span className="text-xs">清除格式</span>
          </ToolBtn>
        </div>

        <div className="flex-1 overflow-auto">
          <EditorContent editor={editor} />
        </div>

        <div className="flex justify-end gap-2 px-6 py-4 border-t border-gray-200">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            取消
          </button>
          <button onClick={handleSave} className="px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors">
            保存
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteEditor;
