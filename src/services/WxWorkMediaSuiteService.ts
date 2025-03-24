import { _ } from 'coa-helper'
import { WxWork } from '../typings'
import { WxWorkTokenService } from './WxWorkTokenService'

export class WxWorkMediaSuiteService extends WxWorkTokenService {
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
