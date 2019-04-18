import { Empty } from './Empty';

const IC = [Empty]




export default {
  install: (Vue) => {
    IC.map((component) => { Vue.use(component) })
  }
}
