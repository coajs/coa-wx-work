import { WxWorkServiceAuth } from '../base/WxWorkServiceAuth'

export class WxWorkExternalContactService extends WxWorkServiceAuth {
  // 获取客户详情 https://developer.work.weixin.qq.com/document/path/92114
  async get(external_userid: string) {
    return await this.bin.get(
      'cgi-bin/externalcontact/get',
      { access_token: await this.getToken(), external_userid })
  }

  // 批量获取客户详情 https://developer.work.weixin.qq.com/document/path/92994
  async batchGetByUser(userid_list: string[], cursor = '', limit = 50) {
    return await this.bin.post(
      'cgi-bin/externalcontact/batch/get_by_user',
      { userid_list, cursor, limit },
      { access_token: await this.getToken() })
  }

  // 获取企业标签库 https://developer.work.weixin.qq.com/document/path/92117
  async getCorpTagList({ group_id, tag_id } : { group_id?: string[], tag_id?: string[] }) {
    return await this.bin.post(
      'cgi-bin/externalcontact/get_corp_tag_list',
      { group_id, tag_id },
      { access_token: await this.getToken() })
  }

  // 编辑客户企业标签 https://developer.work.weixin.qq.com/document/path/92118
  async markTag(userid: string, external_userid: string, add_tag: string[], remove_tag: string[]) {
    return await this.bin.post(
      'cgi-bin/externalcontact/mark_tag',
      { userid, external_userid, add_tag, remove_tag },
      { access_token: await this.getToken() })
  }

  // 配置客户联系「联系我」方式 https://developer.work.weixin.qq.com/document/path/92228
  async addContactWay({ type, scene, state, user, remark }: { type: number, scene: number, state: string, user: string[], remark: string }) {
    return await this.bin.post(
      'cgi-bin/externalcontact/add_contact_way',
      { type, scene, state, user, remark },
      { access_token: await this.getToken() })
  }

  // 获取企业已配置的「联系我」方式
  async getContactWay(config_id: string) {
    return await this.bin.post(
      'cgi-bin/externalcontact/get_contact_way',
      { config_id },
      { access_token: await this.getToken() })
  }

  // 获取企业已配置的「联系我」列表
  async listContactWay() {
    return await this.bin.post(
      'cgi-bin/externalcontact/list_contact_way',
      {},
      { access_token: await this.getToken() })
  }

  // 更新企业已配置的「联系我」方式
  async updateContactWay(config_id: string, { state, user, remark }: { state: string, user: string[], remark: string }) {
    return await this.bin.post(
      'cgi-bin/externalcontact/update_contact_way',
      { config_id, remark, state, user },
      { access_token: await this.getToken() })
  }

  // 删除企业已配置的「联系我」方式
  async delContactWay(config_id: string) {
    return await this.bin.post(
      'cgi-bin/externalcontact/del_contact_way',
      { config_id },
      { access_token: await this.getToken() })
  }

  // 发送新客户欢迎语 https://developer.work.weixin.qq.com/document/path/92137
  async sendWelcomeMsg({ welcome_code, text, attachments }: { welcome_code: string, text: any, attachments: any[] }) {
    return await this.bin.post(
      'cgi-bin/externalcontact/send_welcome_msg',
      { welcome_code, text, attachments },
      { access_token: await this.getToken() })
  }
}
