import { NextRequest, NextResponse } from 'next/server';
import axios, { AxiosError } from 'axios';
import { API_CONFIG, validateConfig } from './config';
import { logger } from '@/lib/utils/logger';

interface Message {
  role: string;
  content: string;
}

interface ChatRequest {
  messages: Message[];
}

interface DigitalOceanResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export async function POST(req: NextRequest) {
  const startTime = Date.now();

  try {
    // Validate environment configuration
    validateConfig();

    // Parse and validate request body
    const body: ChatRequest = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      logger.warn('Invalid request: messages not provided or not an array');
      return NextResponse.json(
        { error: 'Invalid messages format. Expected an array of messages.' },
        { status: 400 }
      );
    }

    if (messages.length === 0) {
      logger.warn('Invalid request: empty messages array');
      return NextResponse.json(
        { error: 'Messages array cannot be empty.' },
        { status: 400 }
      );
    }

    // Validate message structure
    const invalidMessage = messages.find(
      (msg) => !msg.role || !msg.content || typeof msg.content !== 'string'
    );

    if (invalidMessage) {
      logger.warn('Invalid message structure', { invalidMessage });
      return NextResponse.json(
        { error: 'Each message must have role and content properties.' },
        { status: 400 }
      );
    }

    logger.info('Sending request to DigitalOcean GenAI', {
      messageCount: messages.length,
    });

    // Call DigitalOcean GenAI API
    const response = await axios.post<DigitalOceanResponse>(
      `https://${API_CONFIG.agentShortId}.agents.do-ai.run/api/v1/chat/completions`,
      {
        messages,
        stream: false,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_CONFIG.accessToken}`,
        },
        timeout: API_CONFIG.timeout,
      }
    );

    // Extract AI response
    const aiReply = response.data?.choices?.[0]?.message?.content;

    if (!aiReply) {
      logger.error('Invalid response from AI API: no content', {
        response: response.data,
      });
      return NextResponse.json(
        { error: 'Invalid response from AI service.' },
        { status: 502 }
      );
    }

    const duration = Date.now() - startTime;
    logger.info('AI response received', {
      duration: `${duration}ms`,
      replyLength: aiReply.length,
    });

    return NextResponse.json({ reply: aiReply });
  } catch (error: any) {
    const duration = Date.now() - startTime;

    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError;

      if (axiosError.code === 'ECONNABORTED') {
        logger.error('Request timeout', { duration: `${duration}ms` });
        return NextResponse.json(
          { error: 'Request timeout. Please try again.' },
          { status: 504 }
        );
      }

      if (axiosError.response) {
        logger.error('AI API error', {
          status: axiosError.response.status,
          data: axiosError.response.data,
        });

        return NextResponse.json(
          {
            error: 'Failed to get AI response',
            details:
              process.env.NODE_ENV === 'development'
                ? axiosError.response.data
                : undefined,
          },
          { status: axiosError.response.status }
        );
      }

      logger.error('Network error', { message: axiosError.message });
      return NextResponse.json(
        { error: 'Network error. Please check your connection.' },
        { status: 503 }
      );
    }

    logger.error('Unexpected error', { error });
    return NextResponse.json(
      {
        error: 'An unexpected error occurred',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}
