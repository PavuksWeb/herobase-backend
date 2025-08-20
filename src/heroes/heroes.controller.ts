import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { HeroesService } from './heroes.service';
import { Prisma } from '@prisma/client';

@Controller('heroes')
export class HeroesController {
  constructor(private readonly heroesService: HeroesService) {}

  @Get()
  findAllHeroes() {
    return this.heroesService.findAllHeroes();
  }

  @Get(':id')
  findHeroById(@Param('id') id: string) {
    return this.heroesService.findHeroById(Number(id));
  }

  @Post()
  createHero(@Body() createHeroDto: Prisma.HeroCreateInput) {
    return this.heroesService.createHero(createHeroDto);
  }

  @Put(':id')
  updateHero(
    @Param('id') id: string,
    @Body() updateHeroDto: Prisma.HeroUpdateInput,
  ) {
    return this.heroesService.updateHero(Number(id), updateHeroDto);
  }

  @Delete(':id')
  deleteHero(@Param('id') id: string) {
    return this.heroesService.deleteHero(Number(id));
  }
}
