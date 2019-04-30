import { Api } from './services/index';
import { createFormModal } from '@/components/Modal/createModal';
import Vue, { RenderContext, VNode } from 'vue';
import { AxiosInstance } from 'axios';
import moment from 'moment';

declare module 'vue/types/vue' {

  interface Vue {
    Api: typeof Api;
    Axios: AxiosInstance;
    moment: typeof moment;
    $createFormModal: typeof createFormModal;
  }
}
