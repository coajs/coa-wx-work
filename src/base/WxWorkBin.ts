import { CoaError } from 'coa-error'
import { $, axios, Axios, _ } from 'coa-helper'
import { xml } from 'coa-xml'
import { createDecipheriv } from 'crypto'
import { readFileSync } from 'fs'
import { basename } from 'path'
import { WxWorkStorage } from '../libs/WxWorkStorage'
import { WxWork } from '../typings'

const baseURL = 'https://qyapi.weixin.qq.com'

export class WxWorkBin {
  readonly storage: WxWorkStorage

  constructor(storage?: WxWorkStorage) {
    this.storage = storage ?? new WxWorkStorage()
  }

  async get(url: string, params: WxWork.Dic = {}, allow: number[] = []) {
    const res = await axios(url, { params, baseURL })
    return this.wxResponseResult(res, allow)
  }

  async post(url: string, data: WxWork.Dic, params: WxWork.Dic = {}, config: Axios.AxiosRequestConfig = {}, allow: number[] = []) {
    const res = await axios(url, { params, data, baseURL, method: 'POST', ...config })
    return this.wxResponseResult(res, allow)
  }

  protected wxResponseResult(res: Axios.AxiosResponse, allow: number[]) {
    const info: WxWork.Dic = res.data || {}
    if (info.errcode) {
      const message = _.toString(info.errmsg) || '企业微信服务返回错误'
      const code = _.toNumber(info.errcode) || 0
      if (!allow.includes(code)) CoaError.throw('WxWork.Error.' + info.errcode, message)
    }
    return $.camelCaseKeys(info)
  }

  parseUploadFile(filepath: string, key: string) {
    const BREAK = '\r\n'
    const BOUNDARY = '----------------------------' + Math.random()

    const filename = basename(filepath)
    const prefix = `--${BOUNDARY}${BREAK}Content-Disposition: form-data; name="${key}"; filename="${filename}"${BREAK}Content-Type: application/octet-stream${BREAK}${BREAK}`
    const suffix = `${BREAK}--${BOUNDARY}--${BREAK}`

    const headers = { 'content-type': 'multipart/form-data; boundary=' + BOUNDARY }
    const data = Buffer.concat([Buffer.from(prefix), readFileSync(filepath), Buffer.from(suffix)])

    return { headers, data }
  }

  async decrypt(encryptedData: string, aesKey: string) {
    const key = Buffer.from(aesKey, 'base64')
    const iv = key.slice(0, 16)
    let result = {} as any

    try {
      const decipher = createDecipheriv('aes-256-cbc', key, iv)
      // 设置自动 padding 为 true，删除填充补位
      decipher.setAutoPadding(true)
      let decoded = decipher.update(encryptedData, 'base64', 'utf8')
      try {
        decoded += decipher.final('utf8')
      } catch (e) {}
      decoded = decoded.replace(/[\s\S]*(<xml>[\s\S]*<\/xml>)[\s\S]*/, '$1')
      result = await xml.decode(decoded)
    } catch (e) {
      console.error('微信解密失败', e)
    }
    return result
  }
}
