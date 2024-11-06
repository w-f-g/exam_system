import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common'
import { ExamService } from './exam.service'
import { ExamAddDto, ExamSaveDto } from './dto/exam.dto'
import { RequireLogin, UserInfo } from '@app/common'

@Controller('exam')
export class ExamController {
  constructor(private readonly examService: ExamService) {}

  @Post('add')
  @RequireLogin()
  async add(@Body() data: ExamAddDto, @UserInfo('userId') userId: number) {
    const res = await this.examService.add(data, userId)
    return res
  }

  @Delete('delete/:id')
  @RequireLogin()
  async delete(
    @UserInfo('userId') userId: number,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    const res = await this.examService.delete(userId, id)
    return res
  }

  @Get('list')
  @RequireLogin()
  async list(@UserInfo('userId') userId: number, @Query('bin') bin: string) {
    const res = await this.examService.list(userId, bin)
    return res
  }

  @Post('save')
  @RequireLogin()
  async save(@Body() data: ExamSaveDto) {
    const res = await this.examService.save(data)
    return res
  }

  @Get('publish/:id')
  @RequireLogin()
  async publish(
    @UserInfo('userId') userId: number,
    @Param('id', new ParseIntPipe()) id: number,
  ) {
    const res = await this.examService.publish(userId, id)
    return res
  }
}
