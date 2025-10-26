import { Calendar, Target, TrendingUp, Bot, Home } from 'lucide-react';

const Sidebar = ({ activeView, setActiveView, showChat, setShowChat }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'daily', label: 'Daily Tasks', icon: Calendar },
    { id: 'weekly', label: 'Weekly Goals', icon: Target },
    { id: 'monthly', label: 'Monthly Goals', icon: TrendingUp },
  ];

  return (
    <div className="w-64 bg-dark-card border-r border-dark-border p-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-electric-blue font-mono">AI Planner</h1>
        <p className="text-sm text-gray-400 mt-1">Intelligent productivity</p>
      </div>

      <nav className="space-y-2">
        {menuItems.map(item => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`sidebar-item w-full text-left ${
                activeView === item.id ? 'active' : ''
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          );
        })}
        
        <button
          onClick={() => setShowChat(!showChat)}
          className={`sidebar-item w-full text-left ${showChat ? 'active' : ''}`}
        >
          <Bot size={20} />
          <span>AI Assistant</span>
        </button>
      </nav>

      <div className="mt-8 p-4 bg-dark-bg rounded-lg border border-electric-blue/20">
        <div className="text-sm text-gray-400 mb-2">Quick Tip</div>
        <div className="text-xs text-gray-300">
          Ask the AI assistant to "plan my week" for instant productivity suggestions!
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
