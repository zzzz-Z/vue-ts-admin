// tslint:disable-next-line:max-line-length
import { FieldDecoratorOptions, Field, FieldValue, ValidateFieldOptions, ValidateCallback } from 'ant-design-vue/types/form/form';


/** 表单内置方法 */
interface FormUtils extends JSX.Element {

  /**
   * Check whether a field is touched by getFieldDecorator's options.trigger event
   * @type Function ((name: string) => boolean)
   */
  isFieldTouched: (name: string) => boolean;
  /**
   * Two-way binding for form, single file template can be bound using the directive v-decorator.
   * @type Function
   */
  getFieldDecorator(id: string, options: FieldDecoratorOptions): any;

  /**
   * Get the error of a field.
   * @type Function (Function(name))
   */
  getFieldError(name: string): Array<{}>;

  /**
   * Get the specified fields' error. If you don't specify a parameter, you will get all fields' error.
   * @type Function (Function([names: string[]))
   */
  getFieldsError(names: string[]): {};

  /**
   * Get the specified fields' values. If you don't specify a parameter, you will get all fields' values.
   * @type Funtion (Function([fieldNames: string[]))
   */
  getFieldsValue(fieldNames?: string[]): {};

  /**
   * Get the value of a field.
   * @type Function (Function(fieldName: string))
   */
  getFieldValue(fieldName: string): any;

  /**
   * Check whether any of fields is touched by getFieldDecorator's options.trigger event
   * @type Function
   */
  isFieldsTouched(names?: string[]): boolean;

  /**
   * Check if the specified field is being validated.
   * @type Function (Function(name))
   */
  isFieldValidating(name: string): boolean;

  /**
   * Reset the specified fields' value(to initialValue) and status.
   * If you don't specify a parameter, all the fields will be reset.
   * @type Function (Function([names: string[]]))
   */
  resetFields(names?: string[]): void;

  /**
   * Set value and error state of fields
   * @type Function
   */
  setFields(field: Field): void;

  /**
   * Set the value of a field.
   * @type Function
   */
  setFieldsValue(fieldValue: FieldValue): void;

  /**
   * Validate the specified fields and get theirs values and errors.
   * If you don't specify the parameter of fieldNames, you will validate all fields.
   * @type Function
   */
  validateFields(
    fieldNames: string[],
    options: ValidateFieldOptions,
    callback: ValidateCallback,
  ): void;
  validateFields(fieldNames: string[], callback: ValidateCallback): void;
  // tslint:disable-next-line:unified-signatures
  validateFields(options: ValidateFieldOptions, callback: ValidateCallback): void;
  // tslint:disable-next-line:unified-signatures
  validateFields(callback: ValidateCallback): void;
  validateFields(): void;

  /**
   * This function is similar to validateFields,
   * but after validation, if the target field is not in visible area of form,
   * form will be automatically scrolled to the target field area.
   * @type Function
   */
  validateFieldsAndScroll(
    fieldNames?: string[],
    options?: {},
    // tslint:disable-next-line:unified-signatures
    callback?: ValidateCallback,
  ): void;
  // tslint:disable-next-line:unified-signatures
  validateFieldsAndScroll(fieldNames?: string[], callback?: ValidateCallback): void;
  // tslint:disable-next-line:unified-signatures
  validateFieldsAndScroll(options?: {}, callback?: ValidateCallback): void;
  // tslint:disable-next-line:unified-signatures
  validateFieldsAndScroll(callback?: ValidateCallback): void;
  validateFieldsAndScroll(): void;
}
