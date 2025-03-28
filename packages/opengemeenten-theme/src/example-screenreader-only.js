export class ExampleScreenreaderOnly extends HTMLElement {
  constructor() {
    super();

    const style = this.ownerDocument.createElement('style');
    style.textContent = `
    /* Source: https://kittygiraudel.com/snippets/sr-only-class/ */
    :host {
        block-size: 1px !important;
        border: 0 !important;
        clip: rect(1px, 1px, 1px, 1px) !important;
        -webkit-clip-path: inset(50%) !important;
        clip-path: inset(50%) !important;
        display: inline;
        inline-size: 1px !important;
        margin: -1px !important;
        overflow: hidden !important;
        padding: 0 !important;
        position: absolute !important;
        white-space: nowrap !important;
    }`;
    const shadow = this.attachShadow({ mode: 'closed' });
    shadow.appendChild(style);
    const slot = this.ownerDocument.createElement('slot');
    shadow.appendChild(slot);
  }
}

customElements.define('example-screenreader-only', ExampleScreenreaderOnly);
