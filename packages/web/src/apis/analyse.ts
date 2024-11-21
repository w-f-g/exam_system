import { request } from '@/utils'
import { IAnswer } from '@exam_system/types'

export const ranking = async (examId: number) => {
  const res = await request<IAnswer[]>({
    url: '/analyse/ranking',
    params: {
      examId,
    },
  })
  return res.data
}
