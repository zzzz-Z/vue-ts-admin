<template>
  <div
    id="divPlugin"
    style="width:500px"
  />
</template>

<script>
  import HIKWeb from './utils'
  export default {
    props: {
      options: Object,
      playTime: String,
      chooseTime: Boolean,
      playback: Boolean
    },
    data() {
      return {
        HIKWeb: null
      }
    },
    mounted() {
      this.HIKWeb = new HIKWeb({
        username: 'admin',
        password: 'gw123456',
        port: 80,
        startTime: '2019-02-27 14:31:45',
        endTime: '2019-02-27 14:33:47',
        ip: '192.168.7.2'
      })
      this.HIKWeb.login().then(() => {
        this.HIKWeb.startPlayback()
        // this.HIKWeb.startRealPlay()
      })
    }
  }
</script>