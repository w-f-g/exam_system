import { NestFactory } from '@nestjs/core'
import { AnalyseModule } from './analyse.module'
import { Transport } from '@nestjs/microservices'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AnalyseModule)

  app.connectMicroservice({
    transport: Transport.TCP,
    options: {
      port: 8888,
    },
  })
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  await app.listen(process.env.port ?? 3004)
}
bootstrap()
