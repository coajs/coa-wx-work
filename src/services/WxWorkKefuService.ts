import { WxWorkServiceAuth } from '..'

interface ResponseError {
  errcode: number
  errmsg: string
}
type PromiseResponse<T = Record<string, any>> = Promise<T & ResponseError>

interface Account {
  openKfid: string
  name: string
  avatar: string
}

interface Message {
  msgid: string
  openKfid: string
  externalUserid: string
  sendTime: number
  origin: number
  servicerUserid: string
  msgtype: string
  text?: {
    content: string
    menuId: string
  }
  image?: {
    mediaId: string
  }
  voice?: {
    mediaId: string
  }
  video?: {
    mediaId: string
  }
  file?: {
    mediaId: string
  }
  location?: {
    latitude: number
    longitude: number
    name: string
    address: string
  }
  link?: {
    title: string
    desc: string
    url: string
    picUrl: string
  }
  businessCard?: {
    userid: string
  }
  miniprogram?: {
    title: string
    appid: string
    pagepath: string
    thumbMediaId: string
  }
  msgmenu?: {
    headContent: string
    list: any[]
    tailContent: string
  }
  event?:
    | {
        eventType: 'enter_session'
        openKfid: string
        externalUserid: string
        scene: string
        sceneParam: string
        welcomeCode: string
      }
    | {
        eventType: 'msg_send_fail'
        openKfid: string
        externalUserid: string
        failMsgid: string
        failType: number
      }
    | {
        eventType: 'servicer_status_change'
        servicerUserid: string
        status: number
      }
}

export class WxWorkKefuService extends WxWorkServiceAuth {
  /**
   * 添加客服帐号
   * 添加客服帐号，并可设置客服名称和头像。
   * https://work.weixin.qq.com/api/doc/90000/90135/94662
   * @param name 客服名称，不多于16个字符
   * @param media_id 客服头像临时素材
   */
  async createAccount(
    name: string,
    media_id: string
  ): PromiseResponse<{ openKfid: string }> {
    const access_token = await this.getToken()
    return await this.bin.post(
      '/cgi-bin/kf/account/add',
      { name, media_id },
      { access_token }
    )
  }

  /**
   * 删除客服帐号
   * 删除已有的客服帐号
   * https://work.weixin.qq.com/api/doc/90000/90135/94663
   * @param open_kfid 要删除的客服帐号ID
   */
  async removeAccount(open_kfid: string): PromiseResponse {
    const access_token = await this.getToken()
    return await this.bin.post(
      '/cgi-bin/kf/account/del',
      { open_kfid },
      { access_token }
    )
  }

  /**
   * 修改客服帐号
   * 修改已有的客服帐号，可修改客服名称和头像
   * https://work.weixin.qq.com/api/doc/90000/90135/94664
   * @param open_kfid 要修改的客服帐号ID
   * @param name 新的客服名称，如不需要修改可不填。不多于16个字符
   * @param media_id 新的客服头像临时素材，如不需要修改可不填
   */
  async updateAccount(
    open_kfid: string,
    name?: string,
    media_id?: string
  ): PromiseResponse {
    const access_token = await this.getToken()
    return await this.bin.post(
      '/cgi-bin/kf/account/update',
      { open_kfid, name, media_id },
      { access_token }
    )
  }

  /**
   * 获取客服帐号列表
   * 获取客服帐号列表，包括所有的客服帐号的客服ID、名称和头像
   * https://work.weixin.qq.com/api/doc/90000/90135/94661
   */
  async getAccountList(): PromiseResponse<{ accountList: Account[] }> {
    const access_token = await this.getToken()
    return await this.bin.get('/cgi-bin/kf/account/list', { access_token })
  }

  /**
   * 获取客服帐号链接
   * 企业可通过此接口获取带有不同参数的客服链接，不同客服帐号对应不同的客服链接。获取后，企业可将链接嵌入到网页等场景中，微信用户点击链接即可向对应的客服帐号发起咨询。企业可依据参数来识别用户的咨询来源等。
   * https://work.weixin.qq.com/api/doc/90000/90135/94665
   * @param open_kfid 客服帐号ID
   * @param scene 场景值，字符串类型，由开发者自定义。不多于32字节
   */
  async addContactWay(
    open_kfid: string,
    scene?: string
  ): PromiseResponse<{ url: string }> {
    const access_token = await this.getToken()
    return await this.bin.post(
      '/cgi-bin/kf/add_contact_way',
      { open_kfid, scene },
      { access_token }
    )
  }

  /**
   * 添加接待人员
   * 添加指定客服帐号的接待人员
   * https://work.weixin.qq.com/api/doc/90000/90135/94646
   * @param open_kfid 客服帐号ID
   * @param userid_list 接待人员userid列表。可填充个数：1 ~ 100。超过100个需分批调用
   * @returns
   */
  async addServicer(
    open_kfid: string,
    userid_list: string[]
  ): PromiseResponse<{
    result_list: Array<{ userid: string } & ResponseError>
  }> {
    const access_token = await this.getToken()
    return await this.bin.post(
      '/cgi-bin/kf/servicer/add',
      { open_kfid, userid_list },
      { access_token }
    )
  }

  /**
   * 删除接待人员
   * 从客服帐号删除接待人员
   * https://work.weixin.qq.com/api/doc/90000/90135/94647
   * @param open_kfid 客服帐号ID
   * @param userid_list 接待人员userid列表。可填充个数：1 ~ 100。超过100个需分批调用
   * @returns
   */
  async deleteServicer(
    open_kfid: string,
    userid_list: string[]
  ): PromiseResponse<{
    result_list: Array<{ userid: string } & ResponseError>
  }> {
    const access_token = await this.getToken()
    return await this.bin.post(
      '/cgi-bin/kf/servicer/del',
      { open_kfid, userid_list },
      { access_token }
    )
  }

  /**
   * 获取接待人员列表
   * 获取某个客服帐号的接待人员列表
   * https://work.weixin.qq.com/api/doc/90000/90135/94645
   * @param open_kfid 客服帐号ID
   */
  async getServicerList(
    open_kfid: string
  ): PromiseResponse<{
    servicerList: Array<{ userid: string; status: number }>
  }> {
    const access_token = await this.getToken()
    return await this.bin.get('/cgi-bin/kf/servicer/list', {
      access_token,
      open_kfid,
    })
  }

  /**
   * 获取会话状态
   * https://work.weixin.qq.com/api/doc/90000/90135/94669#获取会话状态
   * @param open_kfid 客服帐号ID
   * @param external_userid 微信客户的external_userid
   */
  async getServiceState(
    open_kfid: string,
    external_userid: string
  ): PromiseResponse<{
    servicerList: Array<{ userid: string; status: number }>
  }> {
    const access_token = await this.getToken()
    return await this.bin.post(
      '/cgi-bin/kf/service_state/get',
      { open_kfid, external_userid },
      { access_token }
    )
  }

  /**
   * 变更会话状态
   * https://work.weixin.qq.com/api/doc/90000/90135/94669#变更会话状态
   * @param open_kfid 客服帐号ID
   * @param external_userid 微信客户的external_userid
   * @param service_state 变更的目标状态，状态定义和所允许的变更可参考概述中的流程图和表格
   * @param servicer_userid 接待人员的userid，当state=3时要求必填，接待人员须处于“正在接待”中
   * @returns
   */
  async updateServiceState(
    open_kfid: string,
    external_userid: string,
    service_state: 1 | 2 | 3 | 4,
    servicer_userid?: string
  ): PromiseResponse {
    const access_token = await this.getToken()
    return await this.bin.post(
      '/cgi-bin/kf/service_state/trans',
      { open_kfid, external_userid, service_state, servicer_userid },
      { access_token }
    )
  }

  /**
   * 读取消息
   * 微信客户发送的消息、接待人员在企业微信回复的消息、发送消息接口发送失败事件（如被用户拒收）、客户点击菜单消息的回复消息，可以通过该接口获取具体的消息内容和事件。不支持读取通过发送消息接口发送的消息。
   * 支持的消息类型：文本、图片、语音、视频、文件、位置、链接、名片、小程序、菜单、事件。
   * https://work.weixin.qq.com/api/doc/90000/90135/94670#读取消息
   * @param cursor 上一次调用时返回的next_cursor，第一次拉取可以不填
   * @param token 回调事件返回的token字段，10分钟内有效；可不填，如果不填接口有严格的频率限制
   * @param limit 期望请求的数据量，默认值和最大值都为1000
   */
  async syncMessage(
    cursor?: string,
    token?: string,
    limit?: number
  ): PromiseResponse<{
    nextCursor: string
    hasMore: number
    messageList: Message[]
  }> {
    const access_token = await this.getToken()
    return await this.bin.post(
      '/cgi-bin/kf/sync_msg',
      { cursor, token, limit },
      { access_token }
    )
  }
}
