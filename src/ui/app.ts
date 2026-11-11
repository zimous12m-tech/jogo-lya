import type { Level, Question, World, WorldId } from '../content/schema';
import { loadLevelQuestions, loadLevels, loadWorldManifest, loadWorlds } from '../content/worlds';
import { createGame } from '../game/game';
import { applyA11y } from '../services/a11y';
import { evaluate } from '../services/achievements';
import { configure, play } from '../services/audio';
import { buildDaily, isDailyAvailable, markDailyDone } from '../services/daily';
import { computeStars, featherReward, isLevelUnlocked } from '../services/progress';
import { addCoins, load, recordLevelResult, saveSettings, update } from '../services/save';
import { registerPlay } from '../services/streak';
import { setTelemetryConsent, track } from '../services/telemetry';
import { renderComplete } from './screens/complete';
import { renderCredits } from './screens/credits';
import { renderGame } from './screens/game';
import { renderLevelSelect } from './screens/levelSelect';
import { renderParentZone } from './screens/parentZone';
import { renderShop } from './screens/shop';
import { renderWorldMap } from './screens/worldMap';
import { openProfile } from './screens/profile';
import { openSettings } from './screens/settingsSheet';

export function startApp(root: HTMLElement): void {
  let game: ReturnType<typeof createGame> | null = null;

  const dispose = (): void => { game?.destroy(); game = null; };

  const sync = (): void => {
    const s = load().settings;
    applyA11y(s);
    configure(s.soundEnabled, s.musicEnabled);
    setTelemetryConsent(s.analyticsConsent);
  };

  const checkAchievements = (): void => {
    const snap = load();
    const novos = evaluate(snap, {
      totalStars: Object.values(snap.stars).reduce((a, b) => a + b, 0),
      levelsDone: Object.values(snap.stars).filter((v) => v >= 1).length,
      perfectLevels: Object.values(snap.stars).filter((v) => v === 3).length,
      bossWins: snap.bossesWon.length,
      coins: snap.coins
    });
    if (novos.length) {
      update((d) => { d.achievements.push(...novos); });
      play('star');
    }
  };

  const toMap = (): void => {
    dispose();
    void loadWorlds().then(async (worlds) => {
      const byWorld: Record<string, readonly Level[]> = {};
      const all = await Promise.all(worlds.map((w) => loadLevels(w.id)));
      worlds.forEach((w, i) => { byWorld[w.id] = all[i] ?? []; });
      sync();
      renderWorldMap(root, {
        worlds, byWorld, save: load(), dailyAvailable: isDailyAvailable(),
        onWorld: (id) => void toLevels(id),
        onProfile: () => openProfile(load()),
        onShop: () => renderShop(root, toMap),
        onDaily: () => void toDaily(),
        onParents: () => renderParentZone(root, toMap),
        onCredits: () => renderCredits(root, toMap),
        onSettings: () => openSettings(load().settings, (c) => { saveSettings(c); sync(); toMap(); })
      });
    });
  };

  const toLevels = async (worldId: WorldId): Promise<void> => {
    dispose();
    const [world, levels] = await Promise.all([loadWorldManifest(worldId), loadLevels(worldId)]);
    renderLevelSelect(root, {
      world, levels, save: load(), onBack: toMap,
      onPlay: (levelId, training) => void toGame(world, levels, levelId, training)
    });
  };

  const run = async (
    questions: readonly Question[], training: boolean, boss: boolean,
    onExit: () => void, onDone: (correct: number, errors: number) => void
  ): Promise<void> => {
    const s = load().settings;
    dispose();
    renderGame(root, {
      questions, training, boss, timed: s.timedMode,
      buttonsOnly: s.buttonsOnly || s.readOnlyMode, readOnly: s.readOnlyMode,
      mountGame: (arena) => { const h = createGame(arena); game = h; return h; },
      onExit,
      onFinish: (r) => onDone(r.correct, r.errors)
    });
  };

  const toGame = async (world: World, levels: readonly Level[], levelId: string, training: boolean): Promise<void> => {
    if (!isLevelUnlocked(load(), levels, levelId)) return;
    const level = levels.find((l) => l.id === levelId);
    if (!level) return;
    registerPlay();
    track({ name: 'level_start', levelId });
    const questions = await loadLevelQuestions(world.id, levelId);
    const pos = levels.findIndex((l) => l.id === levelId);
    const next = levels[pos + 1];

    await run(questions, training, level.boss, () => void toLevels(world.id), (correct, errors) => {
      const stars = computeStars(errors);
      let feathers = 0;
      if (!training) {
        recordLevelResult(levelId, stars);
        if (level.boss && errors < 3) {
          update((d) => { if (!d.bossesWon.includes(levelId)) d.bossesWon.push(levelId); });
        }
        feathers = featherReward(correct, stars);
        addCoins(feathers);
        checkAchievements();
        track({ name: 'level_complete', levelId, correct, total: questions.length });
      }
      dispose();
      renderComplete(root, {
        stars, feathers, correct, total: questions.length, training, hasNext: Boolean(next),
        onRepeat: () => void toGame(world, levels, levelId, training),
        onNext: () => { if (next) void toGame(world, levels, next.id, false); },
        onMap: () => void toLevels(world.id)
      });
    });
  };

  const toDaily = async (): Promise<void> => {
    if (!isDailyAvailable()) return;
    const ids = await loadWorlds().then((w) => w.map((x) => x.id));
    const questions = await buildDaily(ids);
    if (!questions.length) return;
    await run(questions, false, false, toMap, (correct) => {
      markDailyDone();
      const feathers = correct;
      addCoins(feathers);
      checkAchievements();
      dispose();
      renderComplete(root, {
        stars: computeStars(questions.length - correct), feathers, correct, total: questions.length,
        training: false, hasNext: false,
        onRepeat: () => void toDaily(), onNext: toMap, onMap: toMap
      });
    });
  };

  sync();
  track({ name: 'app_open' });
  toMap();
}
