import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { ERoles } from "./enums/ERoles";
import { UserLecture } from "./UserLecture";

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

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
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
}
