import { useState } from 'react';

interface Task {
  id: number;
  text: string;
  completed: boolean;
}

const TaskList = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskText, setNewTaskText] = useState('');

  const addTask = () => {
    if (newTaskText.trim() === '') return;
    
    const newTask: Task = {
      id: Date.now(),
      text: newTaskText,
      completed: false
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

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  return (
    <div className="mt-8 bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl shadow-lg">
      <h2 className="text-xl font-bold mb-6 text-center text-gray-200">Focus Tasks</h2>
      
      <div className="flex mb-6 border-b border-gray-700 pb-2">
        <input
          type="text"
          className="w-full bg-transparent text-gray-200 placeholder-gray-500 focus:outline-none"
          placeholder="Add a new task..."
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button 
          className="ml-2 text-blue-400 hover:text-blue-300 transition-colors"
          onClick={addTask}
        >
          Add
        </button>
      </div>
      
      <ul className="space-y-3">
        {tasks.length === 0 ? (
          <li className="text-gray-500 text-center py-4 text-sm italic">No tasks yet. Time to focus!</li>
        ) : (
          tasks.map(task => (
            <li 
              key={task.id} 
              className="flex items-center group transition-all duration-200"
            >
              <button
                onClick={() => toggleTask(task.id)}
                className={`flex-shrink-0 w-5 h-5 rounded-full border ${
                  task.completed 
                    ? 'bg-green-500/20 border-green-500' 
                    : 'border-gray-600 hover:border-gray-400'
                } mr-3 flex items-center justify-center transition-colors`}
              >
                {task.completed && (
                  <svg className="w-3 h-3 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
              <span className={`flex-grow ${task.completed ? 'line-through text-gray-500' : 'text-gray-200'}`}>
                {task.text}
              </span>
              <button 
                onClick={() => deleteTask(task.id)}
                className="text-gray-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default TaskList; 