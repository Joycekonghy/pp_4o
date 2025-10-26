import { useState } from 'react';
import { Send, Bot, User, Loader } from 'lucide-react';
import { getChatResponse, generatePlan } from '../utils/openaiClient';

const ChatPanel = ({ onPlanGenerated }) => {
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I can help you plan your day, week, or month. Try asking me something like "help me plan a productive week" or "create a fitness routine for this month".' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Check if user wants a plan generated
      if (userMessage.toLowerCase().includes('plan') || userMessage.toLowerCase().includes('schedule')) {
        const plan = await generatePlan(userMessage);
        if (plan) {
          onPlanGenerated(plan);
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: 'I\'ve generated a plan for you! Check your dashboard - you can edit or delete any suggestions before saving them.' 
          }]);
        } else {
          setMessages(prev => [...prev, { 
            role: 'assistant', 
            content: 'I had trouble generating a plan. Let me give you some general advice instead.' 
          }]);
        }
      } else {
        // Regular chat response
        const response = await getChatResponse(userMessage);
        setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      }
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-dark-card border-l border-dark-border">
      <div className="p-4 border-b border-dark-border">
        <h3 className="font-semibold text-electric-blue flex items-center space-x-2">
          <Bot size={20} />
          <span>AI Assistant</span>
        </h3>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div key={index} className={`flex space-x-3 ${message.role === 'user' ? 'justify-end' : ''}`}>
            {message.role === 'assistant' && (
              <div className="w-8 h-8 bg-electric-blue/20 rounded-full flex items-center justify-center">
                <Bot size={16} className="text-electric-blue" />
              </div>
            )}
            <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
              message.role === 'user' 
                ? 'bg-electric-blue text-black ml-auto' 
                : 'bg-dark-bg border border-dark-border'
            }`}>
              <p className="text-sm">{message.content}</p>
            </div>
            {message.role === 'user' && (
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <User size={16} />
              </div>
            )}
          </div>
        ))}
        {isLoading && (
          <div className="flex space-x-3">
            <div className="w-8 h-8 bg-electric-blue/20 rounded-full flex items-center justify-center">
              <Loader size={16} className="text-electric-blue animate-spin" />
            </div>
            <div className="bg-dark-bg border border-dark-border px-4 py-2 rounded-lg">
              <p className="text-sm">Thinking...</p>
            </div>
          </div>
        )}
      </div>

      <form onSubmit={handleSend} className="p-4 border-t border-dark-border">
        <div className="flex space-x-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me to help plan your goals..."
            className="flex-1 bg-dark-bg border border-dark-border rounded-lg px-3 py-2 focus:border-electric-blue outline-none"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="glow-button p-2 rounded-lg disabled:opacity-50"
          >
            <Send size={20} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatPanel;
