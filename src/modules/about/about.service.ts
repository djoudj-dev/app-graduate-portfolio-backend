import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { About } from 'src/database/postgres/entity/about.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AboutService {
  constructor(
    @InjectRepository(About)
    private aboutRepository: Repository<About>,
  ) {}

  /**
   * Récupère toutes les informations about
   */
  async findAll(): Promise<About[]> {
    return await this.aboutRepository.find();
  }

  /**
   * Récupère une information about par son id
   */
  async findOne(id: string): Promise<About> {
    const about = await this.aboutRepository.findOne({
      where: { id: parseInt(id) },
    });
    if (!about) {
      throw new NotFoundException('About not found');
    }
    return about;
  }

  /**
   * Met à jour une information about existante
   */
  async update(id: string, about: About): Promise<About> {
    const existingAbout = await this.findOne(id);
    const updatedAbout = this.aboutRepository.merge(existingAbout, about);
    return await this.aboutRepository.save(updatedAbout);
  }

  /**
   * Crée une nouvelle information about
   */
  async create(about: About): Promise<About> {
    const newAbout = this.aboutRepository.create(about);
    return this.aboutRepository.save(newAbout);
  }
}
