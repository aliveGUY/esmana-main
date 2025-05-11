import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Course } from "./Course";
import { LectureMaterials } from "./LectureMaterials";
import { LectureStudent } from "./LectureStudent";
import { LectureLector } from "./LectureLector";

@Entity({ name: "lecture" })
export class Lecture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: "title", type: "varchar", length: 255 })
  title: string;

  @Column({ name: "description", type: "text" })
  description: string;

  @Column({ name: "price", type: "decimal", precision: 10, scale: 2 })
  price: number;

  @Column({ name: "start_time", type: "timestamp" })
  startTime: Date;

  @Column({ name: "end_time", type: "timestamp" })
  endTime: Date;

  @OneToOne(() => LectureMaterials, materials => materials.lecture, { nullable: true, cascade: true })
  materials: LectureMaterials;
  
  @OneToMany(() => LectureStudent, lectureStudent => lectureStudent.lecture)
  students: LectureStudent[];

  @OneToMany(() => LectureLector, lectureLector => lectureLector.lecture)
  lectors: LectureLector[];

  @ManyToOne(() => Course, course => course.lectures)
  @JoinColumn({ name: "course_id" })
  course: Course;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
