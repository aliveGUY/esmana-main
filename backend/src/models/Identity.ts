import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Index,
  OneToOne,
  JoinColumn
} from "typeorm";
import { User } from "./User";

@Entity({ name: "identity" })
export class Identity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'city', nullable: false })
  city: string;

  @Column({ name: 'birth_date', type: "date", nullable: false })
  birthDate: Date;

  @Column({ name: 'workplace', type: "varchar", length: 255, nullable: false })
  workplace: string;

  @Column({ name: 'position', type: "varchar", length: 255, nullable: false })
  position: string;

  @Column({ name: "education", type: "json", nullable: false })
  education: string[];

  @Column({ name: 'field_of_work', type: "varchar", length: 255, nullable: false })
  fieldOfWork: string;

  @Column({ name: 'diploma_number', type: "varchar", length: 50, nullable: false })
  diplomaNumber: string;

  @Column({ name: 'personal_data_collection_consent', type: "boolean", nullable: false, default: true })
  personalDataCollectionConsent: boolean;



  @Column({ name: 'residence_address', nullable: true })
  residenceAddress: string;

  @Column({ name: 'country', nullable: true })
  country: string;

  @Column({ name: 'region', nullable: true })
  region: string;

  @Index({ unique: true })
  @Column({ name: 'taxpayer_id', nullable: true })
  taxpayerId: string;

  @Index({ unique: true })
  @Column({ name: 'passport_id', nullable: true })
  passportId: string;

  @Column({ name: 'passport_issues_by', nullable: true })
  passportIssuedBy: string;

  @Column({ name: 'education_institution', nullable: true })
  educationInstitution: string;

  @Column({ name: 'work_experience', nullable: true })
  workExperience: string;

  @Column({ name: 'relevant_topics', nullable: true })
  relevantTopics: string;

  @OneToOne(() => User, (user) => user.identity, { nullable: false, onDelete: "CASCADE" })
  @JoinColumn({ name: "user_id" })
  user: User;

  @CreateDateColumn({ name: 'created_at', type: "timestamp", precision: 6, default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: "timestamp", precision: 6, default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;
}
