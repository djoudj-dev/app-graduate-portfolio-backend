import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from 'src/database/postgres/entity/project.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  /**
   * Transforme un projet pour le format frontend
   */
  private transformProject(project: Project) {
    return {
      ...project,
      technologies: project.technologies || [],
      github_url: project.github_links || null,
      secondary_github_url: project.secondary_github_links || null,
    };
  }

  /**
   * Récupère tous les projets
   */
  async findAll(): Promise<Project[]> {
    const projects = await this.projectRepository.find();
    return projects.map((project) => this.transformProject(project));
  }

  /**
   * Récupère un projet par son id
   */
  async findOne(id: string): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id: parseInt(id) },
    });
    if (!project) {
      throw new NotFoundException('Project not found');
    }
    return this.transformProject(project);
  }

  /**
   * Crée un nouveau projet
   */
  async create(project: Project): Promise<Project> {
    return await this.projectRepository.save(project);
  }

  /**
   * Met à jour un projet existant
   */
  async update(id: string, project: Project): Promise<Project> {
    const existingProject = await this.findOne(id);
    const updatedProject = this.projectRepository.merge(
      existingProject,
      project,
    );
    return await this.projectRepository.save(updatedProject);
  }

  /**
   * Supprime un projet existant
   */
  async delete(id: string): Promise<void> {
    await this.projectRepository.delete(parseInt(id));
  }
}
