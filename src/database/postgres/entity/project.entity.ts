import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './user.entity';

@Entity('projects')
export class Project {
  @PrimaryGeneratedColumn({ name: 'id_projects' })
  id: number;

  @Column({ length: 50, nullable: false })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ name: 'image_url', nullable: true })
  image_url: string;

  @Column('simple-array', { nullable: true })
  technologies: string[];

  @Column({ name: 'demo_url', nullable: true })
  demo_url: string;

  @Column({ name: 'github_links', nullable: true })
  github_links: string;

  @Column({ name: 'secondary_github_links', nullable: true })
  secondary_github_links: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => User, (user) => user.project)
  users: User[];
}
