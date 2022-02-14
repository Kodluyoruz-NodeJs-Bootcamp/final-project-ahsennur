import { IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity()
export default class MovieLike extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  movie: string;

  @Column()
  @IsNotEmpty()
  user: string;
}
