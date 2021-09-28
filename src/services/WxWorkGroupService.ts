import { WxWorkServiceAuth } from '../base/WxWorkServiceAuth'
import { WxWork } from '../typings'

export class WxWorkGroupService extends WxWorkServiceAuth {
  // 创建群聊会话 https://work.weixin.qq.com/api/doc/90000/90135/90245
  async create(name: string, owner: string, userList: string[], chatId = '') {
    return (await this.bin.post(
      '/cgi-bin/appchat/create',
      { name, owner, userlist: userList, chatid: chatId },
      { access_token: await this.getToken() }
    )) as WxWork.CreateGroupResponse
  }

  // 修改群聊会话 https://work.weixin.qq.com/api/doc/90000/90135/90246
  async update(
    chatId: string,
    name: string,
    owner: string,
    addUserList: string[],
    delUserList: string[]
  ) {
    const param = { access_token: await this.getToken() }
    return (await this.bin.post(
      '/cgi-bin/appchat/update',
      {
        chatid: chatId,
        name,
        owner,
        add_user_list: addUserList,
        del_user_list: delUserList,
      },
      param
    )) as WxWork.NormalResponse
  }

  // 获取群聊会话 https://work.weixin.qq.com/api/doc/90000/90135/90247
  async get(name: string, owner: string, userList: string[], chatId = '') {
    const access_token = await this.getToken()
    return (await this.bin.get('/cgi-bin/appchat/create', {
      access_token,
      name,
      owner,
      userlist: userList,
      chatid: chatId,
    })) as WxWork.GetGroupResponse
  }

  // 发送纯文本消息
  async sendText(chatId: string, content: string, safe = 0) {
    const param = { access_token: await this.getToken() }
    const args = {
      chatid: chatId,
      msgtype: 'text',
      text: { content },
      safe,
    }
    return (await this.bin.post(
      'cgi-bin/appchat/send',
      { ...args },
      param
    )) as WxWork.NormalResponse
  }
}
