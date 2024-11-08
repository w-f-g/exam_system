import { request } from '@/utils'
import { IUserLoginDto, IUserLoginVo } from '@exam_system/types'

export const login = async (data: IUserLoginDto) => {
  const res = await request<IUserLoginVo>({
    url: '/user/login',
    method: 'post',
    data,
  })
  return res.data
}
