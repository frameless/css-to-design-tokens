export class ExampleColorSampleFigure extends HTMLElement {
  constructor() {
    super();

    const doc = this.ownerDocument;

    const style = doc.createElement('style');
    style.textContent = `
    :host {
      display: block;
      inline-size:100%;
      max-inline-size: var(--example-color-sample-figure-max-inline-size, 15em);
      --utrecht-color-sample-inline-size: 100%;
      --utrecht-color-sample-block-size: 4em;
    }

    figure {
    padding-block-start: var(--basis-space-block-md);
    padding-block-end: var(--basis-space-block-md);
    padding-inline-start: var(--basis-space-inline-md);
    padding-inline-end: var(--basis-space-inline-md);
    margin: 0;
    border: 1px solid silver;
    border-radius: 0.5em;
    }`;
    const shadow = this.attachShadow({ mode: 'closed' });
    shadow.appendChild(style);

    const figure = doc.createElement('figure');
    const figureSlot = doc.createElement('slot');
    figureSlot.name = 'figure';
    figure.appendChild(figureSlot);
    const colorSample = doc.createElement('utrecht-color-sample');
    colorSample.setAttribute('color', this.getAttribute('value'));
    figure.appendChild(colorSample);
    const figureCaption = figure.appendChild(document.createElement('figcaption'));
    const slot = doc.createElement('slot');
    figureCaption.appendChild(slot);
    shadow.appendChild(figure);
  }
}

customElements.define('example-color-sample-figure', ExampleColorSampleFigure);
