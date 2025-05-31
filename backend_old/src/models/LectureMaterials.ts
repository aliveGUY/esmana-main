import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { EvaluationQuestion } from "./EvaluationQuestion";
import { Lecture } from "./Lecture";

@Entity({ name: "lecture_materials" })
export class LectureMaterials {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "video_url", type: "varchar", length: 2048, nullable: true })
  videoUrl: string;

  @Column({ name: "meeting_url", type: "varchar", length: 2048, nullable: true })
  meetingUrl: string;

  @Column({ name: "rich_text", type: "json", nullable: true })
  richText: object;

  @OneToMany(() => EvaluationQuestion, question => question.lectureMaterials, { cascade: true })
  evaluation: EvaluationQuestion[];

  @OneToOne(() => Lecture, lecture => lecture.materials)
  @JoinColumn({ name: "lecture_id" })
  lecture: Lecture;
}
