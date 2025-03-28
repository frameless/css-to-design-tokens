class ExampleBrandDocs extends HTMLElement {
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'closed' });
    this.render();
  }
  render() {
    this._shadow.innerHTML = `<utrecht-root><utrecht-body><utrecht-page-layout>
        <utrecht-page-body>
          <example-text-block>
            <utrecht-heading level="1">Brand</utrecht-heading>
            <utrecht-heading level="2">Corporate colors</utrecht-heading>
            <utrecht-heading level="3">Primary</utrecht-heading>
            <utrecht-button-group>
              <example-color-sample-figure value="var(--og-color-primary-darkest)">Primary color darkest</example-color-sample-figure>
              <example-color-sample-figure value="var(--og-color-primary-dark)">Primary color dark</example-color-sample-figure>
              <example-color-sample-figure value="var(--og-color-primary-default)">Primary color</example-color-sample-figure>
              <example-color-sample-figure value="var(--og-color-primary-light)">Primary color light</example-color-sample-figure>
              <example-color-sample-figure value="var(--og-color-primary-lightest)">Primary color lightest</example-color-sample-figure>
            </utrecht-button-group>
            <utrecht-heading level="3">Secondary</utrecht-heading>
            <utrecht-button-group>
              <example-color-sample-figure value="var(--og-color-secondary-darkest)">Secondary color darkest</example-color-sample-figure>
              <example-color-sample-figure value="var(--og-color-secondary-dark)">Secondary color dark</example-color-sample-figure>
              <example-color-sample-figure value="var(--og-color-secondary-default)">Secondary color</example-color-sample-figure>
              <example-color-sample-figure value="var(--og-color-secondary-light)">Secondary color light</example-color-sample-figure>
              <example-color-sample-figure value="var(--og-color-secondary-lightest)">Secondary color lightest</example-color-sample-figure>
            </utrecht-button-group>
            <utrecht-heading level="3">Support</utrecht-heading>
            <utrecht-button-group>
              <example-color-sample-figure value="var(--og-color-support-darkest)">Support color darkest</example-color-sample-figure>
              <example-color-sample-figure value="var(--og-color-support-dark)">Support color dark</example-color-sample-figure>
              <example-color-sample-figure value="var(--og-color-support-default)">Support color</example-color-sample-figure>
              <example-color-sample-figure value="var(--og-color-support-light)">Support color light</example-color-sample-figure>
              <example-color-sample-figure value="var(--og-color-support-lightest)">Support color lightest</example-color-sample-figure>
            </utrecht-button-group>
            <utrecht-heading level="3">Contrast</utrecht-heading>
            <utrecht-button-group>
              <example-color-sample-figure value="var(--og-color-contrast-darkest)">Contrast color darkest</example-color-sample-figure>
              <example-color-sample-figure value="var(--og-color-contrast-dark)">Contrast color dark</example-color-sample-figure>
              <example-color-sample-figure value="var(--og-color-contrast-default)">Contrast color</example-color-sample-figure>
              <example-color-sample-figure value="var(--og-color-contrast-light)">Contrast color light</example-color-sample-figure>
              <example-color-sample-figure value="var(--og-color-contrast-lightest)">Contrast color lightest</example-color-sample-figure>
            </utrecht-button-group>
            <utrecht-heading level="3">Grey</utrecht-heading>
            <utrecht-button-group>
              <example-color-sample-figure value="var(--og-color-grey-darkest)">Grey color darkest</example-color-sample-figure>
              <example-color-sample-figure value="var(--og-color-grey-dark)">Grey color dark</example-color-sample-figure>
              <example-color-sample-figure value="var(--og-color-grey-default)">Grey color</example-color-sample-figure>
              <example-color-sample-figure value="var(--og-color-grey-light)">Grey color light</example-color-sample-figure>
              <example-color-sample-figure value="var(--og-color-grey-lightest)">Grey color lightest</example-color-sample-figure>
            </utrecht-button-group>
            <utrecht-heading level="2">Background colors</utrecht-heading>
            <utrecht-heading level="3">Primary</utrecht-heading>
            <utrecht-button-group>
              <example-color-sample-figure value="var(--og-color-background-primary-dark)">Primary color dark</example-color-sample-figure>
              <example-color-sample-figure value="var(--og-color-background-primary-default)">Primary color</example-color-sample-figure>
              <example-color-sample-figure value="var(--og-color-background-primary-light)">Primary color light</example-color-sample-figure>
            </utrecht-button-group>
            <utrecht-heading level="3">Secondary</utrecht-heading>
            <utrecht-button-group>
              <example-color-sample-figure value="var(--og-color-background-secondary-dark)">Secondary color dark</example-color-sample-figure>
              <example-color-sample-figure value="var(--og-color-background-secondary-default)">Secondary color</example-color-sample-figure>
              <example-color-sample-figure value="var(--og-color-background-secondary-light)">Secondary color light</example-color-sample-figure>
            </utrecht-button-group>
            <utrecht-heading level="3">Support</utrecht-heading>
            <utrecht-button-group>
              <example-color-sample-figure value="var(--og-color-background-support-dark)">Support color dark</example-color-sample-figure>
              <example-color-sample-figure value="var(--og-color-background-support-default)">Support color</example-color-sample-figure>
              <example-color-sample-figure value="var(--og-color-background-support-light)">Support color light</example-color-sample-figure>
            </utrecht-button-group>
            <utrecht-heading level="3">Grey</utrecht-heading>
            <utrecht-button-group>
              <example-color-sample-figure value="var(--og-color-background-grey-dark)">Grey color dark</example-color-sample-figure>
              <example-color-sample-figure value="var(--og-color-background-grey-default)">Grey color</example-color-sample-figure>
              <example-color-sample-figure value="var(--og-color-background-grey-light)">Grey color light</example-color-sample-figure>
            </utrecht-button-group>
            <utrecht-heading level="2">Status colors</utrecht-heading>
            <utrecht-heading level="3">Red</utrecht-heading>
            <utrecht-button-group>
              <example-color-sample-figure value="var(--og-color-red-dark)">Red color dark</example-color-sample-figure>
              <example-color-sample-figure value="var(--og-color-red-default)">Red color</example-color-sample-figure>
              <example-color-sample-figure value="var(--og-color-red-light)">Red color light</example-color-sample-figure>
            </utrecht-button-group>
            <utrecht-heading level="3">Orange</utrecht-heading>
            <utrecht-button-group>
              <example-color-sample-figure value="var(--og-color-orange-dark)">Orange color dark</example-color-sample-figure>
              <example-color-sample-figure value="var(--og-color-orange-default)">Orange color</example-color-sample-figure>
              <example-color-sample-figure value="var(--og-color-orange-light)">Orange color light</example-color-sample-figure>
            </utrecht-button-group>
            <utrecht-heading level="3">Yellow</utrecht-heading>
            <utrecht-button-group>
              <example-color-sample-figure value="var(--og-color-yellow-dark)">Yellow color dark</example-color-sample-figure>
              <example-color-sample-figure value="var(--og-color-yellow-default)">Yellow color</example-color-sample-figure>
              <example-color-sample-figure value="var(--og-color-yellow-light)">Yellow color light</example-color-sample-figure>
            </utrecht-button-group>
            <utrecht-heading level="3">Blue</utrecht-heading>
            <utrecht-button-group>
              <example-color-sample-figure value="var(--og-color-blue-dark)">Blue color dark</example-color-sample-figure>
              <example-color-sample-figure value="var(--og-color-blue-default)">Blue color</example-color-sample-figure>
              <example-color-sample-figure value="var(--og-color-blue-light)">Blue color light</example-color-sample-figure>
            </utrecht-button-group>
            <utrecht-heading level="3">Green</utrecht-heading>
            <utrecht-button-group>
              <example-color-sample-figure value="var(--og-color-green-dark)">Green color dark</example-color-sample-figure>
              <example-color-sample-figure value="var(--og-color-green-default)">Green color</example-color-sample-figure>
              <example-color-sample-figure value="var(--og-color-green-light)">Green color light</example-color-sample-figure>
            </utrecht-button-group>
            <utrecht-heading level="2">Text colors</utrecht-heading>
            <utrecht-button-group>
              <example-color-sample-figure value="var(--og-color-text)">Text color</example-color-sample-figure>
              <example-color-sample-figure value="var(--og-color-text-placeholder)">Text color placeholder</example-color-sample-figure>
              <example-color-sample-figure value="var(--og-color-text-link)">Link color</example-color-sample-figure>
              <example-color-sample-figure value="var(--og-color-text-link-hover)">Link color hover</example-color-sample-figure>
              <example-color-sample-figure value="var(--og-color-text-link-disabled)">Link color disabled</example-color-sample-figure>
            </utrecht-button-group>
            <utrecht-heading level="2">Other colors</utrecht-heading>
            <utrecht-button-group>
              <example-color-sample-figure value="var(--og-color-interaction)">Interaction</example-color-sample-figure>
            </utrecht-button-group>
            <utrecht-heading level="2">Text</utrecht-heading>
            <utrecht-heading level="3">Headings</utrecht-heading>
            <div role="image" inert>
              <utrecht-heading level="1">Heading 1 text</utrecht-heading-1>
              <utrecht-heading level="1"><utrecht-link href="https://example.com/">Heading 1 text link</utrecht-link></utrecht-heading>
            </div>
            <div role="image" inert>
              <utrecht-heading level="2">Heading 2 text</utrecht-heading>
              <utrecht-heading level="2"><utrecht-link href="https://example.com/">Heading 2 text link</utrecht-link></utrecht-heading>
            </div>
            <div role="image" inert>
              <utrecht-heading level="3">Heading 3 text</utrecht-heading>
              <utrecht-heading level="3"><utrecht-link href="https://example.com/">Heading 3 text link</utrecht-link></utrecht-heading>
            </div>
            <div role="image" inert>
              <utrecht-heading level="4">Heading 4 text</utrecht-heading>
              <utrecht-heading level="4"><utrecht-link href="https://example.com/">Heading 4 text link</utrecht-link></utrecht-heading>
            </div>
            <utrecht-heading level="3">Text</utrecht-heading>
            <div role="image" inert>
              <utrecht-paragraph>Bodytext</utrecht-paragraph>
              <utrecht-paragraph><utrecht-link href="https://example.com/">Bodytext</utrecht-link></utrecht-paragraph>
            </div>
          </example-text-block>
        </utrecht-page-body>
      </utrecht-page-layout></utrecht-body></utrecht-root>`;
  }
}

customElements.define('example-brand-docs', ExampleBrandDocs);
