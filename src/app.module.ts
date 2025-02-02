import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PetsModule } from './pets/pets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './pets/entities/pet.entity';
import { MulterModule } from '@nestjs/platform-express';
import { join } from 'path';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { CorsMiddleware } from './middleware/cors.middleware';
import { EmailModule } from './email/email.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'pets_nest_db',
      entities: [Pet, User],
      synchronize: true,
    }),
    MulterModule.register({
      dest: join(process.cwd(), 'files'),
      limits: { fileSize: 1024 * 1024 * 10},
    }),
    PetsModule,
    AuthModule,
    UsersModule,
    EmailModule
  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(CorsMiddleware).forRoutes('*'); // ใช้ Middleware สำหรับทุก Route
  }
}
