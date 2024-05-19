import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function replacer(key: string, value: any) {
  if (typeof value === 'bigint') return value.toString();
  return value;
}
