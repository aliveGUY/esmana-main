import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Index
} from "typeorm";
import { User } from "./User";
import { Lecture } from "./Lecture";

@Entity({ name: "course" })
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'title', type: "varchar", length: 255, nullable: false })
  title: string;

  @ManyToMany(() => User)
  @JoinTable({
    name: "course_students",
    joinColumn: { name: "course_id", referencedColumnName: "id" },
    inverseJoinColumn: { name: "student_id", referencedColumnName: "id" }
  })
  students: User[];

  @OneToMany(() => Lecture, (lecture) => lecture.course, { cascade: true })
  lectures: Lecture[];

  @Index()
  @Column({ name: 'beginning_date', type: "timestamp", nullable: false })
  beginningDate: Date;

  @Index()
  @Column({ name: 'finish_date', type: "timestamp", nullable: true })
  finishDate: Date;

  @Column({ name: 'availability_time', type: "timestamp", nullable: false })
  availabilityTime: Date;

  @Column({ name: 'active', type: 'bool', nullable: false, default: false })
  active: boolean;

  @Column({ name: 'certificate', type: "varchar", length: 500, nullable: false })
  certificate: string;

  @CreateDateColumn({ name: 'created_at', type: "timestamp", precision: 6, default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: "timestamp", precision: 6, default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;
}
