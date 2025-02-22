import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Index,
  OneToOne
} from "typeorm";
import { User } from "./User";

@Entity({ name: "identity" })
export class Identity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'residence_address' })
  residenceAddress: string;

  @Column({ name: 'country' })
  country: string;

  @Column({ name: 'region' })
  region: string;

  @Column({ name: 'city' })
  city: string;

  @Index({ unique: true })
  @Column({ name: 'taxpayer_id' })
  taxpayerId: string;

  @Index({ unique: true })
  @Column({ name: 'passport_id' })
  passportId: string;

  @Column({ name: 'passport_issues_by' })
  passportIssuedBy: string;

  @Column({ name: 'education_institution' })
  educationInstitution: string;

  @Column({ name: 'work_experience' })
  workExperience: string;

  @Column({ name: 'relevant_topics' })
  relevantTopics: string;

  @Column({ name: 'birth_date', type: "date", nullable: false })
  birthDate: Date;

  @Column({ name: 'workplace', type: "varchar", length: 255, nullable: false })
  workplace: string;

  @Column({ name: 'position', type: "varchar", length: 255, nullable: false })
  position: string;

  @Column({ name: 'education', type: "varchar", length: 255, nullable: false })
  education: string;

  @Column({ name: 'field_of_work', type: "varchar", length: 255, nullable: false })
  fieldOfWork: string;

  @Column({ name: 'diploma_number', type: "varchar", length: 50, nullable: false })
  diplomaNumber: string;

  @Column({ name: 'personal_data_collection_consent', type: "boolean", nullable: false, default: true })
  personalDataCollectionConsent: boolean;

  @OneToOne(() => User, (user) => user.identity)
  user: User;

  @CreateDateColumn({ name: 'created_at', type: "timestamp", precision: 6, default: () => "CURRENT_TIMESTAMP(6)" })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at',type: "timestamp", precision: 6, default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
  updatedAt: Date;
}
