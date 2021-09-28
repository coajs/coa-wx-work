import { $, _ } from 'coa-helper'
import { WxWorkServiceAuth } from '../base/WxWorkServiceAuth'
import { WxWork } from '../typings'

export class WxWorkDepartmentService extends WxWorkServiceAuth {
  // 创建部门 https://work.weixin.qq.com/api/doc/90000/90135/90205
  async create({
    id = 0,
    name = '',
    nameEn = '',
    parentid = 0,
    order = 0,
  } = {}) {
    const params = _.pickBy({ id, name, name_en: nameEn, parentid, order })
    return (await this.bin.post(
      '/cgi-bin/department/create',
      $.snakeCaseKeys(params),
      { access_token: await this.getToken() },
      {},
      [60008]
    )) as WxWork.CreateDepartmentResponse
  }

  // 更新部门 https://work.weixin.qq.com/api/doc/90000/90135/90206
  async update(
    id: number,
    {
      name,
      nameEn,
      parentid,
      order,
    }: { name?: string; nameEn?: string; parentid?: number; order?: number }
  ) {
    const access_token = await this.getToken()
    const params = { id, name, name_en: nameEn, parentid, order }
    return (await this.bin.post(
      '/cgi-bin/department/update',
      _.pickBy(params),
      { access_token }
    )) as WxWork.NormalResponse
  }

  // 删除部门 https://work.weixin.qq.com/api/doc/90000/90135/90207
  async delete(id: number) {
    return (await this.bin.get('cgi-bin/department/delete', {
      access_token: await this.getToken(),
      id,
    })) as WxWork.NormalResponse
  }

  // 获取部门列表 https://work.weixin.qq.com/api/doc/90000/90135/90208
  async getList(id?: number) {
    const params = id ? { id } : {}
    return (await this.bin.get('cgi-bin/department/list', {
      access_token: await this.getToken(),
      ...params,
    })) as WxWork.DepartmentList
  }
}
