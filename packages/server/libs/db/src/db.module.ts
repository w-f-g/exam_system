import { Global, Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Exam } from './entities/exam.entity'
import { Answer } from './entities/answer.entity'

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          type: 'mysql',
          host: process.env.MYSQL_HOST,
          port: +process.env.MYSQL_PORT,
          username: process.env.MYSQL_USER_NAME,
          password: process.env.MYSQL_PASSWORD,
          database: process.env.MYSQL_DATABASE_NAME,
          synchronize: true,
          logging: true,
          entities: [User, Exam, Answer],
          poolSize: 10,
          connectorPackage: 'mysql2',
          extra: {
            authPlugin: 'caching_sha2_password',
          },
        }
      },
    }),
  ],
})
export class DBModule {}
