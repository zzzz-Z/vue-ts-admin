import { Component } from 'vue-property-decorator'
import { Title, BaseLayout, CodeWrapper } from '@/components/Container';
import { VC } from '@/VC-vue';
import Svg from '@/components/Svg';

@Component({})
export default class SvgEx extends VC {


  render() {
    const svgStyle = 'font-size:30px;margin-left:10px'
    return (
      <BaseLayout breadcrumb>
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
        <CodeWrapper name='svg' />
      </BaseLayout>
    )
  }
}
