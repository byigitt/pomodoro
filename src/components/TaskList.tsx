import { useState, useEffect } from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
  createdAt: number;
}

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const [isInputFocused, setIsInputFocused] = useState(false);

  // Load tasks from localStorage on component mount
  useEffect(() => {
    const savedTasks = localStorage.getItem('pomodoro-tasks');
    if (savedTasks) {
      try {
        setTasks(JSON.parse(savedTasks));
      } catch {
        console.error('Failed to parse saved tasks');
      }
    }
  }, []);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('pomodoro-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (newTaskText.trim() === '') return;
    
    const newTask: Task = {
      id: Date.now(),
      text: newTaskText,
      completed: false,
      createdAt: Date.now()
    };
    
    setTasks([...tasks, newTask]);
    setNewTaskText('');
  };

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const clearCompletedTasks = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  const activeTaskCount = tasks.filter(task => !task.completed).length;
  const completedTaskCount = tasks.filter(task => task.completed).length;

  return (
    <div className="mt-8 bg-gray-800/40 backdrop-blur-sm p-6 rounded-xl shadow-lg border border-gray-700/30 transition-all">
      <h2 className="text-xl font-bold mb-6 text-center text-gray-200">Focus Tasks</h2>
      
      <div className={`flex mb-6 border-b ${isInputFocused ? 'border-blue-500/70' : 'border-gray-700'} pb-2 transition-colors duration-200`}>
        <input
          type="text"
          className="w-full bg-transparent text-gray-200 placeholder-gray-500 focus:outline-none"
          placeholder="Add a new task..."
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          onKeyPress={handleKeyPress}
          onFocus={() => setIsInputFocused(true)}
          onBlur={() => setIsInputFocused(false)}
        />
        <button 
          className={`ml-2 px-3 py-1 rounded-md ${newTaskText.trim() ? 'text-blue-400 hover:bg-blue-500/10' : 'text-gray-500 cursor-not-allowed'} transition-all`}
          onClick={addTask}
          disabled={!newTaskText.trim()}
        >
          Add
        </button>
      </div>
      
      {tasks.length > 0 && (
        <div className="flex justify-between text-xs text-gray-500 mb-4">
          <div className="flex space-x-3">
            <button 
              className={`px-2 py-1 rounded ${filter === 'all' ? 'bg-gray-700/50 text-gray-300' : 'hover:bg-gray-700/30'}`}
              onClick={() => setFilter('all')}
            >
              All ({tasks.length})
            </button>
            <button 
              className={`px-2 py-1 rounded ${filter === 'active' ? 'bg-gray-700/50 text-gray-300' : 'hover:bg-gray-700/30'}`}
              onClick={() => setFilter('active')}
            >
              Active ({activeTaskCount})
            </button>
            <button 
              className={`px-2 py-1 rounded ${filter === 'completed' ? 'bg-gray-700/50 text-gray-300' : 'hover:bg-gray-700/30'}`}
              onClick={() => setFilter('completed')}
            >
              Completed ({completedTaskCount})
            </button>
          </div>
          
          {completedTaskCount > 0 && (
            <button 
              className="text-gray-500 hover:text-red-400 transition-colors"
              onClick={clearCompletedTasks}
            >
              Clear completed
            </button>
          )}
        </div>
      )}
      
      <ul className="space-y-3 min-h-[100px]">
        {filteredTasks.length === 0 ? (
          <li className="text-gray-500 text-center py-8 text-sm italic">
            {tasks.length === 0 
              ? "No tasks yet. Time to focus!" 
              : filter === 'active' 
                ? "No active tasks. Great job!" 
                : "No completed tasks yet."}
          </li>
        ) : (
          filteredTasks.map(task => (
            <li 
              key={task.id} 
              className="flex items-center group p-2 hover:bg-gray-700/20 rounded-lg transition-all duration-200"
            >
              <button
                onClick={() => toggleTask(task.id)}
                className={`flex-shrink-0 w-5 h-5 rounded-full border ${
                  task.completed 
                    ? 'bg-green-500/20 border-green-500' 
                    : 'border-gray-600 hover:border-gray-400'
                } mr-3 flex items-center justify-center transition-colors`}
                aria-label={task.completed ? "Mark as incomplete" : "Mark as complete"}
              >
                {task.completed && (
                  <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
              <div className="flex-grow">
                <span className={`block ${task.completed ? 'line-through text-gray-500' : 'text-gray-200'} transition-colors`}>
                  {task.text}
                </span>
                <span className="text-xs text-gray-600">
                  {new Date(task.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </span>
              </div>
              <button 
                onClick={() => deleteTask(task.id)}
                className="text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-all p-1 hover:bg-red-400/10 rounded-full"
                aria-label="Delete task"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </li>
          ))
        )}
      </ul>
      
      {tasks.length > 5 && (
        <div className="mt-4 text-center">
          <p className="text-xs text-gray-500">
            {activeTaskCount === 0 
              ? "All tasks completed! 🎉" 
              : `${activeTaskCount} task${activeTaskCount !== 1 ? 's' : ''} remaining`}
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskList; 