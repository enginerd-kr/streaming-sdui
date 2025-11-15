import { type ClassValue, clsx } from "clsx";

export function cn(...inputs: ClassValue[]) {
  // tailwind-merge가 없으므로 clsx만 사용
  return clsx(inputs);
}
