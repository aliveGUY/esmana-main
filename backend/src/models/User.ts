import { Column, Entity, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ERoles } from "./enums/ERoles";
import { UserLecture } from "./UserLecture";
import { LectorDetails } from "./LectorDetails";
import { Certificate } from "./Certificate";

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'middle_name', nullable: true })
  middleName?: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'phone', nullable: true })
  phone: string;

  @Column({ name: 'password', nullable: true })
  password?: string;

  @Column({ name: 'google_id', nullable: true, unique: true })
  googleId?: string;

  @Column({ name: 'profile_picture', nullable: true })
  profilePicture?: string;

  @Column({ name: 'is_email_verified', default: false })
  isEmailVerified: boolean;

  @Column('json')
  roles: ERoles[];

  @OneToMany(() => UserLecture, userLecture => userLecture.user)
  lectures: UserLecture[];

  @OneToOne(() => LectorDetails, lectorDetails => lectorDetails.user, { nullable: true })
  lectorDetails?: LectorDetails;

  @OneToMany(() => Certificate, certificate => certificate.user, { nullable: true })
  certificates?: Certificate;
}
