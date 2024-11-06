import { Injectable } from '@nestjs/common'
import { ExamAddDto, ExamSaveDto } from './dto/exam.dto'
import { InjectRedisService, RedisService } from '@app/redis'
import { InjectPrismaService, PrismaService } from '@app/prisma'

@Injectable()
export class ExamService {
  @InjectRedisService
  private redisService: RedisService

  @InjectPrismaService
  private prismaService: PrismaService

  add(data: ExamAddDto, userId: number) {
    return this.prismaService.exam.create({
      data: {
        name: data.name,
        content: '',
        createUser: {
          connect: {
            id: userId,
          },
        },
      },
    })
  }

  list(userId: number, bin: string) {
    return this.prismaService.exam.findMany({
      where:
        bin !== undefined
          ? {
              createUserId: userId,
              isDelete: true,
            }
          : {
              createUserId: userId,
            },
    })
  }

  delete(userId: number, id: number) {
    return this.prismaService.exam.update({
      data: {
        isDelete: true,
      },
      where: {
        id,
        createUserId: userId,
      },
    })
  }

  async publish(userId: number, id: number) {
    return this.prismaService.exam.update({
      data: {
        isPublish: true,
      },
      where: {
        id,
        createUserId: userId,
      },
    })
  }

  async save(data: ExamSaveDto) {
    return this.prismaService.exam.update({
      data: {
        content: data.content,
      },
      where: {
        id: data.id,
      },
    })
  }
}
