import { NestFactory } from '@nestjs/core'
import { UserModule } from './user.module'
import { ValidationPipe } from '@nestjs/common'
import { Transport } from '@nestjs/microservices'

async function bootstrap() {
  const app = await NestFactory.create(UserModule)

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: 8888,
    },
  })

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  )

  await app.listen(process.env.port ?? 3001)
}
bootstrap()
