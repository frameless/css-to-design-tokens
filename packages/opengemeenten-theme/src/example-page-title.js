export class ExamplePageTitle extends HTMLElement {
  constructor() {
    super();
    this._originalTitle = '';
    this._currentTitle = '';
    this._connected = false;
    this._observer = new MutationObserver(() => this.handleMutation());
  }

  connectedCallback() {
    this._connected = true;

    // Use MutationObserver to keep the document title in sync with the text content of this element.
    this._observer.observe(this, { childList: true, characterData: true, subtree: true });
    // Create a shadow root, to prevent rendering the contents
    this.attachShadow({ mode: 'closed' });
    this._originalTitle = this.ownerDocument.title;
    this.update();
  }

  disconnectedCallback() {
    this._connected = false;
    // When the "example-page-title" element is removed from the document,
    // restore the original page title.
    // Exception: when the document title has been changed by an external influence.
    if (this.ownerDocument.title === this._currentTitle) {
      this.ownerDocument.title = this._originalTitle;
      this._originalTitle = '';
    }
    this._observer.disconnect();
  }

  update() {
    this._currentTitle = this.textContent;
    this.render({
      lang: this.lang,
      title: this._currentTitle,
    });
  }
  handleMutation() {
    if (this._connected) {
      this.update();
    }
  }

  render({ title, lang }) {
    this.ownerDocument.title = title;
    const titleElement = this.ownerDocument.querySelector('title');
    if (titleElement) {
      titleElement.lang = lang;
    }
  }
}

export const defineExamplePageTitle = () => customElements.define('example-page-title', ExamplePageTitle);

export const defineCustomElements = defineExamplePageTitle;
