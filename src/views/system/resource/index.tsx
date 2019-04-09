import { VC, Component } from '@/VC-vue';
import Permission from './permissions';
import List from './list';
import { BaseLayout } from '@/components/Container';


@Component({})
export default class Resource extends VC {
  render() {
    return (
      <BaseLayout breadcrumb >
        <a-row>
          <Permission />
          <List />
        </a-row>
      </BaseLayout>
    )
  }
}

