import { IExam } from './exam'
import { IUser } from './user'

export interface IAnswer {
  id: number
  content: string
  score: number
  createTime: string | Date
  updateTime: string | Date
  answererId: number
  answerer: IUser
  examId: number
  exam: IExam
}

export interface IAnswerAddDto extends Pick<IAnswer, 'content' | 'examId'> {}

export interface IAnswerAddVo extends Omit<IAnswer, 'answerer' | 'exam'> {}
