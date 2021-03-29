export class WxWorkStorage {

  private DATA = {} as { [index: string]: { value: any, expire: number } }

  async get<T> (key: string) {
    const { value, expire } = this.DATA[key] || { value: null, expire: 0 }
    if (expire < Date.now()) return null
    return value
  }

  async set (key: string, value: any, ms: number) {
    const expire = Date.now() + ms
    this.DATA[key] = { value, expire }
  }
}