import { CoaError } from 'coa-error'
import { $, _, axios, Axios } from 'coa-helper'
import { WxWork } from '../typings'
import { WxWorkStorage } from './WxWorkStorage'

const baseURL = 'https://qyapi.weixin.qq.com'

export class WxWorkBin {

  readonly storage: WxWorkStorage

  constructor (storage?: WxWorkStorage) {
    this.storage = storage || new WxWorkStorage()
  }

  async get (url: string, params: WxWork.Dic = {}, allow: number[] = []) {
    const res = await axios(url, { params, baseURL })
    return this.wxResponseResult(res, allow)
  }

  async post (url: string, data: WxWork.Dic, params: WxWork.Dic = {}, config: Axios.AxiosRequestConfig = {}, allow: number[] = []) {
    const res = await axios(url, { params, data, baseURL, method: 'POST', ...config })
    return this.wxResponseResult(res, allow)
  }

  protected wxResponseResult (res: Axios.AxiosResponse, allow: number[]) {
    const info: WxWork.Dic = res.data || {}
    if (info.errcode) {
      const message = _.toString(info.errmsg) || '企业微信服务返回错误'
      const code = _.toNumber(info.errcode) || 0
      if (!allow.includes(code))
        CoaError.throw('WxWork.Error.' + info.errcode, message)
    }
    return $.camelCaseKeys(info)
  }

}