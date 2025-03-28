export class ExampleSvgSymbolIcon extends HTMLElement {
  constructor() {
    super();

    const style = this.ownerDocument.createElement('style');
    style.textContent = ``;
    this._shadow = this.attachShadow({ mode: 'closed' });
    this._shadow.appendChild(style);
    const slot = this.ownerDocument.createElement('slot');
    this._shadow.appendChild(slot);
    const ref = this.getAttribute('ref');

    // It is not possible to reference an SVG icon collection from inside the Shadow DOM,
    // when the iconmap is defined in the light DOM using such a construct:
    //
    //     <svg><symbol id="icon-name">...</symbol</svg>
    //
    // The Shadow DOM has its own ID registry, and so `<use ref="#icon-name">` only works for
    // SVG symbols defined in the Shadow DOM.
    const x = this.ownerDocument.getElementById(ref);

    const isSvgSymbol = (arg) => arg instanceof SVGSymbolElement;
    if (isSvgSymbol(x)) {
      const svg = x.closest('svg');
      this._shadow.innerHTML = `<svg viewBox="0 0 32 32" class="icon icon--after" role="img" aria-hidden="true"><use href="#${ref}" fill="CurrentColor"></use></svg>`;
      // Make the icons available in the Shadow DOM
      this._shadow.appendChild(svg.cloneNode(true));
    }
  }
}

customElements.define('example-svg-symbol-icon', ExampleSvgSymbolIcon);
