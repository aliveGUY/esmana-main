import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Lecture } from "./Lecture";

@Entity({ name: "user_lecture" })
export class UserLecture {
  @PrimaryColumn({ name: "user_id", type: "int" })
  @ManyToOne(() => User, user => user.lectures, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "user_id" })
  user: User;

  @PrimaryColumn({ name: "lecture_id", type: "int" })
  @ManyToOne(() => Lecture, lecture => lecture.users, { onDelete: 'CASCADE' })
  @JoinColumn({ name: "lecture_id" })
  lecture: Lecture;

  @Column({ name: "is_completed", type: "boolean", default: false })
  isCompleted: boolean;

  @Column({ name: "is_lector", type: "boolean", default: false })
  isLector: boolean;

  @Column({ name: "is_got_academic_hours", type: "boolean", default: false })
  isGotAcademicHours: boolean;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
