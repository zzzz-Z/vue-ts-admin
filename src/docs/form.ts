export const formDoc = [{
  field: 'layout',
  description: '表单布局',
  type: 'horizontal | inline | vertical',
  default: 'horizontal',
}, {
  field: 'formItems',
  description: 'Form.Item 配置项',
  type: 'IFormItem[]',
  default: '-',
}, {
  field: 'initialValues',
  description: '表单初始值数据',
  type: '{ }',
  default: '-',
}, {
  field: 'labelCol',
  description: '统一设置 Form.Item 的 labelCol,会被 Form.Item 中同字段覆盖',
  type: 'Col',
  default: '-',
}, {
  field: 'wrapperCol',
  description: '统一设置 Form.Item 的 wrapperCol,会被 Form.Item 中同字段覆盖',
  type: 'Col',
  default: '-',
}, {
  field: 'itemStyle',
  description: '设置每一个Form.Item的布局',
  type: 'Col',
  default: '-',
}]
