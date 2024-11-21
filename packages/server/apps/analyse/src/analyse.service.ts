import { InjectPrismaService, PrismaService } from '@app/prisma'
import { InjectRedisService, RedisService } from '@app/redis'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AnalyseService {
  @InjectRedisService
  private redisService: RedisService

  @InjectPrismaService
  private prismaService: PrismaService

  async ranking(examId: number) {
    const answers = await this.prismaService.answer.findMany({
      where: { examId },
    })
    const key = 'ranking:' + examId

    for (const answer of answers) {
      await this.redisService.zAdd(key, {
        [answer.id]: answer.score,
      })
    }
    const ids = await this.redisService.zRankingList(key, 0, 10)
    const res = await this.prismaService.answer.findMany({
      where: {
        id: {
          in: ids.map((i) => Number(i)),
        },
      },
      include: {
        answerer: true,
        exam: true,
      },
    })
    return res
  }
}
