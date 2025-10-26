import { Plus } from 'lucide-react';
import TaskCard from './TaskCard';
import { calculateProgress } from '../utils/db';

const GoalList = ({ 
  title, 
  tasks, 
  onAddTask, 
  onToggleTask, 
  onDeleteTask, 
  showAddForm, 
  setShowAddForm,
  newTask,
  setNewTask,
  onSubmitTask 
}) => {
  const progress = calculateProgress(tasks);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-electric-blue">{title}</h2>
          <div className="flex items-center space-x-2 mt-1">
            <div className="progress-bar w-32">
              <div className="progress-fill" style={{ width: `${progress}%` }} />
            </div>
            <span className="text-sm text-gray-400">{progress}%</span>
          </div>
        </div>
        
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="glow-button p-2 rounded-lg"
        >
          <Plus size={20} />
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={onSubmitTask} className="task-card space-y-3">
          <input
            type="text"
            placeholder="Task title"
            value={newTask.title}
            onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
            className="w-full bg-transparent border border-dark-border rounded px-3 py-2 focus:border-electric-blue outline-none"
            required
          />
          <textarea
            placeholder="Description (optional)"
            value={newTask.description}
            onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
            className="w-full bg-transparent border border-dark-border rounded px-3 py-2 focus:border-electric-blue outline-none resize-none"
            rows="2"
          />
          <input
            type="date"
            value={newTask.deadline}
            onChange={(e) => setNewTask({ ...newTask, deadline: e.target.value })}
            className="w-full bg-transparent border border-dark-border rounded px-3 py-2 focus:border-electric-blue outline-none"
          />
          <div className="flex space-x-2">
            <button type="submit" className="glow-button px-4 py-2 rounded">
              Add
            </button>
            <button 
              type="button" 
              onClick={() => setShowAddForm(false)}
              className="px-4 py-2 border border-gray-600 rounded hover:bg-gray-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-3">
        {tasks.map(task => (
          <TaskCard
            key={task.id}
            task={task}
            onToggle={onToggleTask}
            onDelete={onDeleteTask}
          />
        ))}
        {tasks.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No {title.toLowerCase()} yet. Click + to add one!
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalList;
