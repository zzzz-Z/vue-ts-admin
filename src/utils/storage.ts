import config from '@/config';

const tag = config.storage_tag

export function setStorage(key: string, value: object | string | number | any[]) {

  if (typeof value !== 'string') {
    value = JSON.stringify(value)
  }
  localStorage.setItem(tag + key, value)
}

export function getStorage(key: string) {

  const value = localStorage.getItem(tag + key)
  try {
    if (value) {
      return JSON.parse(value)
    }
  } catch (error) {
    return value
  }


}

export function removeStorage(key?: string) {

  key ?
    localStorage.removeItem(tag + key) :
    localStorage.clear()
}
