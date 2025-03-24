// @ts-nocheck
import { WxWorkBin, WxWorkDepartmentService, WxWorkMemberService, WxWorkTicketService } from '..'

// Bin实例，任何服务都必须依赖此实例
const bin = new WxWorkBin()

// // 定义一个agent配置
// const agent = {
//   corpId: 'wwc2bf51eeeeeee825b1',
//   agentId: '1000001',
//   secret: 'J1jxD5X3eXXXXXXXXXXXXIAHvawDRU4',
// }
// // 成员类服务
// const memberService = new WxWorkMemberService(bin, agent)
//
// // 获取成员列表
// await memberService.getList()
// // 创建成员
// await memberService.create({ userid: 'u0001', name: 'AAA' })
// // 更新成员
// await memberService.update('u0001', { name: 'AAAAA' })
// // 删除成员
// await memberService.delete(['u0001'])
//
// // 部门类服务
// const departmentService = new WxWorkDepartmentService(bin, agent)
//
// // 获取部门列表
// await departmentService.getList()
// // 创建部门
// await departmentService.create({ id: 1, name: 'DeptA' })
// // 更新部门
// await departmentService.update(1, { name: 'DeptAA' })
// // 删除部门
// await departmentService.delete(1)


const suite = {
    authHost: 'https://t1.isus.vip',
    kefuSuite: { suiteId: 'wwccxxxxxea6d', suiteSecret: 'DSDIbUWFMxxxxxx8uji_lquUI', token: 'EoAmvc1xxxxxt7YbzG', aeskey: 'RqcDofxxxxx4wqM' },
}

const wxWorkTicketService = new WxWorkTicketService(bin, suite.kefuSuite)

// const res = wxWorkTicketService.getMedia('wwc2xxxxx5b1','WFVR0kxxxxxxxY8bXQAE','1Nk3GcoO88lDNO69eVJE7KEbp1Of-3sHtFzjGaXXXfm_zAikph0Y07WUc-b5DXVmicZE-8uIZQPAy5Px-Oozd9w')
// console.log(res.then(
//     (res)=>{
//       console.log(res)
//     }
// ))

const res =  wxWorkTicketService.syncMsg('wwc2xxxxx5b1','WFVR0kxxxxxxxY8bXQAE','wka1qMxxxxxx2qxl0mQ')
console.log(res.then(
    (res)=>{
      console.log(444)
      console.log(res)
        for (const item of res.msgList) {
          if(item.origin===3){
            console.log(item.text || item.image)
          }
          if(item.origin===4){
            console.log(item.event)
          }
        }
    }
))

// const res = wxWorkTicketService.sendMsg('wwc2xxxxx5b1','WFVR0kxxxxxxxY8bXQAE','wka1qMxxxxxx2qxl0mQ','wma1qMDgAAKGpqdfHP6pTxnH-JVpDZCQ','image',{image:{media_id:'1Nk3GcoO88lDNO69eVJE7KEbp1Of-3sHtFzjGaXXXfm_zAikph0Y07WUc-b5DXVmicZE-8uIZQPAy5Px-Oozd9w'}})
// console.log(res.then(
//     (res)=>{
//       console.log(444)
//       console.log(res)
//     }
// ))


