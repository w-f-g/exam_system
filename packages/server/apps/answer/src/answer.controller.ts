import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common'
import { AnswerService } from './answer.service'
import { ClientProxy } from '@nestjs/microservices'
import { firstValueFrom } from 'rxjs'
import { RedisService } from '@app/redis'
import { RequireLogin, UserInfo } from '@app/common'
import { AnswerAddDto } from './dto/answer.dto'
import { ExcelService, InjectExcelService } from '@app/excel'

@Controller('answer')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Inject('EXAM_SERVICE')
  private examClient: ClientProxy

  @Inject(RedisService)
  redisService: RedisService

  @InjectExcelService
  private excelService: ExcelService

  @Get()
  async getHello() {
    this.redisService.set('aaa', 112)
    const value = await firstValueFrom(this.examClient.send('sum', [1, 3, 5]))
    return this.answerService.getHello() + ' ' + value
  }

  @Post('add')
  @RequireLogin()
  async add(@Body() data: AnswerAddDto, @UserInfo('userId') userId: number) {
    const res = await this.answerService.add(data, userId)
    return res
  }

  @Get('list')
  @RequireLogin()
  async list(@Query('examId', new ParseIntPipe()) examId: number) {
    if (!examId) {
      throw new BadRequestException('examId 不能为空')
    }
    return this.answerService.list(examId)
  }

  @Get('find/:id')
  @RequireLogin()
  async find(@Param('id', new ParseIntPipe()) id: number) {
    return this.answerService.find(id)
  }

  @Get('export')
  @RequireLogin()
  async export(@Query('examId', new ParseIntPipe()) examId: number) {
    if (!examId) {
      throw new BadRequestException('examId 不能为空')
    }
    const data = await this.answerService.list(examId)
    const columns = [
      { header: 'ID', key: 'id', width: 20 },
      { header: '分数', key: 'score', width: 30 },
      { header: '答题人', key: 'answerer', width: 30 },
      { header: '试卷', key: 'exam', width: 30 },
      { header: '创建时间', key: 'createTime', width: 30 },
    ]

    const res = data.map((x) => {
      return {
        id: x.id,
        score: x.score,
        answerer: x.answerer.username,
        exam: x.exam.name,
        createTime: x.createTime,
      }
    })
    return this.excelService.export(columns, res, 'answers.xlsx')
  }
}
