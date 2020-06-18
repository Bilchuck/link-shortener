import { Entity, PrimaryColumn, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
export class Link {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  originalUrl: string;

  @Index()
  @Column({ nullable: false, unique: true })
  shortLinkHash: string;
}
