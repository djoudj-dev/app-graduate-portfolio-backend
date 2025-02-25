import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { About } from './about.entity';
import { SoftSkill } from './soft-skill.entity';

@Entity('about_soft_skills')
export class AboutSoftSkill {
  @PrimaryGeneratedColumn({ name: 'id_about_soft_skills' })
  id: number;

  @Column({ name: 'about_id', nullable: false })
  aboutId: number;

  @Column({ name: 'soft_skill_id', nullable: false })
  softSkillId: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @ManyToOne(() => About, (about) => about.aboutSoftSkills)
  @JoinColumn({ name: 'about_id' })
  about: About;

  @ManyToOne(() => SoftSkill, (softSkill) => softSkill.aboutSoftSkills)
  @JoinColumn({ name: 'soft_skill_id' })
  softSkill: SoftSkill;
}
