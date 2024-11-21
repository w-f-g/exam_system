import {
  BadRequestException,
  Controller,
  Get,
  ParseIntPipe,
  Query,
} from '@nestjs/common'
import { AnalyseService } from './analyse.service'

@Controller('analyse')
export class AnalyseController {
  constructor(private readonly analyseService: AnalyseService) {}

  @Get('ranking')
  async ranking(@Query('examId', new ParseIntPipe()) examId: number) {
    if (!examId) {
      throw new BadRequestException('examId 不能为空')
    }
    const res = await this.analyseService.ranking(examId)
    return res
  }
}
