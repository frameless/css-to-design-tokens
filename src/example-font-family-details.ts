interface Font {
  name: string;
  cssValue?: string;
}
interface Demo {
  callback: () => string;
  name: string;
}

export class ExampleFontFamilyDetails extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'closed' });
    const fonts: Font[] = [
      {
        cssValue: 'var(--example-font-family)',
        name: 'Current font',
      },
      {
        name: 'Atkinson Hyperlegible',
      },
      {
        name: 'Fira Sans',
      },
      {
        name: 'Inclusive Sans',
      },
      {
        name: 'Lexend',
      },
      {
        name: 'Noto Sans',
      },
      {
        name: 'Plus Jakarta Sans',
      },
      {
        name: 'Public Sans',
      },
      {
        name: 'Source Sans 3',
      },
      {
        name: 'Varta',
      },
    ];

    const demos: Demo[] = [
      {
        callback: () => '<example-single-line-of-text>I l 1</example-single-line-of-text>',
        name: 'Vergelijkbare letters',
      },
      {
        callback: () => '<example-single-line-of-text>Illustratie</example-single-line-of-text>',
        name: 'woord met ambigue letters',
      },
      {
        callback: () => '<example-single-line-of-text>I1-Z2-E3-A4-S5-P6-L7-G8-C9-O0</example-single-line-of-text>',
        name: 'Code met ambigue letters',
      },
      {
        callback: () =>
          '<example-single-line-of-text><utrecht-preserve-data>I1-Z2-E3-A4-S5-P6-L7-G8-C9-O0</utrecht-preserve-data></example-single-line-of-text>',
        name: 'Code met ambigue letters (speciale formatting)',
      },

      {
        callback: () =>
          '<example-single-line-of-text>rn / m</example-single-line-of-text><example-single-line-of-text>hn</example-single-line-of-text>',
        name: 'Kerning',
      },
      {
        callback: () => '<example-single-line-of-text>ABCDEFGHIJKLMNOPQRSTUVWXYZ</example-single-line-of-text>',
        name: 'Alfabet uppercase',
      },
      {
        callback: () => '<example-single-line-of-text>abcdefghijklmnopqrstuvwxyz</example-single-line-of-text>',
        name: 'Alfabet lowercase',
      },
      {
        callback: () => '<example-single-line-of-text>0123456789</example-single-line-of-text>',
        name: 'Cijfers',
      },
      {
        callback: () => `<div style="font-variant-numeric: lining-nums tabular-nums;">
                  <example-single-line-of-text><utrecht-number-data>0123456789</utrecht-number-data></example-single-line-of-text>
                  ${['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].map((n) => `<div class="example-single-line-of-text"><utrecht-number-data>${n.repeat(10)}</utrecht-number-data></div>`).join('\n')}
                  <example-single-line-of-text>11111</example-single-line-of-text>
                  <example-single-line-of-text>4444</example-single-line-of-text>
                </div>`,
        name: 'Cijfers met vaste breedte (indien ondersteund)',
      },
    ];

    const renderColumnHeaders = (fonts: Font[]) => fonts.map(({ name }) => `<th>${name}</th>`).join('\n');

    const renderColumns = (fonts: Font[], callback: () => string) =>
      fonts.map(({ cssValue, name }) => `<td style="font-family: ${cssValue || name}">${callback()}</td>`).join('\n');

    shadow.innerHTML = `<details>
        <summary>Bekijk de details van de font</summary>
        <utrecht-paragraph>Lijken de volgende letters niet teveel op elkaar? Hoofdletter "I", kleine letter "l", cijfer "1"</utrecht-paragraph>
        <div class="utrecht-table__container">
        <table class="utrecht-table utrecht-table--html-table">
          <thead>
            <th>test</th>
            ${renderColumnHeaders(fonts)}
          </thead>
          <tbody>
            ${demos
              .map(
                ({ callback, name }) => `<tr>
              <th><example-single-line-of-text>${name}</example-single-line-of-text></th>
              ${renderColumns(fonts, callback)}
            </tr>`,
              )
              .join('\n')}
          </tbody>
        </table>
        </div>
      </details>`;
  }
}

customElements.define('example-font-family-details', ExampleFontFamilyDetails);
