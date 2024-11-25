import { Injectable } from '@nestjs/common'
import { AnswerAddDto } from './dto/answer.dto'
import {
  Answer,
  Exam,
  InjectAnswerRepository,
  InjectExamRepository,
  InjectUserRepository,
  User,
} from '@app/db'
import { Repository } from 'typeorm'
import { IAnswer, IExam } from '@exam_system/types'

@Injectable()
export class AnswerService {
  @InjectAnswerRepository
  private answerRepository: Repository<Answer>

  @InjectExamRepository
  private examRepository: Repository<Exam>

  @InjectUserRepository
  private userRepository: Repository<User>

  getHello(): string {
    return 'Hello World!'
  }

  async add(data: AnswerAddDto, userId: number) {
    const exam = await this.examRepository.findOneBy({
      id: data.examId,
    })
    // const exam = await this.prismaService.exam.findUnique({
    //   where: { id: data.examId },
    // })
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
    const res = await this.answerRepository.insert({
      content: data.content,
      score,
      answererId: userId,
      examId: data.examId,
    })
    return res.identifiers[0]
    // return this.prismaService.answer.create({
    //   data: {
    //     content: data.content,
    //     score,
    //     answerer: {
    //       connect: {
    //         id: userId,
    //       },
    //     },
    //     exam: {
    //       connect: {
    //         id: data.examId,
    //       },
    //     },
    //   },
    // })
  }

  async list(examId: number) {
    const res = await this.answerRepository.findBy({
      examId,
    })
    const data: IAnswer[] = []
    for (const answer of res) {
      const [answerer, exam] = await Promise.all([
        this.userRepository.findOneBy({ id: answer.answererId }),
        this.examRepository.findOneBy({ id: answer.examId }),
      ])
      data.push({
        ...answer,
        exam: exam as unknown as IExam,
        answerer,
      })
    }
    return data
    /*     return this.prismaService.answer.findMany({
      where: {
        examId,
      },
      include: {
        exam: true,
        answerer: true,
      },
    }) */
  }

  async find(id: number) {
    return this.answerRepository.findOneBy({ id })
    /*     return this.prismaService.answer.findUnique({
      where: { id },
      include: {
        exam: true,
        answerer: true,
      },
    }) */
  }
}
