import {Component, Prop, Vue } from 'vue-property-decorator';
import Form from '@/components/Form';

@Component({})
export default class Login extends Vue {

  render() {
    return(
      <Form/>
    )
  }
}
