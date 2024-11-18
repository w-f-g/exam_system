import { IAnswerAddDto } from '@exam_system/types'
import { IsNotEmpty, IsString } from 'class-validator'

export class AnswerAddDto implements IAnswerAddDto {
  @IsNotEmpty({ message: '答卷内容不能为空' })
  @IsString()
  content: string

  @IsNotEmpty({ message: 'examId 不能为空' })
  examId: number
}
