import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  JoinColumn,
  ManyToOne
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

  @ManyToOne(() => User, (user) => user.notifications, { nullable: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User | null;

  @ManyToOne(() => Course, (course) => course.notifications, { nullable: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "course_id" })
  course: Course | null;

  @ManyToOne(() => Membership, (membership) => membership.notifications, { nullable: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "membership_id" })
  membership: Membership | null;

  @Column({ name: 'seen', type: 'bool', nullable: false, default: false })
  seen: boolean;

  @Column({
    type: "varchar", length: "255",
    default: ENotificationSeverity.ERROR,
  })
  severity: ENotificationSeverity;

  @Column({
    type: "varchar", length: "255",
    default: ENotificationType.UNKNOWN,
  })
  type: ENotificationType;

  @CreateDateColumn({ name: "created_at", type: "timestamp", precision: 6 })
  createdAt: Date;
}
