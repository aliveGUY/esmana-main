import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Lecture } from "./Lecture";
import { EvaluationQuestion } from "./EvaluationQuestion";
import { Certificate } from "./Certificate";

@Entity({ name: "course" })
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "event_id", type: "text" })
  eventId?: string

  @Column({ name: "thumbnail_url", type: "varchar", length: 2048, nullable: true })
  thumbnailUrl: string;

  @Column({ name: "title", type: "varchar", length: 255 })
  title: string;

  @Column({ name: "description", type: "text" })
  description: string;

  @Column({ name: "is_active", type: "boolean", default: false })
  isActive: boolean;

  @Column({ name: "participation_certificate", type: "varchar", length: 2048, nullable: true })
  participationCertificate: string;

  @Column({ name: "bpr_certificate", type: "varchar", length: 2048, nullable: true })
  bprCertificate: string;

  @OneToMany(() => Lecture, lecture => lecture.course, { cascade: true })
  lectures: Lecture[];


  @OneToMany(() => Certificate, certificate => certificate.course, { cascade: true })
  certificates: Certificate[];

  @OneToMany(() => EvaluationQuestion, question => question.course, { nullable: true })
  bprEvaluation: EvaluationQuestion[];

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
