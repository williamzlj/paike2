import FilterBar from './components/FilterBar';
import Header from './components/Header';
import ScheduleTable from './components/ScheduleTable';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <FilterBar />
      <div id="schedule-export-area" className="bg-white">
        <Header />
        <main className="py-6">
          <ScheduleTable />
        </main>
      </div>
    </div>
  );
}

export default App;
