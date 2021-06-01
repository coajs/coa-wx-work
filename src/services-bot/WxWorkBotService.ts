import { dayjs } from 'coa-helper'
import { WxWorkBin } from '../libs/WxWorkBin'
import { WxWorkMarkdown } from './WxWorkMarkdown'

// https://work.weixin.qq.com/api/doc/90000/90136/91770
export class WxWorkBotService {
  readonly bin: WxWorkBin
  readonly key: string

  constructor(bin: WxWorkBin, key: string) {
    this.bin = bin
    this.key = key
  }

  async text(content: string, mentioned_list: string[] = [], mentioned_mobile_list: string[] = []) {
    const data = { msgtype: 'text', text: { content, mentioned_list, mentioned_mobile_list } }
    return await this.send(data)
  }

  async json(title: string, env: string, data: any) {
    return await this.text(`${title} ${env} ${dayjs().format('YYYY-MM-DD HH:mm:ss')} \n${JSON.stringify(data, undefined, 2)}`)
  }

  async markdown(markdown: WxWorkMarkdown) {
    const data = { msgtype: 'markdown', markdown: { content: markdown.value() } }
    return await this.send(data)
  }

  async image(base64: string, md5: string) {
    const data = { msgtype: 'image', image: { base64, md5 } }
    return await this.send(data)
  }

  async news(articles: Array<{ title: string; description?: string; url: string; picurl?: string }>) {
    const data = { msgtype: 'news', news: { articles } }
    return await this.send(data)
  }

  protected async send(data: any) {
    return await this.bin.post('/cgi-bin/webhook/send', data, { key: this.key })
  }
}
