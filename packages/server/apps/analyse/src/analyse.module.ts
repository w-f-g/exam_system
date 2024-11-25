import { Module } from '@nestjs/common'
import { APP_GUARD } from '@nestjs/core'
import { AnalyseController } from './analyse.controller'
import { AnalyseService } from './analyse.service'
import { RedisModule } from '@app/redis'
import { Answer, DBModule } from 'libs/db/src'
import { AuthGuard, CommonModule } from '@app/common'
import { TypeOrmModule } from '@nestjs/typeorm'
@Module({
  imports: [
    CommonModule,
    RedisModule,
    DBModule,
    TypeOrmModule.forFeature([Answer]),
  ],
  controllers: [AnalyseController],
  providers: [
    AnalyseService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AnalyseModule {}
