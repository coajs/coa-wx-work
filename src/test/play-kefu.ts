import { CoaError } from 'coa-error'
import { $ } from 'coa-helper'
import { WxWorkBin, WxWorkKefuService } from '..'

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

  const mediaId = '3ZoWu24IU841Aiq2OlomXxxxxxxxxxxxxxxxxxxxxxxxIamky5ryhtvT'
  const userId = 'aexxxxxxxxo'

  // 创建一个服务
  const service = new WxWorkKefuService(bin, agent)

  // 创建客服
  const newAccount = await service.createAccount('小张', mediaId)
  console.log('newAccount', newAccount)

  // 获取客服列表
  const accountList = await service.getAccountList()
  console.log('accountList', accountList)

  const account = accountList.accountList.pop() ?? CoaError.message('', '')

  // 删除客服
  const accountDeleteResult = await service.removeAccount('open_kfid')
  console.log('accountDeleteResult', accountDeleteResult)

  // 获取客服链接
  const contactWay = await service.addContactWay(account.openKfid)
  console.log('contactWay', contactWay)

  // 添加接待人员
  const addServicerResult = await service.addServicer(account.openKfid, [userId])
  console.log('addServicerResult', addServicerResult)

  // 获取接待人员列表
  const servicerList = await service.getServicerList(account.openKfid)
  console.log('servicerList', servicerList)

  // 同步消息
  const asynMessageResunlt = await service.syncMessage()
  console.log('asynMessageResunlt', asynMessageResunlt)

  // 解密
  const data = await service.decrypt('encryptedData....')
  console.log('data', data)
})
