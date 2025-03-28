export class ExampleSingleLineOfText extends HTMLElement {
  constructor() {
    super();
    const style = this.ownerDocument.createElement('style');
    style.textContent = `
    :host {
      display: block;
      white-space: pre;
    }`;
    const shadow = this.attachShadow({ mode: 'closed' });
    shadow.appendChild(style);
    const slot = this.ownerDocument.createElement('slot');
    shadow.appendChild(slot);
  }
}

customElements.define('example-single-line-of-text', ExampleSingleLineOfText);
