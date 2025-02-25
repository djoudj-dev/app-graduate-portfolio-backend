import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AboutSoftSkill } from './about-soft-skill.entity';
import { User } from './user.entity';

@Entity('about')
export class About {
  @PrimaryGeneratedColumn({ name: 'id_about' })
  id: number;

  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  title: string;

  @Column({ type: 'text', nullable: false })
  description: string;

  @Column({ type: 'text', nullable: false })
  quote: string;

  @Column({ name: 'quote_footer', nullable: false })
  quoteFooter: string;

  @Column({ name: 'soft_skills_title', nullable: false })
  softSkillsTitle: string;

  @Column({ name: 'cv_link', nullable: false })
  cvLink: string;

  @Column({ name: 'github_link', nullable: false })
  githubLink: string;

  @Column({ name: 'profile_image', nullable: false })
  profileImage: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => User, (user) => user.about)
  users: User[];

  @OneToMany(() => AboutSoftSkill, (aboutSoftSkill) => aboutSoftSkill.about)
  aboutSoftSkills: AboutSoftSkill[];
}
