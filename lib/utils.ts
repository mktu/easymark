import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getSiteUrl = () => {
  const domainName = process.env.VERCEL_URL
  if (domainName) {
    return `https://${domainName}`
  }
  return 'http://127.0.0.1:3000'
}