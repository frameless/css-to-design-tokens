import { variants } from './design-token-options';
import { ExampleDesignTokenValue } from './example-design-token-value';
import { generateRadixColors } from './generateRadixColors';
import { VariantsMap } from './types';
import { cssVariablesToString, toCssVariables } from './utils';

interface FlatTokens {
  [index: string]: string;
}

declare global {
  interface Window {
    themeBuilder: BasisThemeStylesheet;
  }
}

class BasisThemeStylesheet extends HTMLElement {
  sheet: CSSStyleSheet;
  map: Map<string, FlatTokens>;
  parameters: URLSearchParams;
  variantsMap: VariantsMap;
  _eventHandler: (evt: Event) => void;
  _designTokenValueListeners: Set<ExampleDesignTokenValue>;
  _flatTokensCache: FlatTokens;
  constructor() {
    super();

    const sheet = new CSSStyleSheet();
    this.sheet = sheet;
    this.map = new Map();
    this._flatTokensCache = {};
    sheet.replaceSync('');
    window.themeBuilder = this;
    this.parameters = new URLSearchParams();
    this.variantsMap = new Map(variants.map((group) => [group.id, group]));

    const initialParams = new URL(location.href).searchParams;
    for (const [key, value] of initialParams) {
      if (this.variantsMap.has(key) && this.variantsMap.get(key)?.variants.some(({ id }) => id === value)) {
        this.setGroupOption(key, value);
      }
    }

    const knownTokens = [
      'basis.typography.font-family.default',
      'basis.typography.font-family.heading',
      'basis.typography.font-family.code',
    ];

    knownTokens.forEach((tokenName) => {
      const tokenValue = initialParams.get(tokenName);
      if (tokenValue) {
        this.setToken(tokenName, tokenValue);
      }
    });

    [
      'basis.color.primary',
      'basis.color.secondary',
      'basis.color.text',
      'basis.color.info',
      'basis.color.warning',
      'basis.color.error',
      'basis.color.success',
      'basis.color.highlight',
      'basis.color.mark',
      'basis.color.selected',
    ].forEach((scale) => {
      if (typeof initialParams.get(`${scale}.seed`) === 'string') {
        this.setSeedColor({
          name: `${scale}`,
          inverseName: `${scale}-inverse`,
          value: initialParams.get(`${scale}.seed`) || '',
        });
      }
    });

    this._designTokenValueListeners = new Set();
    this._eventHandler = (evt) => this.handleRequestDesignTokenValue(evt);
  }

  connectedCallback() {
    if (this.sheet) {
      this.ownerDocument.adoptedStyleSheets.push(this.sheet);
    }
    this.ownerDocument.addEventListener('subscribeDesignTokenValue', this._eventHandler, true);
    this.ownerDocument.addEventListener('unsubscribeDesignTokenValue', this._eventHandler, true);
  }

  disconnectedCallback() {
    // TODO: Remove from adoptedStyleSheets
    this.ownerDocument.removeEventListener('subscribeDesignTokenValue', this._eventHandler, true);
    this.ownerDocument.removeEventListener('unsubscribeDesignTokenValue', this._eventHandler, true);
  }

  handleRequestDesignTokenValue(evt: Event) {
    if (evt.type === 'subscribeDesignTokenValue' && evt.target instanceof Element) {
      // Set initial value
      if (evt.target instanceof ExampleDesignTokenValue) {
        this._designTokenValueListeners.add(evt.target);
        const tokenName = evt.target.name;
        if (typeof tokenName === 'string' && this._flatTokensCache.hasOwnProperty(tokenName)) {
          evt.target.value = this._flatTokensCache[tokenName];
        }
      }
    }
    if (evt.type === 'unsubscribeDesignTokenValue' && evt.target instanceof ExampleDesignTokenValue) {
      this._designTokenValueListeners.delete(evt.target);
    }
  }

  update() {
    let properties = Array.from(this.map.values())
      .map((tokens) => cssVariablesToString(toCssVariables(tokens)))
      .join(';\n');

    let css = `.basis-theme {\n${properties}\n}`;
    console.log(css);
    this.sheet?.replaceSync(css);

    try {
      localStorage.setItem('theme-builder-css', css);
    } catch (e) {
      console.error('Failed to store CSS in localStorage.');
    }

    this._flatTokensCache = Array.from(this.map.values()).reduce((map, tokens) => ({ ...map, ...tokens }), {});

    if (!this._designTokenValueListeners) {
      return;
    }
    for (let key in this._flatTokensCache) {
      const value = this._flatTokensCache[key];

      this._designTokenValueListeners.forEach((el) => {
        if (el.name === key) {
          el.value = value;
        }
      });
    }
  }

  toggleTokens(id: string, tokens: FlatTokens) {
    this.map.set(id, tokens);
    this.update();
  }
  setTokens(input: HTMLButtonElement | HTMLInputElement) {
    const tokens = JSON.parse(input.value) as { [index: string]: string };

    this.toggleTokens(input.name, tokens);
  }

  setToken(name: string, value: string) {
    this.toggleTokens(name, { [name]: value });
    this.setParameter(name, value);
  }

  setGroupOption(groupId: string, optionId: string) {
    const group = this.variantsMap.get(groupId);

    if (!group) {
      return;
    }

    const option = group.variants.find(({ id }) => id === optionId) || { flatTokens: {} };

    if (!option) {
      return;
    }

    this.setParameter(groupId, optionId);

    this.toggleTokens(groupId, option.flatTokens);
  }

  setParameter(key: string, value: string) {
    this.parameters.set(key, value);
    history.replaceState({}, document.title, `?${this.parameters}`);
  }

  clickGroupOption(groupId: string, optionId: string) {
    this.setGroupOption(groupId, optionId);

    history.replaceState({}, document.title, `?${this.parameters}`);
  }

  handleColorInput(target: HTMLInputElement, name: string, inverseName: string) {
    const value = target.value;
    if (typeof value !== 'string') {
      return;
    }

    this.setParameter(`${name}.seed`, value);

    this.setSeedColor({
      name,
      inverseName,
      value,
    });
    this.update();
  }

  setSeedColor({ name, value, inverseName }: { name: string; value: string; inverseName?: string }) {
    const radixTheme = generateRadixColors({
      appearance: 'light',
      accent: value,
      gray: '#EEEEEE',
      background: '#FFFFFF',
    });

    const inverseTheme = generateRadixColors({
      appearance: 'dark',
      accent: value,
      gray: '#111111',
      background: '#000000',
    });
    const { accentScale } = radixTheme;
    const { accentScale: inverseAccentScale } = inverseTheme;

    const createScaleObject = (scale: Array<string>, prefix = ''): { [index: string]: string } =>
      scale.reduce((obj, color, index) => {
        let colorNumber = index + 1;
        let scalePrefix = 'color';
        if ([0, 1].includes(index)) {
          scalePrefix = 'bg-';
          colorNumber = index + 1;
        } else if ([2, 3, 4].includes(index)) {
          scalePrefix = 'interactive-';
          colorNumber = index - 1;
        } else if ([5, 6, 7].includes(index)) {
          scalePrefix = 'border-';
          colorNumber = index - 4;
        } else if ([8, 9].includes(index)) {
          scalePrefix = 'fill-';
          colorNumber = index - 7;
        } else if ([10, 11].includes(index)) {
          scalePrefix = 'text-';
          colorNumber = index - 9;
        }
        return {
          ...obj,
          [`${prefix}${scalePrefix}${colorNumber}`]: color,
        };
      }, {});

    const scaleTokens = createScaleObject(accentScale, `${name}.`);
    const inverseScaleTokens = createScaleObject(inverseAccentScale, `${inverseName}.`);

    const tokens = {
      ...scaleTokens,
      ...inverseScaleTokens,
    };

    this.toggleTokens(name, tokens);
  }
}

customElements.define('basis-theme-stylesheet', BasisThemeStylesheet);
