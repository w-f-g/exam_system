import { Module } from '@nestjs/common'
import { CommonService } from './common.service'
import { JwtModule } from '@nestjs/jwt'

@Module({
  imports: [
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
