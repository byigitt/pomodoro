import { useState } from 'react';

interface TimerSettings {
  minutes: number;
  seconds: number;
}

interface SettingsProps {
  pomodoroMinutes: number;
  shortBreakMinutes: number;
  longBreakMinutes: number;
  onSave: (pomodoro: TimerSettings, shortBreak: TimerSettings, longBreak: TimerSettings) => void;
  onClose: () => void;
}

const Settings = ({ 
  pomodoroMinutes, 
  shortBreakMinutes, 
  longBreakMinutes, 
  onSave, 
  onClose 
}: SettingsProps) => {
  const [pomodoro, setPomodoro] = useState<TimerSettings>({ minutes: pomodoroMinutes, seconds: 0 });
  const [shortBreak, setShortBreak] = useState<TimerSettings>({ minutes: shortBreakMinutes, seconds: 0 });
  const [longBreak, setLongBreak] = useState<TimerSettings>({ minutes: longBreakMinutes, seconds: 0 });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(pomodoro, shortBreak, longBreak);
    onClose();
  };

  const handleTimeChange = (
    setter: React.Dispatch<React.SetStateAction<TimerSettings>>,
    field: 'minutes' | 'seconds',
    value: number
  ) => {
    setter(prev => ({
      ...prev,
      [field]: Math.max(0, Math.min(field === 'minutes' ? 60 : 59, value))
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 p-6 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Settings</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Pomodoro</label>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-sm text-gray-400 mb-1">Minutes</label>
                <input
                  type="number"
                  min="0"
                  max="60"
                  value={pomodoro.minutes}
                  onChange={(e) => handleTimeChange(setPomodoro, 'minutes', Number(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-700 rounded-md"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-400 mb-1">Seconds</label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={pomodoro.seconds}
                  onChange={(e) => handleTimeChange(setPomodoro, 'seconds', Number(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-700 rounded-md"
                />
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">Short Break</label>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-sm text-gray-400 mb-1">Minutes</label>
                <input
                  type="number"
                  min="0"
                  max="30"
                  value={shortBreak.minutes}
                  onChange={(e) => handleTimeChange(setShortBreak, 'minutes', Number(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-700 rounded-md"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-400 mb-1">Seconds</label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={shortBreak.seconds}
                  onChange={(e) => handleTimeChange(setShortBreak, 'seconds', Number(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-700 rounded-md"
                />
              </div>
            </div>
          </div>
          
          <div className="mb-4">
            <label className="block mb-2">Long Break</label>
            <div className="flex gap-2">
              <div className="flex-1">
                <label className="block text-sm text-gray-400 mb-1">Minutes</label>
                <input
                  type="number"
                  min="0"
                  max="60"
                  value={longBreak.minutes}
                  onChange={(e) => handleTimeChange(setLongBreak, 'minutes', Number(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-700 rounded-md"
                />
              </div>
              <div className="flex-1">
                <label className="block text-sm text-gray-400 mb-1">Seconds</label>
                <input
                  type="number"
                  min="0"
                  max="59"
                  value={longBreak.seconds}
                  onChange={(e) => handleTimeChange(setLongBreak, 'seconds', Number(e.target.value))}
                  className="w-full px-3 py-2 bg-gray-700 rounded-md"
                />
              </div>
            </div>
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