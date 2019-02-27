
import './index.less';


export interface IChartCardProps extends JSX.FunctionalComponentCtx  {
  title: any;
  action?: any;
  total?: any
  footer?: any;
  contentHeight?: number;
  avatar?: any;
  style?: any
}



const renderTotal = (total) => {
  let totalDom;
  switch (typeof total) {
    case 'undefined':
      totalDom = null;
      break;
    case 'function':
      totalDom = <div class='total'>{total()}</div>;
      break;
    default:
      totalDom = <div class='total'>{total}</div>;
  }
  return totalDom;
};

const ChartCard = ({ props, children, data }: IChartCardProps) => {
  const { contentHeight, title, avatar, action, total, footer, loading } = props

  const renderConnet = () => {
    if (loading) {
      return false;
    }
    const chartTopMargin = !children && !footer ? 'chartTopMargin' : ''
    const footerMargin = !children ? 'chartTopMargin' : ''
    return (
      <div class='chartCard'>
        <div class={`chartTop ${chartTopMargin}`} >
          <div class={avatar}>{avatar}</div>
          <div class='metaWrap'>
            <div class='meta'>
              <span class='title'>{title}</span>
              <span class='action'>{action}</span>
            </div>
            {renderTotal(total)}
          </div>
        </div>
        {children && (
          <div class='content' style={{ height: contentHeight || 'auto' }}>
            <div class={contentHeight && 'contentFixed'}>{children}</div>
          </div>
        )}
        {footer && (
          <div class={`footer ${!footerMargin}`} >
            {footer}
          </div>
        )}
      </div>
    );
  };

  return (
    <a-card loading={loading} bodyStyle={{ padding: '20px 24px 8px 24px' }} {...data}>
      {renderConnet()}
    </a-card>
  )
}
export default ChartCard;
