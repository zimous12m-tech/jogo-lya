import './styles/tokens.css';
import './styles/base.css';
import './styles/ui.css';
import { registerSW } from 'virtual:pwa-register';
import { applyA11y } from './services/a11y';
import { initI18n, isLocale } from './services/i18n';
import { load } from './services/save';
import { startApp } from './ui/app';

registerSW({ immediate: true });

const root = document.querySelector<HTMLDivElement>('#app');
if (!root) throw new Error('Sem #app');

const save = load();
applyA11y(save.settings);
const browser = navigator.language;
const locale = isLocale(browser) ? browser : save.settings.locale;

void initI18n(locale).then(() => {
  document.documentElement.lang = locale;
  startApp(root);
});
