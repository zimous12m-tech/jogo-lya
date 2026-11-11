import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import { levelSchema, questionSchema } from '../src/content/schema';

const ROOT = 'src/content/mundos';

export function runValidation(): string[] {
  const problems: string[] = [];
  const worlds = readdirSync(ROOT).filter((n) => n.startsWith('mundo-'));
  if (worlds.length !== 6) problems.push('esperava 6 mundos, encontrei ' + worlds.length);

  for (const world of worlds) {
    const dir = join(ROOT, world);
    const files = readdirSync(dir).filter((n) => n.startsWith('nivel-'));
    const regulares = files.filter((n) => n !== 'nivel-6.json');
    if (regulares.length !== 5) problems.push(world + ': esperava 5 niveis');
    if (!files.includes('nivel-6.json')) problems.push(world + ': falta o boss');

    let index: string[] = [];
    try {
      index = JSON.parse(readFileSync(join(dir, 'index.json'), 'utf8')) as string[];
    } catch {
      problems.push(world + ': index.json ilegivel');
      continue;
    }
    const indexSet = new Set(index);

    for (const file of files) {
      const parsed = levelSchema.safeParse(JSON.parse(readFileSync(join(dir, file), 'utf8')));
      if (!parsed.success) { problems.push(world + '/' + file + ': schema invalido'); continue; }
      const level = parsed.data;
      const esperado = level.boss ? 8 : 5;
      if (level.questionIds.length !== esperado) problems.push(world + '/' + file + ': esperava ' + esperado);
      if (new Set(level.questionIds).size !== level.questionIds.length) problems.push(world + '/' + file + ': repetidos');
      for (const id of level.questionIds) {
        if (!indexSet.has(id)) problems.push(world + '/' + file + ': ' + id + ' fora do index');
        try {
          const q = questionSchema.safeParse(JSON.parse(readFileSync(join(dir, 'questoes', id + '.json'), 'utf8')));
          if (!q.success) problems.push(world + '/' + file + ': ' + id + ' invalida');
        } catch {
          problems.push(world + '/' + file + ': ' + id + ' nao existe');
        }
      }
    }
  }
  return problems;
}

if (process.argv[1]?.includes('validate-content')) {
  const problems = runValidation();
  if (problems.length) {
    console.error('Falhou com ' + problems.length + ' problema(s):');
    for (const p of problems) console.error(' - ' + p);
    process.exit(1);
  }
  console.log('validate:content OK');
}
