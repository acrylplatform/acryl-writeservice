import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'objects' })
export class DataObject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  idFromUser: string;

  @Column({nullable: false, type: 'json'})
  rawData: string;

  @Column({nullable: true})
  txHash: string;

  @Column({ nullable: true, type: 'timestamp with time zone' })
  txDate: string;

  @Column({ default: false })
  txStatus: boolean;

  @Column({nullable: true, type: 'json'})
  writeData: string;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  createdAt: string;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  updatedAt: string;
}
