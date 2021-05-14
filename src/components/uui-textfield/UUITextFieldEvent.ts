import { UUIEvent } from '../../../event/UUIEvent';
import { UUITextFieldElement } from './uui-textfield.element';

export class UUITextFieldEvent extends UUIEvent<{}, UUITextFieldElement> {
  public static readonly INPUT: string = 'input';
  public static readonly CHANGE: string = 'change';
  public static readonly KEYUP: string = 'keyup';
}