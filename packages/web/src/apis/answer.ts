import { request } from '@/utils'
import { IAnswerAddDto, IAnswerAddVo } from '@exam_system/types'

export const addAnswer = async (data: IAnswerAddDto) => {
  const res = await request<IAnswerAddVo>({
    url: '/answer/add',
    method: 'post',
    data,
  })
  return res
}

export const findAnswer = async (id: number) => {
  const res = await request<IAnswerAddVo>({
    url: '/answer/find/' + id,
  })
  return res.data
}
