import { Module } from '@nestjs/common'
import { CommonService } from './common.service'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'
import { resolve } from 'path'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [
        resolve(process.cwd(), '.env.development'),
        resolve(process.cwd(), '.env.production'),
      ],
    }),
    JwtModule.registerAsync({
      global: true,
      useFactory() {
        return {
          secret: '福生无量天尊',
          signOptions: {
            expiresIn: '30m',
          },
        }
      },
    }),
  ],
  providers: [CommonService],
  exports: [CommonService],
})
export class CommonModule {}
