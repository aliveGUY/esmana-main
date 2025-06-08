import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";
import { Course } from "./Course";
import { ECertificateTemplate } from "./enums/ECertificateTemplate";

@Entity('certificate')
export class Certificate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'name', type: 'varchar', length: 255 })
  name: string;

  @Column({ name: 'bpr_index', type: 'varchar', length: 255, nullable: true })
  bprIndex?: string;

  @Column({ name: 'participation_index', type: 'varchar', length: 255, nullable: true })
  participationIndex?: string;

  @Column({ name: 'template', type: 'enum', enum: ECertificateTemplate })
  template: ECertificateTemplate;

  @Column({ name: 'issue_date', type: 'timestamp' })
  issueDate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => User, user => user.certificates, { nullable: false })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Course, course => course.certificates, { nullable: false })
  @JoinColumn({ name: "course_id" })
  course: Course;
}
