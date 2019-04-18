import Vue from 'vue';

class Store {
  name?: number = undefined
  age = 2
  add = () => {
    this.age++
  }
}

export default Vue.observable(new Store())

