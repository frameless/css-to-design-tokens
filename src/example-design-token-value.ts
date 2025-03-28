const requested = new Set<ExampleDesignTokenValue>();

let animationFrame = -1;

const requestRender = (el: ExampleDesignTokenValue) => {
  if (animationFrame === -1) {
    requested.add(el);
    requestAnimationFrame(renderThings);
  }
};

const renderThings = () => {
  animationFrame = -1;
  for (let item of requested) {
    requested.delete(item);
    item.render();
  }
};

export interface ColorOption {
  name: string;
  color: string;
}

export class ExampleDesignTokenValue extends HTMLElement {
  _name: string;
  _value: string;

  get name() {
    return this._name;
  }

  constructor() {
    super();
    this._name = this.getAttribute('name') || '';
    this._value = this.getAttribute('value') || 'TODO';
  }

  connectedCallback() {
    const evt = new CustomEvent('subscribeDesignTokenValue', { detail: { name: this._name } });
    this.dispatchEvent(evt);
    this.render();
  }
  disconnectedCallback() {
    const evt = new CustomEvent('unsubscribeDesignTokenValue', { detail: { name: this._name } });
    this.dispatchEvent(evt);
  }

  set value(value: string) {
    this._value = value;
    requestRender(this);
  }

  render() {
    this.innerHTML = `<utrecht-code>${this._value}</utrecht-code>`;
  }
}

customElements.define('example-design-token-value', ExampleDesignTokenValue);
