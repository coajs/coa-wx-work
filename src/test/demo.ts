// @ts-nocheck
import { WxWorkBin, WxWorkDepartmentService, WxWorkMemberService } from '..'

// Bin实例，任何服务都必须依赖此实例
const bin = new WxWorkBin()

// 定义一个agent配置
const agent = {
  corpId: 'wwc2bf51eeeeeee825b1',
  agentId: '1000001',
  secret: 'J1jxD5X3eXXXXXXXXXXXXIAHvawDRU4'
}
// 成员类服务
const memberService = new WxWorkMemberService(bin, agent)

// 获取成员列表
await memberService.getList()
// 创建成员
await memberService.create({ userid: 'u0001', name: 'AAA' })
// 更新成员
await memberService.update('u0001', { name: 'AAAAA' })
// 删除成员
await memberService.delete(['u0001'])

// 部门类服务
const departmentService = new WxWorkDepartmentService(bin, agent)

// 获取部门列表
await departmentService.getList()
// 创建部门
await departmentService.create({ id: 1, name: 'DeptA' })
// 更新部门
await departmentService.update(1, { name: 'DeptAA' })
// 删除部门
await departmentService.delete(1)