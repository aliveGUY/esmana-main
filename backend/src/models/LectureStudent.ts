import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn
} from "typeorm";
import { User } from "./User";
import { Lecture } from "./Lecture";

@Entity({ name: "lecture_student" })
export class LectureStudent {
  @PrimaryColumn({ name: "user_id" })
  userId: number;

  @PrimaryColumn({ name: "lecture_id" })
  lectureId: number;

  @Column({ name: "is_completed", type: "boolean", default: false })
  isCompleted: boolean;

  @Column({ name: "completion_date", type: "timestamp", nullable: true })
  completionDate: Date;

  @ManyToOne(() => User, user => user.lecturesAsStudent)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Lecture, lecture => lecture.students)
  @JoinColumn({ name: "lecture_id" })
  lecture: Lecture;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
