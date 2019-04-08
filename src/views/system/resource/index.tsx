import { VC, Component } from '@/VC-vue';
import Permission from './permissions';
import List from './list';
import { ResourceStore } from './store';
import Breadcrumb from '@/components/Breadcrumb';


@Component({})
export default class Resource extends VC {
  render() {
    return (
      <div onClick={this.click} >
        <Breadcrumb />
        <a-row>
          <Permission />
          <List />
        </a-row>
      </div>
    )
  }
  click(e) {
    if (e.target.className !== 'itree-title') {
      // ResourceStore.setDropdown(false)
      // ResourceStore.setSelectedKeys([])
    }
  }
}

