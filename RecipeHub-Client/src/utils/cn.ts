import { clsx, type ClassValue } from 'clsx';

export const cn = (...classes: ClassValue[]): string => {
  return clsx(...classes);
};
