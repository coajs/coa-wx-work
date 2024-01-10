const token = { token: '', expire: 1 }

const jsapiTicket = { ticket: '', expire: 1 }

const suiteToken = { suite_token: '', expire: 1 }

const authInfo = {
  accessToken: 'OprPeJ0zZiLxdKHCDUcw5ZYIpldZxkzivfFJSxZqeB2rqGIoBUEAEQIsGfbALi3I-pQF4vleTyWjXO6Pv-2tJSfGxWNIxeHkSgWyzFIH7kK6E-MgtBrOrawAScEpXGe_VAjVztFN2Px0jOpP_VuADqDkvnr-_31HfDWUl1UB6DBva5DfBidCzoEbx9DakmI2Dbe7_3fz50H24TG7BOsiLA',
  expiresIn: 7200,
  permanentCode: 'lETKz6zQCqDAN0Vj9jeZaNPgHGAsD-6db5wK3oha7x4',
  authCorpInfo: {
    corpid: 'wwc2bf51dac7d825b1',
    corpName: '钦轩科技',
    corpType: 'verified',
    corpRoundLogoUrl: 'https://wework.qpic.cn/wwpic/878908_KAswQ4kNTwCamS6_1637914211/0',
    corpSquareLogoUrl: 'https://p.qlogo.cn/bizmail/2wXFvYxRlWK1hRM7icGGnJDHQaibUOv0LSrDWkg4EnTvNxFSIZ4ic9fDQ/0',
    corpUserMax: 1000,
    corpWxqrcode: 'https://wework.qpic.cn/wwpic/64301_sJwvKc93TnGxJXh_1699412828/0',
    corpFullName: '钦轩科技',
    subjectType: 1,
    verifiedEndTime: 1728634926,
    corpScale: '201-500人',
    corpIndustry: 'IT服务',
    corpSubIndustry: '计算机软件/硬件/信息服务',
    location: '',
  },
  authInfo: {
    agent: [
      {
        agentid: 1000072,
        name: '钦家客服助手',
        squareLogoUrl: 'https://wework.qpic.cn/wwpic/746814_VzFGqM_xRNyt1oi_1698129937/0',
        privilege: {
          level: 1,
          allowParty: [9],
          allowUser: [],
          allowTag: [],
          extraParty: [],
          extraUser: [],
          extraTag: [],
        },
        authMode: 0,
        isCustomizedApp: false,
      },
    ],
  },
  authUserInfo: {
    userid: 'hope.gao@mm-iworld.com',
    name: 'woa1qMDgAAHJzzNAngzsA0mRKs3BEm3A',
    avatar: 'https://rescdn.qqmail.com/node/wwmng/wwmng/style/images/independent/DefaultAvatar$73ba92b5.png',
    openUserid: 'woa1qMDgAAHJzzNAngzsA0mRKs3BEm3A',
  },
  editionInfo: {
    agent: [
      {
        agentid: 1000072,
        editionId: 'spd16ca634caea52b0',
        editionName: '基础版',
        appStatus: 1,
        userLimit: 4294967295,
        expiredTime: 1700033474,
        isVirtualVersion: false,
      },
    ],
  },
}

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
      avatar:
        'http://wx.qlogo.cn/mmopen/ajNVdqHZLLA3WJ6DSZUfiakYe37PKnQhBIeOQBO4czqrnZDS79FH5Wm5m4X69TBicnHFlhiafvDwklOpZeXYQQ2icg/0',
      thumbAvatar:
        'http://wx.qlogo.cn/mmopen/ajNVdqHZLLA3WJ6DSZUfiakYe37PKnQhBIeOQBO4czqrnZDS79FH5Wm5m4X69TBicnHFlhiafvDwklOpZeXYQQ2icg/100',
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
const resultGetUserIdList = {
  errcode: 0,
  errmsg: "ok",
  dept_user: [
    {
      userid: "13530022094",
      department: 2000490
    },
  ]
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

  interface Suite {
    suiteId: string
    suiteSecret: string
    token?: string
    aesKey?: string
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
  type SuiteToken = typeof suiteToken
  type AuthInfo = typeof authInfo
  type UserList = typeof resultUserList
  type UserInfoByCode = typeof resultUserInfoByCode
  type NormalResponse = typeof normalResponse
  type CreateGroupResponse = typeof createGroupResponse
  type GetGroupResponse = typeof getGroupResponse
  type CreateDepartmentResponse = typeof departmentResponse
  type DepartmentList = typeof departmentList
  type User = Partial<typeof user>
  type getUserIdList = typeof resultGetUserIdList
  type MessageResponse = typeof messageResponse
}
