import { Module } from '@nestjs/common';
import { PetsService } from './pets.service';
import { PetsController } from './pets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pet } from './entities/pet.entity';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pet]),
    MulterModule.register({
      dest: './uploads/pets',
    }),
  ],
  controllers: [PetsController],
  providers: [PetsService],
})
export class PetsModule {}
