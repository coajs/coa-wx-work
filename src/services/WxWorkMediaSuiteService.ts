import { _ } from 'coa-helper'
import { WxWork } from '../typings'
import { WxWorkTokenService } from './WxWorkTokenService'

export class WxWorkMediaSuiteService extends WxWorkTokenService {
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

  // 上传临时素材 https://developer.work.weixin.qq.com/document/25551
  async uploadMedia(
    authCorpId: string,
    permanentCode: string,
    filepath: string,
    type: 'image' | 'voice' | 'video' | 'file'
  ): Promise<{ type: string; mediaId: string; createdAt: string }> {
    const { data, headers } = this.bin.parseUploadFile(filepath, 'media')
    return await this.bin.post(
      '/cgi-bin/media/upload',
      data,
      { access_token: await this.getCorpToken(authCorpId, permanentCode), type },
      { headers }
    )
  }

  // 获取临时素材 https://developer.work.weixin.qq.com/document/25551
  async getMedia(
    authCorpId: string,
    permanentCode: string,
    mediaId: string
  ) {
    return await this.bin.get(
      '/cgi-bin/media/get',
      { access_token: await this.getCorpToken(authCorpId, permanentCode), media_id: mediaId }
    )
  }
}
