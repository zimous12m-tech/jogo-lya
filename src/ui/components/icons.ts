const PATHS = {
  play: '<path d="M7 4l13 8-13 8z" />',
  next: '<path d="M5 12h14" /><path d="M13 6l6 6-6 6" />',
  exit: '<path d="M6 6l12 12" /><path d="M18 6L6 18" />',
  star: '<path d="M12 3l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 18l-5.9 3 1.2-6.5L2.5 9.9 9.1 9z" />',
  feather: '<path d="M12 3c-3.2 3.2-5 6.3-5 9.4A5 5 0 0 0 12 17a5 5 0 0 0 5-4.6c0-3.1-1.8-6.2-5-9.4z" /><path d="M12 17v4" />',
  left: '<path d="M15 6l-6 6 6 6" />',
  right: '<path d="M9 6l6 6-6 6" />',
  up: '<path d="M6 15l6-6 6 6" />',
  lock: '<rect x="4" y="10" width="16" height="10" rx="2" /><path d="M8 10V7a4 4 0 0 1 8 0v3" />',
  cog: '<circle cx="12" cy="12" r="3" /><path d="M12 3v3M12 18v3M3 12h3M18 12h3" />',
  flame: '<path d="M12 3c3 4 5 6 5 9a5 5 0 0 1-10 0c0-3 2-5 5-9z" />',
  repeat: '<path d="M4 10V8a3 3 0 0 1 3-3h10" /><path d="M14 2l3 3-3 3" /><path d="M20 14v2a3 3 0 0 1-3 3H7" />'
} as const;

export type IconName = keyof typeof PATHS;

export function icon(name: IconName, size = 24): string {
  return '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + PATHS[name] + '</svg>';
}
