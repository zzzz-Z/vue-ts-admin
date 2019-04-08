import Breadcrumb from '../Breadcrumb';
import { Component } from 'vue-property-decorator';
import { getMdStr } from '@/api/md';
import { VC } from '@/VC-vue';

export const BaseLayout = (v: FC<{ breadcrumb?: boolean }>) => (
  <div>
    <Breadcrumb vIf={v.props!.breadcrumb} />
    <div style='background:#fff;padding:20px' {...v.data}>
      {v.children}
    </div>
  </div>
)
/**
 * @description 标题容器
 */
export const Title = (v: FC<{ title?: string | JSX.Element }>) => (
  <a-alert
    style='margin-bottom:20px'
    message={v.props!.title}
    description={v.children}
    type='info'
    showIcon
  />
)


