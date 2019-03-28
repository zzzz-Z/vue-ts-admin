import { IFormItem } from './form-item';

interface IFormProps {
  layout?: 'horizontal' | 'inline' | 'vertical'
  formItems?: IFormItem[]
  initialValues?: {}
  labelCol?: ICol
  wrapperCol?: ICol
  itemStyle?: string
  col?: ICol
}

