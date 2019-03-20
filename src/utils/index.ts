// 文件 file 转 base64Url
export function fileToBase64(file: File): Promise<string> {
  const reader = new FileReader()
  return new Promise((resolve) => {
    reader.readAsDataURL(file)
    reader.onloadend = (e) => resolve((e.target as any).result)
  })

}
