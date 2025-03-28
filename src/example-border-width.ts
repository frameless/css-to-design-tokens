export class ExampleBorderWidthSample extends HTMLElement {
  constructor() {
    super();
    const style = this.ownerDocument.createElement('style');
    style.textContent = `
    .example-border-width {
      border-color: currentColor;
      border-style: solid;
      border-width: var(--example-border-width);
    }
    .example-border-width--block {
      min-inline-size: 1em;
      border-block-end-width: 0;
      border-inline-start-width: 0;
      border-inline-end-width: 0;
    }

    .example-border-width--inline {
      min-block-size: 1em;
      border-block-start-width: 0;
      border-block-end-width: 0;
      border-inline-end-width: 0;
    }`;
    const shadow = this.attachShadow({ mode: 'closed' });
    shadow.appendChild(style);
    const div = this.ownerDocument.createElement('div');
    div.classList.add('example-border-width');
    const orientation = this.getAttribute('orientation');
    div.classList.toggle('example-border-width--block', orientation === 'block');
    div.classList.toggle('example-border-width--inline', orientation === 'inline');
    div.appendChild(this.ownerDocument.createElement('slot'));
    shadow.appendChild(div);
  }
}

customElements.define('example-border-width-sample', ExampleBorderWidthSample);
