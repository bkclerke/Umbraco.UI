import { expect, fixture, html } from '@open-wc/testing';

import { UUIBoxElement } from './uui-box.element';

describe('UUIBox', () => {
  let element: UUIBoxElement;
  beforeEach(async () => {
    element = await fixture(html` <uui-box>
      <div slot="header">Header</div>
      Main
    </uui-box>`);
  });

  it('is defined', () => {
    expect(element).to.be.instanceOf(UUIBoxElement);
  });

  it('passes the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  describe('properties', () => {
    it('has a headline property', () => {
      expect(element).to.have.property('headline');
    });
  });

  describe('template', () => {
    it('renders a default slot', () => {
      const slot = element.shadowRoot!.querySelector('slot')!;
      expect(slot).to.exist;
    });

    it('renders an headline slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name=headline]')!;
      expect(slot).to.exist;
    });

    it('renders a header slot', () => {
      const slot = element.shadowRoot!.querySelector('slot[name=header]')!;
      expect(slot).to.exist;
    });
  });
});
