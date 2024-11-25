import { IExam } from '@exam_system/types'
import { InjectRepository } from '@nestjs/typeorm'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('exam')
export class Exam implements Omit<IExam, 'createUser'> {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
  })
  id: number

  @Column({
    name: 'name',
    type: 'varchar',
    length: 50,
  })
  name: string

  @Column({
    name: 'isPublish',
    type: 'boolean',
    default: false,
  })
  isPublish: boolean

  @Column({
    name: 'isDelete',
    type: 'boolean',
    default: false,
  })
  isDelete: boolean

  @Column({
    name: 'content',
    type: 'text',
  })
  content: string

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
    name: 'createUserId',
    type: 'int',
  })
  createUserId: number
}

export const InjectExamRepository = InjectRepository(Exam)
