import { _ } from 'coa-helper'
import { WxWork } from '../typings'
import { WxWorkTokenService } from './WxWorkTokenService'

export class WxWorkTicketService extends WxWorkTokenService {
  // 获取Token
  async getCorpToken(authCorpId: string, permanentCode: string) {
    const cacheName = `WxWorkCorpToken:${this.suite.suiteId}:${authCorpId}:${permanentCode}`
    let result = (await this.bin.storage.get<WxWork.Token>(cacheName)) ?? {
      token: '',
      expire: 1,
    }
    if (!result.token) {
      const data = await this.bin.post(
        '/cgi-bin/service/get_corp_token',
        {
          auth_corpid: authCorpId,
          permanent_code: permanentCode,
        },
        {
          suite_access_token: await this.getSuiteToken(),
        }
      )
      const ms = _.toInteger(data.expiresIn) * 1e3 - 200 * 1e3
      const expire = _.now() + ms
      const token = (data.accessToken as string) || ''
      result = { expire, token }
      await this.bin.storage.set(cacheName, result, ms)
    }
    return result.token
  }

  // 获取Ticket对象
  async gainAgentTicket(authCorpId: string, permanentCode: string) {
    return await this.gain(authCorpId, permanentCode)
  }

  // 获取Agent Ticket
  private async gain(authCorpId: string, permanentCode: string) {
    const cacheName = `WxWorkAgentJsapiTicket:${this.suite.suiteId}:${authCorpId}:${permanentCode}`
    let result = (await this.bin.storage.get<WxWork.JsapiTicket>(cacheName)) ?? { ticket: '', expire: 1 }
    if (!result.ticket) {
      const data = await this.bin.get('/cgi-bin/ticket/get', {
        access_token: await this.getCorpToken(authCorpId, permanentCode),
        type: 'agent_config',
      })
      const ms = _.toInteger(data.expiresIn) * 1e3 - 200 * 1e3
      const expire = _.now() + ms
      const ticket = (data.ticket as string) || ''
      result = { expire, ticket }
      await this.bin.storage.set(cacheName, result, ms)
    }
    return result
  }

  // 获取Ticket对象
  async gainCorpTicket(authCorpId: string, permanentCode: string) {
    return await this.gain2(authCorpId, permanentCode)
  }

  // 获取Corp Ticket
  private async gain2(authCorpId: string, permanentCode: string) {
    const cacheName = `WxWorkCorpJsapiTicket:${this.suite.suiteId}:${authCorpId}:${permanentCode}`
    let result = (await this.bin.storage.get<WxWork.JsapiTicket>(cacheName)) ?? { ticket: '', expire: 1 }
    if (!result.ticket) {
      const data = await this.bin.get('/cgi-bin/get_jsapi_ticket', {
        access_token: await this.getCorpToken(authCorpId, permanentCode),
      })
      const ms = _.toInteger(data.expiresIn) * 1e3 - 200 * 1e3
      const expire = _.now() + ms
      const ticket = (data.ticket as string) || ''
      result = { expire, ticket }
      await this.bin.storage.set(cacheName, result, ms)
    }
    return result
  }

  // unionid与external_userid的关联 https://developer.work.weixin.qq.com/document/path/95900
  async getExternalUserId(authCorpId: string, permanentCode: string, unionId: string, openId: string) {
    return await this.bin.post('/cgi-bin/idconvert/unionid_to_external_userid', { unionid: unionId, openid: openId, subject_type: 1 }, { access_token: await this.getCorpToken(authCorpId, permanentCode) })
  }
}
