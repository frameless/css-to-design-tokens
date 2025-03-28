import './example-svg-symbol-icon.js';
import { defineCustomElements } from '../node_modules/@opengemeenten/iconset-web-component/dist/esm/loader.js';
defineCustomElements();

class DemoPageElement extends HTMLElement {
  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: 'closed' });
    this.render();
  }
  render() {
    this._shadow.innerHTML = `
    <utrecht-root><utrecht-body>
        <utrecht-skip-link href="#page-title">Naar hoofdinhoud</utrecht-skip-link>
    <utrecht-skip-link href="#page-header__menu">Naar hoofdnavigatiemenu</utrecht-skip-link>
    <utrecht-skip-link href="#page-footer">Naar footer</utrecht-skip-link>

    <utrecht-page-layout>
        <utrecht-page-header>
          <utrecht-paragraph><slot name="page-header"></slot></utrecht-paragraph>
        </utrecht-page-header>
        <utrecht-page-body>
          <example-text-block>

    <utrecht-spotlight-section appearance="warning">
      <div class="notification__icon" aria-hidden="true">
        <utrecht-icon><svg viewBox="0 0 32 32" class="icon" role="img">
          <use href="/_assets/317130fbcbb12622b6e28e3bfff3cb16/Icons/Notification.svg#warning" fill="currentColor"></use>
        </svg></utrecht-icon>
      </div>
      <div class="notification__text rte-content margin-first-none">
        <example-screenreader-only> Waarschuwing: </example-screenreader-only>

        <utrecht-heading level="2" class="notification__title header">Storing contant betalen in De Binding</utrecht-heading>

        <utrecht-paragraph>
          Het is op dit moment niet mogelijk om contant te betalen in De Binding. U kunt wel pinnen. Onze excuses voor
          het ongemak.
        </utrecht-paragraph>

        <utrecht-button-group>
          <utrecht-link
            href="/calamiteiten/contant-betalen-niet-mogelijk-in-de-binding"
            class="link"
            aria-label="Lees meer over Storing contant betalen in De Binding"
            ><span class="link__label">Meer informatie</span></utrecht-link
          >
        </utrecht-button-group>
      </div>

      <button type="button" class="close-button">
        <span class="screenreader--only"> Sluiten </span>
      </button>
    </utrecht-spotlight-section>
          <div class="column-gap-xl">
            <!-- bron: https://www.zeist.nl/ondernemen/subsidies-of-financiele-steun-ondernemers/steun-voor-ondernemers -->
            <section class="main-column column" id="main" aria-label="hoofdkolom">
              <div class="page-title">
                <utrecht-heading-1 class="page-title__header header" id="page-title"
                  >Steun voor ondernemers</utrecht-heading-1
                >
              </div>

              <div id="c11027" class="ce-textpic flow flow--outside section">
                <div class="flow flow--content">
                  <div class="ce-textpic__container flow flow--maximum-width">
                    <!--TYPO3SEARCH_begin-->

                    <div class="ce-center ce-above">
                      <div class="ce-bodytext rte-content">
                        <utrecht-paragraph lead>
                          Heeft u als ondernemer (tijdelijk) hulp nodig? Dan zijn er wellicht mogelijkheden voor
                          ondersteuning. De mogelijkheden zijn afhankelijk van uw situatie.
                        </utrecht-paragraph>
                        <utrecht-paragraph>Instanties die u kunnen helpen:</utrecht-paragraph>
                        <utrecht-html-content>
                          <ul>
                            <li>
                              Het
                              <utrecht-link href="https://www.mkbdoorgaan.nl/nl" class="link"
                                >MKB Doorgaan<span class="screenreader--only">(Verwijst naar een externe website)</span
                                ><utrecht-icon
                                  ><example-svg-symbol-icon ref="url"></example-svg-symbol-icon></utrecht-icon
                              ></utrecht-link>
                              geeft onafhankelijke en (voor de eerste analyse)kosteloze hulp voor ondernemers met
                              (financiële) problemen of groeiuitdagingen. Dit wordt mogelijk gemaakt door subsidie van
                              de provincie Utrecht.
                            </li>
                            <li>
                              Het
                              <utrecht-link href="https://ondernemersplein.kvk.nl/" class="link"
                                >Ondernemersplein van de landelijke overheid<span class="screenreader--only"
                                  >(Verwijst naar een externe website)</span
                                ><utrecht-icon
                                  ><example-svg-symbol-icon ref="url"></example-svg-symbol-icon></utrecht-icon
                              ></utrecht-link></utrecht-link
                              >&nbsp;geeft u tips en hulp bij subsidieaanvragen.
                            </li>
                            <li>
                              Het
                              <utrecht-link href="https://www.rvo.nl/subsidies-regelingen/innovatiekrediet" class="link"
                                >Innovatiefonds MKB+<span class="screenreader--only"
                                  >(Verwijst naar een externe website)</span
                                ><utrecht-icon
                                  ><example-svg-symbol-icon ref="url"></example-svg-symbol-icon></utrecht-icon
                              ></utrecht-link></utrecht-link>
                              stelt u als ondernemer in staat ideeën om te zetten in rendabele producten of diensten.
                            </li>
                            <li>
                              <utrecht-link href="https://qredits.nl/" class="link"
                                >Qredits<span class="screenreader--only">(Verwijst naar een externe website)</span
                                ><utrecht-icon
                                  ><example-svg-symbol-icon ref="url"></example-svg-symbol-icon></utrecht-icon
                              ></utrecht-link>
                              </utrecht-link>
                              is een microkrediet voor startende en beginnende ondernemers.
                            </li>
                            <li>
                              <utrecht-link href="https://www.mijngroenebedrijf.nu/" class="link"
                                >Mijn Groene Bedrijf<span class="screenreader--only"
                                  >(Verwijst naar een externe website)</span
                                ><utrecht-icon
                                  ><example-svg-symbol-icon ref="url"></example-svg-symbol-icon></utrecht-icon
                              ></utrecht-link></utrecht-link>
                              helpt ondernemers in Zeist om energiebewust te ondernemen.
                            </li>
                          </ul>
                        </utrecht-html-content>
                      </div>
                    </div>

                    <!--TYPO3SEARCH_end-->
                  </div>
                </div>
              </div>

              <div id="c11030" class="ce-follow-up section--enclosed flow flow--outside section">
                <div class="flow flow--content">
                  <div class="ce-follow-up__container flow flow--maximum-width">
                    <!--TYPO3SEARCH_begin-->

                    <utrecht-spotlight-section class="follow-up follow-up__default">
                      <div class="follow-up__content">
                        <utrecht-heading-2 class="follow-up__header header">Hulp nodig?</utrecht-heading-2>

                        <div class="follow-up__text rte-content">
                          <utrecht-paragraph
                            >Heeft u vragen of heeft u hulp nodig? Neem dan contact op met het
                            ondernemersplein.</utrecht-paragraph
                          >
                        </div>
                      </div>

                      <utrecht-button-link
                        href="/ondernemen/contact-ondernemersplein"
                        class="button follow-up__button"
                        title="contact opnemen met het ondernemersplein"
                      >
                        <span class="button__body">
                          <span class="button__label"> Ondernemersplein </span>
                        </span>
                      </utrecht-button-link>
                    </utrecht-spotlight-section>

                    <!--TYPO3SEARCH_end-->
                  </div>
                </div>
              </div>
            </section>
          </div>
          </example-text-block>
        </utrecht-page-body>
        <utrecht-page-footer>
          <slot name="page-footer"></slot>
        </utrecht-page-footer>
      </utrecht-page-layout></utrecht-body></utrecht-root>`;
  }
}

customElements.define('demo-page', DemoPageElement);
