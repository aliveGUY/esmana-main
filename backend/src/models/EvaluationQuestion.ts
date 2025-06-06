import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Course } from "./Course";
import { LectureMaterials } from "./LectureMaterials";

@Entity({ name: "evaluation_question" })
export class EvaluationQuestion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "question_text", type: "varchar", length: 1000 })
  questionText: string;

  @Column({ name: "correct_answers", type: "json" })
  correctAnswers: string[];

  @Column({ name: "options", type: "json" })
  options: string[];

  @ManyToOne(() => LectureMaterials, materials => materials.evaluation, { nullable: true })
  @JoinColumn({ name: "materials_id" })
  lectureMaterials?: LectureMaterials;

  @ManyToOne(() => Course, course => course.bprEvaluation, { nullable: true })
  @JoinColumn({ name: "course_id" })
  course?: Course;
}
