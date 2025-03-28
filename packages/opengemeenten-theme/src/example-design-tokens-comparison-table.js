import get from 'https://unpkg.com/lodash-es@4.17.21/get.js';

const hasCssVariable = (str) => /var\(/i.test(str);

const createDataList = (items) => {
  const dl = document.createElement('dl');
  items.forEach((item) => {
    const div = document.createElement('div');
    const dt = document.createElement('dt');

    const dd = document.createElement('dd');
    if (item.name instanceof Node) {
      dt.appendChild(item.name);
    } else if (typeof item.name === 'string') {
      dt.textContent = item.name;
    }
    if (item.value instanceof Node) {
      dd.appendChild(item.value);
    } else if (typeof item.value === 'string') {
      dd.textContent = item.value;
    }
    div.appendChild(dt);
    div.appendChild(dd);
    dl.appendChild(div);
  });
  return dl;
};

class ExampleDesignTokensComparisonTable extends HTMLElement {
  set tokens(value) {
    this._tokens = value;
    this.render();
  }

  get tokens() {
    return this._tokens;
  }

  set themes(value) {
    this._themes = value;
    this.render();
  }

  get themes() {
    return this._themes;
  }

  constructor() {
    super();
    this._tokens = [];
    this._themes = [];
  }

  render() {
    const themes = this._themes;
    const tokens = this._tokens;

    // Remove contents
    while (this.lastChild) {
      this.removeChild(this.lastChild);
    }

    const table = document.createElement('table');
    this.appendChild(table);
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    table.appendChild(thead);
    table.appendChild(tbody);

    const theadRow = document.createElement('tr');
    thead.appendChild(theadRow);
    const cell = document.createElement('th');
    theadRow.appendChild(cell);

    themes.forEach(({ prefix, tokensFile }) => {
      const cell = document.createElement('th');
      cell.textContent = prefix;
      theadRow.appendChild(cell);
    });
    const cell2 = document.createElement('th');
    cell2.textContent = 'Variety count';
    theadRow.appendChild(cell2);

    tokens
      .sort((a, b) => a.name - b.name)
      .forEach(({ name, property, selector }) => {
        const row = document.createElement('tr');
        const heading = document.createElement('th');
        const details = document.createElement('details');
        const summary = document.createElement('summary');
        const code = document.createElement('utrecht-code');
        code.style.whiteSpace = 'pre';
        code.textContent = name;
        summary.appendChild(code);

        const selectorEl = document.createElement('utrecht-code');
        selectorEl.style.whiteSpace = 'pre';
        selectorEl.textContent = selector;

        const propertyEl = document.createElement('utrecht-code');
        propertyEl.style.whiteSpace = 'pre';
        propertyEl.textContent = property;

        details.appendChild(
          createDataList([
            { name: 'selector', value: selectorEl },
            { name: 'property', value: propertyEl },
          ]),
        );
        details.appendChild(summary);
        heading.appendChild(details);
        row.appendChild(heading);

        const values = themes.map(({ prefix, tokensFile, tokens }) => {
          const token = get(tokens, name);
          return token ? token['$value'] : undefined;
        });

        // We want to see "0 values" for undefined tokens.
        // Therefore exclude empty values from the `Set`.
        const valueSet = new Set(values.filter(Boolean));

        values.forEach((value) => {
          const cell = document.createElement('td');
          const token = get(tokens, name);
          cell.textContent = value || '';
          row.appendChild(cell);

          if (hasCssVariable(value)) {
            row.classList.add('warning');
            cell.classList.add('warning');
          }
        });

        const cell = document.createElement('td');
        cell.textContent = valueSet.size;
        row.appendChild(cell);

        if (valueSet.size === 0) {
          row.classList.add('warning');
          cell.classList.add('warning');
        }

        tbody.appendChild(row);
      });

    const p = document.createElement('p');
    p.textContent = `${tokens.length} mappings of CSS to design tokens`;
    this.appendChild(p);
  }
}

export const defineCustomElements = () =>
  customElements.define('example-design-tokens-comparison-table', ExampleDesignTokensComparisonTable);
