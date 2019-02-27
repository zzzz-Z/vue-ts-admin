import './index.less';

export interface TrendProps extends JSX.FunctionalComponentCtx {
  colorful?: boolean;
  flag: 'up' | 'down';
  reverseColor?: boolean;
}

const Trend = ({
  data,
  children,
  props: {
    colorful = true,
    flag,
    reverseColor
  }
}: TrendProps) => {
  const class1 = !colorful ? 'trendItemGrey' : ''
  const class2 = colorful && reverseColor ? 'reverseColor' : ''
  return (
    <div {...data} class={`trendItem ${class1} ${class2}`} >
      <span>{children}</span>
      {flag && (
        <span class={flag}>
          <a-icon type={`caret-${flag}`} />
        </span>
      )}
    </div>
  );
};

export default Trend;
