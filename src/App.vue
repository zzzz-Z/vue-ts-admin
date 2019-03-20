<template>
  <a-locale-provider :locale="locale">
      <router-view></router-view>
  </a-locale-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
// import moment from 'moment';
// import 'moment/locale/zh-cn';

// moment.locale('zh-cn');
export default {
  data () {
    return {
      locale: zhCN
    }
  }
}
</script>
<style lang="less">
  html,body,#app {
    height: 100%;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>