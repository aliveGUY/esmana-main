import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Index,
  OneToOne,
  JoinColumn
} from "typeorm";
import { Identity } from "./Identity";
import { ERoles } from "./enums/ERoles";

@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name', type: "varchar", length: 100, nullable: false })
  firstName: string;

  @Column({ name: 'middle_name', type: "varchar", length: 100, nullable: true })
  middleName: string;

  @Column({ name: 'last_name', type: "varchar", length: 100, nullable: false })
  lastName: string;

  @Index({ unique: true })
  @Column({ name: 'email', type: "varchar", length: 255, nullable: false })
  email: string;

  @Index()
  @Column({ name: 'phone', type: "varchar", length: 20, nullable: false })
  phone: string;

  @Column({ type: "varchar", length: 255, nullable: false, select: false })
  password: string;

  @Column({
    type: "enum",
    enum: ERoles,
    default: ERoles.USER,
    nullable: false,
  })
  role: ERoles;

  @OneToOne(() => Identity, (identity) => identity.user)
  @JoinColumn({ name: "identity_id" })
  identity: Identity;

  @CreateDateColumn({ name: 'created_at', type: "timestamp", precision: 6, default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: "timestamp", precision: 6, default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;
}
