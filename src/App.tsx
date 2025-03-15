import { useState } from 'react';
import Timer from './components/Timer';
import ModeSelector from './components/ModeSelector';
import TaskList from './components/TaskList';
import Settings from './components/Settings';

function App() {
  const [mode, setMode] = useState('pomodoro'); // pomodoro, shortBreak, longBreak
  const [pomodoroMinutes, setPomodoroMinutes] = useState(25);
  const [shortBreakMinutes, setShortBreakMinutes] = useState(5);
  const [longBreakMinutes, setLongBreakMinutes] = useState(15);
  const [showSettings, setShowSettings] = useState(false);

  const handleModeChange = (newMode: string) => {
    setMode(newMode);
  };

  const handleTimerComplete = () => {
    // Auto switch to next mode
    if (mode === 'pomodoro') {
      setMode('shortBreak');
    } else if (mode === 'shortBreak') {
      setMode('pomodoro');
    } else if (mode === 'longBreak') {
      setMode('pomodoro');
    }
    
    // Play notification sound here
    // You can add a sound effect when timer completes
  };

  const getCurrentTimerMinutes = () => {
    if (mode === 'pomodoro') return pomodoroMinutes;
    if (mode === 'shortBreak') return shortBreakMinutes;
    return longBreakMinutes;
  };

  const handleSaveSettings = (pomodoro: number, shortBreak: number, longBreak: number) => {
    setPomodoroMinutes(pomodoro);
    setShortBreakMinutes(shortBreak);
    setLongBreakMinutes(longBreak);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4">
      <div className="max-w-md mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Pomodoro Timer</h1>
          <button 
            className="bg-gray-700 hover:bg-gray-600 p-2 rounded-full"
            onClick={() => setShowSettings(true)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
        </div>
        
        <div className="bg-gray-800 rounded-lg shadow-lg p-6 mb-6">
          <ModeSelector 
            currentMode={mode} 
            onModeChange={handleModeChange} 
          />
          
          <Timer 
            initialMinutes={getCurrentTimerMinutes()} 
            onComplete={handleTimerComplete} 
          />
        </div>
        
        <TaskList />
      </div>
      
      {showSettings && (
        <Settings 
          pomodoroMinutes={pomodoroMinutes}
          shortBreakMinutes={shortBreakMinutes}
          longBreakMinutes={longBreakMinutes}
          onSave={handleSaveSettings}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}

export default App;
