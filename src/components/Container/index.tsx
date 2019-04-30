import Breadcrumb from '../Breadcrumb';
import _ from 'lodash';

export const BaseLayout = (v: FC<{ breadcrumb?: boolean }>) => (
  <div>
    <Breadcrumb vIf={v.props!.breadcrumb} />
    <div style='background:#fff;padding:20px' {...v.data}>
      {v.children}
    </div>
  </div>
);
/**
 * @description 标题容器
 */
export const Title = (v: FC<{ title?: string | JSX.Element }>) => (
  <a-alert
    {..._.omit(v.data, 'attrs')}
    style='margin-bottom:20px'
    message={v.props!.title}
    description={v.children}
    type='info'
    showIcon
  />
);
