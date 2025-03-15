import { useState, useEffect } from 'react';

interface TimerProps {
  initialMinutes: number;
  onComplete: () => void;
}

const Timer = ({ initialMinutes, onComplete }: TimerProps) => {
  const [minutes, setMinutes] = useState(initialMinutes);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Reset timer when initialMinutes changes
    setMinutes(initialMinutes);
    setSeconds(0);
    setIsActive(false);
  }, [initialMinutes]);

  useEffect(() => {
    let interval: number | undefined;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            // Timer completed
            clearInterval(interval);
            setIsActive(false);
            onComplete();
            return;
          }
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else if (!isActive && interval) {
      clearInterval(interval);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, minutes, seconds, onComplete]);

  const handleStartStop = () => {
    setIsActive(!isActive);
  };

  const handleReset = () => {
    setIsActive(false);
    setMinutes(initialMinutes);
    setSeconds(0);
  };

  return (
    <div className="timer-container">
      <div className="text-8xl font-bold text-center mb-8">
        {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
      </div>
      
      <div className="flex justify-center">
        <button 
          className={`px-6 py-3 mx-2 rounded-lg font-bold ${isActive ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'}`}
          onClick={handleStartStop}
        >
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button 
          className="px-6 py-3 mx-2 bg-gray-600 hover:bg-gray-700 rounded-lg font-bold"
          onClick={handleReset}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer; 