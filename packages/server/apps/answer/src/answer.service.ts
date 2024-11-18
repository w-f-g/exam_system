import { Injectable } from '@nestjs/common'
import { AnswerAddDto } from './dto/answer.dto'
import { InjectPrismaService, PrismaService } from '@app/prisma'

@Injectable()
export class AnswerService {
  @InjectPrismaService
  private prismaService: PrismaService

  getHello(): string {
    return 'Hello World!'
  }

  async add(data: AnswerAddDto, userId: number) {
    const exam = await this.prismaService.exam.findUnique({
      where: { id: data.examId },
    })
    // 试卷题目
    let questions = []
    try {
      questions = JSON.parse(exam.content)
    } catch (e) {
      console.log(e)
    }
    // 答题
    let answers = []
    try {
      answers = JSON.parse(data.content)
    } catch (e) {
      console.log(e)
    }
    const score = answers.reduce((prev, answer) => {
      const question = questions.find((x) => x.id === answer.id)
      const answerValue = answer.answer.toString()
      const value = question.answer.toString()

      if (answerValue === value) {
        return prev + question.score
      }
      return prev
    }, 0)
    return this.prismaService.answer.create({
      data: {
        content: data.content,
        score,
        answerer: {
          connect: {
            id: userId,
          },
        },
        exam: {
          connect: {
            id: data.examId,
          },
        },
      },
    })
  }

  async list(examId: number) {
    return this.prismaService.answer.findMany({
      where: {
        examId,
      },
      include: {
        exam: true,
        answerer: true,
      },
    })
  }

  async find(id: number) {
    return this.prismaService.answer.findUnique({
      where: { id },
      include: {
        exam: true,
        answerer: true,
      },
    })
  }
}
