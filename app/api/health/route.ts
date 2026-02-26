import { NextRequest, NextResponse } from 'next/server';

/**
 * Health check endpoint for Docker and monitoring systems
 * Returns 200 OK if the application is running properly
 */
export async function GET(request: NextRequest) {
  try {
    // Basic health check
    const healthStatus = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: '1.0.0',
    };

    return NextResponse.json(healthStatus, { status: 200 });
  } catch (error) {
    // Return 503 Service Unavailable if health check fails
    return NextResponse.json(
      {
        status: 'unhealthy',
        timestamp: new Date().toISOString(),
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    );
  }
}
