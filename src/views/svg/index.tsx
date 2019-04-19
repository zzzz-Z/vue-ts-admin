import { VC, Component } from '@/VC-vue';
import Svg from '@/components/Svg';
import { BaseLayout, Title } from '@/components/Container';
import { Md } from '@/components/Container/md';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import XYZ from 'ol/source/XYZ';


@Component({})
export default class SvgEx extends VC {
  map!: Map;

  mounted() {
    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: 'https://{a-c}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          })
        })
      ],
      view: new View({
        center: [0, 0],
        zoom: 2
      })
    });
  }
  render() {
    const svgStyle = 'font-size:30px;margin-left:10px';
    return (
      <BaseLayout breadcrumb>
        <div id='map' ></div>
        <Title title='Svg组件'>
          传入svg的文件名(不包含文件后缀.svg),文件默认存放在assets/iconfont 中
        </Title>
        <h1 style='font-size:30px'>
          <Svg name='boy' style={svgStyle} />
          <Svg name='admin' style={svgStyle} />
          <Svg name='map' style={svgStyle} />
          <Svg name='sunny' style={svgStyle} />
          <Svg name='tiger' style={svgStyle} />
        </h1>
        <Md name='svg' />
      </BaseLayout>
    );
  }
}
