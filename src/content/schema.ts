import { z } from 'zod';

export const TOPICOS = ['numeros','fracoes','decimais','percentagens','inteiros','potencias','proporcionalidade','equacoes','geometria','estatistica','probabilidades','logica'] as const;
export const WORLD_IDS = ['mundo-1','mundo-2','mundo-3','mundo-4','mundo-5','mundo-6'] as const;

export const worldIdSchema = z.enum(WORLD_IDS);

export const localizedTextSchema = z.object({
  'pt-PT': z.string().min(1),
  en: z.string().min(1),
  'pt-BR': z.string().min(1).optional(),
  es: z.string().min(1).optional()
});

const fractionSchema = z.object({ n: z.number().int().min(1), d: z.number().int().min(2) });

export const visualSchema = z.discriminatedUnion('tipo', [
  z.object({ tipo: z.literal('pizza'), fatias: z.number().int().min(2).max(12), comidas: z.number().int().min(1) }),
  z.object({ tipo: z.literal('fracaoComparada'), a: fractionSchema, b: fractionSchema }),
  z.object({ tipo: z.literal('desconto'), precoCentimos: z.number().int().positive(), percentagem: z.number().int().min(1).max(90) })
]);

export const questionSchema = z.object({
  id: z.string().regex(/^[a-z]+-[a-z]+-\d{4}$/),
  worldId: worldIdSchema,
  topico: z.enum(TOPICOS),
  subtipo: z.string().min(1),
  dificuldade: z.union([z.literal(1), z.literal(2), z.literal(3)]),
  curriculo: z.array(z.string().min(1)).min(1),
  pergunta: localizedTextSchema,
  visual: visualSchema.optional(),
  opcoes: z.array(z.string().min(1)).min(2).max(4),
  resposta: z.number().int().min(0),
  explicacao: localizedTextSchema,
  tempoSugerido: z.number().int().min(5).max(180),
  tags: z.array(z.string().min(1)).min(1)
}).superRefine((q, ctx) => {
  if (q.resposta >= q.opcoes.length) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['resposta'], message: 'resposta fora das opcoes' });
  if (new Set(q.opcoes).size !== q.opcoes.length) ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['opcoes'], message: 'opcoes duplicadas' });
});

export const worldSchema = z.object({
  id: worldIdSchema,
  ordem: z.number().int().min(1).max(6),
  nome: localizedTextSchema,
  descricao: localizedTextSchema,
  tema: z.enum(['numeros','fracoes','geometria','percentagens','estatistica','logica']),
  cor: z.string().regex(/^#[0-9a-f]{6}$/),
  corSuave: z.string().regex(/^#[0-9a-f]{6}$/),
  icone: z.string().min(1),
  topicos: z.array(z.enum(TOPICOS)).min(1)
});

export const levelSchema = z.object({
  id: z.string().regex(/^mundo-[1-6]-nivel-[1-6]$/),
  worldId: worldIdSchema,
  titulo: localizedTextSchema,
  boss: z.boolean(),
  tempoSugerido: z.number().int().min(30).max(600),
  questionIds: z.array(z.string()).min(1).max(10)
});

export type Question = z.infer<typeof questionSchema>;
export type Visual = z.infer<typeof visualSchema>;
export type LocalizedText = z.infer<typeof localizedTextSchema>;
export type World = z.infer<typeof worldSchema>;
export type Level = z.infer<typeof levelSchema>;
export type WorldId = z.infer<typeof worldIdSchema>;
