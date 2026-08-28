import domToImage from 'dom-to-image-more';
import * as XLSX from 'xlsx';
import { useScheduleStore } from '../store/scheduleStore';

/**
 * 截图模式：导出前隐藏编辑按钮和占位提示，导出后恢复
 */
const withScreenshotMode = async <T>(fn: () => Promise<T>): Promise<T> => {
  const originalHidePlaceholders = useScheduleStore.getState().hidePlaceholders;

  // 开启截图模式：隐藏编辑按钮和占位提示
  useScheduleStore.setState({ hidePlaceholders: true });

  // 等待 DOM 重新渲染
  await new Promise((resolve) => setTimeout(resolve, 100));

  try {
    return await fn();
  } finally {
    // 恢复原状态
    useScheduleStore.setState({ hidePlaceholders: originalHidePlaceholders });
  }
};

/**
 * 导出 PNG 图片
 * 使用 dom-to-image-more（SVG foreignObject 方案）导出，复用浏览器渲染引擎，
 * 文字位置与网页显示一致，无需手动偏移修正。
 */
export const exportAsImage = async (elementId: string, fileName: string = 'schedule.png') => {
  const element = document.getElementById(elementId);
  if (!element) {
    alert('找不到要导出的元素');
    return;
  }

  await withScreenshotMode(async () => {
    try {
      const dataUrl = await domToImage.toPng(element, {
        bgcolor: '#ffffff',
        scale: 2,
        width: element.scrollWidth,
        height: element.scrollHeight,
        style: {
          transform: 'none',
        },
      });

      const link = document.createElement('a');
      link.download = fileName;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('导出图片失败:', error);
      alert('导出图片失败，请重试');
    }
  });
};

export const exportAsExcel = () => {
  const store = useScheduleStore.getState();
  const { timeSlots, classrooms, courses, title, date } = store;

  const workbook = XLSX.utils.book_new();

  const days = ['周五', '周六', '周日'] as const;

  days.forEach((day) => {
    const sheetData: string[][] = [];

    sheetData.push([`${day}排课 - ${title}`]);
    sheetData.push([`导出日期: ${date}`]);
    sheetData.push([]);

    const headerRow = ['时间', ...classrooms.map((c) => c.name)];
    sheetData.push(headerRow);

    timeSlots.forEach((slot) => {
      const row: string[] = [`${slot.startTime} - ${slot.endTime}`];
      
      classrooms.forEach((classroom) => {
        const course = courses.find(
          (c) =>
            c.dayType === day &&
            c.timeSlotId === slot.id &&
            c.classroomId === classroom.id
        );

        if (course) {
          if (course.entryType === 'course' && course.grade && course.subject) {
            row.push(`${course.grade}${course.subject}`);
          } else if (course.entryType === 'custom' && course.customText) {
            row.push(course.customText);
          } else {
            row.push('');
          }
        } else {
          row.push('');
        }
      });

      sheetData.push(row);
    });

    const worksheet = XLSX.utils.aoa_to_sheet(sheetData);
    
    worksheet['!cols'] = classrooms.map(() => ({ wch: 15 }));
    worksheet['!cols'] = [{ wch: 20 }, ...classrooms.map(() => ({ wch: 15 }))];

    XLSX.utils.book_append_sheet(workbook, worksheet, `${day}排课`);
  });

  const fileName = `${title}_${date}.xlsx`;
  XLSX.writeFile(workbook, fileName);
};

export const exportSettingsToFile = () => {
  const store = useScheduleStore.getState();
  const jsonString = store.exportSettings();
  
  const blob = new Blob([jsonString], { type: 'application/json' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.href = url;
  link.download = `schedule_settings_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const importSettingsFromFile = (file: File) => {
  return new Promise<void>((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = (e) => {
      try {
        const jsonString = e.target?.result as string;
        const store = useScheduleStore.getState();
        store.importSettings(jsonString);
        resolve();
      } catch (error) {
        reject(error);
      }
    };
    
    reader.onerror = (e) => {
      reject(e);
    };
    
    reader.readAsText(file);
  });
};
