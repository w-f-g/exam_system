import { IAnswer } from '@exam_system/types'
import { InjectRepository } from '@nestjs/typeorm'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('answer')
export class Answer implements Omit<IAnswer, 'exam' | 'answerer'> {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
  })
  id: number

  @Column({
    name: 'content',
    type: 'text',
  })
  content: string

  @Column({
    name: 'score',
    type: 'integer',
    default: 0,
  })
  score: number

  @CreateDateColumn({
    name: 'createTime',
    type: 'timestamp',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  createTime: string | Date

  @CreateDateColumn({
    name: 'updateTime',
    type: 'timestamp',
    precision: 3,
    default: () => 'CURRENT_TIMESTAMP(3)',
  })
  updateTime: string | Date

  @Column({
    name: 'examId',
    type: 'int',
  })
  examId: number

  @Column({
    name: 'answererId',
    type: 'int',
  })
  answererId: number
}

export const InjectAnswerRepository = InjectRepository(Answer)
