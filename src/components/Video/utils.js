import { message } from "ant-design-vue";

/* eslint-disable camelcase */
const WebVideoCtrl = window.WebVideoCtrl

export default class HKvideo {

  constructor(props) {
    this.instance = null
    this.g_iWndIndex = 0
    this.szDeviceIdentify = ''
    this.deviceport = '' // 使用不到，如果用到，在使用的时候再获取
    this.rtspPort = '' // 使用不到，如果用到，在使用的时候再获取
    this.channels = []
    this.audiochannels = [] // 使用时获取
    this.ip = props.ip
    this.port = props.port
    this.username = props.username
    this.password = props.password
    this.startTime = props.startTime
    this.endTime = props.endTime
    this.iChannelID = props.iChannelID || 1
    this.bZeroChannel = false
    this.bChecked = false
    this.iPTZSpeed = 4 // 速度
    this.isLogin = false
    this.init()
  }
  static getInstance(props) {
    if (!this.instance) {
      this.instance = new HKvideo(props)
    }
    return this.instance
  }
  
  init() {
    // 检查插件是否已经安装过
    const iRet = WebVideoCtrl.I_CheckPluginInstall()
    if (iRet === -1) {
      alert('您还未安装过插件，双击开发包目录里的WebComponentsKit.exe安装！')
      return
    }
    // 初始化插件参数及插入插件
    const width = document.getElementById('divPlugin').offsetWidth
    const height = 3 * width / 5
    document.getElementById('divPlugin').style.height = height + 'px'
    WebVideoCtrl.I_InitPlugin(width, height, {
      // szColorProperty:'sub-border-select:000000',//plugin-background:000000; sub-background:000000; sub-border:000000;sub-border-select:000000
      bWndFull: true,
      iPackageType: 2,
      iWndowType: 1,
      bDebugMode: true,
      cbInitPluginComplete() {
        WebVideoCtrl.I_InsertOBJECTPlugin('divPlugin')
      }
    })
  }
  login() {
    return new Promise((resolve, reject) => {
      if (this.isLogin) {
        return resolve()
      }
      if (this.ip === '' || this.port === '') {
        return false
      }
      this.szDeviceIdentify = this.ip + '_' + this.port
      WebVideoCtrl.I_Login(this.ip, 1, this.port, this.username, this.password, {
        success(xmlDoc) {
          console.log('success login')
          resolve()
        },
        error(status, xmlDoc) {
          console.log('failed login')
          reject(new Error('登录摄像头失败！'))
        }
      })
    })
  }
  /** 退出登录 */
  clickLogout() {
    if (this.szDeviceIdentify === null) {
      return
    }
    WebVideoCtrl.I_Logout(this.szDeviceIdentify)
  }
  /** 开始预览视频 */
  startRealPlay() {
    const oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.g_iWndIndex)
    if (this.szDeviceIdentify == null) {
      return
    }
    const startRealPlay = () => {
      WebVideoCtrl.I_StartRealPlay(this.szDeviceIdentify, {
        iWndIndex: this.iWndIndex, // 播放窗口，如果不传，则默认使用当前选择窗口播放（默认选中窗口 0）
        // iRtspPort: 554, // RTSP 端口号，可以选择传入，如果不传，开发包会自动判断设备的 RTSP 端口
        // iStreamType: 1, // 码流类型 1-主码流，2-子码流，默认使用主码流预览
        iChannelID: this.iChannelID, // 播放通道号，默认通道 1
        bZeroChannel: this.bZeroChannel, // 是否播放零通道，默认为 false
        success() {
          console.log('预览开启成功')
        },
        error(status, xmlDoc) {
          console.log('预览开启失败')
        }
      })
    }

    if (oWndInfo != null) { // 已经在播放了，先停止
      WebVideoCtrl.I_Stop({
        success() {
          startRealPlay()
        }
      })
    } else {
      startRealPlay()
    }
  }
  /** 停止预览 */
  stopRealPlay() {
    const oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.g_iWndIndex)
    return new Promise((resolve, reject) => {
      if (oWndInfo != null) {
        WebVideoCtrl.I_Stop({
          iWndIndex: this.g_iWndIndex,
          success() {
            resolve()
          },
          error() {
            reject(new Error('停止失败'))
          }
        })
      }
    })
  }
  /** 开始回放 */
  startPlayback() {
    const {
      ip,
      iChannelID,
      g_iWndIndex,
      bZeroChannel,
    } = this
    const bChecked = false
    let iRet = -1
    const oWndInfo = WebVideoCtrl.I_GetWindowStatus(g_iWndIndex)
    if (ip === '') {
      return
    }
    // 零通道不支持回放
    if (bZeroChannel) { 
      return
    }
    // 已经在播放了，先停止
    if (oWndInfo != null) { 
      WebVideoCtrl.I_Stop()
    }
    this.searchVideo().then(res => {
      if (!res) {
        message.error('获取视频失败！')
      } else {
        let { startTime, endTime } = res
        if (bChecked) { // 启用转码回放
          const oTransCodeParam = {
            TransFrameRate: '16', // 0：全帧率，5：1，6：2，7：4，8：6，9：8，10：10，11：12，12：16，14：15，15：18，13：20，16：22
            TransResolution: '2', // 255：Auto，3：4CIF，2：QCIF，1：CIF
            TransBitrate: '23' // 2：32K，3：48K，4：64K，5：80K，6：96K，7：128K，8：160K，9：192K，10：224K，11：256K，12：320K，13：384K，14：448K，15：512K，16：640K，17：768K，18：896K，19：1024K，20：1280K，21：1536K，22：1792K，23：2048K，24：3072K，25：4096K，26：8192K
          }
          iRet = WebVideoCtrl.I_StartPlayback(ip, {
            iChannelID,
            szStartTime: startTime,
            szEndTime: endTime,
            oTransCodeParam
          })
        } else {
          iRet = WebVideoCtrl.I_StartPlayback(ip, {
            iChannelID,
            szStartTime: startTime,
            szEndTime: endTime
          })
        }
        if (iRet === -1) {
          console.log('开始回放成功！')
        } else {
          console.log('开始回放失败！')
        }
      }
    })

  }
  /** 停止回放 */
  stopPlayback() {
    const oWndInfo = WebVideoCtrl.I_GetWindowStatus(this.g_iWndIndex)

    if (oWndInfo != null) {
      const iRet = WebVideoCtrl.I_Stop()
      if (iRet === 0) {
        console.log('停止回放成功！')
      } else {
        console.log('停止回放失败！')
      }
    }
  }
  /** 搜索录像 */
  searchVideo() {
    let {
      szDeviceIdentify,
      iChannelID,
      startTime,
      endTime
    } = this
    return new Promise((resolve, rj) => {
      WebVideoCtrl.I_RecordSearch(szDeviceIdentify, iChannelID, startTime, endTime, {
        success(xmlDoc) {
          let videoList = []
          for (var i = 0, nLen = $(xmlDoc).find("searchMatchItem").length; i < nLen; i++) {
            var szPlaybackURI = $(xmlDoc).find("playbackURI").eq(i).text();
            if (szPlaybackURI.indexOf("name=") < 0) {
              break;
            }
            var startTime = $(xmlDoc).find("startTime").eq(i).text();
            var endTime = $(xmlDoc).find("endTime").eq(i).text();
            videoList.push({
              startTime: (startTime.replace("T", " ")).replace("Z", ""),
              endTime: (endTime.replace("T", " ")).replace("Z", "")
            })
          }
          console.log('查找录像成功');
          resolve(videoList[0])
        },
        error() {
          reject(false)
        }
      })
    })
  }
}