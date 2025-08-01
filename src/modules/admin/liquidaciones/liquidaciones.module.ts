import { Module } from '@nestjs/common';
import { LiquidacionesService } from './liquidaciones.service';
import { LiquidacionesController } from './liquidaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Liquidaciones } from './entities/liquidaciones.entity';
import { In } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Liquidaciones])],
  controllers: [LiquidacionesController],
  providers: [LiquidacionesService],
})
export class LiquidacionesModule {}
