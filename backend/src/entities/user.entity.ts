import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { AuthProvider } from '../models/enums';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({ nullable: true })
  password?: string;

  @Column({ name: 'first_name' })
  firstName: string;

  @Column({ name: 'last_name' })
  lastName: string;

  @Column({ name: 'google_id', nullable: true, unique: true })
  googleId?: string;

  @Column({ name: 'profile_picture', nullable: true })
  profilePicture?: string;

  @Column({
    type: 'enum',
    enum: AuthProvider,
    default: AuthProvider.LOCAL,
  })
  provider: AuthProvider;

  @Column({ name: 'is_email_verified', default: false })
  isEmailVerified: boolean;

  @Column('json')
  roles: string[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  // Helper methods
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  isGoogleUser(): boolean {
    return this.provider === AuthProvider.GOOGLE;
  }

  isLocalUser(): boolean {
    return this.provider === AuthProvider.LOCAL;
  }
}
