import { request } from '@/utils'
import { IExamAddDto, IExamListVo } from '@exam_system/types'

export const getExamList = async () => {
  const res = await request<IExamListVo[]>({
    url: '/exam/list',
  })

  return res.data
}

export const addExam = async (data: IExamAddDto) => {
  const res = await request<IExamListVo>({
    url: '/exam/add',
    method: 'post',
    data,
  })
  return res.data
}

export const deleteExam = async (id: number) => {
  const res = await request({
    url: '/exam/delete/' + id,
    method: 'delete',
  })
  return res
}

export const recoverExam = async (id: number) => {
  const res = await request({
    url: '/exam/recover/' + id,
    method: 'put',
  })
  return res
}
