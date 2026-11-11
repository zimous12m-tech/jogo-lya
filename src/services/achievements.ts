import type { SaveData } from './save';

export interface Extra { totalStars: number; levelsDone: number; perfectLevels: number; bossWins: number; coins: number; }

export interface Achievement {
  id: string;
  titulo: { 'pt-PT': string; en: string };
  condicao: string;
  check: (save: SaveData, extra: Extra) => boolean;
}

const done = (s: SaveData) => Object.values(s.stars).filter((v) => v >= 1).length;
const perfect = (s: SaveData) => Object.values(s.stars).filter((v) => v === 3).length;
const stars = (s: SaveData) => Object.values(s.stars).reduce((a, b) => a + b, 0);
const worldDone = (s: SaveData, w: number) => [1,2,3,4,5,6].every((n) => (s.stars['mundo-' + w + '-nivel-' + n] ?? 0) >= 1);

const mk = (id: string, pt: string, en: string, condicao: string, check: Achievement['check']): Achievement =>
  ({ id, titulo: { 'pt-PT': pt, en }, condicao, check });

export const ACHIEVEMENTS: readonly Achievement[] = [
  mk('a01','Primeiro passo','First step','Conclui 1 nivel',(s)=>done(s)>=1),
  mk('a02','Cinco niveis','Five levels','Conclui 5 niveis',(s)=>done(s)>=5),
  mk('a03','Dez niveis','Ten levels','Conclui 10 niveis',(s)=>done(s)>=10),
  mk('a04','Vinte niveis','Twenty levels','Conclui 20 niveis',(s)=>done(s)>=20),
  mk('a05','Trinta niveis','Thirty levels','Conclui 30 niveis',(s)=>done(s)>=30),
  mk('a06','Perfeicao','Perfection','Conclui 1 nivel com 3 estrelas',(s)=>perfect(s)>=1),
  mk('a07','Cinco perfeitos','Five perfect','Conclui 5 niveis perfeitos',(s)=>perfect(s)>=5),
  mk('a08','Dez perfeitos','Ten perfect','Conclui 10 niveis perfeitos',(s)=>perfect(s)>=10),
  mk('a09','Vinte perfeitos','Twenty perfect','Conclui 20 niveis perfeitos',(s)=>perfect(s)>=20),
  mk('a10','Estrela maior','Big star','Junta 30 estrelas',(s)=>stars(s)>=30),
  mk('a11','Constelacao','Constellation','Junta 60 estrelas',(s)=>stars(s)>=60),
  mk('a12','Ceu inteiro','Whole sky','Junta 100 estrelas',(s)=>stars(s)>=100),
  mk('a13','Penas a voar','Feathers','Junta 100 penas',(s)=>s.coins>=100),
  mk('a14','Saco cheio','Full bag','Junta 300 penas',(s)=>s.coins>=300),
  mk('a15','Tesouro','Treasure','Junta 600 penas',(s)=>s.coins>=600),
  mk('a16','Boss derrubado','Boss down','Vence 1 boss',(_s,e)=>e.bossWins>=1),
  mk('a17','Cacador','Hunter','Vence 3 bosses',(_s,e)=>e.bossWins>=3),
  mk('a18','Lenda','Legend','Vence os 6 bosses',(_s,e)=>e.bossWins>=6),
  mk('a19','Tres dias','Three days','Streak de 3 dias',(s)=>s.streak>=3),
  mk('a20','Semana cheia','Full week','Streak de 7 dias',(s)=>s.streak>=7),
  mk('a21','Mes a serio','Month','Streak de 30 dias',(s)=>s.streak>=30),
  mk('a22','Curioso','Curious','Abre o perfil',()=>true),
  mk('a23','Vaidoso','Vain','Equipa um chapeu',(s)=>Boolean(s.cosmetics.equipped.hat)),
  mk('a24','Colecionador','Collector','Compra 5 cosmeticos',(s)=>s.cosmetics.owned.length>=5),
  mk('a25','Guarda-roupa','Wardrobe','Compra 15 cosmeticos',(s)=>s.cosmetics.owned.length>=15),
  mk('a26','Vale completo','Valley','Completa o Mundo 1',(s)=>worldDone(s,1)),
  mk('a27','Cozinha limpa','Kitchen','Completa o Mundo 2',(s)=>worldDone(s,2)),
  mk('a28','Oficina arrumada','Workshop','Completa o Mundo 3',(s)=>worldDone(s,3)),
  mk('a29','Mercado fechado','Market','Completa o Mundo 4',(s)=>worldDone(s,4)),
  mk('a30','Observatorio lido','Observatory','Completa o Mundo 5',(s)=>worldDone(s,5)),
  mk('a31','Enigma resolvido','Enigma','Completa o Mundo 6',(s)=>worldDone(s,6)),
  mk('a32','Coruja completa','Owl complete','Junta 150 estrelas',(s)=>stars(s)>=150)
];

export function evaluate(save: SaveData, extra: Extra): string[] {
  return ACHIEVEMENTS
    .filter((a) => !save.achievements.includes(a.id) && a.check(save, extra))
    .map((a) => a.id);
}
