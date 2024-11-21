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

export const exportExam = async (id: number) => {
  const res = await request<Blob>({
    url: '/answer/export',
    params: {
      examId: id,
    },
    responseType: 'blob',
  })

  const file = new Blob([res.data])
  const fileNameHeader: string = res.headers['content-disposition']
  const fileName = fileNameHeader.match(/filename=(.*)/)![1]
  const url = URL.createObjectURL(file)

  const a = document.createElement('a')
  a.href = url
  a.download = fileName
  a.click()
  URL.revokeObjectURL(url)
}
