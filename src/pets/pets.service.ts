import { Injectable, NotFoundException, UploadedFile, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePetDto } from './dto/create-pet.dto';
import { UpdatePetDto } from './dto/update-pet.dto';
import { Pet } from './entities/pet.entity';

@Injectable()
export class PetsService {
  constructor(
    @InjectRepository(Pet)
    private petRepository: Repository<Pet>,
  ) {}

  async create(createPetDto: CreatePetDto ) {
    try {
      const pet = await this.petRepository.create(createPetDto);
      const result = await this.petRepository.insert(pet);
      return {
        status: 200,
        id: result.identifiers[0].id,
      }
    } catch (error) {
      throw new Error("Error creating pet: " + error);
    }
  }

  async findAll(limit: number = 10, offset: number = 0) {
    const [result, total] = await this.petRepository.findAndCount({
        take: limit,  // จำนวน record ที่ต้องการดึง
        skip: offset  // ข้าม record ตามจำนวนที่กำหนด
    });

    return {
        data: result,
        total: total,
        limit: limit,
        offset: offset
    };
}

  async findOne(id: number) {
    
      const result = this.petRepository.findOneBy({id: id});
      return result;
  }

  async update(id: number, updatePetDto: UpdatePetDto) {
    let pet = await this.petRepository.findOneBy({ id: id });
  
    if (!pet) {
      throw new NotFoundException(`No pet found with id: ${id}`);
    }
  
    pet = {
      ...pet,
      ...updatePetDto
    };
  
    return await this.petRepository.save(pet);
  }

  async remove(id: number) {
    const result = await this.petRepository.delete(id);
    console.log(result);
  
    if (result.affected === 0) {
      throw new NotFoundException(`No pet found with id: ${id}`);
    }
  
    return `Removed successfully with id: ${id}`;
  }
}
