'use strict';
let paramRe = /^:(.+)/;

function segmentize(uri) {
  return uri.replace(/(^\/+|\/+$)/g, '').split('/');
}
/**
 * The url matching function. Pass the route definitions and url to the match
 * and the method will return the matched definition or null if there is no
 * fallback scnario found is the definisions.
 *
 * Code is extracted from Reach router path match implementation
 * https://github.com/reach/router/blob/master/src/lib/utils.js
 *
 * @param {Array} routes - Route defenitions
 * @param {string} uri - Url to match
 */
export function match(routes, uri) {
  let match;
  const [uriPathname] = uri.split('?');
  const uriSegments = segmentize(uriPathname);
  const isRootUri = uriSegments[0] === '/';
  for (let i = 0; i < routes.length; i++) {
    const route = routes[i];
    const routeSegments = segmentize(route.path);
    const max = Math.max(uriSegments.length, routeSegments.length);
    let index = 0;
    let missed = false;
    let params = {};
    for (; index < max; index++) {
      const uriSegment = uriSegments[index];
      const routeSegment = routeSegments[index];
      const fallback = routeSegment === '*';

      if (fallback) {
        params['*'] = uriSegments.slice(index).map(decodeURIComponent).join('/');
        break;
      }

      if (uriSegment === undefined) {
        missed = true;
        break;
      }

      let dynamicMatch = paramRe.exec(routeSegment);

      if (dynamicMatch && !isRootUri) {
        let value = decodeURIComponent(uriSegment);
        params[dynamicMatch[1]] = value;
      } else if (routeSegment !== uriSegment) {
        missed = true;
        break;
      }
    }

    if (!missed) {
      match = {
        params,
        ...route,
      };
      break;
    }
  }

  return match || null;
}

const removeChildNodes = (node) => {
  if (node) {
    while (node.lastChild) {
      node.removeChild(node.lastChild);
    }
  }
};
export default class Router extends HTMLElement {
  /**
   * Router looks for a wc-outlet tag for updating the views on history updates.
   * Example:
   *
   * <wc-router>
   *  <wc-outlet>
   *    <!-- All DOM update will be happening here on route change -->
   *  </wc-outlet>
   * </wc-router>
   */
  get outlet() {
    return this.querySelector('wc-outlet');
  }

  get root() {
    return window.location.pathname;
  }

  /**
   * Get all routes from the direct wc-route child element.
   * The document title can be updated by providing an
   * title attribute to the wc-route tag
   */
  get routes() {
    return Array.from(this.querySelectorAll('wc-route'))
      .filter((node) => node.parentNode === this)
      .map((r) => ({
        path: r.getAttribute('path'),
        // Optional: document title
        title: r.getAttribute('page-title'),
        template: r.querySelector('template'),
      }));
  }

  connectedCallback() {
    this.navigate(window.location.pathname);

    window.addEventListener('popstate', this._handlePopstate);
    this.ownerDocument.addEventListener(
      'click',
      (evt) => {
        console.log(evt.target, evt.currentTarget);
        if (evt.target.matches(':any-link')) {
          console.log('x');
          evt.preventDefault();
          this.navigate(evt.target.getAttribute('href'));
        }
      },
      true,
    );
  }

  disconnectedCallback() {
    window.removeEventListener('popstate', this._handlePopstate);
  }

  _handlePopstate = () => {
    this.navigate(window.location.pathname);
  };

  navigate(url) {
    const matchedRoute = match(this.routes, url);
    if (matchedRoute !== null) {
      this.activeRoute = matchedRoute;
      console.log('match', matchedRoute.path);
      window.history.pushState(null, null, url);
      this.update();
    }
  }

  /**
   * Update the DOM under outlet based on the active
   * selected route.
   */
  update() {
    const { template, title, params = {} } = this.activeRoute;

    if (template) {
      removeChildNodes(this.outlet);

      const updateView = () => {
        let view;
        if (template) {
          view = template.content.cloneNode(true);
        }
        console.log('activate view', template, view);

        document.title = title || document.title;
        for (let key in params) {
          /**
           * all dynamic param value will be passed
           * as the attribute to the newly created element
           * except * value.
           */
          if (key !== '*') view.setAttribute(key, params[key]);
        }

        if (view) {
          this.outlet?.appendChild(view);
        }
      };

      updateView();
    }
  }

  go(url) {
    this.navigate(url);
  }

  back() {
    window.history.go(-1);
  }
}

customElements.define('wc-router', Router);
