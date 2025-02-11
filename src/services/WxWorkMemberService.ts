import { $, _ } from 'coa-helper'
import { WxWorkServiceAuth } from '../base/WxWorkServiceAuth'
import { WxWork } from '../typings'

export class WxWorkMemberService extends WxWorkServiceAuth {
  // 创建成员 https://work.weixin.qq.com/api/doc/90000/90135/90195
  async create(user: WxWork.User) {
    return (await this.bin.post(
      '/cgi-bin/user/create',
      $.snakeCaseKeys(_.cloneDeep(user)),
      { access_token: await this.getToken() },
      {},
      [60102, 60104]
    )) as WxWork.NormalResponse
  }

  // 删除成员 https://work.weixin.qq.com/api/doc/90000/90135/90198
  async delete(useridlist: string[]) {
    return (await this.bin.post(
      '/cgi-bin/user/batchdelete',
      { useridlist },
      { access_token: await this.getToken() }
    )) as WxWork.NormalResponse
  }

  // 更新成员 https://work.weixin.qq.com/api/doc/90000/90135/90197
  async update(userId: string, user: WxWork.User) {
    return (await this.bin.post(
      '/cgi-bin/user/update',
      { userid: userId, ...user },
      { access_token: await this.getToken() }
    )) as WxWork.NormalResponse
  }

  // 获取加入企业二维码 https://work.weixin.qq.com/api/doc/90000/90135/91714
  async getJoinQr(size_type: number) {
    // 1: 171 x 171; 2: 399 x 399; 3: 741 x 741; 4: 2052 x 2052
    return await this.bin.get('/cgi-bin/corp/get_join_qrcode', {
      access_token: await this.getToken(),
      size_type,
    })
  }

  // 获取部门成员 https://work.weixin.qq.com/api/doc/90000/90135/90200
  async getSimplelist(departmentId: number) {
    return await this.bin.get('cgi-bin/user/simplelist', {
      access_token: await this.getToken(),
      department_id: departmentId,
    })
  }

  // 获取部门成员详情 https://work.weixin.qq.com/api/doc/90000/90135/90201
  async getList(department_id = 1, fetch_child = 1) {
    const result = await this.bin.get('/cgi-bin/user/list', {
      access_token: await this.getToken(),
      department_id,
      fetch_child,
    })
    return result as WxWork.UserList
  }

  // 获取部门成员详情 https://work.weixin.qq.com/api/doc/90000/90135/90201
  async getUserIdList(cursor = '', limit = 10000) {
    const result = await this.bin.post(
      '/cgi-bin/user/list_id',
      { cursor, limit },
      { access_token: await this.getToken() }
    )
    return result as WxWork.getUserIdList
  }
  // 通过ID获取用户 https://work.weixin.qq.com/api/doc/90000/90135/90196
  async getUserById(userid: string) {
    const result = await this.bin.get('/cgi-bin/user/get', {
      access_token: await this.getToken(),
      userid,
    })
    return result as WxWork.User
  }

  // 获取访问用户身份 https://work.weixin.qq.com/api/doc/90000/90135/91023
  async getUserByCode(code: string) {
    const result = await this.bin.get('/cgi-bin/user/getuserinfo', {
      access_token: await this.getToken(),
      code,
    })
    return result as WxWork.UserInfoByCode
  }

  // 获取企业活跃成员数量 https://work.weixin.qq.com/api/doc/90000/90135/92714
  async getActiveUserStat(date: string) {
    return await this.bin.post(
      'cgi-bin/user/get_active_stat',
      { date },
      { access_token: await this.getToken() }
    )
  }
}
