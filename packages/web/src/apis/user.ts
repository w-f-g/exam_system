import { request } from '@/utils'
import {
  IUserLoginDto,
  IUserLoginVo,
  IUserRegisterDto,
  IUserUpdatePasswordDto,
} from '@exam_system/types'

export const login = async (data: IUserLoginDto) => {
  const res = await request<IUserLoginVo>({
    url: '/user/login',
    method: 'post',
    data,
  })
  return res.data
}

export const sendRegisterCaptcha = async (address: string) => {
  const res = await request({
    url: '/user/register_captcha',
    params: {
      address,
    },
  })
  return res
}

export const register = async (data: IUserRegisterDto) => {
  const res = await request({
    url: '/user/register',
    method: 'post',
    data,
  })
  return res
}

export const sendUpdatePasswordCaptcha = async (address: string) => {
  const res = await request({
    url: '/user/update_password/captcha',
    params: {
      address,
    },
  })
  return res
}

export const updatePassword = async (data: IUserUpdatePasswordDto) => {
  const res = await request({
    url: '/user/update_password',
    method: 'post',
    data,
  })
  return res
}
