import { _ } from 'coa-helper'
import { WxWork } from '../typings'
import { WxWorkTokenService } from './WxWorkTokenService'

export class WxWorkKefuSuiteService extends WxWorkTokenService {
  // 微信客服添加客服账号 https://developer.work.weixin.qq.com/document/path/96404
  async addAccount(authCorpId: string, permanentCode: string, name: string, mediaId: string) {
    return await this.bin.post('/cgi-bin/kf/account/add', {
      name,
      media_id: mediaId
    }, { access_token: await this.getCorpToken(authCorpId, permanentCode) })
  }

  // 微信客服删除客服账号 https://developer.work.weixin.qq.com/document/path/96405
  async delAccount(authCorpId: string, permanentCode: string, openKfId: string) {
    return await this.bin.post('/cgi-bin/kf/account/del', {
      open_kfid: openKfId
    }, { access_token: await this.getCorpToken(authCorpId, permanentCode) })
  }

  // 微信客服修改客服账号 https://developer.work.weixin.qq.com/document/path/96406
  async updateAccount(authCorpId: string, permanentCode: string, openKfId: string, name: string, mediaId: string) {
    return await this.bin.post('/cgi-bin/kf/account/update', {
      name,
      media_id: mediaId,
      open_kfid: openKfId
    }, { access_token: await this.getCorpToken(authCorpId, permanentCode) })
  }

  // 微信客服获取客服账号列表 https://developer.work.weixin.qq.com/document/path/96415
  async listAccount(authCorpId: string, permanentCode: string, offset?: number, limit?: number) {
    return await this.bin.post('/cgi-bin/kf/account/list', {
      offset,
      limit
    }, { access_token: await this.getCorpToken(authCorpId, permanentCode) })
  }

  // 微信客服获取客服账号链接 https://developer.work.weixin.qq.com/document/path/96416
  async addContactWay(authCorpId: string, permanentCode: string, openKfId: string, scene?: string) {
    return await this.bin.post('/cgi-bin/kf/add_contact_way', {
      open_kfid: openKfId,
      scene
    }, { access_token: await this.getCorpToken(authCorpId, permanentCode) })
  }

  // 微信客服添加接待人员 https://developer.work.weixin.qq.com/document/path/96418
  async addServicer(authCorpId: string, permanentCode: string, openKfId: string, userIdList?: string[], departmentIdList?: number[]) {
    return await this.bin.post('/cgi-bin/kf/servicer/add', {
      open_kfid: openKfId,
      userid_list: userIdList,
      department_id_list: departmentIdList
    }, { access_token: await this.getCorpToken(authCorpId, permanentCode) })
  }

  // 微信客服删除接待人员 https://developer.work.weixin.qq.com/document/path/96419
  async delServicer(authCorpId: string, permanentCode: string, openKfId: string, userIdList?: string[], departmentIdList?: number[]) {
    return await this.bin.post('/cgi-bin/kf/servicer/del', {
      open_kfid: openKfId,
      userid_list: userIdList,
      department_id_list: departmentIdList
    }, { access_token: await this.getCorpToken(authCorpId, permanentCode) })
  }

  // 微信客服获取接待人员列表 https://developer.work.weixin.qq.com/document/path/96420
  async listServicer(authCorpId: string, permanentCode: string, openKfId: string) {
    return await this.bin.get('/cgi-bin/kf/servicer/list', {
      access_token: await this.getCorpToken(authCorpId, permanentCode),
      open_kfid: openKfId
    })
  }

  // 微信客服获取会话状态 https://developer.work.weixin.qq.com/document/path/94698
  async getServiceState(authCorpId: string, permanentCode: string, openKfId: string, externalUserId: string) {
    return await this.bin.post('/cgi-bin/kf/service_state/get', {
      open_kfid: openKfId,
      external_userid: externalUserId
    }, { access_token: await this.getCorpToken(authCorpId, permanentCode) })
  }

  // 微信客服变更会话状态 https://developer.work.weixin.qq.com/document/path/94698
  async transServiceState(authCorpId: string, permanentCode: string, openKfId: string, externalUserId: string, serviceState: number, servicerUserId: string) {
    return await this.bin.post('/cgi-bin/kf/service_state/trans', {
      open_kfid: openKfId,
      external_userid: externalUserId,
      service_state: serviceState,
      servicer_userid: servicerUserId
    }, { access_token: await this.getCorpToken(authCorpId, permanentCode) })
  }

  // 微信客服读取消息 https://developer.work.weixin.qq.com/document/path/94699
  async syncMsg(authCorpId: string, permanentCode: string, openKfId: string, option?: {
    cursor?: string,
    token?: string,
    limit?: number,
    voice_format?: number
  }) {
    return await this.bin.post('/cgi-bin/kf/sync_msg', {
      open_kfid: openKfId,
      cursor: option?.cursor,
      token: option?.token,
      limit: option?.limit,
      voice_format: option?.voice_format
    }, { access_token: await this.getCorpToken(authCorpId, permanentCode) })
  }

  // 微信客服发送消息 https://developer.work.weixin.qq.com/document/path/94700
  async sendMsg(authCorpId: string, permanentCode: string, openKfId: string, toUser: string, msgType: string, option: {
    text?: { content: string },
    image?: { media_id: string },
    voice?: { media_id: string },
    video?: { media_id: string },
    file?: { media_id: string },
    link?: { title: string, url: string, thumb_media_id: string, desc?: string },
    miniprogram?: { appid: string, pagepath: string, thumb_media_id: string, title?: string },
    location?: { latitude: number, longitude: number, name: string, address?: string },
    ca_link?: { link_url: number }
  }) {
    return await this.bin.post('/cgi-bin/kf/send_msg',
      { open_kfid: openKfId, touser: toUser, msgtype: msgType, ...option },
      { access_token: await this.getCorpToken(authCorpId, permanentCode) })
  }

  // 微信客服发送欢迎语等事件响应消息 https://developer.work.weixin.qq.com/document/path/94910
  async sendMsgOnEvent(authCorpId: string, permanentCode: string, code: string, msgType: string, option: {
    text?: { content: string },
    msgmenu?: {
      head_content?: string,
      list?: {
        type: string,
        click?: { content: string, id?: string },
        view?: { url: string, content: string },
        miniprogram?: { appid: string, pagepath: string, content: string },
        text?: { content: string, no_newline?: string }
      }[],
      tail_content?: string
    },
  }) {
    return await this.bin.post('/cgi-bin/kf/send_msg_on_event', {
      code: code,
      msgtype: msgType,
      ...option
    }, { access_token: await this.getCorpToken(authCorpId, permanentCode) })
  }

  // 微信客服获取配置的专员与客户群 https://developer.work.weixin.qq.com/document/path/94702
  async getUpgradeServiceConfig(authCorpId: string, permanentCode: string) {
    return await this.bin.get('/cgi-bin/kf/customer/get_upgrade_service_config', { access_token: await this.getCorpToken(authCorpId, permanentCode) })
  }

  // 微信客服为客户升级为专员或客户群服务 https://developer.work.weixin.qq.com/document/path/94702
  async upgradeService(authCorpId: string, permanentCode: string, openKfId: string, externalUserId: string, type: number, option: {
    member?: {
      userid: string,
      wording?: string
    },
    groupchat?: {
      chat_id: string,
      wording?: string
    }
  }) {
    return await this.bin.post('/cgi-bin/kf/customer/upgrade_service', {
      open_kfid: openKfId,
      external_userid: externalUserId,
      type: type,
      ...option
    }, { access_token: await this.getCorpToken(authCorpId, permanentCode) })
  }

  // 微信客服为客户取消推荐专员或客户群 https://developer.work.weixin.qq.com/document/path/94702
  async cancelUpgradeService(authCorpId: string, permanentCode: string, openKfId: string, externalUserId: string) {
    return await this.bin.post('/cgi-bin/kf/customer/cancel_upgrade_service', {
      open_kfid: openKfId,
      external_userid: externalUserId,
    }, { access_token: await this.getCorpToken(authCorpId, permanentCode) })
  }

  // 微信客服获取客户基础信息 https://developer.work.weixin.qq.com/document/path/95149
  async batchGetCustomer(authCorpId: string, permanentCode: string, externalUserId: string, needEnterSessionContext?: number) {
    return await this.bin.post('/cgi-bin/kf/customer/batchget', {
      external_userid: externalUserId,
      need_enter_session_context: needEnterSessionContext
    }, { access_token: await this.getCorpToken(authCorpId, permanentCode) })
  }
}
