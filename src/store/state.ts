import { Vue } from 'vue-property-decorator';
class States {
  age = 1;
  name = 2;
  commit = (key: keyof Omit<States, 'commit' | 'dispatch'>, nVl) => this[key] = nVl;
  dispatch = (fn: (v: this) => any) => fn(this);
}
export const state = Vue.observable(new States());

state.dispatch((v) => {
  v.name;
});
