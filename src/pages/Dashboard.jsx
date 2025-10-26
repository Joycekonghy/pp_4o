import { Calendar, Target, TrendingUp, CheckCircle } from 'lucide-react';
import { calculateProgress } from '../utils/db';

const Dashboard = ({ dailyTasks, weeklyGoals, monthlyGoals }) => {
  const dailyProgress = calculateProgress(dailyTasks);
  const weeklyProgress = calculateProgress(weeklyGoals);
  const monthlyProgress = calculateProgress(monthlyGoals);

  const stats = [
    {
      title: 'Daily Tasks',
      progress: dailyProgress,
      total: dailyTasks.length,
      completed: dailyTasks.filter(t => t.completed).length,
      icon: Calendar,
      color: 'text-electric-blue'
    },
    {
      title: 'Weekly Goals',
      progress: weeklyProgress,
      total: weeklyGoals.length,
      completed: weeklyGoals.filter(t => t.completed).length,
      icon: Target,
      color: 'text-neon-green'
    },
    {
      title: 'Monthly Goals',
      progress: monthlyProgress,
      total: monthlyGoals.length,
      completed: monthlyGoals.filter(t => t.completed).length,
      icon: TrendingUp,
      color: 'text-purple-400'
    }
  ];

  const recentTasks = [
    ...dailyTasks.slice(-3),
    ...weeklyGoals.slice(-2)
  ].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back!</h1>
        <p className="text-gray-400">Here's your productivity overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="task-card">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-dark-bg ${stat.color}`}>
                  <Icon size={24} />
                </div>
                <span className="text-2xl font-bold">{stat.progress}%</span>
              </div>
              
              <h3 className="font-semibold mb-2">{stat.title}</h3>
              <p className="text-sm text-gray-400 mb-3">
                {stat.completed} of {stat.total} completed
              </p>
              
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${stat.progress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="task-card">
          <h3 className="font-semibold text-electric-blue mb-4 flex items-center space-x-2">
            <CheckCircle size={20} />
            <span>Recent Activity</span>
          </h3>
          
          <div className="space-y-3">
            {recentTasks.length > 0 ? (
              recentTasks.map(task => (
                <div key={task.id} className="flex items-center space-x-3 p-2 bg-dark-bg rounded">
                  <div className={`w-2 h-2 rounded-full ${
                    task.completed ? 'bg-neon-green' : 'bg-electric-blue'
                  }`} />
                  <span className={`flex-1 text-sm ${
                    task.completed ? 'line-through text-gray-400' : ''
                  }`}>
                    {task.title}
                  </span>
                  <span className="text-xs text-gray-500">
                    {task.type}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-400 text-sm">No recent activity</p>
            )}
          </div>
        </div>

        <div className="task-card">
          <h3 className="font-semibold text-electric-blue mb-4">Quick Actions</h3>
          
          <div className="space-y-3">
            <button className="w-full text-left p-3 bg-dark-bg rounded hover:bg-electric-blue/10 transition-colors">
              <div className="font-medium">Plan with AI</div>
              <div className="text-sm text-gray-400">Get AI-generated productivity suggestions</div>
            </button>
            
            <button className="w-full text-left p-3 bg-dark-bg rounded hover:bg-electric-blue/10 transition-colors">
              <div className="font-medium">Review Progress</div>
              <div className="text-sm text-gray-400">See detailed analytics and insights</div>
            </button>
            
            <button className="w-full text-left p-3 bg-dark-bg rounded hover:bg-electric-blue/10 transition-colors">
              <div className="font-medium">Export Data</div>
              <div className="text-sm text-gray-400">Download your tasks and goals</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
