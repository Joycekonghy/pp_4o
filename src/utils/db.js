const STORAGE_KEYS = {
  DAILY_TASKS: 'daily_tasks',
  WEEKLY_GOALS: 'weekly_goals',
  MONTHLY_GOALS: 'monthly_goals'
};

export const saveData = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving data:', error);
  }
};

export const loadData = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading data:', error);
    return [];
  }
};

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

export const createTask = (title, description = '', deadline = '', type = 'daily') => {
  return {
    id: generateId(),
    title,
    description,
    deadline,
    completed: false,
    progress: 0,
    createdAt: new Date().toISOString(),
    type
  };
};

export const saveTasks = (tasks, type) => {
  const key = STORAGE_KEYS[`${type.toUpperCase()}_${type === 'daily' ? 'TASKS' : 'GOALS'}`];
  saveData(key, tasks);
};

export const loadTasks = (type) => {
  const key = STORAGE_KEYS[`${type.toUpperCase()}_${type === 'daily' ? 'TASKS' : 'GOALS'}`];
  return loadData(key);
};

export const calculateProgress = (tasks) => {
  if (tasks.length === 0) return 0;
  const completed = tasks.filter(task => task.completed).length;
  return Math.round((completed / tasks.length) * 100);
};
