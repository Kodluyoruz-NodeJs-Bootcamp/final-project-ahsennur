import { IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export default class MovieStarLike extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()  
  @IsNotEmpty()
  movieStar: string;

  @Column()
  @IsNotEmpty()
  user: string;
}
