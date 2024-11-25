import { Answer, InjectAnswerRepository } from '@app/db'
import { InjectRedisService, RedisService } from '@app/redis'
import { Injectable } from '@nestjs/common'
import { Repository } from 'typeorm'

@Injectable()
export class AnalyseService {
  @InjectRedisService
  private redisService: RedisService

  @InjectAnswerRepository
  private answerRepository: Repository<Answer>

  async ranking(examId: number) {
    const answers = await this.answerRepository.findBy({ examId })
    if (answers.length === 0) return []

    const key = 'ranking:' + examId
    for (const answer of answers) {
      await this.redisService.zAdd(key, {
        [answer.id]: answer.score,
      })
    }
    const ids = await this.redisService.zRankingList(key, 0, 10)
    if (ids.length === 0) return []

    const res = await this.answerRepository.query(
      `
      SELECT
        a.id, a.content, a.score, a.createTime, a.updateTime, a.examId,
        u.id as answererId, u.username, u.email
      FROM answer as a
      LEFT JOIN user as u
      on a.answererId = u.id
      WHERE a.id in (${ids.join()})
      `,
    )
    /*     const res = await this.prismaService.answer.findMany({
      where: {
        id: {
          in: ids.map((i) => Number(i)),
        },
      },
      include: {
        answerer: true,
        exam: true,
      },
    }) */
    return res.map((x) => {
      return {
        id: x.id,
        content: x.content,
        score: x.score,
        createTime: x.createTime,
        updateTime: x.updateTime,
        examId: x.examId,
        answerer: {
          id: x.answererId,
          username: x.username,
          email: x.email,
        },
      }
    })
  }
}
