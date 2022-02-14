import { IsDate, IsNotEmpty } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export default class MovieStar extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  surname: string;

  @Column()
  @IsDate()
  @CreateDateColumn()
  ceratedAt: Date;

  @Column()
  @IsNotEmpty()
  user: string;

  @Column()
  @IsNotEmpty()
  isShared: boolean;
}
