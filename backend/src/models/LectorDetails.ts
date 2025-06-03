import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";

@Entity({ name: "lector_details" })
export class LectorDetails {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "credentials", type: "varchar", length: 2048, nullable: true })
  credentials: string;

  @Column({ name: "biography", type: "json", nullable: true })
  biography: object;

  @Column({ name: "user_id", unique: true })
  userId: number;

  @OneToOne(() => User, user => user.lectorDetails)
  @JoinColumn({ name: "user_id" })
  user: User;
}
