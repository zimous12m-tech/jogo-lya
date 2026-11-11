export type CosmeticType = 'hat' | 'colour';

export interface Cosmetic { id: string; tipo: CosmeticType; nome: { 'pt-PT': string; en: string }; preco: number; valor: string; }

export const COSMETICS: readonly Cosmetic[] = [
  { id: 'chapeu-nenhum', tipo: 'hat', nome: { 'pt-PT': 'Sem chapeu', en: 'No hat' }, preco: 0, valor: 'none' },
  { id: 'chapeu-gorro', tipo: 'hat', nome: { 'pt-PT': 'Gorro', en: 'Beanie' }, preco: 60, valor: 'beanie' },
  { id: 'chapeu-cartola', tipo: 'hat', nome: { 'pt-PT': 'Cartola', en: 'Top hat' }, preco: 80, valor: 'tophat' },
  { id: 'chapeu-coroa', tipo: 'hat', nome: { 'pt-PT': 'Coroa', en: 'Crown' }, preco: 150, valor: 'crown' },
  { id: 'chapeu-bruxa', tipo: 'hat', nome: { 'pt-PT': 'Chapeu de bruxa', en: 'Witch hat' }, preco: 180, valor: 'witch' },
  { id: 'chapeu-halo', tipo: 'hat', nome: { 'pt-PT': 'Aureola', en: 'Halo' }, preco: 220, valor: 'halo' },
  { id: 'cor-baia', tipo: 'colour', nome: { 'pt-PT': 'Baia', en: 'Bay' }, preco: 0, valor: '#8e7cf0' },
  { id: 'cor-menta', tipo: 'colour', nome: { 'pt-PT': 'Menta', en: 'Mint' }, preco: 50, valor: '#3dd6a0' },
  { id: 'cor-coral', tipo: 'colour', nome: { 'pt-PT': 'Coral', en: 'Coral' }, preco: 50, valor: '#ff7a6e' },
  { id: 'cor-ambar', tipo: 'colour', nome: { 'pt-PT': 'Ambar', en: 'Amber' }, preco: 70, valor: '#ffb44d' },
  { id: 'cor-cobalto', tipo: 'colour', nome: { 'pt-PT': 'Cobalto', en: 'Cobalt' }, preco: 70, valor: '#4d7dff' },
  { id: 'cor-rosa', tipo: 'colour', nome: { 'pt-PT': 'Rosa', en: 'Pink' }, preco: 90, valor: '#ff8ac4' },
  { id: 'cor-neve', tipo: 'colour', nome: { 'pt-PT': 'Neve', en: 'Snow' }, preco: 120, valor: '#f2f2f7' },
  { id: 'cor-noite', tipo: 'colour', nome: { 'pt-PT': 'Noite', en: 'Night' }, preco: 140, valor: '#3a2f5c' }
];

export const byId = (id: string): Cosmetic | undefined => COSMETICS.find((item) => item.id === id);
export const itemsOf = (tipo: CosmeticType): readonly Cosmetic[] => COSMETICS.filter((item) => item.tipo === tipo);
export const colourValue = (id: string | undefined): string => byId(id ?? '')?.valor ?? '#8e7cf0';
