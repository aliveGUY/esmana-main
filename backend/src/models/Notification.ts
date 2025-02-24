import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToOne
} from "typeorm";
import { User } from "./User";
import { Course } from "./Course";
import { Membership } from "./Membership";
import { ENotificationSeverity } from "./enums/ENotificationSeverity";
import { ENotificationType } from "./enums/ENotificationType";

@Entity({ name: "notification" })
export class Notification {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToOne(() => User, { nullable: true, onDelete: "CASCADE" })
  user: User | null;

  @OneToOne(() => Course, { nullable: true, onDelete: "CASCADE" })
  course: Course | null;

  @OneToOne(() => Membership, { nullable: true, onDelete: "CASCADE" })
  membership: Membership | null;

  @Column({ name: 'seen', type: 'bool', nullable: false, default: false })
  seen: boolean;

  @Column({
    type: "enum",
    enum: ENotificationSeverity,
    default: ENotificationSeverity.ERROR,
  })
  severity: ENotificationSeverity;

  @Column({
    type: "enum",
    enum: ENotificationType,
    default: ENotificationType.UNKNOWN,
  })
  type: ENotificationType;

  @CreateDateColumn({ name: "created_at", type: "timestamp", precision: 6 })
  createdAt: Date;
}
