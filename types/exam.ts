import { IUser } from './user'

export interface IExam {
  id: number
  name: string
  isPublish: boolean
  isDelete: boolean
  content: string
  createTime: string | Date
  updateTime: string | Date
  createUserId: number
  createUser: IUser
}

export interface IExamAddDto extends Pick<IExam, 'name'> {}

export interface IExamSaveDto extends Pick<IExam, 'id' | 'content'> {}
