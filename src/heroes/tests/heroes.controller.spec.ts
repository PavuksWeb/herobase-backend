import { Test, TestingModule } from '@nestjs/testing';
import { Hero, Prisma } from '@prisma/client';
import { HeroesController } from '../heroes.controller';
import { HeroesService } from '../heroes.service';

describe('HeroesController', () => {
  let controller: HeroesController;
  let service: HeroesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeroesController],
      providers: [
        {
          provide: HeroesService,
          useValue: {
            findAllHeroes: jest.fn(),
            findHeroById: jest.fn(),
            createHero: jest.fn(),
            updateHero: jest.fn(),
            deleteHero: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<HeroesController>(HeroesController);
    service = module.get<HeroesService>(HeroesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
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
      jest.spyOn(service, 'findAllHeroes').mockResolvedValue(heroes);

      const result = await controller.findAllHeroes();

      expect(result).toBe(heroes);
      expect(service.findAllHeroes).toHaveBeenCalled();
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
      jest.spyOn(service, 'findHeroById').mockResolvedValue(hero);

      const result = await controller.findHeroById('1');

      expect(result).toBe(hero);
      expect(service.findHeroById).toHaveBeenCalledWith(1);
    });
  });

  describe('createHero', () => {
    it('should create a hero', async () => {
      const dto: Prisma.HeroCreateInput = {
        nickname: 'Superman',
        real_name: 'Clark Kent',
        origin_description: 'An alien from Krypton who protects Earth.',
        catch_phrase: 'Up, up, and away!',
      };
      const created: Hero = {
        id: 2,
        nickname: 'Superman',
        real_name: 'Clark Kent',
        origin_description: 'An alien from Krypton who protects Earth.',
        superpowers: ['Super strength', 'Flight', 'Heat vision'],
        catch_phrase: 'Up, up, and away!',
        images: ['superman1.jpg', 'superman2.jpg'],
      };
      jest.spyOn(service, 'createHero').mockResolvedValue(created);

      const result = await controller.createHero(dto);

      expect(result).toBe(created);
      expect(service.createHero).toHaveBeenCalledWith(dto);
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
        origin_description:
          'A genius billionaire who built a powered suit of armor.',
        superpowers: [
          'Genius intellect',
          'Powered armor suit',
          'Advanced technology',
        ],
        catch_phrase: 'I am Iron Man.',
        images: ['ironman1.jpg', 'ironman2.jpg'],
      };
      jest.spyOn(service, 'updateHero').mockResolvedValue(updated);

      const result = await controller.updateHero('1', dto);

      expect(result).toBe(updated);
      expect(service.updateHero).toHaveBeenCalledWith(1, dto);
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
      jest.spyOn(service, 'deleteHero').mockResolvedValue(deleted);

      const result = await controller.deleteHero('1');

      expect(result).toBe(deleted);
      expect(service.deleteHero).toHaveBeenCalledWith(1);
    });
  });
});
