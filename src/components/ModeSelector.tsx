interface ModeSelectorProps {
  currentMode: string;
  onModeChange: (mode: string) => void;
}

const ModeSelector = ({ currentMode, onModeChange }: ModeSelectorProps) => {
  return (
    <div className="flex justify-center mb-6">
      <button 
        className={`px-4 py-2 mx-1 rounded-md ${currentMode === 'pomodoro' ? 'bg-red-600' : 'bg-gray-700'}`}
        onClick={() => onModeChange('pomodoro')}
      >
        Pomodoro
      </button>
      <button 
        className={`px-4 py-2 mx-1 rounded-md ${currentMode === 'shortBreak' ? 'bg-green-600' : 'bg-gray-700'}`}
        onClick={() => onModeChange('shortBreak')}
      >
        Short Break
      </button>
      <button 
        className={`px-4 py-2 mx-1 rounded-md ${currentMode === 'longBreak' ? 'bg-blue-600' : 'bg-gray-700'}`}
        onClick={() => onModeChange('longBreak')}
      >
        Long Break
      </button>
    </div>
  );
};

export default ModeSelector; 