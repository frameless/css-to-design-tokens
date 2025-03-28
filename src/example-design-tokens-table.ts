export class ExampleDesignTokensTable extends HTMLElement {
  _tokens: string[] = [];

  set tokens(tokens: string) {
    // Using a ShadowRoot blocks the events of `example-design-token-value`.
    // We could investigate if we can pass those on to make the design token vlaues work.
    this._tokens = tokens.split(/\s+/);
    this.render();
  }
  constructor() {
    super();
    this.tokens = this.getAttribute('tokens') || '';
  }
  render() {
    this.innerHTML = `<table>
      <tbody>
      ${this._tokens.map((token) => `<tr><th><utrecht-code>${token}</utrecht-code></th><td><example-design-token-value name="${token}"></example-design-token-value></td></tr>`).join('')}
      </tbody>
    </table>`;
  }
}

customElements.define('example-design-tokens-table', ExampleDesignTokensTable);
