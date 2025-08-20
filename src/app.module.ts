import { Module } from '@nestjs/common';
import { HeroesModule } from './heroes/heroes.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [HeroesModule, DatabaseModule],
})
export class AppModule {}
