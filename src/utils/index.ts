// 文件 file 转 base64Url
export function fileToBase64(file: File, fn: (url: string) => string) {
  const reader = new FileReader()
  reader.onloadend = (e) => fn((e.target as any).result)
  reader.readAsDataURL(file)
}
