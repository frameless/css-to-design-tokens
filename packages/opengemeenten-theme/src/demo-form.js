import './example-svg-symbol-icon.js';
import { defineCustomElements } from '../node_modules/@opengemeenten/iconset-web-component/dist/esm/loader.js';
defineCustomElements();

class DemoForm extends HTMLElement {
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'closed' });
    this.render();
  }
  render() {
    this._shadow.innerHTML = `<utrecht-root><utrecht-body><utrecht-page-layout>
        <utrecht-page-header>
          <utrecht-paragraph><slot name="page-header"></slot></utrecht-paragraph>
        </utrecht-page-header>
        <utrecht-page-body>
          <example-text-block>
            <search>
              <utrecht-heading level="1">Official Announcements Search title</utrecht-heading>
              <utrecht-form-field-textbox label="Voer hier uw zoekterm in" placeholder="zoekterm"></utrecht-form-field-textbox>
              <utrecht-form-field-textbox label="Datum vanaf (dd-mm-jjjj)" value="33-33-3333" invalid>
                <div slot="description">Dit veld is optioneel.</div>
                <div slot="error-message">33-33-3333 is geen geldige datum</div>
              </utrecht-form-field-textbox>
              <utrecht-form-field-textbox label="Datum tot (dd-mm-jjjj)">
                <div slot="description">Dit veld is optioneel.</div>
              </utrecht-form-field-textbox>
              <utrecht-button-group>
                <utrecht-button appearance="primary-action-button" type="submit">Zoeken</utrecht-button>
              </utrecht-button-group>
              <utrecht-alert type="error">
                <utrecht-heading level="2">Foutmelding</utrecht-heading>
                <utrecht-paragraph>Bekendmakingen konden niet opgehaald worden</utrecht-paragraph>
              </utrecht-alert>
              <utrecht-alert type="info">
                <utrecht-paragraph>Geen bekendmakingen gevonden</utrecht-paragraph>
              </utrecht-alert>
            </search>
          </example-text-block>
        </utrecht-page-body>
        <utrecht-page-footer>
          <slot name="page-footer"></slot>
        </utrecht-page-footer>
      </utrecht-page-layout></utrecht-body></utrecht-root>`;
  }
}

customElements.define('demo-form', DemoForm);
