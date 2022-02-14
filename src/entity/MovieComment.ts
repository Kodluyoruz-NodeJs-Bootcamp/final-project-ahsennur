import { IsDate, IsNotEmpty } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export default class MovieComment extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @Column()
  @IsDate()
  @CreateDateColumn()
  ceratedAt: Date;

  @Column()
  @IsNotEmpty()
  movie: string;

  @Column()
  @IsNotEmpty()
  user: string;
}
