import Vue from 'vue';

export  class VC<P= {}> extends Vue {
  readonly $props!: P
}
