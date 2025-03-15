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
    <div className="min-h-screen bg-gray-900 text-white p-4 relative">
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
      
      <footer className="fixed bottom-4 right-4 z-10">
        <a 
          href="https://github.com/byigitt/pomodoro" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-gray-800/70 hover:bg-gray-700 backdrop-blur-sm px-3 py-2 rounded-full text-sm text-gray-300 hover:text-white transition-all shadow-lg group"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24" className="group-hover:scale-110 transition-transform">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
          </svg>
          <span>Open Source</span>
        </a>
      </footer>

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
