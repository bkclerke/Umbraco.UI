import { css, html } from 'lit';
import { property } from 'lit/decorators';
import { UUICardElement } from '../uui-card/uui-card.element';

/**
 *  @element uui-node-card
 *  @fires {UUICardEvent} click-title - fires when the media card title is clicked
 *  @description - Card component for displaying a node.
 */

export class UUIMediaCardElement extends UUICardElement {
  static styles = [
    ...UUICardElement.styles,
    css`
      img {
        align-self: center;
        border-radius: var(--uui-size-border-radius, 3px);
        object-fit: cover;
        width: 100%;
        height: 100%;
      }

      #file-symbol,
      #folder-symbol {
        align-self: center;
        margin: var(--uui-size-xlarge);
        width: 80%;
      }

      slot[name='icon']::slotted(*) {
        font-size: 1.2em;
      }

      #open-part {
        position: absolute;
        bottom: 0;
        width: 100%;
        background-color: var(--uui-color-white, #ffff);
        color: var(--uui-color-black, #0000);
        border-top: 1px solid rgba(0, 0, 0, 0.04);
        border-radius: 0 0 var(--uui-size-border-radius, 3px)
          var(--uui-size-border-radius, 3px);
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: var(--uui-size-small, 12px);
        box-sizing: border-box;
        padding: var(--uui-size-base-unit, 6px) var(--uui-size-small, 12px);
      }

      #open-part:hover {
        text-decoration: underline;
        color: var(--uui-interface-contrast-hover);
      }

      :host([image]:not([image=''])) #open-part {
        transition: opacity 120ms;
        transition-delay: 1s;
        opacity: 0;
      }

      :host([image]:not([image='']):hover, [image]:not([image='']):focus, [image]:not([image='']):focus-within, [selected][image]:not([image='']), [error][image]:not([image='']))
        #open-part {
        opacity: 1;
        transition-delay: 0s;
      }

      #info-icon {
        margin-right: var(--uui-size-base-unit, 6px);
        display: flex;
        height: var(--uui-size-medium, 24px);
      }
    `,
  ];

  @property({ type: String })
  name = '';

  @property({ type: String, attribute: 'file-ext' })
  fileExt = '';

  @property({ type: String })
  image = '';

  public render() {
    return html` ${this.fileExt === '' && this.image === ''
        ? html`<uui-folder-symbol id="folder-symbol"></uui-folder-symbol>`
        : ''}
      ${this.fileExt !== '' && this.image === ''
        ? html`<uui-file-symbol id="file-symbol" type="txt"></uui-file-symbol>`
        : ''}
      ${this.image !== '' ? html`<img src=${this.image} />` : ''}
      <div
        id="open-part"
        tabindex="0"
        @click=${this.handleOpenClick}
        @keydown=${this.handleOpenKeydown}
      >
        <uui-icon
          id="info-icon"
          name="info"
          style="color: currentColor"
        ></uui-icon
        ><span> ${this.name} </span>
      </div>
      <!-- Select border must be right after .open-part -->
      <div id="select-border"></div>`;
  }
}
