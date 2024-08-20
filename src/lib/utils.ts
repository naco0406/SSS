import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getNextFourTuesdays(): Date[] {
  const today = new Date();
  const nextTuesdays: Date[] = [];

  for (let i = 0; i < 4; i++) {
    const nextTuesday = getNextTuesday(today);
    nextTuesday.setDate(nextTuesday.getDate() + (7 * i));
    nextTuesdays.push(nextTuesday);
  }

  return nextTuesdays;
}

export function getNextTuesday(fromDate: Date): Date {
  const nextTuesday = new Date(fromDate);
  nextTuesday.setDate(fromDate.getDate() + ((2 + 7 - fromDate.getDay()) % 7));
  nextTuesday.setHours(20, 0, 0, 0); // Set to 8:00 PM
  return nextTuesday;
}