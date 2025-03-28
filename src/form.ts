import { defineCustomElements } from '@utrecht/web-component-library-stencil/loader/index.js';
import './story-canvas.js';
import './basis-theme-stylesheet.js';
import './example-design-token-value.js';
import './example-border-width.js';
import './color-preset-input.js';
import '@utrecht/page-layout-css';
import '@utrecht/body-css';
import '@utrecht/root-css';
import './style.css';
import '@nl-design-system-unstable/basis-design-tokens/dist/theme.css';
import './fluid.css';

defineCustomElements();

const style = document.createElement('style');
const setThemeBuilderCSS = (css: string) => {
  console.log('Update CSS');
  style.textContent = css;
};

setThemeBuilderCSS(localStorage.getItem('theme-builder-css') || '');
document.body.appendChild(style);

addEventListener('storage', (evt) => {
  if (evt.type === 'storage' && evt.key === 'theme-builder-css') {
    setThemeBuilderCSS(evt.newValue || '');
  }
});
