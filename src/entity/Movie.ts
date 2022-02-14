import { IsBoolean, IsDate, IsNotEmpty } from 'class-validator';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export default class Movie extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  name: string;

  @Column()
  plot: string;

  @Column()
  @IsDate()
  @CreateDateColumn()
  ceratedAt: Date;

  @Column({ default: '' })
  @IsNotEmpty()
  user: string;

  @Column({ default: false })
  @IsBoolean()
  isShared: boolean;
}
