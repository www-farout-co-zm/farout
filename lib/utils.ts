import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAssetPath(path: string): string {
  const isGithubPages = process.env.GITHUB_ACTIONS === "true";
  const basePath = isGithubPages ? "/farout" : "";
  return `${basePath}${path}`;
}
