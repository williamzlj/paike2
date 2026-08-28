import FilterBar from './components/FilterBar';
import Header from './components/Header';
import ScheduleTable from './components/ScheduleTable';
import NotePanel from './components/NotePanel';
import { useScheduleStore } from './store/scheduleStore';

function App() {
  const showNotes = useScheduleStore((state) => state.showNotes);

  return (
    <div className="min-h-screen bg-white">
      <FilterBar />
      <div id="schedule-export-area" className="bg-white w-fit mx-auto py-6" style={{ fontFamily: '"Microsoft YaHei", "PingFang SC", "Hiragino Sans GB", "Noto Sans SC", sans-serif' }}>
        <Header />
        <main className="pt-1 pb-6">
          <ScheduleTable />
        </main>
        {showNotes && <NotePanel />}
      </div>
    </div>
  );
}

export default App;
