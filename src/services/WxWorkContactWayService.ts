import { WxWorkServiceAuth } from '../base/WxWorkServiceAuth'

// https://developer.work.weixin.qq.com/document/path/92228
export class WxWorkContactWayService extends WxWorkServiceAuth {
  async create(type: number, scene: number, remark: string, state: string, user: string[]) {
    return await this.bin.post(
      'cgi-bin/externalcontact/add_contact_way',
      { type, scene, remark, state, user },
      { access_token: await this.getToken() })
  }

  async get(configId: string) {
    return await this.bin.post(
      'cgi-bin/externalcontact/get_contact_way',
      { config_id: configId },
      { access_token: await this.getToken() })
  }

  async list() {
    return await this.bin.post(
      'cgi-bin/externalcontact/list_contact_way',
      {},
      { access_token: await this.getToken() })
  }

  async delete(configId: string) {
    return await this.bin.post(
      'cgi-bin/externalcontact/del_contact_way',
      { config_id: configId },
      { access_token: await this.getToken() })
  }

  async update(configId: string, remark: string, state: string, user: string[]) {
    return await this.bin.post(
      'cgi-bin/externalcontact/update_contact_way',
      { config_id: configId, remark, state, user },
      { access_token: await this.getToken() })
  }
}
