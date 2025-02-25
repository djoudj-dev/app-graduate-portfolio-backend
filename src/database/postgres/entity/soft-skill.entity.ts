import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { AboutSoftSkill } from './about-soft-skill.entity';

@Entity('soft_skills')
export class SoftSkill {
  @PrimaryGeneratedColumn({ name: 'id_soft_skills' })
  id: number;

  @Column({ name: 'skill_name', nullable: false })
  skillName: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @OneToMany(() => AboutSoftSkill, (aboutSoftSkill) => aboutSoftSkill.softSkill)
  aboutSoftSkills: AboutSoftSkill[];
}
