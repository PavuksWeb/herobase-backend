import { Module } from '@nestjs/common';
import { HeroesController } from './heroes.controller';
import { HeroesService } from './heroes.service';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  controllers: [HeroesController],
  providers: [HeroesService],
  imports: [DatabaseModule],
})
export class HeroesModule {}
