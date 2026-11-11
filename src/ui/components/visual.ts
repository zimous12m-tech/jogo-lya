import type { Visual } from '../../content/schema';
import { formatEuro } from '../../services/i18n';

function pizza(fatias: number, comidas: number): string {
  const r = 58; const c = 70; const step = (Math.PI * 2) / fatias;
  let out = '';
  for (let i = 0; i < fatias; i += 1) {
    const a0 = -Math.PI / 2 + i * step; const a1 = a0 + step;
    const x0 = c + r * Math.cos(a0); const y0 = c + r * Math.sin(a0);
    const x1 = c + r * Math.cos(a1); const y1 = c + r * Math.sin(a1);
    const large = step > Math.PI ? 1 : 0;
    out += '<path d="M' + c + ' ' + c + ' L' + x0.toFixed(2) + ' ' + y0.toFixed(2) + ' A' + r + ' ' + r + ' 0 ' + large + ' 1 ' + x1.toFixed(2) + ' ' + y1.toFixed(2) + ' Z" fill="' + (i < comidas ? '#fdcb6e' : '#fff') + '" stroke="#241c2e" stroke-width="2.5" />';
  }
  return '<svg viewBox="0 0 140 140" width="140" height="140" role="img">' + out + '</svg>';
}

function bar(n: number, d: number, color: string): string {
  const h = 120; const seg = h / d; let out = '';
  for (let i = 0; i < d; i += 1) {
    out += '<rect x="0" y="' + (i * seg).toFixed(2) + '" width="38" height="' + seg.toFixed(2) + '" fill="' + (i < n ? color : '#fff') + '" stroke="#241c2e" stroke-width="2" />';
  }
  return '<svg viewBox="0 0 38 120" width="38" height="120" role="img">' + out + '</svg>';
}

export function renderVisual(visual: Visual | undefined): string {
  if (!visual) return '';
  if (visual.tipo === 'pizza') return '<div class="visual__label">' + pizza(visual.fatias, visual.comidas) + '</div>';
  if (visual.tipo === 'fracaoComparada') {
    return '<div class="visual__label">' + bar(visual.a.n, visual.a.d, '#6c5ce7') + visual.a.n + '/' + visual.a.d + '</div>'
      + '<div class="visual__label">' + bar(visual.b.n, visual.b.d, '#fdcb6e') + visual.b.n + '/' + visual.b.d + '</div>';
  }
  return '<div class="visual__label">' + formatEuro(visual.precoCentimos) + '<br>- ' + visual.percentagem + ' %</div>';
}
