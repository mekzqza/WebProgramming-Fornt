import { Message } from '@/app/ai-chat/types/chat.types';

interface SendMessageRequest {
  messages: Array<{ role: string; content: string }>;
}

interface SendMessageResponse {
  reply: string;
}

export class ChatApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public details?: any
  ) {
    super(message);
    this.name = 'ChatApiError';
  }
}

export const chatApi = {
  async sendMessage(
    messages: Message[],
    endpoint: string = '/api/chat'
  ): Promise<string> {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: messages.map(({ role, content }) => ({ role, content })),
        } as SendMessageRequest),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ChatApiError(
          errorData.error || 'Failed to get AI response',
          response.status,
          errorData
        );
      }

      const data: SendMessageResponse = await response.json();
      return data.reply;
    } catch (error) {
      if (error instanceof ChatApiError) {
        throw error;
      }
      throw new ChatApiError(
        'Network error: Unable to connect to the server',
        undefined,
        error
      );
    }
  },
};
