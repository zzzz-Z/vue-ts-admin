import Vue, { VNode, VNodeData } from 'vue'

declare global {
  namespace JSX {
    interface FunctionalComponentCtx {
      props?: any
      children?: VNode[]
      data?: VNodeData
      parent?: Vue
      listeners?: any
      scopedSlots?: any
      injections?: any
      slots?: any
      [key: string]: any
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
