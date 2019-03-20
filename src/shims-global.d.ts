import Vue from 'vue'
import { AxiosInstance } from 'axios';
import moment = require('moment');

declare module 'vue/types/vue' {
  interface Vue {
    Axios: AxiosInstance
    moment: moment.Moment
  }
}
