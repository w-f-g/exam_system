import { IUser } from '@exam_system/types'
import { InjectRepository } from '@nestjs/typeorm'
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm'

@Entity('user')
export class User implements IUser {
  @PrimaryGeneratedColumn({
    name: 'id',
    type: 'bigint',
  })
  id: number

  @Column({
    name: 'username',
    type: 'varchar',
    length: 50,
    unique: true,
  })
  username: string

  @Column({
    name: 'password',
    type: 'varchar',
    length: 50,
  })
  password: string

  @Column({
    name: 'email',
    type: 'varchar',
    length: 50,
  })
  email: string

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
}

export const InjectUserRepository = InjectRepository(User)
