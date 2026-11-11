import { describe, expect, it } from 'vitest';
import * as h from '../scripts/lib.mjs';
import { carregarTemplates, gerarExercicio } from '../scripts/generate-content.mjs';

describe('gerador', () => {
  it('todas as opcoes sao unicas', async () => {
    h.setSeed(5);
    const templates = await carregarTemplates();
    for (const [prefixo, lista] of templates) {
      for (const template of lista) {
        const item = gerarExercicio(prefixo, template, 2, 1);
        expect(new Set(item.opcoes).size).toBe(4);
        expect(item.opcoes[item.resposta]).toBeDefined();
      }
    }
  });

  it('num-nat nunca gera digito ausente', async () => {
    h.setSeed(7);
    const templates = await carregarTemplates();
    for (let i = 0; i < 30; i += 1) {
      const item = gerarExercicio('num-nat', templates.get('num-nat')[0], 2, 1);
      const numero = item.pergunta['pt-PT'].match(/numero (\d+)/)?.[1] ?? '';
      const digito = item.pergunta['pt-PT'].match(/algarismo (\d)/)?.[1] ?? '';
      expect(numero).toContain(digito);
    }
  });
});
