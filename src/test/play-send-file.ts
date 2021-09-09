import { $ } from 'coa-helper'
import { resolve } from 'path'
import { WxWorkBin, WxWorkBotService } from '..'

$.run(async () => {
  // Bin实例，任何服务都必须依赖此实例
  const bin = new WxWorkBin()

  const key = '4acd13b8-xxxx-xxxxx-xxxx-7681d63c5376'

  // 根据key创建一个bot服务
  const botService = new WxWorkBotService(bin, key)

  const filename = resolve(__dirname, __filename)
  console.log(filename)

  // 上传
  const { mediaId } = await botService.upload(filename)
  console.log(mediaId)

  // 发送
  await botService.file(mediaId)
})
