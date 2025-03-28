import css from '../node_modules/@utrecht/top-task-link-css/dist/index.mjs';

export class ExampleTopTaskLink extends HTMLElement {
  constructor() {
    super();
    console.log(42);
    const style = this.ownerDocument.createElement('style');
    style.textContent = css + '\n.utrecht-toptask-link { box-sizing: border-box; }';
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.appendChild(style);

    const a = this.ownerDocument.createElement('a');
    a.href = this.getAttribute('href');
    a.rel = this.getAttribute('external') !== null ? 'external noopener noreferrer' : null;
    a.target = this.getAttribute('target') ?? null;
    a.classList.add('utrecht-toptask-link');
    const icon = this.ownerDocument.createElement('span');
    icon.classList.add('utrecht-toptask-link__icon');
    const iconSlot = this.ownerDocument.createElement('slot');
    iconSlot.setAttribute('name', 'icon');
    icon.appendChild(iconSlot);
    a.appendChild(icon);

    const title = this.ownerDocument.createElement('span');
    title.classList.add('utrecht-toptask-link__title');
    const defaultSlot = this.ownerDocument.createElement('slot');
    title.appendChild(defaultSlot);
    a.appendChild(title);
    this.shadowRoot.appendChild(a);
  }
}

customElements.define('example-top-task-link', ExampleTopTaskLink);
