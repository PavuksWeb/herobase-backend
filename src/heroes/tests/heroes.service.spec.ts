import { Test, TestingModule } from '@nestjs/testing';
import { Hero, Prisma } from '@prisma/client';
import { HeroesService } from '../heroes.service';
import { DatabaseService } from 'src/database/database.service';

describe('HeroesService', () => {
  let service: HeroesService;
  let db: {
    hero: {
      findMany: jest.Mock;
      findUnique: jest.Mock;
      create: jest.Mock;
      update: jest.Mock;
      delete: jest.Mock;
    };
  };

  beforeEach(async () => {
    db = {
      hero: {
        findMany: jest.fn(),
        findUnique: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HeroesService,
        {
          provide: DatabaseService,
          useValue: db,
        },
      ],
    }).compile();

    service = module.get<HeroesService>(HeroesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAllHeroes', () => {
    it('should return all heroes', async () => {
      const heroes: Hero[] = [
        {
          id: 1,
          nickname: 'Batman',
          real_name: 'Bruce Wayne',
          origin_description: 'A billionaire who fights crime in Gotham City.',
          superpowers: [
            'Martial arts',
            'Detective skills',
            'High-tech gadgets',
          ],
          catch_phrase: 'I am Batman.',
          images: ['batman1.jpg', 'batman2.jpg'],
        },
      ];
      db.hero.findMany.mockResolvedValue(heroes);

      const result = await service.findAllHeroes();

      expect(result).toBe(heroes);
      expect(db.hero.findMany).toHaveBeenCalled();
    });
  });

  describe('findHeroById', () => {
    it('should return a hero by id', async () => {
      const hero: Hero = {
        id: 1,
        nickname: 'Batman',
        real_name: 'Bruce Wayne',
        origin_description: 'A billionaire who fights crime in Gotham City.',
        superpowers: ['Martial arts', 'Detective skills', 'High-tech gadgets'],
        catch_phrase: 'I am Batman.',
        images: ['batman1.jpg', 'batman2.jpg'],
      };
      db.hero.findUnique.mockResolvedValue(hero);

      const result = await service.findHeroById(1);

      expect(result).toBe(hero);
      expect(db.hero.findUnique).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });

  describe('createHero', () => {
    it('should create a hero', async () => {
      const dto: Prisma.HeroCreateInput = {
        nickname: 'Superman',
        real_name: 'Clark Kent',
        origin_description: 'An alien from Krypton',
        catch_phrase: 'Up, up, and away!',
      };
      const created: Hero = {
        id: 2,
        nickname: 'Superman',
        real_name: 'Clark Kent',
        origin_description: 'An alien from Krypton',
        superpowers: ['Super strength', 'Flight', 'Heat vision'],
        catch_phrase: 'Up, up, and away!',
        images: ['superman1.jpg', 'superman2.jpg'],
      };

      db.hero.create.mockResolvedValue(created);

      const result = await service.createHero(dto);

      expect(result).toBe(created);
      expect(db.hero.create).toHaveBeenCalledWith({ data: dto });
    });
  });

  describe('updateHero', () => {
    it('should update a hero', async () => {
      const dto: Prisma.HeroUpdateInput = {
        nickname: { set: 'Ironman' },
      };
      const updated: Hero = {
        id: 1,
        nickname: 'Ironman',
        real_name: 'Tony Stark',
        origin_description: 'A genius billionaire in a powered suit of armor.',
        superpowers: ['Genius intellect', 'Powered armor suit'],
        catch_phrase: 'I am Iron Man.',
        images: ['ironman1.jpg', 'ironman2.jpg'],
      };

      db.hero.update.mockResolvedValue(updated);

      const result = await service.updateHero(1, dto);

      expect(result).toBe(updated);
      expect(db.hero.update).toHaveBeenCalledWith({
        where: { id: 1 },
        data: dto,
      });
    });
  });

  describe('deleteHero', () => {
    it('should delete a hero', async () => {
      const deleted: Hero = {
        id: 1,
        nickname: 'Batman',
        real_name: 'Bruce Wayne',
        origin_description: 'A billionaire who fights crime in Gotham City.',
        superpowers: ['Martial arts', 'Detective skills', 'High-tech gadgets'],
        catch_phrase: 'I am Batman.',
        images: ['batman1.jpg', 'batman2.jpg'],
      };
      db.hero.delete.mockResolvedValue(deleted);

      const result = await service.deleteHero(1);

      expect(result).toBe(deleted);
      expect(db.hero.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });
  });
});
