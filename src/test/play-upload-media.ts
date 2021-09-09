import { $ } from 'coa-helper'
import { WxWorkBin, WxWorkServiceAuth } from '..'

$.run(async () => {
  // Bin实例，任何服务都必须依赖此实例
  const bin = new WxWorkBin()

  // 定义一个agent配置
  const agent = {
    corpId: 'ww27bfxxxxxxxb493e',
    agentId: 'kefu',
    secret: 'vPE1UdKxxxxxxxxxxxxx9hJYs7dIxpNo',
    token: '3ixxxxxx2rGt',
    aesKey: 'WkfR5ipj108N88xxxxxxxxxxxxxxxxGKKXmoiUJGxbujm',
  }

  const avatarPath = 'test-avatar.jpg'

  // 创建一个服务
  const service = new WxWorkServiceAuth(bin, agent)

  const mediaResult = await service.uploadMedia(avatarPath, 'image')

  console.log('mediaResult', mediaResult)
})
