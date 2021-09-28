import { WxWorkServiceAuth } from '../base/WxWorkServiceAuth'
import { WxWorkMarkdown } from '../libs/WxWorkMarkdown'
import { WxWork } from '../typings'

export class WxWorkMessageService extends WxWorkServiceAuth {
  // 文本消息 https://work.weixin.qq.com/api/doc/90000/90135/90236#%E6%96%87%E6%9C%AC%E6%B6%88%E6%81%AF
  async text(
    { userIds = [] as [], deptIds = [] as number[], tagIds = [] as number[] },
    content: string
  ) {
    const data = { msgtype: 'text', text: { content } }
    return await this.send({ userIds, deptIds, tagIds }, data)
  }

  // 文本卡片消息 https://work.weixin.qq.com/api/doc/90000/90135/90236#%E6%96%87%E6%9C%AC%E5%8D%A1%E7%89%87%E6%B6%88%E6%81%AF
  async textCard(
    { userIds = [] as [], deptIds = [] as number[], tagIds = [] as number[] },
    title: string,
    description: string,
    url: string
  ) {
    const data = { msgtype: 'textcard', textcard: { title, description, url } }
    return await this.send({ userIds, deptIds, tagIds }, data)
  }

  // markdown消息 https://work.weixin.qq.com/api/doc/90000/90135/90236#markdown%E6%B6%88%E6%81%AF
  async markdown(
    {
      userIds = [] as string[],
      deptIds = [] as number[],
      tagIds = [] as number[],
    },
    markdown: WxWorkMarkdown
  ) {
    const data = {
      msgtype: 'markdown',
      markdown: { content: markdown.value() },
    }
    return await this.send({ userIds, deptIds, tagIds }, data)
  }

  protected async send(
    {
      userIds = [] as string[],
      deptIds = [] as number[],
      tagIds = [] as number[],
    },
    data: WxWork.Dic
  ) {
    const touser = userIds.join('|')
    const toparty = deptIds.join('|')
    const totag = tagIds.join('|')
    return await this.bin.post(
      '/cgi-bin/message/send',
      { agentid: this.agent.agentId, touser, toparty, totag, ...data },
      { access_token: await this.getToken() }
    )
  }
}
