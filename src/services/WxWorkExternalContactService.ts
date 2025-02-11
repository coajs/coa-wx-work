import { WxWorkServiceAuth } from '../base/WxWorkServiceAuth'

export class WxWorkExternalContactService extends WxWorkServiceAuth {
  // 批量获取客户详情 https://developer.work.weixin.qq.com/document/path/92994
  async getByUser(userIdList: string[]) {
    return await this.bin.post(
      'cgi-bin/externalcontact/batch/get_by_user',
      { userid_list: userIdList },
      { access_token: await this.getToken() })
  }
}
