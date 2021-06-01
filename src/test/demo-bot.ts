// @ts-nocheck
import { WxWorkBin, WxWorkBotService, WxWorkMarkdown } from '..'

// Bin实例，任何服务都必须依赖此实例
const bin = new WxWorkBin()

// 根据key创建一个bot服务
const botService = new WxWorkBotService(bin, 'XXXXX-XXXXX-XXXXX-XXXXX')

// 发送文本消息
await botService.text('文本消息')

// 通过base64方式发送图片消息
await botService.image('data of base64')

// 发送markdown消息
const content = new WxWorkMarkdown().header3('主题').text('主体内容')
await botService.markdown(content)
