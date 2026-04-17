import { ConsoleLogger, Injectable } from '@nestjs/common';

@Injectable()
export class MyLoggerService extends ConsoleLogger {
  async logToFile(message: string, context?: string): Promise<void> {
    const entry = ` [${new Date().toISOString()}] ${context ? `[${context}] ` : ''}${message}`;

    try {
      const fs = await import('fs').then((m) => m.promises);
      await fs.appendFile('logs.txt', entry + '\n');
    } catch (error) {
      console.error('Failed to write to log file:', error);
    }
  }
  log(message: string, context?: string, ...args: unknown[]) {
    const entry = ` [${new Date().toISOString()}] ${context ? `[${context}] ` : ''}${message}`;
    this.logToFile(message, context).catch((error) => {
      console.error('Failed to log to file:', error);
    });
    super.log(entry, context, ...args);
  }
  error(
    message: unknown,
    stack?: string,
    context?: string,
    ...rest: unknown[]
  ): void {
    const entry = ` [${new Date().toISOString()}] ${context ? `[${context}] ` : ''}${String(message)}`;
    this.logToFile(`ERROR: ${String(message)}`, context).catch((error) => {
      console.error('Failed to log error to file:', error);
    });
    super.error(entry, stack, context, ...rest);
  }
}
