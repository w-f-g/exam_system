import { Controller, Get, Inject } from '@nestjs/common'
import { AnswerService } from './answer.service'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import { RedisService } from '@app/redis'

@Controller()
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Inject('EXAM_SERVICE')
  private examClient: ClientProxy

  @Inject(RedisService)
  redisService: RedisService

  @Get()
  async getHello() {
    this.redisService.set('aaa', 112)
    const value = await firstValueFrom(this.examClient.send('sum', [1, 3, 5]))
    return this.answerService.getHello() + ' ' + value
  }
}
