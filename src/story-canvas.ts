customElements.define(
  'example-story',
  class ExampleStory extends HTMLElement {
    constructor() {
      super();
      const style = this.ownerDocument.createElement('style');
      style.textContent = `
      .example-story {
        scroll-snap-align: start;
      }`;
      const shadow = this.attachShadow({ mode: 'closed' });
      shadow.appendChild(style);
      const div = this.ownerDocument.createElement('div');
      div.className = 'example-story';
      div.appendChild(this.ownerDocument.createElement('slot'));
      shadow.appendChild(div);
    }
  },
);

customElements.define(
  'example-story-canvas',
  class ExampleStoryCanvas extends HTMLElement {
    constructor() {
      super();
      const style = this.ownerDocument.createElement('style');
      style.textContent = `
      .example-story-canvas {
        background-color: white;
        border-radius: 4px;
        border-width: 1px;
        border-style: solid;
        border-color: rgba(0, 0, 0, 0.1);
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 3px 0px;
        margin-block-end: 40px;
        margin-block-start: 25px;
        padding-block-end: 30px;
        padding-block-start: 30px;
        padding-inline-end: 20px;
        padding-inline-start: 20px;
        position: relative;
      }`;
      const shadow = this.attachShadow({ mode: 'closed' });
      shadow.appendChild(style);
      const div = this.ownerDocument.createElement('div');
      div.className = 'example-story-canvas';
      div.appendChild(this.ownerDocument.createElement('slot'));
      shadow.appendChild(div);
    }
  },
);
