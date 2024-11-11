import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { login as loginRequest } from '@/apis'
import { IUserLoginDto, IUserLoginVo } from '@exam_system/types'

type State = {
  user: IUserLoginVo['user'] | null
  token: string
}

const state: State = {
  user: null,
  token: '',
}

export const useUserStore = create(
  persist(() => state, {
    name: 'user',
  }),
)

export const getUserState = () => useUserStore.getState()

export const login = async (userInfo: IUserLoginDto) => {
  const res = await loginRequest(userInfo)
  useUserStore.setState(() => {
    return {
      user: res.user,
      token: res.token,
    }
  })
}

export const logout = () => {
  return Promise.resolve().then(() => {
    useUserStore.setState(() => {
      return {
        user: null,
        token: '',
      }
    })
  })
}
