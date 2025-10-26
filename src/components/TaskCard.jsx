import { Check, Clock, Trash2 } from 'lucide-react';

const TaskCard = ({ task, onToggle, onDelete, onUpdate }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className={`task-card ${task.completed ? 'opacity-60' : ''}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <button
            onClick={() => onToggle(task.id)}
            className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
              task.completed 
                ? 'bg-electric-blue border-electric-blue' 
                : 'border-gray-400 hover:border-electric-blue'
            }`}
          >
            {task.completed && <Check size={12} className="text-black" />}
          </button>
          
          <div className="flex-1">
            <h3 className={`font-medium ${task.completed ? 'line-through text-gray-400' : ''}`}>
              {task.title}
            </h3>
            {task.description && (
              <p className="text-sm text-gray-400 mt-1">{task.description}</p>
            )}
            {task.deadline && (
              <div className="flex items-center space-x-1 mt-2 text-xs text-electric-blue">
                <Clock size={12} />
                <span>{formatDate(task.deadline)}</span>
              </div>
            )}
          </div>
        </div>
        
        <button
          onClick={() => onDelete(task.id)}
          className="text-gray-400 hover:text-red-400 transition-colors"
        >
          <Trash2 size={16} />
        </button>
      </div>
      
      {task.progress > 0 && (
        <div className="mt-3">
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${task.progress}%` }}
            />
          </div>
          <span className="text-xs text-gray-400 mt-1">{task.progress}% complete</span>
        </div>
      )}
    </div>
  );
};

export default TaskCard;
