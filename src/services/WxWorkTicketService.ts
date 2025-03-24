import { _ } from 'coa-helper'
import { WxWork } from '../typings'
import { WxWorkTokenService } from './WxWorkTokenService'

export class WxWorkTicketService extends WxWorkTokenService {
  // 获取Agent Ticket对象
  async gainAgentTicket(authCorpId: string, permanentCode: string) {
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

  // 获取Corp Ticket对象
  async gainCorpTicket(authCorpId: string, permanentCode: string) {
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
  async getExternalUserId(authCorpId: string, permanentCode: string, unionId: string, openId: string, subjectType = 0) {
    return await this.bin.post('/cgi-bin/idconvert/unionid_to_external_userid', { unionid: unionId, openid: openId, subject_type: subjectType }, { access_token: await this.getCorpToken(authCorpId, permanentCode) })
  }

  // external_userid查询pending_id
  async getPendingId(authCorpId: string, permanentCode: string, externalUserId: string[]) {
    return await this.bin.post('/cgi-bin/idconvert/batch/external_userid_to_pending_id', { external_userid: externalUserId }, { access_token: await this.getCorpToken(authCorpId, permanentCode) })
  }
}
