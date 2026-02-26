import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

// TODO: Replace these with your actual values
const AGENT_SHORT_ID = process.env.AGENT_SHORT_ID || 'YOUR_AGENT_SHORT_ID';
const ACCESS_TOKEN = process.env.ACCESS_TOKEN || 'YOUR_ACCESS_TOKEN';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Invalid messages format' },
        { status: 400 }
      );
    }

    // Call DigitalOcean GenAI API
    const response = await axios.post(
      `https://${AGENT_SHORT_ID}.agents.do-ai.run/api/v1/chat/completions`,
      {
        messages,
        stream: false,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${ACCESS_TOKEN}`,
        },
      }
    );

    // Extract AI response
    const aiReply = response.data.choices[0].message.content;

    return NextResponse.json({ reply: aiReply });
  } catch (error: any) {
    console.error('Error calling AI API:', error.response?.data || error.message);
    return NextResponse.json(
      { error: 'Failed to get AI response', details: error.message },
      { status: 500 }
    );
  }
}
