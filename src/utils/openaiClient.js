import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export const generatePlan = async (userPrompt) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `You are a productivity assistant. Generate structured plans in JSON format with this structure:
          {
            "daily": [{"title": "Task", "description": "Details", "deadline": "2024-01-01"}],
            "weekly": [{"title": "Goal", "description": "Details", "deadline": "2024-01-07"}],
            "monthly": [{"title": "Objective", "description": "Details", "deadline": "2024-01-31"}]
          }
          Keep tasks realistic and actionable.`
        },
        {
          role: "user",
          content: userPrompt
        }
      ],
      temperature: 0.7
    });

    const content = response.choices[0].message.content;
    return JSON.parse(content);
  } catch (error) {
    console.error('OpenAI API Error:', error);
    return null;
  }
};

export const getChatResponse = async (message, context = "") => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful productivity assistant. Provide concise, actionable advice for planning and productivity."
        },
        {
          role: "user",
          content: `Context: ${context}\n\nMessage: ${message}`
        }
      ],
      temperature: 0.7,
      max_tokens: 300
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error('Chat API Error:', error);
    return "Sorry, I'm having trouble connecting right now. Please try again.";
  }
};
