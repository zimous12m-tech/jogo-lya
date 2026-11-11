const HATS: Record<string, string> = {
  beanie: '<path d="M32 22a28 28 0 0 1 56 0z" fill="#ff7a6e" stroke="#241c2e" stroke-width="3" />',
  tophat: '<rect x="36" y="6" width="48" height="26" fill="#241c2e" /><rect x="26" y="30" width="68" height="8" fill="#241c2e" />',
  crown: '<path d="M32 34l8-20 10 12 10-12 8 20z" fill="#fdcb6e" stroke="#241c2e" stroke-width="3" />',
  witch: '<path d="M60 2l26 36H34z" fill="#3a2f5c" /><rect x="28" y="34" width="64" height="8" fill="#3a2f5c" />',
  halo: '<ellipse cx="60" cy="14" rx="24" ry="7" fill="none" stroke="#fdcb6e" stroke-width="5" />'
};

export function owlSvg(size = 132, hat?: string, colour = '#8e7cf0'): string {
  return '<svg viewBox="0 0 120 120" width="' + size + '" height="' + size + '" aria-hidden="true">'
    + '<ellipse cx="60" cy="70" rx="34" ry="38" fill="' + colour + '" stroke="#241c2e" stroke-width="3" />'
    + '<circle cx="48" cy="50" r="14" fill="#fff" stroke="#241c2e" stroke-width="3" />'
    + '<circle cx="72" cy="50" r="14" fill="#fff" stroke="#241c2e" stroke-width="3" />'
    + '<circle cx="48" cy="51" r="6" fill="#241c2e" /><circle cx="72" cy="51" r="6" fill="#241c2e" />'
    + '<path d="M60 62 L52 74 L68 74 Z" fill="#fdcb6e" stroke="#241c2e" stroke-width="3" />'
    + (HATS[hat ?? ''] ?? '') + '</svg>';
}
