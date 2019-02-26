// 文件 file 转 base64Url
export function fileToBase64(file: File): Promise<string> {
  const reader = new FileReader()
  return new Promise((res) => {
    reader.readAsDataURL(file)
    reader.onloadend = (e) => res((e.target as any).result)
  })

}
