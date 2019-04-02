import { IFormItem } from './form-item';
import { FormRef } from './form-ref';

interface IFormProps {
  /** 表单布局 */
  layout?: 'horizontal' | 'inline' | 'vertical'

  formItems?: IFormItem[]
  /**  初始值 ,设置所有表单项的初始值 && 合并修改后的表单数据 */
  initialValues?: {}
  /** 所有item的labelCol  会被单项指定值覆盖 */
  labelCol?: ICol
  /** 所有item的wrapperCol 会被单项指定值覆盖 */
  wrapperCol?: ICol
  /** 所有formitem的style 若指定formItems的style属性 则被覆盖 */
  itemStyle?: string
  /** item col 配置 */
  col?: ICol
}

