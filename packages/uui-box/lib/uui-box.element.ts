import { LitElement, html, css } from 'lit';
import { defineElement } from '@umbraco-ui/uui-base/lib/registration';
import { property, state } from 'lit/decorators.js';
import { UUITextStyles } from '@umbraco-ui/uui-css/lib';

/**
 *  A box for grouping elements
 *  @element uui-box
 *  @slot headline - headline area
 *  @slot header - headline area
 *  @slot default - area for the content of the box
 *
 */
@defineElement('uui-box')
export class UUIBoxElement extends LitElement {
  static styles = [
    UUITextStyles,
    css`
      :host {
        display: block;
        box-shadow: var(--uui-shadow-depth-1);
        border-radius: var(--uui-border-radius);
        background-color: var(--uui-interface-surface);
        --uui-box-default-padding: var(--uui-size-space-5);
      }

      #header {
        display: block;
        border-bottom: 1px solid var(--uui-interface-border);
        padding: var(--uui-size-space-4) var(--uui-size-space-5);
      }

      slot:not([name]) {
        display: block;
        padding: var(--uui-box-default-padding, var(--uui-size-space-5));
      }
    `,
  ];

  /**
   * Headline for this box, can also be set via the 'box' slot.
   * @type string
   * @attr
   * @default null
   */
  @property({ type: String })
  headline: string | null = null;

  @state()
  private _headlineSlotHasContent = false;
  private _headlineSlotChanged = (e: Event) => {
    this._headlineSlotHasContent =
      (e.target as HTMLSlotElement).assignedNodes({ flatten: true }).length > 0;
  };

  @state()
  private _headerSlotHasContent = false;
  private _headerSlotChanged = (e: Event) => {
    this._headerSlotHasContent =
      (e.target as HTMLSlotElement).assignedNodes({ flatten: true }).length > 0;
  };

  /**
   * Renders a header with the header-slot, headline and headline-slot within
   * @returns {TemplateResult}
   * @protected
   * @method
   */
  protected renderHeader() {
    return html`<div
      id="header"
      class="uui-text"
      style=${this._headerSlotHasContent ||
      this._headlineSlotHasContent ||
      this.headline !== null
        ? ''
        : 'display: none'}>
      <h5 id="headline">
        ${this.headline}
        <slot name="headline" @slotchange=${this._headlineSlotChanged}></slot>
      </h5>
      <slot name="header" @slotchange=${this._headerSlotChanged}></slot>
    </div>`;
  }

  render() {
    return html`
      ${this.renderHeader()}
      <slot></slot>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'uui-box': UUIBoxElement;
  }
}
