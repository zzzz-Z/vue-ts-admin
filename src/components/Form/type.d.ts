interface IFormItem {
  style?: string;
  field?: string;
  initialValue?: any;
  rules?: any;
  type?: string;
  el?: (form: JSX.Element) => JSX.Element;
  colon?: boolean;
  extra?: any;
  hasFeedback?: boolean;
  help?: any;
  label?: any;
  labelCol?: any;
  required?: boolean;
  validateStatus?: '' | 'success' | 'warning' | 'error' | 'validating';
  wrapperCol?: any;
}

interface IFormProps {
  layout?: 'horizontal' | 'inline' | 'vertical'
  formItems?: IFormItem[]
  initialValues?: {}
  labelCol?: any
  wrapperCol?: any
  itemStyle?: string
  col?: any
}
