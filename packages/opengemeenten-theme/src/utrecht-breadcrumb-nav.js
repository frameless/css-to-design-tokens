import css from 'https://unpkg.com/@utrecht/breadcrumb-nav-css@1.4.0/dist/index.mjs';

const stylesheet = new CSSStyleSheet();
stylesheet.replaceSync(css);

class UtrechtBreadcrumbNav extends HTMLElement {
  set links(value) {
    this._links = value;
    this.render();
  }

  get links() {
    return this._links;
  }

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'closed' });
    this._shadow.adoptedStyleSheets.push(stylesheet);
    this._links = [
      {
        href: 'https://example.com',
        label: 'Home',
      },
      {
        href: 'https://example.com/a/',
        label: 'Wonen en leven',
      },
      {
        href: 'https://example.com/a/b/',
        label: 'Afval',
        current: true,
      },
    ];
    this._observer = new MutationObserver(() => this.handleMutation());
    this._observerConfig = this.render();
    this.detectData();
  }

  observeContents() {
    this._observer.observe(this, { attributes: true, childList: true, subtree: true });
  }
  handleMutation() {
    this.detectData();
    this.render();
  }
  detectData() {
    this.links = Array.from(this.querySelectorAll('a')).map((el) => ({
      label: el.textContent,
      href: el.href,
      current: el.ariaCurrent,
    }));
  }

  connectedCallback() {
    this.observeContents();
  }

  disconnectedCallback() {
    this._observer.stop();
  }

  render() {
    const links = this._links;

    //
    this._shadow.innerHTML = `<nav
  class="utrecht-breadcrumb-nav utrecht-breadcrumb-nav--html-ol"
  aria-labelledby="heading"
>
  <h2
    class="utrecht-heading-2 utrecht-breadcrumb-nav__heading"
    id="heading"
    aria-hidden="true"
  >
    Kruimelpad:
  </h2>
  <ol
    class="utrecht-breadcrumb-nav__list utrecht-breadcrumb-nav__list--html-ol"
    itemscope=""
    itemType="https://schema.org/BreadcrumbList"
  >
  ${links
    .map(({ href, label, current }, index) => {
      let str = `
    <li
      class="utrecht-breadcrumb-nav__item"
      itemscope=""
      itemType="https://schema.org/ListItem"
      itemProp="itemListElement"
      value="${index + 1}"
    >
      <a
        onmouseover="console.log(42);event.preventDefault()"
        ${current ? 'role="link"' : ''}
        class="utrecht-link utrecht-link--html-a utrecht-breadcrumb-nav__link utrecht-breadcrumb-nav__link--current utrecht-breadcrumb-nav__link--disabled"
        ${current ? 'aria-disabled="true"' : ''}
        ${current ? 'aria-current="page"' : ''}
        itemProp="item"
        ${current ? '' : `href="${href}"`}
      >
        <span class="utrecht-breadcrumb-nav__text" itemProp="name">
          ${label}
        </span>
        <meta itemProp="position" content="${index}" />
      </a>
    </li>`;

      if (index >= 1 && index < links.length) {
        str =
          `    <li
      hidden=""
      class="utrecht-breadcrumb-nav__separator utrecht-breadcrumb-nav__separator--html-li"
    >
      <utrecht-icon-chevron-right></utrecht-icon-chevron-right>
    </li>` + str;
      }

      return str;
    })
    .join('')}

  </ol>
</nav>`;
  }
}

export const defineCustomElements = () => customElements.define('utrecht-breadcrumb-nav', UtrechtBreadcrumbNav);

export const defineUtrechtBreadcrumbNav = defineCustomElements;
