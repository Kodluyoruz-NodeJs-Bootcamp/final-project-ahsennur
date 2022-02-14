import { IsDate, IsNotEmpty } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export default class MovieStarComment extends BaseEntity {
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
  movieStar: string;

  @Column()
  @IsNotEmpty()
  user: string;
}
