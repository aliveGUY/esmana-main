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
import { UserLecture } from "./UserLecture";

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

  @OneToMany(() => UserLecture, userLecture => userLecture.lecture)
  users: UserLecture[];

  @ManyToOne(() => Course, course => course.lectures)
  @JoinColumn({ name: "course_id" })
  course: Course;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
