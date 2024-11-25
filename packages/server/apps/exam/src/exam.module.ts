import { Module } from '@nestjs/common'
import { ExamController } from './exam.controller'
import { ExamService } from './exam.service'
import { RedisModule } from '@app/redis'
import { DBModule, Exam } from 'libs/db/src'
import { APP_GUARD } from '@nestjs/core'
import { AuthGuard, CommonModule } from '@app/common'
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
  imports: [
    CommonModule,
    RedisModule,
    DBModule,
    TypeOrmModule.forFeature([Exam]),
  ],
  controllers: [ExamController],
  providers: [
    ExamService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class ExamModule {}
