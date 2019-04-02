import Vue from 'vue';

export default class VC<P= {}> extends Vue {
  readonly $props!: P
}
