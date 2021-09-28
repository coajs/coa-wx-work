import { decrypt } from '@wecom/crypto'
import { CoaError } from 'coa-error'
import { _ } from 'coa-helper'
import { xml } from 'coa-xml'
import { WxWork } from '../typings'
import { WxWorkBin } from './WxWorkBin'
import { WxWorkService } from './WxWorkService'

export class WxWorkServiceAuth extends WxWorkService {
  readonly agent: WxWork.Agent

  constructor(bin: WxWorkBin, agent: WxWork.Agent) {
    super(bin)
    this.agent = agent
  }

  // 上传临时素材
  async uploadMedia(
    filepath: string,
    type: 'image' | 'voice' | 'video' | 'file'
  ): Promise<{ type: string; mediaId: string; createdAt: string }> {
    const { data, headers } = this.bin.parseUploadFile(filepath, 'media')
    const access_token = await this.getToken()
    return await this.bin.post(
      '/cgi-bin/media/upload',
      data,
      { access_token, type },
      { headers }
    )
  }

  // 解密
  decrypt(encrypted: string) {
    const aesKey =
      this.agent.aesKey ??
      CoaError.message('WxWork.Missing', '缺少AesKey，无法解析数据')
    const { message } = decrypt(aesKey, encrypted)
    return message
  }

  // 解密XML
  async decryptXml(encrypted: string) {
    const data = this.decrypt(encrypted)
    try {
      return await xml.decode(data)
    } catch (e) {
      console.error('微信解密失败', e)
      return undefined
    }
  }

  // 解密JSON
  async decryptJson(encrypted: string) {
    const data = this.decrypt(encrypted)
    try {
      return JSON.parse(data)
    } catch (e) {
      console.error('微信解密失败', e)
      return undefined
    }
  }

  // 获取Token
  async getToken() {
    const cacheName = `WxWorkToken:${this.agent.corpId}:${this.agent.agentId}`
    let result = (await this.bin.storage.get<WxWork.Token>(cacheName)) ?? {
      token: '',
      expire: 1,
    }
    if (!result.token) {
      const param = { corpid: this.agent.corpId, corpsecret: this.agent.secret }
      const data = await this.bin.get('/cgi-bin/gettoken', param)
      const ms = _.toInteger(data.expiresIn) * 1e3 - 200 * 1e3
      const expire = _.now() + ms
      const token = (data.accessToken as string) || ''
      result = { expire, token }
      await this.bin.storage.set(cacheName, result, ms)
    }
    return result.token
  }

  // 获取Ticket
  async getTicket() {
    const { ticket } = await this.gain()
    return ticket
  }

  // 获取Ticket对象
  async gainTicket() {
    return await this.gain()
  }

  // 获取Ticket
  private async gain() {
    const cacheName = `WxWorkJsapiTicket:${this.agent.corpId}:${this.agent.agentId}`
    let result = (await this.bin.storage.get<WxWork.JsapiTicket>(
      cacheName
    )) ?? { ticket: '', expire: 1 }
    if (!result.ticket) {
      const access_token = await this.getToken()
      const data = await this.bin.get('/cgi-bin/get_jsapi_ticket', {
        access_token,
      })
      const ms = _.toInteger(data.expiresIn) * 1e3 - 200 * 1e3
      const expire = _.now() + ms
      const ticket = (data.ticket as string) || ''
      result = { expire, ticket }
      await this.bin.storage.set(cacheName, result, ms)
    }
    return result
  }
}
