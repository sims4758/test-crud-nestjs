import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { decrypt, encrypt } from '../services/crypto.until';

@Injectable()
export class UsersService {
  constructor(
      @InjectRepository(User)
      private userRepository: Repository<User>,
  ) {}
 
  async createUser(createUserDto: CreateUserDto) {
    try {
      const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
      const encryptedFullname = await encrypt(createUserDto.fullname);
      const user = await this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,
        fullname: encryptedFullname
      });
      const result = await this.userRepository.insert(user);
      return "User created successfully with id: " + result.identifiers[0].userId;
    } catch (error) {
      throw new Error("Error creating user: " + error);
    }
  }

  async findOne(username: string): Promise<User | undefined> {
    const user = await this.userRepository.findOneBy({username: username});
       if (!user) {
          throw new NotFoundException('User not found');
        }

        try {
              const decryptedFullname = await decrypt(user.fullname);
              user.fullname = decryptedFullname; // Update user object
            } catch (error) {
              console.error('Error decrypting fullname:', error);
              // Handle decryption error (e.g., log, return appropriate response)
            }
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

}
