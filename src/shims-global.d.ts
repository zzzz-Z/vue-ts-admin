import Vue, { RenderContext, VNode } from 'vue'
import { AxiosInstance } from 'axios';
import moment from 'moment'

declare module 'vue/types/vue' {
  interface Vue {
    Axios: AxiosInstance
    moment: typeof moment
    renderError?: (h: () => VNode, err: Error) => VNode;
    render?(): any;
    beforeCreate?(this: Vue): void;
    created?(): void;
    beforeDestroy?(): void;
    destroyed?(): void;
    beforeMount?(): void;
    mounted?(): void;
    beforeUpdate?(): void;
    updated?(): void;
    activated?(): void;
    deactivated?(): void;
    errorCaptured?(err: Error, vm: Vue, info: string): boolean | void;
  }
}
