```ts
import { Component } from 'vue-property-decorator'
import { VC } from '@/VC-vue';
import Svg from '@/components/Svg';

@Component({})
export default class SvgEx extends VC {


  render() {
    const svgStyle = 'font-size:30px;margin-left:10px'
    return (
      <h1 style='font-size:30px'>
        <Svg name='boy' style={svgStyle} />
        <Svg name='admin' style={svgStyle} />
        <Svg name='map' style={svgStyle} />
        <Svg name='sunny' style={svgStyle} />
        <Svg name='tiger' style={svgStyle} />
      </h1>
    )
  }
}
```