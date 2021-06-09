import { UUIEvent } from '../../event/UUIEvent';
import { UUIBaseListItemElement } from './uui-base-list-item.element';

export class UUIListItemEvent extends UUIEvent<{}, UUIBaseListItemElement> {
  public static readonly OPEN = 'open';
  public static readonly SELECTED = 'selected';
}