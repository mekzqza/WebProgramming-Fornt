export const API_CONFIG = {
  agentShortId: process.env.AGENT_SHORT_ID || process.env.NEXT_PUBLIC_AGENT_SHORT_ID || 'YOUR_AGENT_SHORT_ID',
  accessToken: process.env.ACCESS_TOKEN || process.env.NEXT_PUBLIC_ACCESS_TOKEN || 'YOUR_ACCESS_TOKEN',
  timeout: 30000, // 30 seconds
  maxRetries: 3,
};

export const validateConfig = () => {
  if (API_CONFIG.agentShortId === 'YOUR_AGENT_SHORT_ID') {
    throw new Error('AGENT_SHORT_ID not configured. Please set it in .env file.');
  }
  if (API_CONFIG.accessToken === 'YOUR_ACCESS_TOKEN') {
    throw new Error('ACCESS_TOKEN not configured. Please set it in .env file.');
  }
};
