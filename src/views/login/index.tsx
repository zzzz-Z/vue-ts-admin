import { Component, Prop, Vue } from 'vue-property-decorator';
import Form from '@/components/Form';
import Breadcrumb from '@/components/Breadcrumb';
import Ell from './Ell';
@Component({})
export default class Login extends Vue {

  render() {
    return (
      <div>
        <Breadcrumb />
        <Ell length={5} >1111111111111111</Ell>
      </div>
    )
  }
}
