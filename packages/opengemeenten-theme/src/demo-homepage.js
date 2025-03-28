import './example-svg-symbol-icon.js';
import { defineCustomElements } from '../node_modules/@opengemeenten/iconset-web-component/dist/esm/loader.js';
defineCustomElements();

class DemoHomepageElement extends HTMLElement {
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
          <utrecht-top-task-nav>
            <example-top-task-link href="#"><opengemeenten-icon-melding-openbare-ruimte></opengemeenten-icon-melding-openbare-ruimte>Melding doen<div>Iets kapot? Laat het ons weten</div></example-top-task-link>
            <example-top-task-link href="#"><opengemeenten-icon-paspoort></opengemeenten-icon-paspoort>Paspoort aanvragen</example-top-task-link>
            <example-top-task-link href="#"><opengemeenten-icon-idkaart></opengemeenten-icon-idkaart>Identiteitskaart aanvragen</example-top-task-link>
            <example-top-task-link href="#"><opengemeenten-icon-rijbewijs></opengemeenten-icon-rijbewijs>Rijbewijs aanvragen</example-top-task-link>
            <example-top-task-link href="#"><opengemeenten-icon-verhuizen></opengemeenten-icon-verhuizen>
Verhuizing doorgeven</example-top-task-link>
          </utrecht-top-task-nav>
          </example-text-block>
        </utrecht-page-body>
        <utrecht-page-footer>
          <slot name="page-footer"></slot>
        </utrecht-page-footer>
      </utrecht-page-layout></utrecht-body></utrecht-root>`;
  }
}

customElements.define('demo-homepage', DemoHomepageElement);
