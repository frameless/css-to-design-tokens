const requested = new Set<ExampleColorPresetInput>();

let animationFrame = -1;

const requestRender = (el: ExampleColorPresetInput) => {
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

export class ExampleColorPresetInput extends HTMLElement {
  _name: string;
  _inverse: string;
  _value: string;
  _colors: ColorOption[];
  constructor() {
    super();
    this._name = this.getAttribute('name') || '';
    this._inverse = this.getAttribute('inverse') || '';
    this._value = this.getAttribute('value') || '';
    this._colors = [];
  }

  connectedCallback() {
    this.render();
  }

  set name(value: string) {
    this._name = value;
    requestRender(this);
  }

  set value(value: string) {
    this._value = value;
    requestRender(this);
  }

  set inverse(value: string) {
    this._inverse = value;
    requestRender(this);
  }

  set colors(value: ColorOption[]) {
    this._colors = value;
    requestRender(this);
  }

  renderHTML(name: string, inverseName: string, colors: ColorOption[]) {
    return `<details><summary>Show preset colors</summary><utrecht-button-group>${colors
      .map(
        ({ name: colorName, color }) =>
          `<utrecht-button onclick='themeBuilder.handleColorInput(event.currentTarget, ${JSON.stringify(name)}, ${JSON.stringify(inverseName)})' value="${color}"${color === this._value ? ' pressed="true"' : ''}><utrecht-color-sample color="${color}"></utrecht-color-sample> ${colorName}</utrecht-button>`,
      )
      .join('\n')}</utrecht-button-group></details>`;
  }

  render() {
    this.innerHTML = this.renderHTML(this._name, this._inverse, this._colors);
  }
}

customElements.define('example-color-preset-input', ExampleColorPresetInput);
