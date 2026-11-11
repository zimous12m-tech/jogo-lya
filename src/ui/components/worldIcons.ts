const PATHS: Record<string, string> = {
  numeros: '<path d="M6 4v16" /><path d="M18 4v16" /><path d="M3 9h18" /><path d="M3 15h18" />',
  fracoes: '<circle cx="9" cy="9" r="5" /><path d="M14 14l6 6" />',
  geometria: '<path d="M12 3l9 17H3z" /><path d="M12 10v6" />',
  percentagens: '<circle cx="7" cy="7" r="3" /><circle cx="17" cy="17" r="3" /><path d="M19 5L5 19" />',
  estatistica: '<path d="M4 20V10" /><path d="M10 20V4" /><path d="M16 20v-7" /><path d="M22 20H2" />',
  logica: '<circle cx="12" cy="12" r="9" /><path d="M9 12l2 2 4-4" />'
};

export function worldIcon(name: string, size = 32): string {
  const path = PATHS[name] ?? PATHS.logica;
  return '<svg viewBox="0 0 24 24" width="' + size + '" height="' + size + '" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">' + path + '</svg>';
}
