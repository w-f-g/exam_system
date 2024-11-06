import { IExamAddDto, IExamSaveDto } from '@exam_system/types'
import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class ExamAddDto implements IExamAddDto {
  @IsNotEmpty({ message: '考试名不能为空' })
  name: string
}

export class ExamSaveDto implements IExamSaveDto {
  @IsNotEmpty({ message: '考试 id 不能为空' })
  @IsNumber()
  id: number

  @IsString()
  content: string
}
