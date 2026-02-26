type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LoggerConfig {
  enableConsole: boolean;
  enableTimestamp: boolean;
}

class Logger {
  private config: LoggerConfig;

  constructor(config: Partial<LoggerConfig> = {}) {
    this.config = {
      enableConsole: process.env.NODE_ENV !== 'production',
      enableTimestamp: true,
      ...config,
    };
  }

  private formatMessage(level: LogLevel, message: string, data?: any): string {
    const timestamp = this.config.enableTimestamp
      ? new Date().toISOString()
      : '';
    const dataStr = data ? ` | ${JSON.stringify(data)}` : '';
    return `[${timestamp}] [${level.toUpperCase()}] ${message}${dataStr}`;
  }

  info(message: string, data?: any) {
    if (this.config.enableConsole) {
      console.log(this.formatMessage('info', message, data));
    }
  }

  warn(message: string, data?: any) {
    if (this.config.enableConsole) {
      console.warn(this.formatMessage('warn', message, data));
    }
  }

  error(message: string, error?: any) {
    if (this.config.enableConsole) {
      console.error(this.formatMessage('error', message, error));
    }
  }

  debug(message: string, data?: any) {
    if (this.config.enableConsole && process.env.NODE_ENV === 'development') {
      console.debug(this.formatMessage('debug', message, data));
    }
  }
}

export const logger = new Logger();
