import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pet {
    @PrimaryGeneratedColumn()
  id: number;

  @Column()
  petName: string;

  @Column()
  petAge: number;

  @Column()
  petSex: string;

  @Column()
  petDescription: string;

  @Column()
  petPicture: string;
}
