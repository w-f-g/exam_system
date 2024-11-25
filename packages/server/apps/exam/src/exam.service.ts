import { Injectable } from '@nestjs/common'
import { ExamAddDto, ExamSaveDto } from './dto/exam.dto'
import { InjectRedisService, RedisService } from '@app/redis'
import { Exam, InjectExamRepository } from '@app/db'
import { Repository } from 'typeorm'

@Injectable()
export class ExamService {
  @InjectRedisService
  private redisService: RedisService

  @InjectExamRepository
  private examRepository: Repository<Exam>

  add(data: ExamAddDto, userId: number) {
    return this.examRepository.insert({
      name: data.name,
      content: '',
      createUserId: userId,
    })
    /*     return this.prismaService.exam.create({
      data: {
        name: data.name,
        content: '',
        createUser: {
          connect: {
            id: userId,
          },
        },
      },
    }) */
  }

  list(userId: number, bin: string) {
    return this.examRepository.findBy(
      bin !== undefined
        ? {
            createUserId: userId,
            isDelete: true,
          }
        : {
            createUserId: userId,
          },
    )
    /*     return this.prismaService.exam.findMany({
      where:
        bin !== undefined
          ? {
              createUserId: userId,
              isDelete: true,
            }
          : {
              createUserId: userId,
            },
    }) */
  }

  delete(userId: number, id: number) {
    return this.examRepository.update(
      {
        id,
        createUserId: userId,
      },
      { isDelete: true },
    )
    /*     return this.prismaService.exam.update({
      data: {
        isDelete: true,
      },
      where: {
        id,
        createUserId: userId,
      },
    }) */
  }

  recover(userId: number, id: number) {
    return this.examRepository.update(
      {
        id,
        createUserId: userId,
      },
      { isDelete: false },
    )
    /*     return this.prismaService.exam.update({
      data: {
        isDelete: false,
      },
      where: {
        id,
        createUserId: userId,
      },
    }) */
  }

  async publish(userId: number, id: number) {
    return this.examRepository.update(
      {
        id,
        createUserId: userId,
      },
      { isPublish: true },
    )
    /*     return this.prismaService.exam.update({
      data: {
        isPublish: true,
      },
      where: {
        id,
        createUserId: userId,
      },
    }) */
  }

  async save(data: ExamSaveDto) {
    return this.examRepository.update(
      {
        id: data.id,
      },
      { content: data.content },
    )
    /*     return this.prismaService.exam.update({
      data: {
        content: data.content,
      },
      where: {
        id: data.id,
      },
    }) */
  }

  async unpublish(userId: number, id: number) {
    return this.examRepository.update(
      {
        id,
        createUserId: userId,
      },
      { isPublish: false },
    )
    /*     return this.prismaService.exam.update({
      data: {
        isPublish: false,
      },
      where: {
        id,
        createUserId: userId,
      },
    }) */
  }

  async find(id: number) {
    return this.examRepository.findOneBy({ id })
    /*     return this.prismaService.exam.findUnique({
      where: {
        id,
      },
    }) */
  }
}
