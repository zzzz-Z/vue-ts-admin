interface SvgProps {
  /** svg文件名 : src/assets/svgIcon/${name}.svg */
  name: string;
}
export default ({ data, props }: FC<SvgProps>) => (
  <a-icon {...data} component={require(`@/assets/svgIcon/${props!.name}.svg`).default} />
);

