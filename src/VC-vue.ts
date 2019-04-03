import Vue from 'vue';
export * from 'vue-property-decorator';

export  class VC<P= {}> extends Vue {
  readonly $props!: P
}
