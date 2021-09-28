# coa-wx-work

[![GitHub license](https://img.shields.io/badge/license-MIT-green.svg?style=flat-square)](LICENSE)
[![npm version](https://img.shields.io/npm/v/coa-wx-work.svg?style=flat-square)](https://www.npmjs.org/package/coa-wx-work)
[![npm downloads](https://img.shields.io/npm/dm/coa-wx-work.svg?style=flat-square)](http://npm-stat.com/charts.html?package=coa-wx-work)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](https://github.com/coajs/coa-wx-work/pulls)

简洁的企业微信 SDK for Node.js

## 特点

根据日常实际项目使用情况：

- 覆盖了绝大多数使用场景
- 统一了异步表现形式，全部返回 Promise
- 内置类型引用，无需额外查看文档，开箱即用，IDE 友好

## 快速开始

### 安装

```shell
yarn add coa-wx-work
```

### 使用

```typescript
import {
  WxWorkBin,
  WxWorkDepartmentService,
  WxWorkMemberService,
} from 'coa-wx-work'

// Bin实例，任何服务都必须依赖此实例
const bin = new WxWorkBin()

// 定义一个agent配置
const agent = {
  corpId: 'wwc2bf51eeeeeee825b1',
  agentId: '1000001',
  secret: 'J1jxD5X3eXXXXXXXXXXXXIAHvawDRU4',
}

// 成员类服务实例
const memberService = new WxWorkMemberService(bin, agent)

// 获取成员列表
await memberService.getList()
// 创建成员
await memberService.create({ userid: 'u0001', name: 'AAA' })
// 更新成员
await memberService.update('u0001', { name: 'AAAAA' })
// 删除成员
await memberService.delete(['u0001'])

// 部门类服务实例
const departmentService = new WxWorkDepartmentService(bin, agent)

// 获取部门列表
await departmentService.getList()
// 创建部门
await departmentService.create({ id: 1, name: 'DeptA' })
// 更新部门
await departmentService.update(1, { name: 'DeptAA' })
// 删除部门
await departmentService.delete(1)
```

### 企业微信机器人的使用

```typescript
import { WxWorkBin, WxWorkBotService, WxWorkMarkdown } from 'coa-wx-work'

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
```
