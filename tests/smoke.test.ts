import { describe, expect, it } from 'vitest';
import { questionSchema } from '../src/content/schema';
import { loadAllWorldIds, loadLevelQuestions, loadLevels } from '../src/content/worlds';

const worlds = loadAllWorldIds();

describe('fumo', () => {
  it('6 mundos, 36 niveis', async () => {
    let total = 0;
    for (const world of worlds) total += (await loadLevels(world)).length;
    expect(total).toBe(36);
  });

  it('todas as perguntas validas', async () => {
    for (const world of worlds) {
      for (const level of await loadLevels(world)) {
        const questions = await loadLevelQuestions(world, level.id);
        expect(questions).toHaveLength(level.boss ? 8 : 5);
        for (const q of questions) {
          expect(questionSchema.safeParse(q).success).toBe(true);
          expect(new Set(q.opcoes).size).toBe(4);
          expect(q.resposta).toBeLessThan(q.opcoes.length);
        }
      }
    }
  });
});
