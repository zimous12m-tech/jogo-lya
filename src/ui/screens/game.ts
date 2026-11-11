import type { Question } from '../../content/schema';
import type { GameHandle } from '../../game/game';
import { pick, t } from '../../services/i18n';
import { play } from '../../services/audio';
import { icon } from '../components/icons';
import { renderVisual } from '../components/visual';
import { qs } from '../dom';

export interface GameResult { correct: number; total: number; errors: number; }

export interface GameDeps {
  questions: readonly Question[];
  training: boolean;
  boss: boolean;
  timed: boolean;
  buttonsOnly: boolean;
  readOnly: boolean;
  mountGame: (arena: HTMLElement) => GameHandle;
  onExit: () => void;
  onFinish: (r: GameResult) => void;
}

const SECONDS = 20;

export function renderGame(root: HTMLElement, deps: GameDeps): void {
  const total = deps.questions.length;
  let index = 0; let correct = 0; let errors = 0; let lives = 3; let answered = false;
  let timer: number | null = null; let remaining = SECONDS;

  root.innerHTML = '<main class="screen"><div class="hud">'
    + '<button class="btn btn--ghost btn--icon" type="button" data-exit aria-label="' + t('game.exit') + '">' + icon('exit', 20) + '</button>'
    + '<span class="hud__progress" data-progress role="status" aria-live="polite"></span>'
    + (deps.boss ? '<span class="chip" data-lives></span>' : '')
    + (deps.boss && deps.timed ? '<span class="hud__timer" data-timer></span>' : '')
    + '</div><div class="card"><p class="question" data-question></p></div>'
    + '<div class="visual" data-visual></div><div class="arena" data-arena aria-label="' + t('game.arena') + '"></div>'
    + '<div class="controls" data-controls>'
    + '<button class="btn btn--ghost btn--icon" type="button" data-left aria-label="' + t('game.left') + '">' + icon('left') + '</button>'
    + '<button class="btn btn--ghost btn--icon" type="button" data-jump aria-label="' + t('game.jump') + '">' + icon('up') + '</button>'
    + '<button class="btn btn--ghost btn--icon" type="button" data-right aria-label="' + t('game.right') + '">' + icon('right') + '</button></div>'
    + '<div class="options" data-options role="group" aria-label="' + t('game.options') + '"></div>'
    + '<div class="feedback" data-feedback hidden aria-live="assertive"><p class="feedback__title" data-title></p>'
    + '<span class="feedback__label">' + t('game.explanation') + '</span><p data-explanation></p>'
    + '<button class="btn btn--primary" type="button" data-next>' + icon('next', 20) + '<span data-next-label></span></button></div></main>';

  const progressEl = qs<HTMLSpanElement>(root, '[data-progress]');
  const questionEl = qs<HTMLParagraphElement>(root, '[data-question]');
  const visualEl = qs<HTMLDivElement>(root, '[data-visual]');
  const optionsEl = qs<HTMLDivElement>(root, '[data-options]');
  const feedbackEl = qs<HTMLDivElement>(root, '[data-feedback]');
  const titleEl = qs<HTMLParagraphElement>(root, '[data-title]');
  const explanationEl = qs<HTMLParagraphElement>(root, '[data-explanation]');
  const nextBtn = qs<HTMLButtonElement>(root, '[data-next]');
  const nextLabel = qs<HTMLSpanElement>(root, '[data-next-label]');
  const arenaEl = qs<HTMLDivElement>(root, '[data-arena]');
  const controlsEl = qs<HTMLDivElement>(root, '[data-controls]');
  const livesEl = root.querySelector<HTMLSpanElement>('[data-lives]');
  const timerEl = root.querySelector<HTMLSpanElement>('[data-timer]');

  if (deps.buttonsOnly) { arenaEl.hidden = true; controlsEl.hidden = true; }
  const game = deps.buttonsOnly ? null : deps.mountGame(arenaEl);

  const paintLives = (): void => { if (livesEl) livesEl.textContent = '#'.repeat(lives); };
  const stop = (): void => { if (timer !== null) window.clearInterval(timer); timer = null; };

  const finishQuestion = (question: Question, choice: number): void => {
    answered = true;
    stop();
    const right = choice === question.resposta;
    if (right) correct += 1; else { errors += 1; if (deps.boss) { lives -= 1; paintLives(); } }
    optionsEl.querySelectorAll<HTMLButtonElement>('.option').forEach((b, i) => {
      b.disabled = true;
      if (i === question.resposta) b.classList.add('is-correct');
      else if (i === choice) b.classList.add('is-wrong');
    });
    if (right) game?.celebrate();
    play(right ? 'correct' : 'wrong');
    feedbackEl.hidden = false;
    feedbackEl.className = 'feedback ' + (right ? 'is-correct' : 'is-wrong');
    titleEl.textContent = right ? t('game.correct') : t('game.wrong');
    explanationEl.textContent = pick(question.explicacao);
    nextLabel.textContent = index === total - 1 || (deps.boss && lives <= 0) ? t('game.finish') : t('game.next');
    nextBtn.focus();
  };

  const handlePick = (choice: number): void => {
    if (answered) return;
    finishQuestion(deps.questions[index], choice);
  };

  const startTimer = (): void => {
    stop();
    if (!deps.boss || !deps.timed || !timerEl) return;
    remaining = SECONDS;
    timerEl.textContent = remaining + 's';
    timer = window.setInterval(() => {
      remaining -= 1;
      timerEl.textContent = remaining + 's';
      if (remaining <= 0) handlePick(-1);
    }, 1000);
  };

  const show = (): void => {
    const question = deps.questions[index];
    answered = false;
    progressEl.textContent = t('game.progress', { current: index + 1, total });
    questionEl.textContent = pick(question.pergunta);
    visualEl.innerHTML = renderVisual(question.visual);
    optionsEl.innerHTML = '';
    feedbackEl.hidden = true;
    question.opcoes.forEach((label, i) => {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'option'; b.textContent = label;
      b.addEventListener('click', () => handlePick(i));
      optionsEl.appendChild(b);
    });
    if (deps.readOnly) { finishQuestion(question, question.resposta); return; }
    game?.startLevel(question.opcoes, handlePick, deps.boss);
    startTimer();
  };

  nextBtn.addEventListener('click', () => {
    if (!answered) return;
    if (index === total - 1 || (deps.boss && lives <= 0)) { deps.onFinish({ correct, total, errors }); return; }
    index += 1;
    show();
  });

  qs<HTMLButtonElement>(root, '[data-exit]').addEventListener('click', () => { stop(); deps.onExit(); });

  if (game) {
    const hold = (sel: string, down: () => void, up: () => void): void => {
      const b = qs<HTMLButtonElement>(root, sel);
      b.addEventListener('pointerdown', (e) => { e.preventDefault(); down(); });
      for (const type of ['pointerup', 'pointercancel', 'pointerleave']) b.addEventListener(type, up);
    };
    hold('[data-left]', () => game.setInput(-1), () => game.setInput(0));
    hold('[data-right]', () => game.setInput(1), () => game.setInput(0));
    qs<HTMLButtonElement>(root, '[data-jump]').addEventListener('pointerdown', (e) => { e.preventDefault(); game.jump(); });
  }

  paintLives();
  show();
}
