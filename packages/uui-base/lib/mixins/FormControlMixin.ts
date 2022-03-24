import { LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import { UUIFormControlEvent } from '../events';

type Constructor<T = {}> = new (...args: any[]) => T;

// TODO: make it possible to define FormDataEntryValue type.
export declare abstract class FormControlMixinInterface extends LitElement {
  formAssociated: boolean;
  get value(): FormDataEntryValue;
  set value(newValue: FormDataEntryValue);
  name: string;
  formResetCallback(): void;
  checkValidity: () => boolean;
  get validationMessage(): string;
  protected _value: FormDataEntryValue;
  protected _internals: any;
  protected abstract getFormElement(): HTMLElement | undefined;
  protected addValidator: (
    flagKey: FlagTypes,
    getMessageMethod: () => String,
    checkMethod: () => boolean
  ) => void;
  pristine: boolean;
  required: boolean;
  requiredMessage: string;
  error: boolean;
  errorMessage: string;
}

/* FlagTypes type options originate from:
 * https://developer.mozilla.org/en-US/docs/Web/API/ValidityState
 * */
type FlagTypes =
  | 'badInput'
  | 'customError'
  | 'patternMismatch'
  | 'rangeOverflow'
  | 'rangeUnderflow'
  | 'stepMismatch'
  | 'tooLong'
  | 'tooShort'
  | 'typeMismatch'
  | 'valueMissing'
  | 'badInput'
  | 'valid';

interface Validator {
  flagKey: FlagTypes;
  getMessage: () => String;
  checkMethod: () => boolean;
}

/**
 * The mixin allows a custom element to participate in HTML forms.
 *
 * @param {Object} superClass - superclass to be extended.
 * @mixin
 */
export const FormControlMixin = <T extends Constructor<LitElement>>(
  superClass: T
) => {
  abstract class FormControlMixinClass extends superClass {
    /**
     * This is a static class field indicating that the element is can be used inside a native form and participate in its events.
     * It may require a polyfill, check support here https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/attachInternals.
     * Read more about form controls here https://web.dev/more-capable-form-controls/
     * @type {boolean}
     */
    static readonly formAssociated = true;

    /**
     * This is a name property of the component.
     * @type {string}
     * @attr
     * @default ''
     */
    @property({ type: String })
    name = '';

    /**
     * Value of this form control.
     * @type {string}
     * @attr
     * @default ''
     */
    @property() // Do not 'reflect' as the attribute is used as fallback.
    get value() {
      return this._value;
    }
    set value(newValue) {
      const oldValue = this._value;
      this._value = newValue;
      if (
        'ElementInternals' in window &&
        //@ts-ignore
        'setFormValue' in window.ElementInternals.prototype
      ) {
        this._internals.setFormValue(this._value);
      }
      this.requestUpdate('value', oldValue);
    }

    // Validation
    private _validityState: any = {};

    /**
     * Determines wether the form control has been touched or interacted with, this determines wether the validation-status of this form control should be made visible.
     * @type {boolean}
     * @attr
     * @default false
     */
    @property({ type: Boolean, reflect: true })
    pristine: boolean = true;

    /**
     * Apply validation rule for requiring a value of this form control.
     * @attr
     * @default false
     */
    @property({ type: Boolean, reflect: true })
    required = false;

    /**
     * Required validation message.
     * @attr
     */
    @property({ type: String, attribute: 'required-message' })
    requiredMessage = 'This field is required';

    /**
     * Apply custom error on this input.
     * @attr
     */
    @property({ type: Boolean, reflect: true })
    error = false;

    /**
     * Custom error message.
     * @attr
     */
    @property({ type: String, attribute: 'error-message' })
    errorMessage = 'This field is invalid';

    private _value: FormDataEntryValue = '';
    private _internals: any;
    private _form: HTMLFormElement | null = null;
    private _validators: Validator[] = [];

    constructor(...args: any[]) {
      super(...args);
      this._internals = (this as any).attachInternals();

      this.addValidator(
        'valueMissing',
        () => this.requiredMessage,
        () => this.hasAttribute('required') && this.hasValue() === false
      );
      this.addValidator(
        'customError',
        () => this.errorMessage,
        () => this.error
      );

      this.addEventListener('blur', () => {
        this.pristine = false;
      });
    }

    /**
     * Determn wether this FormControl has a value.
     * @method hasValue
     * @returns {boolean}
     */
    public hasValue(): boolean {
      return this.value !== '';
    }

    /**
     * Get internal form element.
     * This has to be implemented to provide a FormControl Element of choice for the given context. The element is used as anchor for validation-messages.
     * @abstract
     * @method getFormElement
     * @returns {HTMLElement | undefined}
     */
    protected abstract getFormElement(): HTMLElement | undefined;

    disconnectedCallback(): void {
      super.disconnectedCallback();
      this._removeFormListeners();
    }
    private _removeFormListeners() {
      if (this._form) {
        this._form.removeEventListener('submit', this._onFormSubmit);
      }
    }

    /**
     * Add validator, to validate this Form Control.
     * See https://developer.mozilla.org/en-US/docs/Web/API/ValidityState for available Validator FlagTypes.
     *
     * @example
     * this.addValidator(
     *  'tooLong',
     *  () => 'This input contains too many characters',
     *  () => this._value.length > 10
     * );
     * @method hasValue
     * @param {FlagTypes} flagKey the type of validation.
     * @param {method} getMessage method to retrieve relevant message. Is executed every time the validator is re-executed.
     * @param {method} checkMethod method to determine if this validator should invalidate this form control. Return true if this should prevent submission.
     */
    protected addValidator(
      flagKey: FlagTypes,
      getMessageMethod: () => String,
      checkMethod: () => boolean
    ) {
      this._validators.push({
        flagKey: flagKey,
        getMessage: getMessageMethod,
        checkMethod: checkMethod,
      });
    }

    private _runValidators() {
      this._validators.forEach(validator => {
        if (validator.checkMethod()) {
          this._validityState[validator.flagKey] = true;
          this._internals.setValidity(
            this._validityState,
            validator.getMessage(),
            this.getFormElement()
          );
        } else {
          this._validityState[validator.flagKey] = false;
        }
      });

      const hasError = Object.values(this._validityState).includes(true);

      if (hasError) {
        this.dispatchEvent(
          new UUIFormControlEvent(UUIFormControlEvent.INVALID)
        );
      } else {
        this._internals.setValidity({});
        this.dispatchEvent(new UUIFormControlEvent(UUIFormControlEvent.VALID));
      }
    }

    updated(changedProperties: Map<string | number | symbol, unknown>) {
      super.updated(changedProperties);
      this._runValidators();
    }

    private _onFormSubmit = () => {
      this.pristine = false;
    };

    public formAssociatedCallback() {
      this._removeFormListeners();
      this._form = this._internals.form;
      if (this._form) {
        // This relies on the form begin a 'uui-form':
        if (this._form.hasAttribute('submit-invalid')) {
          this.pristine = false;
        }
        this._form.addEventListener('submit', this._onFormSubmit);
      }
    }
    public formResetCallback() {
      this.pristine = true;
      this.value = this.getAttribute('value') || '';
    }

    public checkValidity() {
      return this._internals?.checkValidity();
    }

    get validationMessage() {
      return this._internals?.validationMessage;
    }
  }
  return FormControlMixinClass as unknown as Constructor<FormControlMixinInterface> &
    T;
};
