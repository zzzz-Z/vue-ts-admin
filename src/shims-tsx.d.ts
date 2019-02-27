import Vue, { VNode } from 'vue'

declare global {

  namespace JSX {
    interface FunctionalComponentCtx {
      style?: any
      class?: any
      ref?: any
      props?: any
      children?: any
      data?: any
      parent?: any
      listeners?: any
      scopedSlots?: any
      injections?: any
      slots?: any
    }
    // tslint:disable no-empty-interface
    interface Element extends VNode { }
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue { }
    interface ElementAttributesProperty {
      Props: any
    }
    interface IntrinsicClassAttributes {
      ref?: string
      class?: any
      style?: any
      key?: any
    }
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}
