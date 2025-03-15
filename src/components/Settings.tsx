import { useState } from 'react';

interface SettingsProps {
  pomodoroMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  onSave: (pomodoro: number, shortBreak: number, longBreak: number) => void;
  onClose: () => void;
}

const Settings = ({ 
  pomodoroMinutes, 
  shortBreakMinutes, 
  longBreakMinutes, 
  onSave, 
  onClose 
}: SettingsProps) => {
  const [pomodoro, setPomodoro] = useState(pomodoroMinutes);
  const [shortBreak, setShortBreak] = useState(shortBreakMinutes);
  const [longBreak, setLongBreak] = useState(longBreakMinutes);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(pomodoro, shortBreak, longBreak);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Settings</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Pomodoro (minutes)</label>
            <input
              type="number"
              min="1"
              max="60"
              value={pomodoro}
              onChange={(e) => setPomodoro(Number(e.target.value))}
              className="w-full px-3 py-2 bg-gray-700 rounded-md"
            />
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">Short Break (minutes)</label>
            <input
              type="number"
              min="1"
              max="30"
              value={shortBreak}
              onChange={(e) => setShortBreak(Number(e.target.value))}
              className="w-full px-3 py-2 bg-gray-700 rounded-md"
            />
          </div>
          
          <div className="mb-6">
            <label className="block mb-2">Long Break (minutes)</label>
            <input
              type="number"
              min="1"
              max="60"
              value={longBreak}
              onChange={(e) => setLongBreak(Number(e.target.value))}
              className="w-full px-3 py-2 bg-gray-700 rounded-md"
            />
          </div>
          
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 rounded-md"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings; 