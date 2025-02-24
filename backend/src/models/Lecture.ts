import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  ManyToMany,
  OneToOne,
  JoinTable,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Index
} from "typeorm";
import { Course } from "./Course";
import { User } from "./User";
import { TempLectureResources } from "./TempLectureResources";

@Entity({ name: "lecture" })
export class Lecture {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'title', type: "varchar", length: 255, nullable: false })
  title: string;

  @Column({ name: 'start_time', type: "datetime", nullable: false })
  startTime: Date;

  @Column({ name: 'end_time', type: "datetime", nullable: false })
  endTime: Date;

  @Column({ name: 'video_link', type: "varchar", length: 500, nullable: true })
  videoLink: string;

  @ManyToMany(() => User)
  @JoinTable({
    name: "lecture_speakers",
    joinColumn: { name: "lecture_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "speaker_id", referencedColumnName: "id" }
  })
  speakers: User[];

  @ManyToOne(() => Course, (course) => course.lectures, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "course_id" })
  course: Course;

  @OneToOne(() => TempLectureResources, (tempResources) => tempResources.lecture, { cascade: true, onDelete: "CASCADE" })
  @JoinColumn({ name: "temp_lecture_resources_id" })
  tempResources: TempLectureResources;

  @CreateDateColumn({ name: 'created_at', type: "timestamp", precision: 6, default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: "timestamp", precision: 6, default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;
}
