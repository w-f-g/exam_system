import { Module } from '@nestjs/common'
import { AnswerController } from './answer.controller'
import { AnswerService } from './answer.service'
import { ClientsModule, Transport } from '@nestjs/microservices'
import { RedisModule } from '@app/redis'
import { Answer, DBModule, Exam, User } from 'libs/db/src'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard, CommonModule } from '@app/common'
import { ExcelModule } from '@app/excel'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    CommonModule,
    RedisModule,
    DBModule,
    ExcelModule,
    ClientsModule.register([
      {
        name: 'EXAM_SERVICE',
        transport: Transport.TCP,
        options: {
          port: 8888,
        },
      },
    ]),
    TypeOrmModule.forFeature([Exam, Answer, User]),
  ],
  controllers: [AnswerController],
  providers: [
    AnswerService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AnswerModule {}
