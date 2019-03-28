import { FormRef } from './form-ref';

interface IFormItem {
  style?: string;
  field?: string;
  initialValue?: any;
  rules?: any;
  type?: string;
  el?: JSX.Element | ((form: FormRef) => JSX.Element)
  colon?: boolean;
  extra?: any;
  hasFeedback?: boolean;
  help?: any;
  label?: any;
  labelCol?: ICol;
  wrapperCol?: ICol;
  required?: boolean;
  validateStatus?: '' | 'success' | 'warning' | 'error' | 'validating';
  placeholder?: string
}
