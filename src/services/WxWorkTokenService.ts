import { _ } from 'coa-helper'
import { WxWork } from '../typings'
import { WxWorkBin } from '../base/WxWorkBin'
import { WxWorkService } from '../base/WxWorkService'

export class WxWorkTokenService extends WxWorkService {
  readonly suite: WxWork.Suite

  constructor(bin: WxWorkBin, suite: WxWork.Suite) {
    super(bin)
    this.suite = suite
  }

  // 获取SuiteToken
  async getSuiteToken() {
    const cacheName = `WxWorkSuiteToken:${this.suite.suiteId}`
    let result = (await this.bin.storage.get<WxWork.SuiteToken>(cacheName)) ?? { suite_token: '', expire: 1 }
    if (!result.suite_token) {
      const data = await this.bin.post('/cgi-bin/service/get_suite_token', {
        suite_id: this.suite.suiteId,
        suite_secret: this.suite.suiteSecret,
        suite_ticket: await this.getTicket(),
      })
      const ms = _.toInteger(data.expiresIn) * 1e3 - 200 * 1e3
      const expire = _.now() + ms
      const suite_token = (data.suiteAccessToken as string) || ''
      result = { expire, suite_token }
      await this.bin.storage.set(cacheName, result, ms)
    }
    return result.suite_token
  }

  // 获取ticket
  async getTicket() {
    const cacheName = `WxWorkSuiteTicket:${this.suite.suiteId}`
    const result = (await this.bin.storage.get<WxWork.JsapiTicket>(cacheName)) ?? { ticket: '', expire: 1 }
    return result.ticket
  }

  // 设置ticket
  async setTicket(ticket: string) {
    const cacheName = `WxWorkSuiteTicket:${this.suite.suiteId}`
    const ms = 24 * 3600 * 1e3
    const expire = _.now() + ms
    return await this.bin.storage.set(cacheName, { ticket, expire }, ms)
  }

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
}
