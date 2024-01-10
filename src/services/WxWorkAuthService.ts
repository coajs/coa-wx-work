import { WxWorkTokenService } from './WxWorkTokenService'

export class WxWorkAuthService extends WxWorkTokenService {
  // 获取预授权码 https://developer.work.weixin.qq.com/document/path/90601
  private async getPreAuthCode() {
    const result = await this.bin.get('/cgi-bin/service/get_pre_auth_code', { suite_access_token: await this.getSuiteToken() })
    return (result.preAuthCode as string) || ''
  }

  // 设置授权配置 https://developer.work.weixin.qq.com/document/path/90602
  private async setSessionInfo(preAuthCode: string, authType: number) {
    const result = await this.bin.post('/cgi-bin/service/set_session_info', { pre_auth_code: preAuthCode, session_info: { appid: [], auth_type: authType } }, { suite_access_token: await this.getSuiteToken() })
    return (result.preAuthCode as string) || ''
  }

  // 获取授权跳转链接 https://developer.work.weixin.qq.com/document/path/90597
  async createRedirectUrl(redirectUri: string, state: string, authType = 0) {
    redirectUri = encodeURIComponent(redirectUri)
    const pre_auth_code = await this.getPreAuthCode()

    await this.setSessionInfo(pre_auth_code, authType)

    return `https://open.work.weixin.qq.com/3rdapp/install?suite_id=${this.suite.suiteId}&pre_auth_code=${pre_auth_code}&redirect_uri=${redirectUri}&state=${state}`
  }

  // 获取企业永久授权码 https://developer.work.weixin.qq.com/document/path/90603
  async getPermanentCode(authCode: string) {
    return await this.bin.post('/cgi-bin/service/get_permanent_code', { auth_code: authCode }, { suite_access_token: await this.getSuiteToken() })
  }

  // 获取企业授权信息 https://developer.work.weixin.qq.com/document/path/90604
  async getAuthInfo(authCorpId: string, permanentCode: string) {
    return await this.bin.post('/cgi-bin/service/get_auth_info', { auth_corpid: authCorpId, permanent_code: permanentCode }, { suite_access_token: await this.getSuiteToken() })
  }

  // 获取访问用户身份 https://developer.work.weixin.qq.com/document/path/91121
  async getUserInfo(code: string) {
    return await this.bin.get('/cgi-bin/service/auth/getuserinfo3rd', { suite_access_token: await this.getSuiteToken(), code })
  }
}
