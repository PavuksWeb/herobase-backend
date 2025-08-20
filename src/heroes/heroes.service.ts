import { Injectable } from '@nestjs/common';
import { Hero, Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class HeroesService {
  constructor(private readonly databaseService: DatabaseService) {}

  async findAllHeroes(): Promise<Hero[]> {
    return this.databaseService.hero.findMany();
  }

  async findHeroById(id: number): Promise<Hero | null> {
    return this.databaseService.hero.findUnique({ where: { id } });
  }

  async createHero(data: Prisma.HeroCreateInput): Promise<Hero> {
    return this.databaseService.hero.create({ data });
  }

  async updateHero(id: number, data: Prisma.HeroUpdateInput): Promise<Hero> {
    return this.databaseService.hero.update({ where: { id }, data });
  }

  async deleteHero(id: number): Promise<Hero> {
    return this.databaseService.hero.delete({ where: { id } });
  }
}
