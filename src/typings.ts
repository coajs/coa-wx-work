const token = { token: '', expire: 1 }

const jsapiTicket = { ticket: '', expire: 1 }

const resultUserList = {
  errcode: 0,
  errmsg: 'ok',
  userlist: [
    {
      userid: 'zhangsan',
      name: '李四',
      department: [1, 2],
      order: [1, 2],
      position: '后台工程师',
      mobile: '13800000000',
      gender: '1',
      email: 'zhangsan@gzdev.com',
      isLeaderInDept: [1, 0],
      avatar: 'http://wx.qlogo.cn/mmopen/ajNVdqHZLLA3WJ6DSZUfiakYe37PKnQhBIeOQBO4czqrnZDS79FH5Wm5m4X69TBicnHFlhiafvDwklOpZeXYQQ2icg/0',
      thumbAvatar: 'http://wx.qlogo.cn/mmopen/ajNVdqHZLLA3WJ6DSZUfiakYe37PKnQhBIeOQBO4czqrnZDS79FH5Wm5m4X69TBicnHFlhiafvDwklOpZeXYQQ2icg/100',
      telephone: '020-123456',
      alias: 'jackzhang',
      status: 1,
      address: '广州市海珠区新港中路',
      hide_mobile: 0,
      english_name: 'jacky',
      openUserid: 'xxxxxx',
      mainDepartment: 1,
      extattr: {
        attrs: [
          {
            type: 0,
            name: '文本名称',
            text: {
              value: '文本',
            },
          },
          {
            type: 1,
            name: '网页名称',
            web: {
              url: 'http://www.test.com',
              title: '标题',
            },
          },
        ],
      },
      qrCode: 'https://open.work.weixin.qq.com/wwopen/userQRCode?vcode=xxx',
      externalPosition: '产品经理',
      externalProfile: {
        externalCorpName: '企业简称',
        externalAttr: [
          {
            type: 0,
            name: '文本名称',
            text: {
              value: '文本',
            },
          },
          {
            type: 1,
            name: '网页名称',
            web: {
              url: 'http://www.test.com',
              title: '标题',
            },
          },
          {
            type: 2,
            name: '测试app',
            miniprogram: {
              appid: 'wx8bd80126147dFAKE',
              pagepath: '/index',
              title: 'miniprogram',
            },
          },
        ],
      },
    },
  ],
}

const resultUserInfoByCode = {
  errcode: 0,
  errmsg: 'ok',
  userId: 'USERID',
  openId: 'OPENID',
}

const normalResponse = {
  errcode: 0,
  errmsg: 'ok',
}

const createGroupResponse = {
  errcode: 0,
  errmsg: 'ok',
  chatid: 'CHATID',
}

const getGroupResponse = {
  errcode: 0,
  errmsg: 'ok',
  chatInfo: {
    chatid: 'CHATID',
    name: 'NAME',
    owner: 'userid2',
    userlist: ['userid1', 'userid2', 'userid3'],
  },
}

const departmentResponse = {
  errcode: 0,
  errmsg: 'created',
  id: 2,
}

const departmentList = {
  errcode: 0,
  errmsg: 'ok',
  department: [
    {
      id: 2,
      name: '广州研发中心',
      nameEn: 'RDGZ',
      parentid: 1,
      order: 10,
    },
    {
      id: 3,
      name: '邮箱产品部',
      nameEn: 'mail',
      parentid: 2,
      order: 40,
    },
  ],
}

const user = {
  userid: 'zhangsan',
  name: '张三',
  alias: 'jackzhang',
  mobile: '+86 13800000000',
  department: [1, 2],
  order: [10, 40],
  position: '产品经理',
  gender: '1',
  email: 'zhangsan@gzdev.com',
  isLeaderInDept: [1, 0],
  enable: 1,
  avatarMediaid: '2-G6nrLmr5EC3MNb_-zL1dDdzkd0p7cNliYu9V5w7o8K0',
  telephone: '020-123456',
  address: '广州市海珠区新港中路',
  mainDepartment: 1,
  extattr: {
    attrs: [
      {
        type: 0,
        name: '文本名称',
        text: {
          value: '文本',
        },
      },
      {
        type: 1,
        name: '网页名称',
        web: {
          url: 'http://www.test.com',
          title: '标题',
        },
      },
    ],
  },
  toInvite: true,
  externalPosition: '高级产品经理',
  externalProfile: {
    externalCorp_name: '企业简称',
    externalAttr: [
      {
        type: 0,
        name: '文本名称',
        text: {
          value: '文本',
        },
      },
      {
        type: 1,
        name: '网页名称',
        web: {
          url: 'http://www.test.com',
          title: '标题',
        },
      },
      {
        type: 2,
        name: '测试app',
        miniprogram: {
          appid: 'wx8bd8012614784fake',
          pagepath: '/index',
          title: 'my miniprogram',
        },
      },
    ],
  },
}

const messageResponse = {
  errcode: 0,
  errmsg: 'ok',
  invaliduser: 'userid1|userid2',
  invalidparty: 'partyid1|partyid2',
  invalidtag: 'tagid1|tagid2',
}

export declare namespace WxWork {
  interface Dic<T = any> {
    [index: string]: T
  }

  interface Agent {
    agentId: string
    corpId: string
    secret: string
    token?: string
    aesKey?: string
  }

  type Token = typeof token
  type JsapiTicket = typeof jsapiTicket
  type UserList = typeof resultUserList
  type UserInfoByCode = typeof resultUserInfoByCode
  type NormalResponse = typeof normalResponse
  type CreateGroupResponse = typeof createGroupResponse
  type GetGroupResponse = typeof getGroupResponse
  type CreateDepartmentResponse = typeof departmentResponse
  type DepartmentList = typeof departmentList
  type User = Partial<typeof user>

  type MessageResponse = typeof messageResponse
}
