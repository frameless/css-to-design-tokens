export class ExampleTextBlock extends HTMLElement {
  constructor() {
    super();

    const style = this.ownerDocument.createElement('style');
    style.textContent = `
    :host {
      display: block;
      max-inline-size: var(--example-text-block-max-inline-size);
    }`;
    const shadow = this.attachShadow({ mode: 'closed' });
    shadow.appendChild(style);
    const slot = this.ownerDocument.createElement('slot');
    shadow.appendChild(slot);
  }
}

customElements.define('example-text-block', ExampleTextBlock);
