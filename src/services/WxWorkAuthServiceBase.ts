import { _ } from 'coa-helper'
import { WxWorkBin } from '../libs/WxWorkBin'
import { WxWork } from '../typings'

export class WxWorkAuthServiceBase {

  readonly bin: WxWorkBin
  readonly agent: WxWork.Agent

  constructor (bin: WxWorkBin, agent: WxWork.Agent) {
    this.bin = bin
    this.agent = agent
  }

  // 获取Token
  async getToken () {
    const cacheName = `WxWorkToken:${this.agent.corpId}:${this.agent.agentId}`
    let result = await this.bin.storage.get<WxWork.Token>(cacheName) || { token: '', expire: 1 }
    if (!result.token) {
      const param = { corpid: this.agent.corpId, corpsecret: this.agent.secret }
      const data = await this.bin.get('/cgi-bin/gettoken', param)
      const ms = _.toInteger(data.expiresIn) * 1e3 - 200 * 1e3
      const expire = _.now() + ms
      const token = data.accessToken as string || ''
      result = { expire, token }
      await this.bin.storage.set(cacheName, result, ms)
    }
    return result.token
  }

  // 获取Ticket
  async getTicket () {
    const { ticket } = await this.gain()
    return ticket
  }

  // 获取Ticket对象
  async gainTicket () {
    return await this.gain()
  }

  // 获取Ticket
  private async gain () {
    const cacheName = `WxWorkJsapiTicket:${this.agent.corpId}:${this.agent.agentId}`
    let result = await this.bin.storage.get<WxWork.JsapiTicket>(cacheName) || { ticket: '', expire: 1 }
    if (!result.ticket) {
      const access_token = await this.getToken()
      const data = await this.bin.get('/cgi-bin/get_jsapi_ticket', { access_token })
      const ms = _.toInteger(data.expiresIn) * 1e3 - 200 * 1e3
      const expire = _.now() + ms
      const ticket = data.ticket as string || ''
      result = { expire, ticket }
      await this.bin.storage.set(cacheName, result, ms)
    }
    return result
  }

}