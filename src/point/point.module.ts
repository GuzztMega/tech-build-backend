import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { PointController } from './point.controller';
import { PointSchema } from './point.model';
import { PointService } from './point.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Point', schema: PointSchema }]),
  ],
  providers: [PointService],
  controllers: [PointController]
})
export class PointModule {}
