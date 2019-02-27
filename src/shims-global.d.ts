import Vue from 'vue'
import { AxiosStatic } from 'axios';
import moment = require('moment');


declare module 'vue/types/vue' {
  interface Vue {
    Axios: AxiosStatic
    moment: moment.Moment
  }
}
