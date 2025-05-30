import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
  Index
} from "typeorm";
import { User } from "./User";

@Entity({ name: "membership" })
export class Membership {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @OneToOne(() => User, { nullable: true, onDelete: "SET NULL" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @Column({ name: 'payment_date', type: "date", nullable: true })
  paymentDate: Date;

  @Column({ name: 'activation_date', type: "date", nullable: true })
  activationDate: Date;


  @Column({ name: 'expires_at', type: "date", nullable: true })
  expiresAt: Date;

  @CreateDateColumn({ name: 'created_at', type: "timestamp", precision: 6, default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;
}
