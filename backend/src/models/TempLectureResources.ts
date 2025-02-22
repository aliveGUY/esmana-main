import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  Index
} from "typeorm";
import { Lecture } from "./Lecture";

@Entity({ name: "temp_lecture_resources" })
export class TempLectureResources {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @OneToOne(() => Lecture, { onDelete: "CASCADE", nullable: false })
  @JoinColumn({ name: "lecture_id" })
  lecture: Lecture;

  @Column({ name: 'video_call_link', type: "varchar", length: 500, nullable: false })
  videoCallLink: string;
}
