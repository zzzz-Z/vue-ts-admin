import Axios from 'axios';

//  file to base64Url
export function fileToBase64(file: File): Promise<string> {
  const reader = new FileReader()
  return new Promise((resolve) => {
    reader.readAsDataURL(file)
    reader.onloadend = (e) => resolve((e.target as any).result)
  })

}

/**
 * download File
 * @param url
 * @param params
 */
export async function downloadFile(url: string, params?: {}) {
  const res = await Axios({ url, params, method: 'get', responseType: 'blob' })
  const name = res.headers['content-disposition']
  const fileName = name.substring(name.indexOf('=') + 1, name.length)
  const blob = new Blob([res.data])
  if ('download' in document.createElement('a')) {
    // 非IE下载
    const elink = document.createElement('a')
    elink.download = fileName
    elink.style.display = 'none'
    elink.href = URL.createObjectURL(blob)
    document.body.appendChild(elink)
    elink.click()
    // 释放URL 对象
    URL.revokeObjectURL(elink.href)
    document.body.removeChild(elink)
  } else {
    // IE10+下载
    navigator.msSaveBlob(blob, fileName)
  }
}
