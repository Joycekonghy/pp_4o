# AI Planner - Intelligent Productivity Dashboard

A responsive web-based personal planner with ChatGPT-4o integration for intelligent planning assistance.

## Features

- 📋 **Task Management**: Daily tasks, weekly goals, monthly objectives
- 🤖 **AI Assistant**: ChatGPT-4o powered planning suggestions
- 🎨 **Dark Tech Theme**: Futuristic UI with glowing effects
- 📱 **Responsive Design**: Works on desktop, tablet, and mobile
- 💾 **Local Storage**: All data persists in your browser
- 📊 **Progress Tracking**: Visual progress bars and completion stats

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up OpenAI API:**
   ```bash
   cp .env.example .env
   # Edit .env and add your OpenAI API key
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   ```
   http://localhost:3000
   ```

## Usage

### Manual Planning
- Navigate between Daily, Weekly, and Monthly sections
- Click the "+" button to add new tasks/goals
- Check off completed items
- View progress on the Dashboard

### AI-Powered Planning
- Click "AI Assistant" in the sidebar
- Ask for help like:
  - "Plan my week for productivity and rest"
  - "Create a fitness routine for this month"
  - "Help me balance work and personal goals"
- AI suggestions appear directly in your planner
- Edit or delete suggestions before saving

### Example AI Prompts
- "I want to focus on health and career growth this week"
- "Plan a balanced month with learning, exercise, and social time"
- "Help me create daily habits for better productivity"

## Tech Stack

- **Frontend**: React + Vite
- **Styling**: TailwindCSS with custom dark theme
- **AI**: OpenAI GPT-4o API
- **Storage**: Browser localStorage
- **Icons**: Lucide React

## Project Structure

```
src/
├── components/
│   ├── TaskCard.jsx      # Individual task/goal cards
│   ├── GoalList.jsx      # Task lists with progress
│   ├── ChatPanel.jsx     # AI chat interface
│   └── Sidebar.jsx       # Navigation sidebar
├── pages/
│   └── Dashboard.jsx     # Main dashboard view
├── utils/
│   ├── openaiClient.js   # OpenAI API integration
│   └── db.js            # Local storage utilities
└── styles/
    └── globals.css       # Custom CSS and theme
```

## Customization

### Theme Colors
Edit `tailwind.config.js` to customize colors:
- `dark-bg`: Main background
- `dark-card`: Card backgrounds
- `electric-blue`: Primary accent
- `neon-green`: Success/progress color

### AI Behavior
Modify prompts in `src/utils/openaiClient.js` to change AI personality and response style.

## Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## API Key Setup

1. Get your OpenAI API key from [platform.openai.com](https://platform.openai.com/api-keys)
2. Copy `.env.example` to `.env`
3. Add your key: `VITE_OPENAI_API_KEY=sk-...`

**Note**: This uses client-side API calls for simplicity. For production, implement a backend proxy for security.

## License

MIT License - feel free to customize and extend!
