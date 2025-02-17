import json from '../../package.json';

export const isDev = process.env.NODE_ENV === 'development';

export function devWarning(component: string, message: string): void {
  if (isDev) {
    console.warn(`[${json.name}: ${component}] ${message}`);
  }
}
