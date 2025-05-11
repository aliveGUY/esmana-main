import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Index,
  OneToMany
} from "typeorm";
import { ERoles } from "./enums/ERoles";
import { Exclude } from 'class-transformer';
import { LectureStudent } from "./LectureStudent";
import { LectureLector } from "./LectureLector";

@Entity({ name: "user" })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name', type: "varchar", length: 100, nullable: false })
  firstName: string;

  @Column({ name: 'middle_name', type: "varchar", length: 100, nullable: true })
  middleName: string;

  @Column({ name: 'last_name', type: "varchar", length: 100, nullable: false })
  lastName: string;

  @Index({ unique: true })
  @Column({ name: 'email', type: "varchar", length: 255, nullable: false })
  email: string;

  @Index()
  @Column({ name: 'phone', type: "varchar", length: 20, nullable: false })
  phone: string;

  @Exclude()
  @Column({ type: "varchar", length: 255, nullable: false, select: false })
  password: string;

  @Column({
    type: "enum",
    enum: ERoles,
    default: ERoles.USER,
    nullable: false,
  })
  role: ERoles;


  @CreateDateColumn({ name: 'created_at', type: "timestamp", precision: 6, default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: "timestamp", precision: 6, default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;

  @OneToMany(() => LectureStudent, lectureStudent => lectureStudent.user)
  lecturesAsStudent: LectureStudent[];

  @OneToMany(() => LectureLector, lectureLector => lectureLector.user)
  lecturesAsLector: LectureLector[];
}
