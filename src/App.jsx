import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ChatPanel from './components/ChatPanel';
import Dashboard from './pages/Dashboard';
import GoalList from './components/GoalList';
import { loadTasks, saveTasks, createTask } from './utils/db';
import './styles/globals.css';

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [showChat, setShowChat] = useState(false);
  
  // Task states
  const [dailyTasks, setDailyTasks] = useState([]);
  const [weeklyGoals, setWeeklyGoals] = useState([]);
  const [monthlyGoals, setMonthlyGoals] = useState([]);
  
  // Form states
  const [showAddForm, setShowAddForm] = useState({ daily: false, weekly: false, monthly: false });
  const [newTask, setNewTask] = useState({ title: '', description: '', deadline: '' });

  // Load data on mount
  useEffect(() => {
    setDailyTasks(loadTasks('daily'));
    setWeeklyGoals(loadTasks('weekly'));
    setMonthlyGoals(loadTasks('monthly'));
  }, []);

  const handleAddTask = (type) => {
    if (!newTask.title.trim()) return;
    
    const task = createTask(newTask.title, newTask.description, newTask.deadline, type);
    
    if (type === 'daily') {
      const updated = [...dailyTasks, task];
      setDailyTasks(updated);
      saveTasks(updated, 'daily');
    } else if (type === 'weekly') {
      const updated = [...weeklyGoals, task];
      setWeeklyGoals(updated);
      saveTasks(updated, 'weekly');
    } else if (type === 'monthly') {
      const updated = [...monthlyGoals, task];
      setMonthlyGoals(updated);
      saveTasks(updated, 'monthly');
    }
    
    setNewTask({ title: '', description: '', deadline: '' });
    setShowAddForm({ ...showAddForm, [type]: false });
  };

  const handleToggleTask = (taskId, type) => {
    const updateTasks = (tasks, setter) => {
      const updated = tasks.map(task => 
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );
      setter(updated);
      saveTasks(updated, type);
    };

    if (type === 'daily') updateTasks(dailyTasks, setDailyTasks);
    else if (type === 'weekly') updateTasks(weeklyGoals, setWeeklyGoals);
    else if (type === 'monthly') updateTasks(monthlyGoals, setMonthlyGoals);
  };

  const handleDeleteTask = (taskId, type) => {
    const updateTasks = (tasks, setter) => {
      const updated = tasks.filter(task => task.id !== taskId);
      setter(updated);
      saveTasks(updated, type);
    };

    if (type === 'daily') updateTasks(dailyTasks, setDailyTasks);
    else if (type === 'weekly') updateTasks(weeklyGoals, setWeeklyGoals);
    else if (type === 'monthly') updateTasks(monthlyGoals, setMonthlyGoals);
  };

  const handlePlanGenerated = (plan) => {
    if (plan.daily) {
      const newDailyTasks = plan.daily.map(item => createTask(item.title, item.description, item.deadline, 'daily'));
      const updated = [...dailyTasks, ...newDailyTasks];
      setDailyTasks(updated);
      saveTasks(updated, 'daily');
    }
    
    if (plan.weekly) {
      const newWeeklyGoals = plan.weekly.map(item => createTask(item.title, item.description, item.deadline, 'weekly'));
      const updated = [...weeklyGoals, ...newWeeklyGoals];
      setWeeklyGoals(updated);
      saveTasks(updated, 'weekly');
    }
    
    if (plan.monthly) {
      const newMonthlyGoals = plan.monthly.map(item => createTask(item.title, item.description, item.deadline, 'monthly'));
      const updated = [...monthlyGoals, ...newMonthlyGoals];
      setMonthlyGoals(updated);
      saveTasks(updated, 'monthly');
    }
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard dailyTasks={dailyTasks} weeklyGoals={weeklyGoals} monthlyGoals={monthlyGoals} />;
      
      case 'daily':
        return (
          <GoalList
            title="Daily Tasks"
            tasks={dailyTasks}
            showAddForm={showAddForm.daily}
            setShowAddForm={(show) => setShowAddForm({ ...showAddForm, daily: show })}
            newTask={newTask}
            setNewTask={setNewTask}
            onSubmitTask={(e) => { e.preventDefault(); handleAddTask('daily'); }}
            onToggleTask={(id) => handleToggleTask(id, 'daily')}
            onDeleteTask={(id) => handleDeleteTask(id, 'daily')}
          />
        );
      
      case 'weekly':
        return (
          <GoalList
            title="Weekly Goals"
            tasks={weeklyGoals}
            showAddForm={showAddForm.weekly}
            setShowAddForm={(show) => setShowAddForm({ ...showAddForm, weekly: show })}
            newTask={newTask}
            setNewTask={setNewTask}
            onSubmitTask={(e) => { e.preventDefault(); handleAddTask('weekly'); }}
            onToggleTask={(id) => handleToggleTask(id, 'weekly')}
            onDeleteTask={(id) => handleDeleteTask(id, 'weekly')}
          />
        );
      
      case 'monthly':
        return (
          <GoalList
            title="Monthly Goals"
            tasks={monthlyGoals}
            showAddForm={showAddForm.monthly}
            setShowAddForm={(show) => setShowAddForm({ ...showAddForm, monthly: show })}
            newTask={newTask}
            setNewTask={setNewTask}
            onSubmitTask={(e) => { e.preventDefault(); handleAddTask('monthly'); }}
            onToggleTask={(id) => handleToggleTask(id, 'monthly')}
            onDeleteTask={(id) => handleDeleteTask(id, 'monthly')}
          />
        );
      
      default:
        return <Dashboard dailyTasks={dailyTasks} weeklyGoals={weeklyGoals} monthlyGoals={monthlyGoals} />;
    }
  };

  return (
    <div className="flex h-screen bg-dark-bg text-white">
      <Sidebar 
        activeView={activeView} 
        setActiveView={setActiveView}
        showChat={showChat}
        setShowChat={setShowChat}
      />
      
      <div className={`flex-1 flex ${showChat ? 'mr-80' : ''}`}>
        <main className="flex-1 p-6 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
      
      {showChat && (
        <div className="w-80 fixed right-0 top-0 h-full">
          <ChatPanel onPlanGenerated={handlePlanGenerated} />
        </div>
      )}
    </div>
  );
}

export default App;
