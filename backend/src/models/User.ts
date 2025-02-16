import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 100, nullable: false })
  username: string;

  @Column({ type: "varchar", nullable: false, select: false })
  password: string;

  @CreateDateColumn({ name: 'created_at', type: "timestamp", precision: 6, default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at',type: "timestamp", precision: 6, default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;
}
