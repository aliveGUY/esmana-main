import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn
} from "typeorm";
import { User } from "./User";
import { Lecture } from "./Lecture";

@Entity({ name: "lecture_lector" })
export class LectureLector {
  @PrimaryColumn({ name: "user_id" })
  userId: number;

  @PrimaryColumn({ name: "lecture_id" })
  lectureId: number;

  @ManyToOne(() => User, user => user.lecturesAsLector)
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Lecture, lecture => lecture.lectors)
  @JoinColumn({ name: "lecture_id" })
  lecture: Lecture;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
