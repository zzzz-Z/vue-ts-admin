```tsx
import { Component, Vue } from 'vue-property-decorator'
import { BaseForm } from '../baseForm/form';
import { Content, CodeContent } from '@/components/BaseContent';
import { getMdStr } from '@/api/md';

@Component({})
export default class extends Vue {
 
  render() {
    return (
      <BaseForm
        initialValues={{
          title: '标题',
          doc: 'the time',
          norm: '特朗普',
          user: '马克龙',
          person: '张晨成',
          qz: '权重',
          time: this.moment('2015/01/01', 'YYYY/MM/DD')
        }} />
    )
  }
}

```